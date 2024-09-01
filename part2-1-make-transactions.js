//npm install ethereumjs-tx

//connecting to ganache

const Web3 = require('web3');

//create connection
const web3 = new Web3('HTTP://127.0.0.1:7545');

const account1 = '0xE602D584DF01ff232e9940C5F1480Cb2783E5f37';

const account2 = '0xc8BCca34DF90F8B165267C532e49efB4A3db9292';

//getting the balance of the  account1
//const balance = web3.eth.getBalance(account1, (err,result) => { console.log(result)});
//or write like this
const balance = web3.eth.getBalance(account1, function (err,result) { console.log(result)});

console.log(balance);

//lets send some ether to another account

web3.eth.sendTransaction({from: account1, to: account2, value: web3.utils.toWei('1','ether')})

//now the balance has gone down
const balance2 = web3.eth.getBalance(account1, function (err,result) { console.log(result)});

console.log(balance2);
//account2 balance should be up
const balance3 = web3.eth.getBalance(account2, function (err,result) { console.log(result)});

console.log(balance3);

//if you trust the node, or your connection, you can unlock your account and make transactions without
//having to sign them but if you dont you need to alwasy sign a transaction using web3 in order to execute it.
//here we use the infura node which we dont want to have access to our private keys
web3.eth.personal.unlockAccount


//this command can create an account using web3
console.log(web3.eth.accounts.create())












