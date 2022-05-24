import React from "react";
import { Badge } from "antd";
export default function Bar(props) {
  const barClickHandler = () => {
    props.barClickHandler(props.var);
  };
  return (
    <li onClick={barClickHandler}>
      <Badge.Ribbon text={props.detail} placement="start" />
      <p>{props.title}</p>
    </li>
  );
}
