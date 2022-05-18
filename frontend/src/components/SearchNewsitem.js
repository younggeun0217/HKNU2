import React from 'react';
import '../css/SearchNewsitem.scss';
const news = ({ item }) => {
  const { title, originallink, link, description, pubDate } = item;
  return (
    
      <div className="news-text">
        <h2>{title}</h2>
        <h2>{originallink}</h2>
        <h2>{link}</h2>
        <h2>{description}</h2>
        <div>{`${pubDate}년도`}</div>
        
     
      </div>
    
  );
};
export default news;