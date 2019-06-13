
import { KafkaStreams, } from "kafka-streams";

import MStorage from "../lib/MStorage";

import kafkaconf from "./kafkaconf";

const fromTopic = `u8d1w2mr-test`

const kafkaStreams = new KafkaStreams({
  groupId: "consumers",
  workerPerPartition: 1,
	noptions: {
    ...kafkaconf,
    "group.id": "consumers"
  },
  tconf: {
    "auto.offset.reset": "earliest"
  }
});

const keyValueMapperEtl = (kafkaMessage: any) => {
  const value = kafkaMessage.value.toString("utf8");
  const elements = value.toLowerCase().split(" ");
  return {
      key: elements[0],
      value: elements[1]
  };
}


const main = async() => {
  
  const storage = MStorage()
  const table$ = kafkaStreams.getKTable(fromTopic, keyValueMapperEtl, storage as any);

  table$
    .forEach(message => {
      console.log(message)
    })

  table$.start()

  console.log(await table$.getTable())
}

main()






