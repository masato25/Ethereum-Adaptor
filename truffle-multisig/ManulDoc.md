```
MultiSigWallet.deployed().then(function(inst){ return inst.submitTransaction("0x0F4F2Ac550A1b4e2280d04c21cEa7EBD822934b5",2000000000000000000,"s2")})
MultiSigWallet.deployed().then(function(inst){ return inst.getTransactionCount.call(true,false)})
MultiSigWallet.deployed().then(function(inst){ return inst.getTransactionById.call(1)})
```
