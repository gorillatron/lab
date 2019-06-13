
import { EventEmitter } from "events";
import { Producer } from "node-rdkafka";
import { KafkaStreams, KStorage } from "kafka-streams";

import kafkaconf from "./kafkaconf";

const fromTopic = `u8d1w2mr-output`

const kafkaStreams = new KafkaStreams({
  groupId: "consumers",
  workerPerPartition: 1,
	noptions: {
    ...kafkaconf,
    "group.id": "consumers",
    "enable.auto.commit": true,
    "auto.commit.interval.ms": 1000,
  },
  tconf: {
    "auto.offset.reset": "earliest"
  }
});


const stream$ = kafkaStreams.getKStream();

stream$
  .from(fromTopic)
  .forEach(message => {
    console.log(`consumed message [${message.value}] ${message.partition}/${message.offset}`)
  })

stream$.start()