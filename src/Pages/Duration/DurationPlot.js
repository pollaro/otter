import { useOutletContext } from "react-router-dom";
import Graphs from "../../Components/Graphs";

export default function DurationPlot() {
  const [respData] = useOutletContext();

  let durations = [];
  for (const datum of respData) {
    durations.push(datum.sessionduration);
  }

  let durationCounts = Array(Math.max(...durations)).fill(0);
  durations.forEach((x) => (durationCounts[x - 1] += 1));
  const durationLabels = [...Array(Math.max(...durations)).keys()].map(
    (x) => x++
  );

  return (
    <>
      <div className="graph">
        <Graphs
          data={durationCounts}
          labels={durationLabels}
          title="Duration Time Histogram"
          axes={{ x: "Time (min)", y: "Number of Sessions" }}
        />
      </div>
    </>
  );
}
