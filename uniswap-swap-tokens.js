/*
uniswap has three different smart contracts:
1-Factory: acts as a registry of different markets or pairs.
2-Pair: it is the different crypto pairs bundled together.
3-Router: it makes the communication to the uniswap easier.

also there is different ERC20 tokens smart contracts. */

const {ChainId, Fetcher,WETH,Route, Trade, TokenAmount, TradeType, Percent} = require('@uniswap/sdk');
const ethers = require('ethers');

const chainId = ChainId.MAINNET;
const tokenAddress = '0x6b175474e89094c44da98b954eedeac495271d0f'; //address of dai

const init = async () => {
    //we fetch token data
    const dai = await Fetcher.fetchTokenData(chainId, tokenAddress);
    //we specify the weth of mainnet by passing its chainId
    const weth = WETH[chainId];
    //define our pair object to extract data about the pair. the order of pairs is not important
    const pair = await Fetcher.fetchPairData(dai,weth);
    //here we use an already existing market so we pass only pair and input token is WETH, otherwise you pass list of tokens
    const route = new Route([pair],weth);
    console.log(route.midPrice.toSignificant(6));//we get the six digits
    console.log(route.midPrice.invert().toSignificant(6));
    //the medPrice is an estimation price so when you execute a trade, you may get a diffrent price(execution price)
    //in order to get the execution price we import trade, tokenamount and tradetype,amount = 100 ETHER
    const trade = new Trade(route, new TokenAmount(weth,'100000000000000000'),TradeType.EXACT_INPUT );
    console.log(trade.executionPrice.toSignificant(6));
    console.log(trade.nextMidPrice.toSignificant(6));
    //percent is slippage tolerance that we can set, we can also put tolerance in percent Percent('1','100'),its 1 percent
    const slippageTolerance = new Percent('50','10000')//its 50 bips slippage tolerance, 1bip = 0.001 percent, now its 0.050 percent
    //minimum amount as output
    const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
    //path of trade
    const path = [weth.address, dai.address];
    const to = ''; //recepient address
    const deadline = Math.floor(Date.now()/1000)+60*20;
    
    //how much ether we are willing to send
    const value = trade.inputAmount.raw;
    
    //we use ether.js for transaction
    const provider = ethers.getDefaultProvider('mainnet', {
    infura: 'wss://mainnet.infura.io/ws/v3/0cac596cb21c464b8e64df016dd2f355'
    
    });
    
    //create a signer object, PASS your wallet PRIVATE_KEY
    const signer = new ethers.Wallet(PRIVATE_KEY);
    //connect the provider to the signer
    const account = signer.connect(provider);
    //make object of uniswap, address, function which generates the ABI
    const uniswap = new ethers.Contract('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    ['function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)'],
    account);
    
    //send transaction
    const tx = await uniswap.sendExactETHForTokens(
    amountOutMin,
    path,
    to,
    deadline,
    {value,gasPrice:20e9});
    
    console.log(`Transaction Hash: &{tx.hash}`);
    //in order to wait for transaction to be minded, you can wait until its is being mined
    const receipt = await tx.wait();
    console.log(`Transaction was mined in block &{receipt.blockNumber}`);
    
    
    
}

init();