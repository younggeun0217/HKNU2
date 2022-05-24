import React, { useEffect, useState } from "react";
import BarList from "./BarList";

export default function Bar(props) {
  const [bars, setBars] = useState([]);
  const [isPage, setPage] = useState(false);
  const [pageIndex, setPageIndex] = useState(-1);
  useEffect(() => {
    const newBars = [];
    props.items.map((item, index) => {
      newBars.push({
        title: item.title,
        detail: item.detail,
        var: index,
      });
    });
    setBars(newBars);
    setPage(false);
  }, []);
  const barClickHandler = (_Index) => {
    setPageIndex(_Index);
    setPage(true);
  };
  return (
    /*
            <h2>{title}</h2>
        <h2>{originallink}</h2>
        <h2>{link}</h2>
        <h2>{description}</h2>
        <div>{`${pubDate}년도`}</div>
    */
    isPage ? (
      bars[pageIndex].title
    ) : (
      <BarList
        barClickHandler={barClickHandler}
        bars={bars}
        detailUnit="%"
      ></BarList>
    )
  );
}
