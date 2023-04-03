import { useOutletContext } from "react-router-dom";
import Graphs from "../../Components/Graphs";

export default function Provider() {
  const [respData] = useOutletContext();

  let dataByProvider = {};

  for (const datum of respData) {
    if (datum.provider_id in dataByProvider) {
      dataByProvider[datum.provider_id].push(datum);
    } else {
      dataByProvider[datum.provider_id] = [datum];
    }
  }

  const providerIdLabels = Object.keys(dataByProvider);
  let providerIdDataSort = {};
  for (const prov of providerIdLabels) {
    providerIdDataSort[prov] = dataByProvider[prov].length;
  }

  return (
    <>
      <div className="graph">
        <Graphs
          data={Object.values(providerIdDataSort)}
          labels={providerIdLabels}
          title="Sessions per Provider"
          axes={{ x: "Provider ID", y: "Number of Sessions" }}
        />
      </div>
    </>
  );
}
