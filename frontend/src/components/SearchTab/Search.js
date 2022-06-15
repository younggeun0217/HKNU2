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
