import React, { useEffect, useState } from "react";
import styles from "../css/TimeTab.module.css";
import BarList from "./BarList";

export default function TimeTab(props) {
  const [useIndex, setUseIndex] = useState(0);
  const menuArr = [
    {
      title: (
        <li
          className={useIndex === 0 ? styles.active : ""}
          onClick={() => clickHandler(0)}
        >
          하루
        </li>
      ),
    },
    {
      title: (
        <li
          className={useIndex === 1 ? styles.active : ""}
          onClick={() => clickHandler(1)}
        >
          일주일
        </li>
      ),
    },
    {
      title: (
        <li
          className={useIndex === 2 ? styles.active : ""}
          onClick={() => clickHandler(2)}
        >
          일년
        </li>
      ),
    },
  ];
  const clickHandler = (_Id) => {
    setUseIndex(_Id);
  };
  const barClickHandler = (_Title) => {
    props.barClickHandler(_Title);
  };
  const [bars, setBars] = useState([]);
  useEffect(() => {
    setBars([
      { title: "뉴스 제목", detail: 60, var: "뉴스 제목" },
      { title: "뉴스 제목2", detail: 50, var: "뉴스 제목2" },
    ]);
  }, []);
  return (
    <>
      <ul className={styles.tabs}>
        {menuArr.map((section, index) => {
          return section.title;
        })}
      </ul>
      <BarList
        barClickHandler={barClickHandler}
        bars={bars}
        detailUnit="회"
      ></BarList>
    </>
  );
}
