/* in order for us to interact with a smart contract we need to know, its interace, its functions that 
we can call and moree..
ABI : ABI is a json file which has everything about a smart contract, it shows what functions it has and all
the info about a contract is included in the abi.
two things is important:
we need to know its ABI and we need to know where it is located (address)
so the interface or ABI shows us how the smart contract works and the address shows us where it is located.
*/

//connecting to ethereum network using infura server api

SHIBA_ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"name","type":"string"},{"name":"symbol","type":"string"},{"name":"decimals","type":"uint8"},{"name":"totalSupply","type":"uint256"},{"name":"feeReceiver","type":"address"},{"name":"tokenOwnerAddress","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]
SHIBA_ADDRESS = '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE'


const Web3 = require('web3');

//creating object of web3 in order to use its funcs
const web3 = new Web3('wss://mainnet.infura.io/ws/v3/0cac596cb21c464b8e64df016dd2f355');

//create a connection to the contract and read its details using its abi or interface funcs
const contract = new web3.eth.Contract(SHIBA_ABI,SHIBA_ADDRESS);

//all details of contract
//console.log(contract);
// showing methods of the contract

//console.log(contract.methods)

//get the name function
//console.log(contract.methods.name())

//now we want to call the name function and get the returned value


//contract.methods.name().call((err,result) => { console.log(result)} )

//getting the symbol
contract.methods.symbol().call((err,result) => { console.log(result)} )

//how many shibas exist or total supply

contract.methods.totalSupply().call((err,result) => { console.log(result)} )

//to see if minting is finished or all tokens are being minted but shiba does not have this func
//contract.methods.mintingFinished().call((err,result) => { console.log(result)} )

contract.methods.decimals().call((err,result) => { console.log(result)} )


//to check how many tokens a specific account or contract holds, we do as follow
contract.methods.balanceOf('0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE').call((err,result) => { console.log(result)} )






































