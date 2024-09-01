const Web3 = require('web3')

//create connection rapsten testnet, again using infura
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/0cac596cb21c464b8e64df016dd2f355'))

//gas price in wei
web3.eth.getGasPrice().then(console.log)

//gas price in ether
web3.eth.getGasPrice().then((result) => {
    console.log(web3.utils.fromWei(result, 'ether'))

})

// hashing number or string using web3 hashing
console.log(web3.utils.sha3('NAZAR'))

//hashing number and hex
console.log(web3.utils.sha3('2333'))
console.log(web3.utils.sha3('0xdfdfs'))

//an alaise of sha3 is the following which does the same thing
console.log(web3.utils.keccak256('2333'))

//soliditysha3 also can be accessed
console.log(web3.utils.soliditySha3('2333'))

//getting random hex
console.log(web3.utils.randomHex(3))


//underscore js is a library which has a lot of funcs
//in web3 you can also use it, here we print its funcs
console.log(web3.utils._)

//to use a feature

const _ = web3.utils._
_.each({key1: 'value1', key2 : 'value2'}, (value, key) => {

    console.log(key)

})










