
import { EventEmitter } from "events";
import { Producer } from "node-rdkafka";

import kafkaconf from "./kafkaconf";

export const prefix: string = process.env.CLOUDKARAFKA_TOPIC_PREFIX || "dev";

const topic = `u8d1w2mr-input`

const producer = new Producer(kafkaconf, {});

producer.on("ready", (arg: any) => {
  producer.produce(topic, null, Buffer.from("actual data value"))
  producer.flush(3000, () => {
    process.exit();
  });
});

producer.connect();