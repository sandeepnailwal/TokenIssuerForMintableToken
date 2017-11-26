var express = require('express');
var router = express.Router();
var ethereum_address = require('ethereum-address');

var  {feedReferral,getBlockNumber, getBalance,ethContributedBy,totalEthContributed1,totalTokensSold,unlockDefaultAccount,referrerRewards,getBlock} =  require("../integrations/ethereum");

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

router.get('/:userAddress/isValid', async function(req, res, next) {

    console.log("Inside /isValid");
    let userAddress = req.params.userAddress;

    let isValid,isValidChecksum;
    if (ethereum_address.isAddress(userAddress)) {
      console.log('Valid ethereum address.');
      isValid=true;
    }
    else {
      console.log('Invalid Ethereum address.');
      isValid=false;
    }
    if (ethereum_address.isChecksumAddress(userAddress)) {
      console.log('Valid checksum for ethereum address.');
      isValidChecksum=true;
    }
    else {
      console.log('Invalid checksum for Ethereum address.');
      isValidChecksum=false;
    }

    res.send({isValid:isValid,isValidChecksum:isValidChecksum});

});


router.get('/:userAddress/ethContributedBy', async function(req, res, next) {

    console.log("Inside /balance");
    let userAddress = req.params.userAddress;

    let ethContribution;
    try {
        ethContribution = await ethContributedBy(userAddress);
    } catch(err){
        console.log(err);
        res.send({error: err })
    }
    res.send({ethContribution:ethContribution})
});

router.get('/:userAddress/referrerRewards', async function(req, res, next) {

    console.log("Inside /balance");
    let userAddress = req.params.userAddress;

    let totalReward;
    try {
        totalReward = await referrerRewards(userAddress);
    } catch(err){
        console.log(err);
        res.send({error: err })
    }
    res.send({referrerRewards:totalReward})
});

router.get('/:userTransactionHash/numConfirmations', async function(req, res, next) {

    console.log("Inside /numConfirmations");
    let userTransactionHash = req.params.userTransactionHash;

    let requiredBlock;
    let currentBlockNumber;

    try {
        currentBlockNumber = await getBlockNumber();
        console.log(currentBlockNumber);
    } catch(err){
        console.log(err);
        res.send({error: err })
    }

    try {
        requiredBlock = await getBlock(userTransactionHash);
        console.log(requiredBlock);;
    } catch(err){
        console.log(err);
        res.send({error: err })
    }
    res.send({numOfConfirmations:requiredBlock.number - currentBlockNumber})
});



router.get('/totalEthContributed', async function(req, res, next) {

    console.log("Inside /balance");
    let userAddress = req.params.userAddress;

    let totalEthraised;
    try {
        totalEthraised = await totalEthContributed1();
    } catch(err){
        console.log(err);
        res.send({error: err })
    }
    res.send({totalEthraised:totalEthraised})
});



router.get('/totalTokensSold', async function(req, res, next) {

    console.log("Inside /balance");
    let userAddress = req.params.userAddress;

    let totalSold;
    try {
        totalSold = await totalTokensSold();
    } catch(err){
        console.log(err);
        res.send({error: err })
    }
    res.send({totalTokensSold:totalSold})
});


router.post('/feedReferral', async function(req, res, next) {

    let referee = req.body.referee;
    let referrer = req.body.referrer;

    //console.log(req);
    let status,unlockStatus;
    try {
        unlockStatus = await unlockDefaultAccount();
        status = await feedReferral(referrer,referee);
        res.send({status : status,unlockStatus:unlockStatus});
    } catch(err){
        console.log(err);
        res.send({error: err});
    }
});

module.exports = router;
