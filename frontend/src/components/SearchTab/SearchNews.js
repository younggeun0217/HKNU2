import { Fragment, useState } from "react";
import SearchNewsitem from "./SearchNewsitem";
import axios from "axios";
import { Input } from "antd";
const { Search } = Input;

const NewsSearchContainer = (props) => {
  const handleQuery = (e) => {
    props.setTitle(e.target.value);
  };
  const [bars, setBars] = useState([]);
  const [isPage, setPage] = useState(false);
  const [pageIndex, setPageIndex] = useState(-1);
  const updateBar = () => {};
  const barClickHandler = (_Index) => {
    setPageIndex(_Index);
    setPage(true);
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
        console.log(data);
        const newBars = [];
        data.items.map((item, index) => {
          newBars.push({
            title: item.title,
            detail: item.detail,
            description: item.description,
            var: index,
          });
        });
        setBars(newBars);
        setPage(false);
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
            isPage={isPage}
            pageIndex={pageIndex}
          ></SearchNewsitem>
        )}
      </div>
    </Fragment>
  );
};
export default NewsSearchContainer;
