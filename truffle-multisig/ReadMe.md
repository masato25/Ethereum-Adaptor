#Truffle Multisig

## install tools
```
npm install -g yarn
yarn
npm install -g ganache-cli
```
## start private test-net
```
#terminal 1
ganache-cli
```

## deploy smart contract
```
#terminal 2
truffle compile
truffle migrate --network development
```
example result:
```
Compiling ./contracts/Migrations.sol...
Compiling ./contracts/MultiSigWallet.sol...
Compiling ./contracts/MultiSigWalletWithDailyLimit.sol...
Writing artifacts to ./build/contracts

Using network 'development'.

Running migration: 1_initial_migration.js
  Replacing Migrations...
  ... 0xd67ccca5ac1f843a51b2206dc7dab755aeb134834de02a44604b6ab3f21ba9fb
  Migrations: 0x8f0483125fcb9aaaefa9209d8e9d7b9c8b9fb90f
Saving successful migration to network...
  ... 0x2e369ab2d57c20d6f0be342da05a0e340a8e85de0aef12b3199e44de9005d26c
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Replacing MultiSigWallet...
  ... 0x8318763b20abf15ed9661aa0328252e6b591136b6fdb0cd62ff772fdd55bdd29
  MultiSigWallet: 0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4
Saving successful migration to network...
  ... 0xf222e7a6a6255bd91b1dd223d30f4d2c18056ceb7b496cc47db3a6da4bbb7417

```
* smart contract address: 0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4

## start dapp web
```
npm run dev

=> open browser http://localhost:3000
```
