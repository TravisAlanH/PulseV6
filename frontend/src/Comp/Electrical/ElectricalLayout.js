import React from "react";
import ElectricalNav from "./ElectricalNav";
import ElectricalHome from "./ElectricalHome";

export default function ElectricalLayout({ AllData }) {
  const [currentElectrical, setCurrentElectrical] = React.useState(<ElectricalHome />);

  return (
    <div>
      <div>
        <ElectricalNav setCurrentElectrical={setCurrentElectrical} AllData={AllData} />
      </div>
      {currentElectrical}
    </div>
  );
}
