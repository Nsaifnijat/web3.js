require('dotenv').config()

//Importing tx for creating some transactions
//var Tx = require('ethereumjs-tx')
const Tx = require('ethereumjs-tx').Transaction

const Web3 = require('web3')

//create connection rinkeby testnet, again using infura
const web3 = new Web3('wss://rinkeby.infura.io/ws/v3/84d7c1c8a6e0437b9a8182b181ed026c')

const account1 = '0x801b1C3a478533F053D23277d342a413882da482'

//FOR signing thre transaction we need to convert privatekeys to binary using buffer of nodejs
const PRIVATE_KEY1 = Buffer.from(process.env.PRIVATE_KEY1,'hex')





//get nonce of my account
web3.eth.getTransactionCount(account1, (err, txCount) => {

    //data is always the compiled code or bytecode which is converted into hexa decimal. 
    //whenever we call a func we need to endcode them into hexa usind  function.encodeABI() methods
    const  data = '0x608060405234801561001057600080fd5b506105aa806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80632e64cec11461005c5780636057361d1461007a5780636f760f41146100a85780638bab8dd51461016d5780639e7a13ad1461023c575b600080fd5b6100646102ea565b6040518082815260200191505060405180910390f35b6100a66004803603602081101561009057600080fd5b81019080803590602001909291905050506102f3565b005b61016b600480360360408110156100be57600080fd5b81019080803590602001906401000000008111156100db57600080fd5b8201836020820111156100ed57600080fd5b8035906020019184600183028401116401000000008311171561010f57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803590602001909291905050506102fd565b005b6102266004803603602081101561018357600080fd5b81019080803590602001906401000000008111156101a057600080fd5b8201836020820111156101b257600080fd5b803590602001918460018302840111640100000000831117156101d457600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103d8565b6040518082815260200191505060405180910390f35b6102686004803603602081101561025257600080fd5b8101908080359060200190929190505050610406565b6040518083815260200180602001828103825283818151815260200191508051906020019080838360005b838110156102ae578082015181840152602081019050610293565b50505050905090810190601f1680156102db5780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b60008054905090565b8060008190555050565b600260405180604001604052808381526020018481525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010190805190602001906103639291906104cf565b505050806003836040518082805190602001908083835b6020831061039d578051825260208201915060208101905060208303925061037a565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020819055505050565b6003818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b6002818154811061041357fe5b9060005260206000209060020201600091509050806000015490806001018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104c55780601f1061049a576101008083540402835291602001916104c5565b820191906000526020600020905b8154815290600101906020018083116104a857829003601f168201915b5050505050905082565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061051057805160ff191683800117855561053e565b8280016001018555821561053e579182015b8281111561053d578251825591602001919060010190610522565b5b50905061054b919061054f565b5090565b61057191905b8082111561056d576000816000905550600101610555565b5090565b9056fea264697066735822122089e7a272bab3eea7b8a432f72d735e7d0ce1df5050e113962f578f9090d1cc0164736f6c63430006020033'; 

    //data to be sent, since we send this data to the whole ethereum network we dont need the( to: account) feature
    const txObject = {
    //all the following values has to be in hexadecimal
    'nonce': web3.utils.toHex(txCount) , //number of transactions in this account,
    'gasLimit': web3.utils.toHex(1000000), //here we raise the limit since this transaction sends some data to the ethereum which spends more gas
    'gasPrice': web3.utils.toHex(web3.utils.toWei('10','gwei')),
    //this is the data that we want to send or deploy (smart contract)
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



//now lets interact with the contract that we just deployed to the ethereum
//now for this purpose we need contract address and contract abi

const contractAddress = '0xAB2F5993655b0F4A5608E4F275EC5e863A978AEE';

const contractABI = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256","name":"_favoriteNumber","type":"uint256"}],"name":"addPerson","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"nameToFavoriteNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"people","outputs":[{"internalType":"uint256","name":"favoriteNumber","type":"uint256"},{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_favoriteNumber","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}];

//connecting to the contract

const getmyContract =new web3.eth.Contract(contractABI, contractAddress)

//lets get the methods that our contract has
console.log(getmyContract.methods)

//if we call a func of our contract we need to pass its necessary parameters too.
getmyContract.methods.addPerson(11,999).call((err, result) => {

    console.log('error:', err)
    console.log('result:', result)
})

//retrieve takes the index of our added people as parameter
getmyContract.methods.retrieve().call((err, result) => {

    console.log('error:', err)
    console.log('result:', result)
})









