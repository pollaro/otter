import { useOutletContext } from "react-router-dom";
import Graphs from "../../Components/Graphs";

export default function StartStop() {
  const [respData] = useOutletContext();

  // create bins for times
  const startLabels = {};
  const stopLabels = {};
  const durations = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 10) {
      startLabels[hour.toString() + ":" + min.toString()] = 0;
      stopLabels[hour.toString() + ":" + min.toString()] = 0;
    }
  }

  // round all times to 10 minutes
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
    durations.push(datum.sessionduration);
  }

  // hack to get :00 instead of :0 on bins
  let labels = Object.keys(startLabels);
  for (let x = 0; x < labels.length; x++) {
    if (labels[x].split(":")[1] === "0") {
      labels[x] = labels[x].split(":")[0] + ":00";
    }
  }

  return (
    <>
      <div className="graph">
        <Graphs
          data={Object.values(startLabels)}
          labels={labels}
          title="Start Time Histogram"
          axes={{ x: "Time (hh:mm)", y: "Number of Sessions" }}
        />
      </div>
      <div className="graph">
        <Graphs
          data={Object.values(stopLabels)}
          labels={labels}
          title="Stop Time Histogram"
          axes={{ x: "Time (hh:mm)", y: "Number of Sessions" }}
        />
      </div>
    </>
  );
}
