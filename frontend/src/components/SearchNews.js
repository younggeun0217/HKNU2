import { Fragment, useState } from 'react';
import SearchNewsitem from "./SearchNewsitem"
import axios from 'axios';
import { Input } from "antd";
const { Search } = Input;

const NewsSearchContainer = () => {
  const [query, setQuery] = useState('');
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };
  const [items, setItems] = useState();
  const handleButton = async () => {
    try {
      const res = await axios.get("http://localhost:3005/naver/getNaverNews", {
        params: {
          query: query,
        },
      });
      if (res && res.status === 200) {
        const { data } = res;
        console.log(data);
        setItems(data.items);
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
          onSearch={(value) => console.log(value)}
          onChange={handleQuery}
          onClick={handleButton}
          style={{ width: 200 }}
        />
      </div>

      <div>
        
          {items && items.map((item) => {
            return (
             
                <SearchNewsitem item={item}></SearchNewsitem>
             
            );
          })}
       
      </div>
    </Fragment>
  );
};
export default NewsSearchContainer;