import React from "react";
import STDInput from "../Reuse/STDInput";
import { useSelector } from "react-redux";
import AddFieldButton from "../Aduit/AddField/AddFieldButton";
import sortArrayToMatchReference from "../../Format/DataOrder";

export default function LocationInputPage() {
  const LocationData = useSelector((state) => state.data.Location);
  const LocationCurrent = useSelector((state) => state.data.Current["Location"]);
  const LocationState = useSelector((state) => state.data.Location[LocationCurrent]);
  let LocationKeys = sortArrayToMatchReference(Object.keys(LocationState), "Location");

  return (
    <div className="flex flex-col gap-2">
      {LocationKeys.map((key, index) => (
        <STDInput key={index} keyName={key} Step="Location" />
      ))}
      {LocationData.length > 0 ? <AddFieldButton Step={"Location"} /> : null}
    </div>
  );
}
