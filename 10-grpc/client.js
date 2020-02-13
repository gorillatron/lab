
var path = require("path")
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');

var PROTO_PATH = path.join(__dirname, '/service.proto');

var packageDefinition = protoLoader.loadSync(PROTO_PATH,{
  keepCase: true,
   longs: String,
   enums: String,
   defaults: true,
   oneofs: true
});

var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function main() {
  var client = new hello_proto.Greeter('localhost:50051',
                                       grpc.credentials.createInsecure());
  var user;
  if (process.argv.length >= 3) {
    user = process.argv[2];
  } else {
    user = 'world';
  }
  client.sayHello({name: user}, function(err, response) {
    console.log('Greeting:', response.message);
  });
}

main();