import React from "react";
import "../../css/Ocr.css";
import axios from "axios";
import "antd/dist/antd.css";
import "../../css/Search.scss";
import SearchNews from "./SearchNews";
import { Upload } from "antd";
const { Dragger } = Upload;

const Uploader = (props) => {
  const setTitle = (_Title) => {
    props.setTitle(_Title);
  };
  const setFile =async (image) => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const res = await axios.post("/api/kakaoOCR", formData, {
        headers: { "content-type": "multipart/form-data" },
      });
     console.log(res.data);
     const { data } = res;
     const newresult = [];
     if (data.result) {
      data.result.map((result) => {
        newresult.push({
          box: result.boxes,
          recognitionwords: result.recognition_words
        });
        console.log(newresult);
           
        const json = newresult[0].recognitionwords[0];
        
        console.log(json);
        setTitle(json);

      });
    }console.log(newresult);

    } catch (e) {
      console.error(e);
    }
  };
  const dummyRequest = async ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess();
    }, 0);
  };
  const onChange = (info) => {
    if (info.file.status === "done") setFile(info.fileList[0].originFileObj);
  };
  return (
    <div className="App">
      <div>
        <Dragger
          maxCount={1}
          accept="image/*"
          customRequest={dummyRequest}
          onChange={onChange}
          showUploadList={false}
        >
          <p className="ant-upload-text">이미지를 업로드하세요.</p>
        </Dragger>
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
