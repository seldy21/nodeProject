import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { APIURL } from "../publicURL";

function Diary() {
  const location = useLocation();
  const path = location.pathname;

  const navigator = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [index, setIndex] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getData = (page) => {
    axios
      .get(`${APIURL}${path}?page=${page}`)
      .then((res) => {
        console.log(res.data);
        setCurrentPage(page);
        setData(res.data.posts);
        setLoading(false);

        const whole_length = Math.ceil(res.data.total_length / 10);
        const index_arr = [];
        for (let i = 0; i < whole_length; i++) {
          index_arr.push(i + 1);
        }
        console.log(index_arr);
        setIndex(index_arr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData(1);
  }, [path]);

  return (
    <>
      {!loading && (
        <>
          <div className="list_grid">
            {data.map((item) => (
              <div className="post_list" key={`list_${item._id}`} onClick={()=>{navigator(`/detail?id=${item._id}`)}}>
                {path.split("/")[2]}
                {item.title}
              </div>
            ))}
          </div>
          <div className="pagination_wrapper">
            {index.map((item) => (
              <button
                key={`page_${item}`}
                className={`pagination_btn ${currentPage === item ? "fw-bold text-dark" : ""}`}
                onClick={() => {
                  getData(item);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Diary;
