import React from "react";
import STDInput from "../../Reuse/STDInput";
import { useSelector } from "react-redux";

export default function RoomInputs() {
  const Step = "Rooms";

  const Data = useSelector((state) => state.data[Step]);
  const Current = useSelector((state) => state.data.Current[Step]);
  const State = useSelector((state) => state.data[Step][Current]);
  const Keys = Object.keys(State);

  return (
    <div className="flex flex-col">
      {Keys.map((key, index) => (
        <STDInput key={index} keyName={key} Step={Step} />
      ))}
    </div>
  );
}
