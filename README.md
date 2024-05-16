# pancakeswap-api
PancakeSwap GraphQL token data price API on BSC

Page source

https://nodereal.io/api-marketplace/pancakeswap-graphql

# USECASE 

### GET Method
```URL
https://pancakeswap-token-api.vercel.app/token-price?token=0xbA2aE424d960c26247Dd6c32edC70B295c744C43&apikey=YOUR_APIKEY
```

### POST Method
```URL
https://pancakeswap-token-api.vercel.app/token-price
```

```JSON
{
    "token": "0xbA2aE424d960c26247Dd6c32edC70B295c744C43", 
    "apikey": "YOUR_APIKEY"
}
```

### Response
```JSON
{
  "id": "0xba2ae424d960c26247dd6c32edc70b295c744c43-19859",
  "date": 1715817600,
  "dailyVolumeToken": "234947.86821497",
  "dailyVolumeBNB": "62.30027505589203895992151332573449",
  "dailyVolumeUSD": "36389.0788977555014831540787666163",
  "dailyTxns": "283",
  "totalLiquidityToken": "5506128.35321168",
  "totalLiquidityBNB": "1461.867620792842557232993158764851",
  "totalLiquidityUSD": "851381.724247936961858068829352331",
  "priceUSD": "0.1546243875247355810244826672969983"
}
```
