//truffle is written in nodejs
//install truffle --> npm install -g truffle
//version --> truffle version
//set up a truffle project. --> create a folder and inside that folder do --> truffle init
//truffle folders
//1- contracts: you put your sol contracts here
//2- migrations: how to deploy smart contract to the blockchain
//3- test: files for testing
//4- truffle-config.js: configure truffle like which network to use, which sol version to use etc


//once we created our sol contract in the contracts folder, we can go to the truffle-config.js to put its compiler version in the
//compile section of the truffle-config and then go the command line and run --> truffle compile

//once you compile your project in order to find the bugs you need to test it before deployment.
//for testing go to test folder and write your test file in nodejs or in solidity.


//so once you have created your test file in the test folder, then go to the cmd and run --> truffle test

//now if your tests pass, you can deploy your contract to the local blockchain or real blockchain.
//truffle uses ganache as the local blockchain

//for deploying: go to migrations folder and create a file to deploy your smart contract.

//once your migration file is ready go and deploy using this command to the local blockchain --> truffle develop
//when you run the above command, you get into your local blockchain and then to deploy run--> migrate --reset

//now to deploy to public testnet.
//for this try to put some faucet in an account first. here we wanna deploy to binance smart chain testnet. so we go to binance faucet
//account: 0x2e45efbfb45e836ad4a1ad64d5d83ec1098abb54
//private key:ffc679798bb0ad0d8fd316c61c6edb1611168064242fddd47cdc0c1506322b01
//now that account is ready go to truffle-config and uncomment -- const HDWalletProvider
//add your private key constant, e.g. const privatekey = ['0x+privatekey']
//then go to networks and define your networks as defined in there

//you need to install truffle HDWalletProvider: using these commands
//-->npm install @truffle/hdwallet-provider   |if that does not work do this |    npm i @truffle/hdwallet-provider@next       

//after adding your networks you deploy to any of those networks using this command
//--> truffle migrate --reset --network bscTestnet     
//as you can see we deploy to bscTestnet you can put any name instead of bscTestnet

//now we can interact with our contract, so for this we need to first connect to a testnet or mainnet like this
//--> truffle console --network bscTestnet
//now create a pointer or object to our deployed contract

// storage = await SimpleStorage.deployed()  
//to see address of our contract do the following
//--> storage.address
//to update data of our contract 
//-->  await storage.updateData(10)
//to read 
//--> data = await storage.readData()
//--> data.toString()

//there is a special way to deploy contracts in the local blockchain,
//the following command runs the local blockchain and attach to it the truffle console
//--> truffle develop

//now to migrate or deploy the contract
//--> migrate --reset

//now you can interact with the contract
//now create a pointer or object to our deployed contract

// storage = await SimpleStorage.deployed()  
//to see address of our contract do the following
//--> storage.address
//to update data of our contract 
//-->  await storage.updateData(10)
//to read 
//--> data = await storage.readData()
//--> data.toString()
