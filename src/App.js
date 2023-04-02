import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";

function DateSelect({ handleChange, dateRef, selectDate, location }) {
  if (location.pathname === "/graphs") {
    return <></>;
  } else if (location.pathname === "/day") {
    return (
      <>
        <span>Select a date </span>
        <input type="date" onChange={handleChange} ref={dateRef} />
        <p>Selected date: {selectDate ? selectDate : "None"}</p>
      </>
    );
  } else if (location.pathname === "/") {
    return <p>Please select an option above</p>;
  }
}
function App() {
  const [respData, setRespData] = useState([]);
  const [selectDate, setSelectDate] = useState("");
  const selectDateRef = useRef();

  useEffect(() => {
    async function getData() {
      setRespData([]);
      await fetch(
        "https://lo-interview.s3.us-west-2.amazonaws.com/health_sessions.json"
      )
        .then((response) => response.json())
        .then((data) => {
          if (!ignore) {
            setRespData(data);
          }
        });
    }

    let ignore = false;
    getData();
    return () => {
      ignore = true;
    };
  }, []);

  const handleChange = (e) => setSelectDate(e.target.value);
  const location = useLocation();

  return (
    <div className="App">
      <header className="App-header">
        <h1>LittleKoala Health</h1>
        <NavBar />
      </header>
      <div id="content">
        <DateSelect
          handleChange={handleChange}
          dateRef={selectDateRef}
          selectDate={selectDate}
          location={location}
        />
        <Outlet context={[selectDate, respData]} />
      </div>
    </div>
  );
}

export default App;
