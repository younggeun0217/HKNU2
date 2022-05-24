
import "antd/dist/antd.css";
import "../css/Search.scss";

import SearchNews from "./SearchNews";
import OCR from "./Ocr";

const Uploader = (props) => {
  
  

  

  
  const setTitle = (_Title) => {
    props.setTitle(_Title);
  };
  
 

  return (
    <div className="uploader-wrapper">
      
      <div className="upload-button">
        
        
        <OCR></OCR>
        <SearchNews title={props.title} setTitle={setTitle}></SearchNews>
      </div>
    </div>
  );
};

export default Uploader;
