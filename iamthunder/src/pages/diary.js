import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { APIURL } from "../publicURL";
import { IoIosClose } from "react-icons/io";

function Diary() {
  const location = useLocation();
  const path = location.pathname;

  const navigator = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const getData = (page) => {
    setReadMore(true);
    axios
      .get(`${APIURL}${path}?page=${page}`)
      .then((res) => {
        setData((prevData) => [...prevData, ...res.data.posts]);

        const pages = Math.ceil(res.data.total_length / 8);
        console.log(pages, "::", index);
        setShowMore(pages > index);
        setLoading(false);
        setIndex(index + 1);
        setReadMore(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changePage = () => {
    setLoading(true);
    axios
      .get(`${APIURL}${path}?page=1`)
      .then((res) => {
        setData(res.data.posts);

        const pages = Math.ceil(res.data.total_length / 8);
        console.log(pages, "::", index);
        setShowMore(pages > 1);
        setIndex(2);
        setLoading(false);
        setReadMore(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    changePage();
  }, [path]);

  

  //detail
  const defaultDetail = {
    show: false,
    content: null,
  };
  const [showDetail, setShowDetail] = useState(defaultDetail);

  const hideContent = () => {
    setShowDetail(defaultDetail);
  };

  const getDetailData = (id) => {
    axios
      .get(`${APIURL}/diary/detail?id=${id}`)
      .then((res) => {
        console.log(res);
        setShowDetail({
          ...showDetail,
          show: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {loading ? (
        <>로딩중...</>
      ) : (
        <>
          <div className="list_grid">
            {data.map((item) => (
              <div
                className="post_list"
                key={`list_${item._id}`}
                onClick={() => {
                  getDetailData(item._id);
                }}
              >
                {item.title}
              </div>
            ))}
            {readMore && <>불러오는중....</>}
          </div>
          <div className="pagination_wrapper">
            {showMore && (
              <button
                onClick={() => {
                  getData(index);
                }}
              >
                더보기
              </button>
            )}
          </div>
          <div className={`${showDetail.show ? "" : "h-0"} postWrapper`}>
            <div className="postInner">
              <div className="d-flex">
                <IoIosClose
                  className="ms-auto fs-1 pointer"
                  onClick={hideContent}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Diary;
