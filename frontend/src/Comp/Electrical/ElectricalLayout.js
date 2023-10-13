import React from "react";
import ElectricalNav from "./ElectricalNav";
import LocationLayout from "../Location/LocationLayout";

export default function ElectricalLayout({ AllData }) {
  const [currentElectrical, setCurrentElectrical] = React.useState(<LocationLayout />);

  return (
    <div>
      <div>
        <ElectricalNav setCurrentElectrical={setCurrentElectrical} AllData={AllData} />
      </div>
      {currentElectrical}
    </div>
  );
}
