import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../Store/Slices/Slice";

export default function SetCurrentSelection({ Step }) {
  const state = useSelector((state) => state.data[Step]);
  const Current = useSelector((state) => state.data.Current[Step]);
  const dispatch = useDispatch();

  function findKeyNameWithSubstring(option, index) {
    for (const key in option) {
      if (key.includes("Name")) {
        if (option[key].value === "") {
          return Step + " " + (index + 1);
        }
        return option[key].value;
      }
    }
    return Step + " " + (index + 1); // Return null if no matching key is found
  }

  function requiredCheck(option) {
    for (const key in option) if (key.includes("*") && option[key].value === "") return "text-red-500";
    return "text-red-500";
  }

  useEffect(() => {
    let Selection = document.getElementById("Selection" + Step);
    if (Selection) {
      Selection.selectedIndex = Current;
    }
  }, [Current, Step]);

  return (
    <div className="flex flex-row">
      <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[8rem]"}>
        {Step === "Racks" ? "Cabinet" : Step}
      </label>
      <select
        className="Select h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[8rem]"
        id={"Selection" + Step}
        onChange={(e) => {
          let payload = {
            Step: Step,
            value: parseInt(e.target.value),
          };
          dispatch(actions.updateCurrent(payload));
        }}>
        {state.map((option, index) => (
          <option value={index} key={index} className={requiredCheck(option)}>
            {findKeyNameWithSubstring(option, index)}
          </option>
        ))}
      </select>
    </div>
  );
}
