import { CommonKafkaOptions } from "kafka-streams";

export default {
	"group.id": "piing",
	"metadata.broker.list": "ark-01.srvs.cloudkafka.com:9094,ark-02.srvs.cloudkafka.com:9094,ark-03.srvs.cloudkafka.com:9094",
	"socket.keepalive.enable": true,
	"security.protocol": "sasl_ssl",
	"sasl.mechanisms": "SCRAM-SHA-256",
	"sasl.username": "u8d1w2mr",
	"sasl.password": "znSdwcXVqgu1oYN2-Cc5z1Z8y5PFZDrt",
	"debug": "generic,broker,security",
} as CommonKafkaOptions;