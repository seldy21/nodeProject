import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar } from "@natscale/react-calendar";
import axios from "axios";
import { APIURL } from "../publicURL";

const monthsLabel = {
  0: "일월",
  1: "이월",
  2: "삼월",
  3: "사월",
  4: "오월",
  5: "유월",
  6: "칠월",
  7: "팔월",
  8: "구월",
  9: "시월",
  10: "십일월😍",
  11: "십이월",
};

const weekDaysLabel = {
  0: "일",
  1: "월",
  2: "화",
  3: "수",
  4: "목",
  5: "금",
  6: "토",
};

function NavCalendar(props) {
  const { isDesktopOrLaptop, isTablet } = props;

  const [currentMonth, setCurrentMonth] = useState(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}`
  );

  const [dateValue, setDateValue] = useState();
  const onChange = useCallback(
    (val) => {
      console.log(val)
      setDateValue(val);
    },
    [setDateValue]
  );

  const [postingDate, setPostingDate] = useState([]);

  const getCurrentMonthData = async () => {
    try {
      const res = await axios.get(`${APIURL}/calendar/${currentMonth}`);
      const _data = res.data.postingData;
      const new_data = _data.map((item) => ({
        id: item._id,
        created_at: parseInt(item.created_at.split(" ")[0].split("-")[2]),
      }));
      console.log(new_data);
      setPostingDate(new_data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const isDisabled = useCallback((date) => {
    const _date = date.getDate();
    
    if (!postingDate.some((item) => item.created_at === _date)) {
      return true;
    }
  }, [postingDate]);

  useEffect(() => {
  
    getCurrentMonthData();
  }, []);

  return (
    <Calendar
      value={dateValue}
      onChange={onChange}
      size={isDesktopOrLaptop ? 192 : isTablet ? 371 : 276}
      startOfWeek={0}
      weekends={[0]}
      weekDaysLabel={weekDaysLabel}
      monthsLabel={monthsLabel}
      isDisabled={isDisabled}
    />
  );
}

export default NavCalendar;
