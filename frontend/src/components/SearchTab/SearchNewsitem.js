import React from "react";
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
    <BarList
      barClickHandler={barClickHandler}
      bars={props.bars}
      detailUnit="%"
    ></BarList>
  );
}
