import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useOutletContext } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Graphs() {
  const [selectDate, respData] = useOutletContext();
  const [selectYear, selectMonth, selectDay] = selectDate.split("-");

  const startLabels = {};
  const stopLabels = {};
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 10) {
      startLabels[hour.toString() + ":" + min.toString()] = 0;
      stopLabels[hour.toString() + ":" + min.toString()] = 0;
    }
  }

  for (const datum of respData) {
    const startTime = new Date(datum.start_time);
    const startHour = startTime.getHours();
    const startMinute = startTime.getMinutes();
    const stopTime = new Date(datum.stop_time);
    const stopHour = stopTime.getHours();
    const stopMinute = stopTime.getMinutes();
    startLabels[
      startHour.toString() +
        ":" +
        (Math.floor(startMinute / 10) * 10).toString()
    ] += 1;
    stopLabels[
      stopHour.toString() + ":" + (Math.floor(stopMinute / 10) * 10).toString()
    ] += 1;
  }
  const startDataSet = {
    labels: Object.keys(startLabels),
    datasets: [
      {
        label: "Start Times",
        data: Object.values(startLabels),
        backgroundColor: "rgba(47, 189, 51, 0.68)",
      },
      {
        label: "Stop Times",
        data: Object.values(stopLabels),
        backgroundColor: "rgba(177, 47, 189, 0.68)",
      },
    ],
  };
  const options = {
    responsive: true,
    legend: {
      // from: https://codepen.io/jordanwillis/pen/BWKKKo
      onClick: (e, item) => {
        let index = item.datasetIndex;
        let ci = this.chart;
        let hidden =
          ci.getDatasetMeta(index).hidden === null
            ? false
            : ci.getDatasetMeta(index).hidden;

        ci.data.datasets.forEach((e, i) => {
          let meta = ci.getDatasetMeta(i);
          if (i !== index) {
            if (!hidden) {
              meta.hidden = meta.hidden === null ? true : null;
            } else if (meta.hidden === null) {
              meta.hidden = true;
            }
          } else if (i === index) {
            meta.hidden = null;
          }
        });
        ci.update();
      },
    },
  };

  return (
    <>
      <Bar data={startDataSet} options={options} />
    </>
  );
}
