import axios from "axios";
import React, { useEffect, useState } from "react";
import { APIURL } from "../publicURL";
import { useLocation, useSearchParams } from "react-router-dom";
import Loading from "../components/loading";

function Search() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchData, setSearchData] = useState([]);

  const getData = () => {
    setLoading(true);
    axios
      .get(`${APIURL}/search?date=${searchParams.get("date")}`)
      .then((res) => {
        console.log(res);
        const data = res.data.searchData
        setSearchData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, [location]);
  return (
    <>
      {loading ? (
        <div className="more_area">
          <Loading />
        </div>
      ) : (
        <>
          <div className="text-end">검색결과 {searchData.length} 건</div>
          <div>
            {searchData.map((item)=><>{item.title}</>)}
          </div>
        </>
      )}
    </>
  );
}

export default Search;
