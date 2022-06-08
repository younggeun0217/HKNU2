import { useState } from "react";
import "../../css/Ocr.css";

import axios from "axios";
import "antd/dist/antd.css";
import "../../css/Search.scss";
import { Button, Spin } from "antd";
import SearchNews from "./SearchNews";

const Uploader = (props) => {
  const [image, setImage] = useState("");

  const [ocr, setOcr] = useState("");
  const [loaded, setLoaded] = useState(false);

  
  const setTitle = (_Title) => {
    props.setTitle(_Title);
  };
  const fileUpload = (e) => {
    let reader = new FileReader();
  
    
    reader.onloadend = () => {
      const img = reader.result;
      if (img) {
        setImage(img.toString());
      }
    }
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); 
      setFile(e.target.files[0]); 
    }

    
  }
  const setFile = (image) => {
    
    
    try {
      const data = new FormData();
      data.append("image", image);
      const res =  fetch("https://dapi.kakao.com/v2/vision/text/ocr", {
        method: "POST",
        headers: {
          Authorization: "KakaoAK 68843196c8a60e6e1ed99e6d093543a4",
          
        },
        body: data,
      });
     
      setOcr(res.result);
    } catch (e) {
      console.error(e);
    }
  };
 
  return (
    <div className="App">
    <div>
    <label className="input-file-button" for="file">
       이미지 업로드
      </label>
      <input
        type="file"
        name="file"
        id="file"
        onChange={fileUpload}
        accept="image/*"
        style={{display:"none"}}
      />
    
   
        <SearchNews title={props.title} setTitle={setTitle}></SearchNews>
        
      
     
      </div>
   
      </div>
  
  );
};

export default Uploader;
