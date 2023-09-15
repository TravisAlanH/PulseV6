import React from "react";
import { useSelector } from "react-redux";
import LocationInputPage from "./LocationInputPage";
import SetCurrentSelection from "../Reuse/SetCurrentSelection";
import AddToStep from "../Reuse/AddToStep";

export default function LocationLayout() {
  const LocationData = useSelector((state) => state.data.Location);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-3">
        <SetCurrentSelection Step="Location" />
        <AddToStep Step={"Location"} />
      </div>
      {LocationData.length > 0 ? <LocationInputPage /> : null}
    </div>
  );
}
