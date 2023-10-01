import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../Store/Slices/Slice";

export default function UPSAddSelect({ Step, keyName, setMountType }) {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.data.Current[Step]);
  const state = useSelector((state) => state.data[Step]);
  const racks = useSelector((state) => state.data.Racks);

  let payload = {
    Step: Step,
    Current: current,
    Key: keyName,
    Value: "",
  };

  return (
    <div>
      <div className="flex flex-row">
        <div className="w-[1rem] flex flex-row justify-center items-center text-red-500">
          {keyName.includes("*") ? "*" : ""}
        </div>
        <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[8rem]"}>
          {keyName ? keyName.replace("*", "") : keyName.slice(0, 12).replace("*", "")}
        </label>
        <select
          id="select"
          className={"Select h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[13rem]"}
          onChange={(e) => {
            if (e.target.value === "Location") {
              payload.value = e.target.value;
              dispatch(Actions.addToStep(payload));
              payload = {
                Step: Step,
                value: state.length,
              };
              dispatch(Actions.updateCurrent(payload));
              setMountType("Location");
            }
            if (e.target.value === "Cabinet") {
              setMountType("Cabinet");
            }
            let selected = document.getElementById("select");
            selected.selectedIndex = 0;
          }}>
          <option value="">Select</option>
          {racks.length > 0 ? <option value="Cabinet">In Cabinet</option> : null}
          <option value="Location">In Location</option>
        </select>
      </div>
    </div>
  );
}
