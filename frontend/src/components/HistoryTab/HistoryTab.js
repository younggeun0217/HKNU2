import React, { useEffect, useState } from "react";
import styles from "../../css/HistoryTab.module.css";
import BarList from "../BarList";
import axios from "axios";
export default function HistoryTab(props) {
  const [useIndex, setUseIndex] = useState(0);
  const urlArr = ["day", "week", "year"];
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
  const clickHandler = async (_Id) => {
    setUseIndex(_Id);
    const res = await axios.get("/api/rank/" + urlArr[_Id]);
    const { data } = res;
    const newArr = [];
    data.map((_data, index) => {
      newArr.push({
        title: _data._id,
        var: _data._id,
        detail: _data.count,
      });
    });
    setBars(newArr);
  };
  const barClickHandler = (_Title) => {
    props.barClickHandler(_Title);
  };
  const [bars, setBars] = useState([]);
  useEffect(() => {
    clickHandler(0);
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
