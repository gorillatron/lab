
import { Producer, AdminClient } from "node-rdkafka";

import kafkaconf from "./kafkaconf";

const topic = `u8d1w2mr-test`

const producer = new Producer(kafkaconf, {});

producer.on("ready", (arg: any) => {
  console.log("producer ready")
  producer.produce(topic, null, Buffer.from("1 grape"))
  producer.produce(topic, null, Buffer.from("2 kiwi"))
  producer.produce(topic, null, Buffer.from("3 meatball"))
  producer.flush(3000, () => {
    process.exit();
  });
});

producer.on("error", (error: any) => {
  console.error(error);
  process.exit();
});

producer.connect();