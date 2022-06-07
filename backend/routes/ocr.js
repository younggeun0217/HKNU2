var express = require("express");
var router = express.Router();
const axios = require("axios");
require("dotenv").config();
const FormData = require("form-data");


const multer = require('multer');
  
const upload = multer({
  storage: multer.diskStorage({	// 파일이 저장될 경로
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
  
    
   
  }),
});
 
  router.post('/',upload.single('file'),(req, res,next) => {
    // 가져온 이미지를 저장해주면 됨
    try {
      // buffer를 FormData로 감쌈
      const formData = new FormData();
      formData.append("file", req.file.buffer, {
        filename: req.file.originalname,
      });
    
      axios
      .post("https://dapi.kakao.com/v2/vision/text/ocr", formData ,{
        headers: {
          Authorization: "KakaoAK 68843196c8a60e6e1ed99e6d093543a4",
          "Content-Type": "multipart/form-data",
        },
       
        
      });
      res.status(200).json(result.data);
      }
       catch(err)  {
        console.error(err.response);
      };
        
      
      
    }
  
  );
    
      
    
    

 
  module.exports = router;
/* GET home page. */
/*const kakaoOCR = useCallback (() => {
    const form = new FormData();
    form.append("file", iimage.image_filemageData);

    axios.post("https://dapi.kakao.com/v2/vision/text/ocr", form, {
        headers: {
          Authorization: "KakaoAK 68843196c8a60e6e1ed99e6d093543a4",
          "Content-Type": "multipart/form-data",
        },
        form:{
          form,
        },
      })
      .then((response) => {
        console.log("url:", "POST /kakaoAPI/ocr", "\nstatus:", response.status, "\nstatusText:", response.statusText);
        const text = response.data.result.recognition_words
         
          setOcr(text);
      })
      .catch((err) => {
        console.error(err.response);
      });
  },[imageData])
  router.post("/", async (req, res) => {
      let file=req.files.file;
        axios
        .post("https://dapi.kakao.com/v2/vision/text/ocr", file, {
          headers: {
            Authorization: "KakaoAK 68843196c8a60e6e1ed99e6d093543a4",
            "Content-Type": "multipart/form-data",
          },
          body:{
              "image":file.url,
          }
        })
        .then((response) => {
         
          const data = response.data.result
          return data
            
        })
        .catch((err) => {
          console.error(err.response);
        });
    });
      
    

module.exports = router;
*/