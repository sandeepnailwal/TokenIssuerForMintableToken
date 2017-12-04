var litecoin = require('node-litecoin');
var bitcoin = require('bitcoind-rpc');
var Web3 = require('web3');

function prepareClient() {

    if (typeof web3 !== 'undefined') {
      console.log("Web3 Already available");
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      console.log("Web3 being set");
      web3 = new Web3(new Web3.providers.HttpProvider("http://62.210.12.120:8545"));
    }

    return web3;
}

function prepareContract (client){

    var contractAddress = "0x9975bb71AafdEDc8aCe89a2ff7c411A062760a7b";
    //0xD907d158aDd61921730B8680C1bE52A8442116B3   0x4f065ED5ED710323C32217CaDfBD4b33758e7926  0xe28e351044571f0e39f08819605d5f01139bc84924f38640aae84c3138b3650c
    console.log(contractAddress);
    var contractAbi =  [{"constant":false,"inputs":[],"name":"toggleSaleStatus","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[],"name":"runAllocations","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[],"name":"killContract","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"_newPerc","type":"uint8"}],"name":"changeReferralPerc","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"getTotalTokensSoldTillNow","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"_newPhase","type":"uint8"}],"name":"changeCurrentICOPhase","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"_phaseName","type":"string"},{"name":"_tokensStaged","type":"uint256"},{"name":"_rate","type":"uint256"},{"name":"_deadline","type":"uint256"}],"name":"addICOPhase","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"currentReferralDiscountPercentage","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"_rate","type":"uint256"}],"name":"changeRate","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"totalEthRewards","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"currentICOPhase","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"referrals","outputs":[{"name":"referrer","type":"address"},{"name":"referrerPerc","type":"uint8"},{"name":"refereePerc","type":"uint8"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[],"name":"onOff","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"tokenStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"_tokens","type":"uint256"}],"name":"destroyUnsoldTokens","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getEthContributedBy","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[],"name":"createTokens","outputs":[],"payable":true,"type":"function","stateMutability":"payable"},{"constant":false,"inputs":[{"name":"_newPerc","type":"uint8"}],"name":"changeRefereePerc","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"currentReferralRewardPercentage","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"totalEthRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"","type":"uint8"}],"name":"icoPhases","outputs":[{"name":"phaseName","type":"string"},{"name":"tokensStaged","type":"uint256"},{"name":"tokensAllocated","type":"uint256"},{"name":"RATE","type":"uint256"},{"name":"saleOn","type":"bool"},{"name":"deadline","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"totalTokensSoldTillNow","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ethContributedBy","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"getTotalEthRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"_newSupply","type":"uint256"}],"name":"newICORound","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"_referrer","type":"address"},{"name":"_referree","type":"address"}],"name":"createReferral","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"inputs":[],"payable":false,"type":"constructor","stateMutability":"nonpayable"},{"payable":true,"type":"fallback","stateMutability":"payable"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
    return new client.eth.Contract(contractAbi,contractAddress);

}

let unlockDefaultAccount = () => {

    let client = prepareClient();
    console.log("Inside Unlock Account Integration");
    return new Promise(function(resolve,reject){
        console.log(client.eth.accounts[0]);
        client.eth.personal.unlockAccount("0x2b2afd354927d6b98db4b720a25aa1c2646304ac","Scope@Weaver",function(err,result){
            if(err) {
                console.log("Error in unlocking " + err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


let getBlockNumber = () =>  {

    let client = prepareClient();

    return new Promise(function(resolve,reject)
    {
        client.eth.getBlockNumber(function (err,result) {

            if (err) {
                console.log("Error : " + err);
                reject(err);
            }else {
                resolve(result);
            }
        });
    })

}

let getBalance = (address) =>  {

    let client = prepareClient();
    let contract = prepareContract(client);

    return new Promise(function(resolve,reject)
    {
        contract.methods.balances(address).call(function (err,result) {

            if (err) {
                console.log("Error : " + err);
                reject(err);
            }else {
                resolve(result);
            }
        });
    })

}

let getTransaction = (tHash) =>  {

    let client = prepareClient();
    console.log("Inside Ethereum getTransaction with txHash " + tHash);
    return new Promise(function(resolve,reject)
    {
        client.eth.getTransaction(tHash,function (err,result) {
            if (err) {
                console.log("Error : " + err);
                reject(err);
            }else {
                resolve(result);
            }
        });
    })

}


let ethContributedBy = (address) =>  {

    let client = prepareClient();
    let contract = prepareContract(client);

    return new Promise(function(resolve,reject)
    {
        contract.methods.ethContributedBy(address).call(function (err,result) {

            if (err) {
                console.log("Error : " + err);
                reject(err);
            }else {
                resolve(result);
            }
        });
    })

}

let referrerRewards = (address) =>  {

    let client = prepareClient();
    let contract = prepareContract(client);

    return new Promise(function(resolve,reject)
    {
        contract.methods.totalEthRewards(address).call(function (err,result) {

            if (err) {
                console.log("Error : " + err);
                reject(err);
            }else {
                resolve(result);
            }
        });
    })

}


let totalEthContributed1 = () =>  {

    let client = prepareClient();
    let contract = prepareContract(client);
    console.log("Inside Total Eth contributed")
    return new Promise(function(resolve,reject)
    {
        contract.methods.getTotalEthRaised().call(function (err,result) {

            if (err) {
                console.log("Error : " + err);
                reject(err);
            }else {
                resolve(result);
            }
        });
    })

}

let totalTokensSold = () =>  {

    let client = prepareClient();
    let contract = prepareContract(client);

    return new Promise(function(resolve,reject)
    {
        contract.methods.totalTokensSoldTillNow().call(function (err,result) {

            if (err) {
                console.log("Error : " + err);
                reject(err);
            }else {
                resolve(result);
            }
        });
    })

}


let feedReferral = (referrer, referee) =>  {

    let client = prepareClient();

    let contract = prepareContract(client);

    console.log("Inside FeedReferral");
    //console.log(contract);
    //console.log("Transferring amount : " + amount + " from account : " + fromAccount +" to account : " + toAccount);

    return new Promise(function(resolve,reject)
    {
        //web3.personal.unlockAccount(web3.eth.acccounts[0],"Scope@Weaver");
        contract.methods.createReferral(referrer,referee).send({from:"0x2b2afd354927d6b98db4b720a25aa1c2646304ac"},function (err,result) {

            if (err) {
                console.log("Error : " + err);
                reject(err);
            }else {
                resolve(result);
            }
        });
    })

}



module.exports = {getTransaction,referrerRewards,getBlockNumber,feedReferral,unlockDefaultAccount,getBalance,ethContributedBy,totalEthContributed1,totalTokensSold};
