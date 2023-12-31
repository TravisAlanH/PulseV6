import React from "react";
import STDInput from "../../Reuse/STDInput";
import { useSelector } from "react-redux";
import sort from "../../../Format/DataOrder";

export default function SurveyRoomInput({ Step }) {
  const Current = useSelector((state) => state.data.Current[Step]);
  const State = useSelector((state) => state.data[Step][Current]);
  const Keys = Object.keys(State);
  console.log(Keys);

  sort(Keys, Step);

  return (
    <div className="flex flex-col gap-2">
      {Keys.map((key, index) => (
        <STDInput key={index} keyName={key} Step={Step} />
      ))}
    </div>
  );
}
