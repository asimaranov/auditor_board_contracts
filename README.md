# Auditor board contracts for Stronghold DAO

This project implements 
- Auditor contacts store and allows auditors of `Stronghold DAO` to add their social networks like twitter, telegram to the auditor board
- Faucet with initial eth for DAO auditors 

Try running some of the following tasks:

```shell
npx hardhat test
npx hardhat run scripts/deployContactsStore.ts --network polygon
npx hardhat run scripts/deployFaucet.ts --network polygon
npx hardhat verify 0x5F8B592bb1C66ce2cF740A90147ce27667162F50 --network polygon
```

### Deployments:
Contacts store:
- Polygon mainnet: `0x87817f710699Be76a5Fd8385f456ACb32445e6d4`

Faucet store:
- Polygon mainnet: `0x4935EE4a4F443CA2f8DF58FB16D2E437b2503F24`