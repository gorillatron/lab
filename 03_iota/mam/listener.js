const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')

const mode = 'restricted'
const secretKey = 'VERYSECRETKEY'
const provider = 'https://nodes.devnet.iota.org'

const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&key=${secretKey.padEnd(81, '9')}&root=`

// Initialise MAM State
let mamState = Mam.init(provider)

// Set channel mode
mamState = Mam.changeMode(mamState, mode, secretKey)

// Callback used to pass data out of the fetch
const logData = data => console.log('Fetched and parsed', JSON.parse(trytesToAscii(data)), '\n')

Mam.fetch('PQTSHQSUGESG9BONGQYQWCWFYRIKZAQEPUZBMGCZRQDBKUXFTVEYDMALC9CLQLZITMYGLSUFPVRFPLBDY', mode, secretKey, logData)