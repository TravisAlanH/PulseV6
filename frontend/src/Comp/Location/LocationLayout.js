import React from "react";
import { useSelector } from "react-redux";
import LocationInputPage from "./LocationInputPage";
import SetCurrentSelection from "../Reuse/SetCurrentSelection";
import AddToStep from "../Reuse/AddToStep";

export default function LocationLayout() {
  const LocationData = useSelector((state) => state.data.Location);
  let Step = "Location";

  return (
    <div className="flex flex-col border-2 m-2">
      <div className="bg-[#F7F5F1] flex flex-row justify-start h-[3rem] items-center pl-6 text-lg font-bold">
        {Step === "Racks" ? "Cabinet" : Step}
      </div>
      <div className="flex flex-row gap-3 w-full justify-center p-2 border-b-2 mb-2">
        <SetCurrentSelection Step="Location" />
        <AddToStep Step={"Location"} />
      </div>
      <div className="flex flex-row justify-between lg:justify-center gap-6 px-6">
        {LocationData.length > 0 ? <LocationInputPage /> : null}
      </div>
    </div>
  );
}
