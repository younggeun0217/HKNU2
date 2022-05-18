var express = require('express');
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get('/getNaverNews', async function (req, res) {
  let query = req.query.query;
  let reqOptions = {
    headers: {
      'X-Naver-Client-Id': 'd6xuugCaobmkj30aPd0H',
      'X-Naver-Client-Secret': 'f55mf_tFib'
    },
    params: {
      query: query
    }
  };
  try {
    
    let newsRes = await axios.get(
      'https://openapi.naver.com/v1/search/news.json',
      reqOptions
    );
    return res.json(newsRes.data);
  } catch (e) {
    return res.json({
      status: 400,
      message: e
    });
  }
});
module.exports = router;
