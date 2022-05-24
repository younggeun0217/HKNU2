import React from "react";
import Bar from "./Bar";
import styles from "../css/BarList.module.css";
export default function BarList(props) {
  //search에 내용이있으면 나오게끔.
  //props의 요소로 변경후 서치바와 타임바를 재활용하는 방법.
  //함수는 부모로 빼놓고 생각
  const ClickHandler = (_var) => {
    props.barClickHandler(_var);
  };
  return (
    <ul className={styles.tabs}>
      {props.bars.map((bar) => {
        return (
          <Bar
            barClickHandler={ClickHandler}
            key={bar.title}
            title={bar.title}
            detail={bar.detail + props.detailUnit}
            var={bar.var}
          ></Bar>
        );
      })}
    </ul>
  );
}
