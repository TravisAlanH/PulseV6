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
  }, [Current]);

  return (
    <div>
      <select
        id={"Selection" + Step}
        onChange={(e) => {
          let payload = {
            Step: Step,
            value: e.target.value,
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
