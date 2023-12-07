import React, { useCallback, useState } from "react";
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

  const [currentMonth, setCurrentMonth] = useState(`${new Date().getFullYear()}-${new Date().getMonth() + 1}`);

  const [dateValue, setDateValue] = useState();
  const onChange = useCallback(
    (val) => {
      setDateValue(val);
    },
    [setDateValue]
  );

  const getCurrentMonthData = () => {
    axios.get(`${APIURL}data/${currentMonth}`)
  }
  return (
    <Calendar
      value={dateValue}
      onChange={onChange}
      size={isDesktopOrLaptop ? 192 : isTablet ? 371 : 276}
      startOfWeek={0}
      weekends={[0]}
      weekDaysLabel={weekDaysLabel}
      monthsLabel={monthsLabel}
    />
  );
}

export default NavCalendar;
