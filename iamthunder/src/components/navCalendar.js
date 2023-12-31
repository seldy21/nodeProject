import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar } from "@natscale/react-calendar";
import axios from "axios";
import { APIURL } from "../publicURL";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

function NavCalendar(props) {
  const {isDesktopOrLaptop, isTablet, setNavShow } = props;
  const navigator = useNavigate();

  const [currentMonth, setCurrentMonth] = useState(
    moment(new Date()).format("YYYY-MM")
  );
  const [startDate, setStartDate] = useState(new Date());

  const [postingDate, setPostingDate] = useState([]);

  const isWeekday = useCallback(
    (date) => {
      const _date = `${moment(date).format("YYYY-MM-DD")}`;

      if (postingDate.find((item) => _date === item.created_at)) {
        return _date;
      }
    },
    [postingDate]
  );

  // const getCurrentMonthData = async () => {
  //   try {
  //     const res = await axios.get(`${APIURL}/calendar/${currentMonth}`);
  //     const _data = res.data.postingData;
  //     const new_data = _data.map((item) => ({
  //       id: item._id,
  //       created_at: item.created_at.split(" ")[0],
  //     }));
  //     // setLoading(false);
  //     setPostingDate(new_data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   getCurrentMonthData();
  // }, [currentMonth]);

  return (
    <div className="position-relative">
      {/* <div className={`dateLoadingWrapper ${loading ? '' : 'd-none'}`}>loading...</div> */}
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date)
          navigator(`/search?date=${moment(date).format("YYYY-MM-DD")}`);
          setNavShow(false)
        }}
        filterDate={isWeekday}
        onMonthChange={(date) => {
          setCurrentMonth(moment(date).format("YYYY-MM"));
        }}
        inline
      />
    </div>
  );
}

export default NavCalendar;
