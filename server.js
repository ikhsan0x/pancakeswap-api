const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cache = require('memory-cache');

const HTTP_PORT = 3000;
const app = express();
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.set('Cache-Control', 'public, max-age=3600');
    next();
});

const cacheMiddleware = (duration) => {
    return (req, res, next) => {
        const key = '__express__' + req.originalUrl || req.url;
        const cachedBody = cache.get(key);
        if (cachedBody) {
            res.send(cachedBody);
            return;
        } else {
            res.sendResponse = res.send;
            res.send = (body) => {
                cache.put(key, body, duration * 1000);
                res.sendResponse(body);
            };
            next();
        }
    };
};

async function fetchPriceUSD(apikey, tokenAddress) {
    const GraphqlUrl = `https://open-platform.nodereal.io/${apikey}/pancakeswap-free/graphql`;
    const query = `
    {
      tokenDayDatas(
        first: 1,
        orderBy: date,
        orderDirection: desc,
        where: {
          token: "${tokenAddress}"
        }
      ) {
	  id
	  date
	  dailyVolumeToken
	  dailyVolumeBNB
	  dailyVolumeUSD
	  dailyTxns
	  totalLiquidityToken
	  totalLiquidityBNB
	  totalLiquidityUSD
      priceUSD
      }
    }
  `;
    try {
        const response = await axios.post(GraphqlUrl, {
            query
        });
        return response.data.data.tokenDayDatas[0];
    } catch (error) {
        return error;
    }
}

app.get("/token-price", cacheMiddleware(60), async (req, res) => {
    try {
        let token = req.query.token;
        let apikey = req.query.apikey;
        let getData = await fetchPriceUSD(apikey, token);
        res.json(getData);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.post("/token-price", cacheMiddleware(60), async (req, res) => {
    try {
        let token = req.body.token;
        let apikey = req.body.apikey;
        let getData = await fetchPriceUSD(apikey, token);
        res.json(getData);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.get("/", (req, res, next) => {
    res.json({
        "status": "API is running"
    })
});

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});
