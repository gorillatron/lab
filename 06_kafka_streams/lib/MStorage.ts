
import mongoose from "mongoose";
import { KStorage } from "kafka-streams";

interface KeyValuePair extends mongoose.Document {
  key: string, value: any
}

const KeyValueModel = mongoose.model<KeyValuePair>('MStorageKeyValuePair', new mongoose.Schema({
  "key": String,
  "value": String
}))

const connected:boolean = false

const connect = async() => {
  await mongoose.connect("mongodb://lab:kafkastreams123@ds056549.mlab.com:56549/labs_06_kafka_streams", {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		poolSize: 10
	});
}

const props = {

  async ensureConnection() {
    if(connected) {
      return true
    }
    else {
      await connect()
      return true
    }
  },

  async set(key:string, value: any) {
    await this.ensureConnection()
    if(await this.get(key)) {
      return KeyValueModel.updateOne({ key }, { key, value })
    }
    return KeyValueModel.create({ key, value })
  },

  async get(key: any) {
    await this.ensureConnection()
    const keyValuePair = await KeyValueModel.findOne({ key }) 
    return keyValuePair ? keyValuePair.value : null
  },

  async getMin(key = "min") {
    await this.ensureConnection()
    return this.get(key)
  },

  async getMax(key = "max") {
    await this.ensureConnection()
    return this.get(key)
  },

  async increment(key: string, by = 1) {
    await this.ensureConnection()
    const existing = await this.get(key);
    const nextValue = existing ? existing + by : by;
    await this.set(key, nextValue)
    return nextValue
  },

  async sum(key: string, value: any) {
    await this.ensureConnection()
    return this.increment(key, value);
  },

  async getState() {
    await this.ensureConnection()
    const keyValuePairs = await KeyValueModel.find();
    return keyValuePairs.reduce((out, pair) => ({
      ...out,
      [pair["key"]]: pair.key
    }),{})
  },

  async setState(state: any) {
    await this.ensureConnection()
    await KeyValueModel.remove({})
    const keyValuePairs = Object.keys(state).map(key => ({
      key,
      value: state[key]
    }))
    try {
      await KeyValueModel.create(keyValuePairs)
      return true
    }
    catch(error) {
      return false
    }
  },

  async setSmaller(key = "min", value: any) {
    await this.ensureConnection()
    const existing = await this.get(key);

    if (!existing) {
      await this.set(key, value)
    }

    if (value < this.get(key)) {
      await this.set(key, value)
    }

    return await this.set(key, value)
  },

  async setGreater(key = "max", value: any) {
    await this.ensureConnection()
    const existing = await this.get(key);

    if (!existing) {
      await this.set(key, value)
    }

    if (value > this.get(key)) {
      await this.set(key, value)
    }

      return await this.set(key, value)
  },

  async close() {
    await this.ensureConnection()
    try {
      await mongoose.disconnect()
      return true
    }
    catch(error) {
      return false
    }
  }

} as any

export default () => {
  const storage: any = new KStorage({});
  for(let key in props) {
    storage[key] = props[key]
  }
  return storage
}