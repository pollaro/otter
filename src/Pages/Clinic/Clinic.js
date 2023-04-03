import { useOutletContext } from "react-router-dom";
import Graphs from "../../Components/Graphs";

export default function Clinic() {
  const [respData] = useOutletContext();

  let dataByClinic = {};

  for (const datum of respData) {
    if (datum.clinic_id in dataByClinic) {
      dataByClinic[datum.clinic_id].push(datum);
    } else {
      dataByClinic[datum.clinic_id] = [datum];
    }
  }

  const clinicIdLabels = Object.keys(dataByClinic);
  const sessionByClinic = Object.values(dataByClinic).map((x) => x.length);

  return (
    <>
      <div className="graph">
        <Graphs
          data={sessionByClinic}
          labels={clinicIdLabels}
          title="Sessions per Clinic"
          axes={{ x: "Clinic IDs", y: "Number of Sessions" }}
        />
      </div>
    </>
  );
}
