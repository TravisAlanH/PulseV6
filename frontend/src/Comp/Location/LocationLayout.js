import React from "react";
import STDInput from "../Reuse/STDInput";
import { useSelector } from "react-redux";

export default function LocationLayout() {
  const LocationCurrent = useSelector((state) => state.data.Current["Location"]);
  const LocationState = useSelector((state) => state.data.Location[LocationCurrent]);
  const LocationKeys = Object.keys(LocationState);
  console.log(LocationKeys);

  return (
    <div className="flex flex-col">
      {LocationKeys.map((key, index) => (
        <STDInput key={index} keyName={key} Step="Location" />
      ))}
    </div>
  );
}
