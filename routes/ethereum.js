var express = require('express');
//var Web3 = require('web3');
//var bitcoin = require('bitcoinjs-lib');
//var bitcore = require('bitcore');
//var RpcClient = require('bitcoind-rpc');
var router = express.Router();
var  {feedReferral,getBlockNumber, getBalance,ethContributedBy,totalEthContributed,totalTokensSold} =  require("../integrations/ethereum");

router.post('/accounts/:userId/transfer', async (req, res, next) => {

    console.log("Request Body : " + req.body);

    let userId = req.params.userId;
    let toAddress = req.body.toAddress;
    let amount = req.body.amount;

    let transactionId;
    let transferErr;

    try {
        transactionId = await transferFrom(userId, toAddress, amount);
    } catch(err) {
        transferErr = err;
        console.log(err);
        res.send({transactionId: transferErr.message})
    }

    console.log("Transaction Id : " + transactionId);

    res.send({transactionId: transactionId});
});



router.get('/blocknumber', async function(req, res, next) {
    console.log("Inside /blockNumber");
    let blockNumber;
    try {
        blockNumber = await getBlockNumber();
    } catch(err){
        console.log(err);
        res.send({error: err })
    }
    res.send({blockNumber:blockNumber})
});

router.get('/:userAddress/balance', async function(req, res, next) {

    console.log("Inside /balance");
    let userAddress = req.params.userAddress;

    let balance;
    try {
        balance = await getBalance(userAddress);
    } catch(err){
        console.log(err);
        res.send({error: err })
    }
    res.send({balance:balance})
});

router.get('/:userAddress/ethContributedBy', async function(req, res, next) {

    console.log("Inside /balance");
    let userAddress = req.params.userAddress;

    let totalContributedBy;
    try {
        totalContributedBy = await ethContributedBy(userAddress);
    } catch(err){
        console.log(err);
        res.send({error: err })
    }
    res.send({totalContributedBy:totalContributedBy})
});

router.get('/totalEthContributed', async function(req, res, next) {

    console.log("Inside /balance");
    let userAddress = req.params.userAddress;

    let totalEthContributed;
    try {
        totalEthContributed = await totalEthContributed();
    } catch(err){
        console.log(err);
        res.send({error: err })
    }
    res.send({totalEthContributed:totalEthContributed})
});

router.get('/totalTokensSold', async function(req, res, next) {

    console.log("Inside /balance");
    let userAddress = req.params.userAddress;

    let totalTokensSold;
    try {
        totalTokensSold = await totalTokensSold();
    } catch(err){
        console.log(err);
        res.send({error: err })
    }
    res.send({totalTokensSold:totalTokensSold})
});


router.post('/feedReferral', async function(req, res, next) {

    let referee = req.body.referee;
    let referrer = req.body.referrer;

    console.log(req);
    let status;
    try {
        status =await feedReferral(referrer,referee);
        res.send({status : status});
    } catch(err){
        console.log(err);
        res.send({error: err});
    }
});


router.get('/', function(req, res, next) {

if (typeof web3 !== 'undefined') {
  console.log("Web3 Already available");
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  console.log("Web3 being set");
  web3 = new Web3(new Web3.providers.HttpProvider("http://138.197.159.63:8545"));
}});


var contractAddress = "0x7e23c344bF3498186D9f2C9a4C345AFc49fcF3cF";
//0xD907d158aDd61921730B8680C1bE52A8442116B3   0x4f065ED5ED710323C32217CaDfBD4b33758e7926  0xe28e351044571f0e39f08819605d5f01139bc84924f38640aae84c3138b3650c
console.log(contractAddress);
var contractAbi = [{"constant":false,"inputs":[],"name":"toggleSaleStatus","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[],"name":"runAllocations","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[],"name":"killContract","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"_newPerc","type":"uint8"}],"name":"changeReferralPerc","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"_newPhase","type":"uint8"}],"name":"changeCurrentICOPhase","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"currentReferralDiscountPercentage","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"_referree","type":"address"}],"name":"createReferral","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"_rate","type":"uint256"}],"name":"changeRate","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"currentICOPhase","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"referrals","outputs":[{"name":"referrer","type":"address"},{"name":"referrerPerc","type":"uint8"},{"name":"refereePerc","type":"uint8"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[],"name":"onOff","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"tokenStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"_tokens","type":"uint256"}],"name":"destroyUnsoldTokens","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[],"name":"createTokens","outputs":[],"payable":true,"type":"function","stateMutability":"payable"},{"constant":false,"inputs":[{"name":"_newPerc","type":"uint8"}],"name":"changeRefereePerc","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"_phaseName","type":"string"},{"name":"_tokensStaged","type":"uint256"},{"name":"_rate","type":"uint256"}],"name":"addICOPhase","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"currentReferralRewardPercentage","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"","type":"uint8"}],"name":"icoPhases","outputs":[{"name":"phaseName","type":"string"},{"name":"tokensStaged","type":"uint256"},{"name":"tokensAllocated","type":"uint256"},{"name":"RATE","type":"uint256"},{"name":"saleOn","type":"bool"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"_newSupply","type":"uint256"}],"name":"newICORound","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"inputs":[],"payable":false,"type":"constructor","stateMutability":"nonpayable"},{"payable":true,"type":"fallback","stateMutability":"payable"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];

// var myContract = new web3.eth.Contract(contractAbi,contractAddress);
// console.log(myContract);
// myContract.methods.createReferral("0x4f065ED5ED710323C32217CaDfBD4b33758e7926").call(
//     {
//         from : '0x3968d85bb7bd23b57a2395d08ccb8514523aa9f3'
//     },function(error, result){
//     if(!error){
//         console.log(result);
//         res.send({'test' : result});
//     } else {
//         console.error(error);
//         res.send({'error' : error });
//     }
// });

module.exports = router;
