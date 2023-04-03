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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Graphs({ data, labels, title, axes }) {
  const dataSet = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: "rgba(29,128,33,0.68)",
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
          text: axes.y,
        },
      },
      x: {
        grid: {
          display: true,
        },
        display: true,
        title: {
          display: true,
          text: axes.x,
        },
      },
    },
    responsive: true,
    // allows clicking on/off of plots
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
      <Bar data={dataSet} options={options} />
    </>
  );
}
