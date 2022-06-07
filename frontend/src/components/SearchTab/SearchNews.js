import { Fragment, useState } from "react";
import SearchNewsitem from "./SearchNewsitem";
import axios from "axios";
import { Input } from "antd";
import "../../css/Search.css";
const { Search } = Input;

const NewsSearchContainer = (props) => {
  const handleQuery = (e) => {
    props.setTitle(e.target.value);
  };
  const [bars, setBars] = useState([]);
  const [pageIndex, setPageIndex] = useState(-1);
  const barClickHandler = (_Index) => {
    setPageIndex(_Index);
    window.open(bars[_Index].link);
  };
  const handleButton = async () => {
    try {
      const res = await axios.get("/api/naverNews", {
        params: {
          query: props.title,
        },
      });
      if (res && res.status === 200) {
        const { data } = res;
        const newBars = [];
        if (data.items) {
          data.items.map((item, index) => {
            newBars.push({
              title: item.title,
              detail: item.detail,
              description: item.description,
              var: index,
              link: item.link,
            });
          });
        }
        setBars(newBars);
      }
    } catch (e) {
      console.log("error ", e);
    }
  };
  return (
    <Fragment>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "2rem" }}
      >
        <Search
          placeholder="검색어 나오는 곳"
          value={props.title}
          onSearch={handleButton}
          onChange={handleQuery}
          onPressEnter={handleButton}
          style={{ width: 200 }}
        />
      </div>

      <div>
        {bars == null ? (
          ""
        ) : (
          <SearchNewsitem
            bars={bars}
            barClickHandler={barClickHandler}
            pageIndex={pageIndex}
          ></SearchNewsitem>
        )}
      </div>
    </Fragment>
  );
};
export default NewsSearchContainer;
