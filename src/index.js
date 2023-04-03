import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Error from "./error";
import BirthYear from "./Pages/BirthYear/BirthYear";
import Clinic from "./Pages/Clinic/Clinic";
import DurationPlot from "./Pages/Duration/DurationPlot";
import Provider from "./Pages/Provider/Provider";
import Snapshot from "./Pages/Snapshot/Snapshot";
import StartStop from "./Pages/StartStop/StartStop";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/snapshot",
        element: <Snapshot />,
      },
      {
        path: "/startstop",
        element: <StartStop />,
      },
      {
        path: "/duration",
        element: <DurationPlot />,
      },
      {
        path: "/providers",
        element: <Provider />,
      },
      {
        path: "/clinic",
        element: <Clinic />,
      },
      {
        path: "/birthyear",
        element: <BirthYear />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
