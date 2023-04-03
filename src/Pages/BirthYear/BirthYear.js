import { useOutletContext } from "react-router-dom";
import Graphs from "../../Components/Graphs";

export default function BirthYear() {
  const [respData] = useOutletContext();

  let dataByYear = {};

  for (const datum of respData) {
    if (datum["birth year"]) {
      if (datum["birth year"] in dataByYear) {
        dataByYear[datum["birth year"]]++;
      } else {
        dataByYear[datum["birth year"]] = 1;
      }
    }
  }

  const sortYearString = (a, b) => parseInt(a) - parseInt(b);

  const birthYearLabels = Object.keys(dataByYear);
  birthYearLabels.sort(sortYearString);
  let dataByYearSorted = {};
  for (const year of birthYearLabels) {
    dataByYearSorted[year] = dataByYear[year];
  }

  return (
    <>
      <div className="graph">
        <Graphs
          data={Object.values(dataByYearSorted)}
          labels={birthYearLabels}
          title="Sessions by Birth Year"
          axes={{ x: "Birth Year", y: "Number of Sessions" }}
        />
      </div>
    </>
  );
}
