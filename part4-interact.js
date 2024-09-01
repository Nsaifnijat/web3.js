require('dotenv').config()

//Importing tx for creating some transactions
const Tx = require('ethereumjs-tx').Transaction

const Web3 = require('web3')

//create connection rapsten testnet, again using infura
const web3 = new Web3('wss://rinkeby.infura.io/ws/v3/84d7c1c8a6e0437b9a8182b181ed026c')



//FOR signing thre transaction we need to convert privatekeys to binary using buffer of nodejs
const PRIVATE_KEY1 = Buffer.from(process.env.PRIVATE_KEY1,'hex')


//few steps for transaction. for deploying also you do the same
//1-create transaction object
//2- sign the transaction
//3- send the transaction

const contractAddress = '0xAB2F5993655b0F4A5608E4F275EC5e863A978AEE';
const contractABI = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256","name":"_favoriteNumber","type":"uint256"}],"name":"addPerson","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"nameToFavoriteNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"people","outputs":[{"internalType":"uint256","name":"favoriteNumber","type":"uint256"},{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_favoriteNumber","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const getmyContract =new web3.eth.Contract(contractABI, contractAddress)
//we need to convert this function call to hexa decimal value and pass it to our data param which will interact with the contract
//whenever we call a func we need to endcode them into hexa usind  function.encodeABI() methods
const data = getmyContract.methods.addPerson('ali',777).encodeABI()

console.log(data)
web3.eth.getTransactionCount(account1, (err, txCount) => {


    //data to be sent, since we send this data to the whole ethereum network we dont need the( to: account) feature
    const txObject = {
    //all the following values has to be in hexadecimal
    'nonce': web3.utils.toHex(txCount) , //number of transactions in this account,
    'gasLimit': web3.utils.toHex(1000000), //here we raise the limit since this transaction sends some data to the ethereum which spends more gas
    'gasPrice': web3.utils.toHex(web3.utils.toWei('10','gwei')),
    'to': contractAddress, //this clears that where are we sending this data, which contract do we want to interact with(address)
    //what is the data that we send 
    'data': data

}
    //console.log(txObject)
    //the account who sends the data
    const tx = new Tx(txObject, {chain:'rinkeby'})
    tx.sign(PRIVATE_KEY1)
    
    //serialize or convert to hex string to pass to our raw transaction
    const serializeTransaction = tx.serialize()
    const raw = '0x' +serializeTransaction.toString('hex')
    
    //sending the data
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash)
        console.log('error:', err)
    
    })
    
})













