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
    const result = kakaoData.data.result;
    const heightArr = [];
    let ret = "";
    let maxHeight = -1;
    let gapHeight = -1;
    for (var i in result) {
      const height = result[i].boxes[2][1] - result[i].boxes[0][1];
      maxHeight = Math.max(maxHeight, height);
      heightArr.push({ height: height, word: result[i].recognition_words });
    }
    if (!heightArr.length)
      return res.json("사진에서 글자를 추출하지 못했습니다.");
    gapHeight = maxHeight * 0.87;
    for (var i in heightArr) {
      if (heightArr[i].height <= gapHeight) continue;
      ret += heightArr[i].word + " ";
    }
    return res.json(ret.trim());
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
