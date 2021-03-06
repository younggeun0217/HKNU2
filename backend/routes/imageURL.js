const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.get("/", async function (req, res) {
  //이미지 정보 받아와서 반환
  const url = req.query.url;
  const axiosRes = await axios.get(url, { responseType: "arraybuffer" });
  const buffer = axiosRes.data;
  const contentType = axiosRes.headers["content-type"];
  res.json({ contentType: contentType, buffer: buffer });
});

module.exports = router;
