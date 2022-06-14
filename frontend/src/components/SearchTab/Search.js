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
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };
  const setFile = (image) => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const res = axios.post("/api/kakaoOCR", formData, {
        headers: { "content-type": "multipart/form-data" },
      });
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
          style={{ display: "none" }}
        />

        <SearchNews
          title={props.title}
          setTitle={setTitle}
          setFile={setFile}
        ></SearchNews>
      </div>
    </div>
  );
};

export default Uploader;
