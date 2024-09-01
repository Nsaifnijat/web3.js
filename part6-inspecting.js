

const Web3 = require('web3')

//create connection rapsten testnet, again using infura
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/0cac596cb21c464b8e64df016dd2f355'))

//getting latest blockNumber
web3.eth.getBlockNumber().then(console.log)

//latest block 
//web3.eth.getBlock('latest').then(console.log)

//instead of latest you can also put blockNumber or blockHash
web3.eth.getBlock('latest').then((block) => {

    console.log({
    'blockHash': block.hash,
    'blockNumber': block.number,
    })


})

//get the latest ten blocks

web3.eth.getBlockNumber().then((latest) => {
    for (let i=0;i<10;i++) {
    web3.eth.getBlock(latest-i).then(console.log)
    }

})

//get the latest ten blocks

web3.eth.getBlockNumber().then((latest) => {
    for (let i=0;i<10;i++) {
    web3.eth.getBlock(latest-i).then((block) => {
    console.log(block.hash)
    
    })
    }

})

//getting number of transactions in a block

web3.eth.getBlockTransactionCount('latest').then(console.log)






