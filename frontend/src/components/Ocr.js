import { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import "../css/Ocr.css";



function OCR(props) {
  const [ocr, setOcr] = useState("");
  const [imageData, setImageData] = useState(null);
  const [progress, setProgress] = useState(0);
  
  const worker = createWorker({
    logger: (m) => {
        
      console.log(m);
      setProgress(parseInt(m.progress * 100));
    },
  }); 
  const convertImageToText = async () => {
    if (!imageData) return;
    await worker.load();
    await worker.loadLanguage("kor");
    await worker.initialize("kor");
    const {
      data: { text },
    } = await worker.recognize(imageData);
    setOcr(text);
  };

  useEffect(() => {
    convertImageToText();
  }, [imageData]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if(!file)return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri = reader.result;
      console.log({ imageDataUri });
      setImageData(imageDataUri);
    };
    reader.readAsDataURL(file);
    
  }
  
  return (
    <div className="App">
    <div>
    <label className="input-file-button" for="input-file">
       이미지 업로드
      </label>
      <input
        type="file"
        name=""
        id="input-file"
        onChange={handleImageChange}
        accept="image/*"
        style={{display:"none"}}
      />
    </div>
    {progress < 100 && progress > 0 && <div>
      <div className="progress-label">Progress ({progress}%)</div>
      <div className="progress-bar">
        <div className="progress" style={{width: `${progress}%`}} ></div>
      </div>
    </div>}
    <div className="display-flex">
      <img src={imageData} alt="" srcset="" />
     
    </div>
    <div>{ocr}</div>
   
  </div>
);
}
export default OCR;