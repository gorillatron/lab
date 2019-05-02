// Require the IOTA libraries
const Iota = require('@iota/core')
const Converter = require('@iota/converter')

// Create a new instance of the IOTA object
// Use the `provider` field to specify which IRI node to connect to
const iota = Iota.composeAPI({
  provider: 'https://nodes.devnet.iota.org:443'
})

// Call the `getNodeInfo()` method for information about the IRI node
// iota.getNodeInfo()
//   .then(info => console.log(JSON.stringify(info, null, 1)))
//   .catch(err => {
//       // Catch any errors
//       console.log(err)
//   });

const address = 'AELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDD'
const seed = 'IUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX'

const message = Converter.asciiToTrytes('Hello World!')

const transfers = [
  {
      value: 0,
      address: address,
      message: message
  }
];

iota.prepareTransfers(seed, transfers)
  .then(trytes => {
      return iota.sendTrytes(trytes, 3, 9)
  })
  .then(bundle => {
    console.log(`Published transaction with tail hash: ${bundle[0].hash}`)
    console.log(`Bundle: ${JSON.stringify(bundle, null, 1)}`)
  })
  .catch(err => {
    console.log(err)
  })