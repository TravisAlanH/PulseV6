import React from "react";
import STDInput from "../Reuse/STDInput";
import { useSelector } from "react-redux";
import AddFieldButton from "../Aduit/AddField/AddFieldButton";

export default function LocationInputPage() {
  const LocationData = useSelector((state) => state.data.Location);
  const LocationCurrent = useSelector((state) => state.data.Current["Location"]);
  const LocationState = useSelector((state) => state.data.Location[LocationCurrent]);
  const LocationKeys = Object.keys(LocationState);

  return (
    <div className="flex flex-col gap-2">
      {LocationKeys.map((key, index) => (
        <STDInput key={index} keyName={key} Step="Location" />
      ))}
      {LocationData.length > 0 ? <AddFieldButton Step={"Location"} /> : null}
    </div>
  );
}
