const express = require("express");
const router = express.Router();
const axios = require("axios");
const multer = require("multer");
const FormData = require("form-data");
const upload = multer({ storage: multer.memoryStorage() });
require("dotenv").config();

router.post("/", upload.single("image"), async (req, res, next) => {
  const buff = new Buffer.from(req.file.buffer, "base64");

  const formData = new FormData();
  formData.append("image", buff, {
    filename: req.file.originalname,
  });
  try {
    const kakaoData = await axios.post(
      "https://dapi.kakao.com/v2/vision/text/ocr",
      formData,
      { headers: { Authorization: process.env.Kakao_Key } }
    );
    console.log(kakaoData.data.result);
    return res.json(kakaoData.data);
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
