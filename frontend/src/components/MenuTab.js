import React, { useState } from "react";
import styles from "../css/MenuTab.module.css";
import Search from "./SearchTab/Search";
import HistoryTab from "./HistoryTab/HistoryTab";

export default function MenuTab() {
  const [useTitle, setTitle] = useState("");
  const [useIndex, setUseIndex] = useState(0);
  const clickHandler = (_Id) => {
    setUseIndex(_Id);
  };
  const menuSelect = (_Title) => {
    setUseIndex(0);
    setTitle(_Title);
  };
  const menuArr = [
    {
      title: (
        <li
          key="0"
          className={useIndex === 0 ? styles.active : ""}
          onClick={() => clickHandler(0)}
        >
          검색
        </li>
      ),
      content: <Search title={useTitle} setTitle={setTitle}></Search>,
    },
    {
      title: (
        <li
          key="1"
          className={useIndex === 1 ? styles.active : ""}
          onClick={() => clickHandler(1)}
        >
          화제가 됐던 검색어
        </li>
      ),
      content: <HistoryTab barClickHandler={menuSelect}></HistoryTab>,
    },
  ];
  return (
    <>
      <ul className={styles.tabs}>
        {menuArr.map((section, index) => {
          return section.title;
        })}
      </ul>
      {menuArr[useIndex].content}
    </>
  );
}
