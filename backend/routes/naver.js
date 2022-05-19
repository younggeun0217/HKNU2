var express = require("express");
var router = express.Router();
const axios = require("axios");
require("dotenv").config();

/* GET home page. */
router.get("/", async function (req, res) {
  let query = req.query.query;
  let reqOptions = {
    headers: {
      "X-Naver-Client-Id": process.env.Naver_Id,
      "X-Naver-Client-Secret": process.env.Naver_Secret,
    },
    params: {
      query: query,
    },
  };
  try {
    let newsRes = await axios.get(
      "https://openapi.naver.com/v1/search/news.json",
      reqOptions
    );
    return res.json(newsRes.data);
  } catch (e) {
    return res.json({
      status: 400,
      message: e,
    });
  }
});
module.exports = router;
