
import { EventEmitter } from "events";
import { Producer } from "node-rdkafka";
import { KafkaStreams, KStorage } from "kafka-streams";

import kafkaconf from "./kafkaconf";

const inTopic = `u8d1w2mr-input`
const outTopic = `u8d1w2mr-output`

const kafkaStreams = new KafkaStreams({
  groupId: "transformers",
  workerPerPartition: 1,
	noptions: {
    ...kafkaconf,
    "group.id": "transformers",
    "enable.auto.commit": true,
    "auto.commit.interval.ms": 1000,
  },
  tconf: {
    "auto.offset.reset": "earliest"
  }
});


const stream$ = kafkaStreams.getKStream();

stream$
  .from(inTopic)
  .tap((message:any) => {
    console.log(`transforming message ${message.value}`)
  })
  .map((message: any) => {
    return `transformed message: ${message.value}`;
  })
  .to(outTopic)

stream$.start()