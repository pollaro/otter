import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../Components/NavBar";

export default function Home() {
  const [respData, setRespData] = useState([]);

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>LittleKoala Health</h1>
        <NavBar />
      </header>
      <div id="content">
        <Outlet context={[respData]} />
      </div>
    </div>
  );
}
