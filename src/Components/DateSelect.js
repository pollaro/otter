import { useRef } from "react";

export default function DateSelect({ selectDate, setSelectDate }) {
  const selectDateRef = useRef();
  const handleChange = (e) => setSelectDate(e.target.value);

  return (
    <>
      <span>Select a date </span>
      <input type="date" onChange={handleChange} ref={selectDateRef} />
      <p>Selected date: {selectDate ? selectDate : "None"}</p>
    </>
  );
}
