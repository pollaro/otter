import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import DateSelect from "../../Components/DateSelect";

export default function Snapshot() {
  const [respData] = useOutletContext();
  const [selectDate, setSelectDate] = useState("2015-2-1");
  const [selectYear, selectMonth, selectDay] = selectDate.split("-");

  if (selectDate) {
    let subset = respData.filter((datum) => {
      return (
        new Date(datum.start_time).getFullYear() === parseInt(selectYear) &&
        new Date(datum.start_time).getMonth() === parseInt(selectMonth) - 1 &&
        new Date(datum.start_time).getDate() === parseInt(selectDay)
      );
    });

    // calculate averages
    let sumDistance = 0;
    let sumAge = 0;
    let sumLen = 0;
    const numSessions = subset.length;
    for (const session of subset) {
      if (session.distance) {
        sumDistance += session.distance;
      }
      if (session["birth year"]) {
        sumAge += selectYear - session["birth year"];
      }
      if (session.sessionduration) {
        sumLen += session.sessionduration;
      } else if (session.start_time && session.stop_time) {
        sumLen +=
          (new Date(session.stop_time) - new Date(session.start_time)) /
          1000 /
          60;
      }
    }
    const avgDistance = sumDistance / numSessions;
    const avgAge = sumAge / numSessions;
    const avgLen = sumLen / numSessions;
    return (
      <>
        <DateSelect selectDate={selectDate} setSelectDate={setSelectDate} />
        <p>Number of Sessions: {numSessions}</p>
        <p>Average age of Patients: {Math.round(avgAge)}</p>
        <p>Average distance traveled: {Math.round(avgDistance)}</p>
        <p>Average length of session (min): {Math.round(avgLen)}</p>
      </>
    );
  } else {
    return (
      <>
        <DateSelect selectDate={selectDate} setSelectDate={setSelectDate} />
      </>
    );
  }
}
