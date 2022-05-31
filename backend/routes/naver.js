const express = require("express");
const router = express.Router();
const axios = require("axios");
const Record = require("../record.js");
require("dotenv").config();

/* GET home page. */
router.get("/", async function (req, res) {
  let query = req.query.query;
  await Record.findOneAndUpdate(
    {
      searchTitle: query,
      date: { $gte: new Date().setHours(12, 0, 0, 0) },
    },
    { $inc: { count: 1 } },
    { upsert: true }
  );
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
    const data = newsRes.data;
    //const pythonRes =
    await axios.post("http://localhost:5000/", {
      title: query,
      data: data,
    });
    return res.json(data);
  } catch (e) {
    return res.json({
      status: 400,
      message: e,
    });
  }
});
module.exports = router;
