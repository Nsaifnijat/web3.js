require('dotenv').config()

//Importing tx for creating some transactions
//var Tx = require('ethereumjs-tx')
const Tx = require('ethereumjs-tx').Transaction

const Web3 = require('web3')

//create connection rinkeby testnet, again using infura
const web3 = new Web3('wss://rinkeby.infura.io/ws/v3/84d7c1c8a6e0437b9a8182b181ed026c')

const account1 = '0x801b1C3a478533F053D23277d342a413882da482'

const account2 = '0xB10F036C43aBBF6b7e6bB41770A7b8Ab9DB0c081'

//FOR signing thre transaction we need to convert privatekeys to binary using buffer of nodejs
const PRIVATE_KEY1 = Buffer.from(process.env.PRIVATE_KEY1,'hex')
const PRIVATE_KEY2 = Buffer.from(process.env.PRIVATE_KEY2,'hex')

web3.eth.getBalance(account1,(err,bal) => {
    console.log('account 1 balance', web3.utils.fromWei(bal,'ether'))

})

web3.eth.getBalance(account2,(err,bal) => {
    console.log('account 2 balance', web3.utils.fromWei(bal,'ether'))

})

//now we do the following

//get nonce of my account
web3.eth.getTransactionCount(account1, (err, txCount) => {
    //build the transaction
    const txObject = {
    //all the following values has to be in hexadecimal
    'nonce': web3.utils.toHex(txCount) , //number of transactions in this account,
    'to': account2,
    'value': web3.utils.toHex(web3.utils.toWei('1','ether')), //value has to be in wei
    'gasLimit': web3.utils.toHex(21000), //gas limit is safegaurd which limits if a bad thing happen it does not spend more than this
    'gasPrice': web3.utils.toHex(web3.utils.toWei('10','gwei'))

}
    console.log(txObject)
    //Sign the transaction
    const tx = new Tx(txObject, {chain:'rinkeby'})
    tx.sign(PRIVATE_KEY1)
    
    //serialize or convert to hex string to pass to our raw transaction
    const serializeTransaction = tx.serialize()
    const raw = '0x' +serializeTransaction.toString('hex')
    
    //Broadcast the transaction
    
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash)
        console.log('error:', err)
    
    })


})



























