import React from "react";
import { useSelector } from "react-redux";
import SetCurrentSelection from "../../Reuse/SetCurrentSelection";
import AddToStep from "../../Reuse/AddToStep";
import RoomInputs from "./RoomInputs";

export default function RoomLayout() {
  let Step = "Rooms";
  const Data = useSelector((state) => state.data[Step]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-3">
        <SetCurrentSelection Step="Rooms" />
        <AddToStep Step={Step} />
      </div>
      {Data.length > 0 ? <RoomInputs /> : null}
    </div>
  );
}
