var express = require('express');
var router = express.Router();
var  {feedReferral,getBlockNumber, getBalance,ethContributedBy,totalEthContributed,totalTokensSold} =  require("../integrations/ethereum");

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

    let ethContribution;
    try {
        ethContribution = await ethContributedBy(userAddress);
    } catch(err){
        console.log(err);
        res.send({error: err })
    }
    res.send({ethContribution:ethContribution})
});

router.get('/totalEthContributed', async function(req, res, next) {

    console.log("Inside /balance");
    let userAddress = req.params.userAddress;

    let totalEthraised;
    try {
        totalEthraised = await totalEthContributed();
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

module.exports = router;
