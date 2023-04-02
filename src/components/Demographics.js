import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { useOutletContext } from "react-router-dom";

export default function Demographics() {
  const [selectDate, respData] = useOutletContext();
  const [selectState, setSelectState] = useState("provider");

  let dataByProvider = {};
  let dataByClinic = {};
  let dataByYear = {};

  // Split out data by clinic and provider
  for (const datum of respData) {
    if (datum.provider_id in dataByProvider) {
      dataByProvider[datum.provider_id].push(datum);
    } else {
      dataByProvider[datum.provider_id] = [datum];
    }
    if (datum.clinic_id in dataByClinic) {
      dataByClinic[datum.clinic_id].push(datum);
    } else {
      dataByClinic[datum.clinic_id] = [datum];
    }
    if (datum["birth year"]) {
      if (datum["birth year"] in dataByYear) {
        dataByYear[datum["birth year"]]++;
      } else {
        dataByYear[datum["birth year"]] = 1;
      }
    }
  }

  const providerIdLabels = Object.keys(dataByProvider);
  const sessionsByProvider = Object.values(dataByProvider).map((x) => x.length);

  const clinicIdLabels = Object.keys(dataByClinic);
  const sessionByClinic = Object.values(dataByClinic).map((x) => x.length);

  const birthYearLabels = Object.keys(dataByYear);
  const birthYearCounts = Object.values(dataByYear);

  const labelSet = {
    provider: providerIdLabels,
    clinic: clinicIdLabels,
    birth: birthYearLabels,
  };
  const dataSets = {
    provider: sessionsByProvider,
    clinic: sessionByClinic,
    birth: birthYearCounts,
  };
  const titleSet = {
    provider: "Sessions per provider",
    clinic: "Sessions per clinic",
    birth: "Sessions per birth year",
  };
  const gridSet = {
    provider: "Provider IDs",
    clinic: "Clinic IDs",
    birth: "Birth Year",
  };

  const dataSet = {
    labels: labelSet[selectState],
    datasets: [
      {
        label: titleSet[selectState],
        data: dataSets[selectState],
        backgroundColor: "rgba(47, 189, 51, 0.68)",
      },
    ],
  };
  const options = {
    scales: {
      y: {
        grid: {
          display: true,
        },
        display: true,
        title: {
          display: true,
          text: "Number of Sessions",
        },
      },
      x: {
        grid: {
          display: true,
        },
        display: true,
        title: {
          display: true,
          text: gridSet[selectState],
        },
      },
    },
  };

  const HandleChange = (e) => setSelectState(e.target.value);

  return (
    <>
      <span>Please select a dataset: </span>
      <select defaultValue="provider" onChange={HandleChange}>
        <option value="provider">Sessions per provider</option>
        <option value="clinic">Sessions per clinic</option>
        <option value="birth">Sessions per birth year</option>
      </select>

      <Bar data={dataSet} options={options} />
    </>
  );
}
