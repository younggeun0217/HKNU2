import React, { useEffect, useState } from "react";
import BarList from "../BarList";

export default function Bar(props) {
  const barClickHandler = (_Index) => {
    props.barClickHandler(_Index);
  };
  return (
    /*
            <h2>{title}</h2>
        <h2>{originallink}</h2>
        <h2>{link}</h2>
        <h2>{description}</h2>
        <div>{`${pubDate}년도`}</div>
    */
    props.isPage ? (
      <div>
        <h1>{props.bars[props.pageIndex].title}</h1>
        <div>{props.bars[props.pageIndex].description}</div>
      </div>
    ) : (
      <BarList
        barClickHandler={barClickHandler}
        bars={props.bars}
        detailUnit="%"
      ></BarList>
    )
  );
}
