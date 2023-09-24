import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../../Store/Slices/Slice";

export default function UseLastData({ Step }) {
  const current = useSelector((state) => state.data.Current[Step]);
  const currentState = useSelector((state) => state.data[Step][current]);
  const stepState = useSelector((state) => state.data[Step]);
  const dispatch = useDispatch();

  let newData = {};

  for (let index = stepState.length - 1; index >= 0; index--) {
    if (stepState[index]["Make *"].value !== "" && stepState[index]["Model *"].value !== "") {
      newData = stepState[index];
      break;
    }
  }

  return (
    <div>
      <div>
        <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center  w-full"}>{"Make"}</label>
        <input
          className={"h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-full"}
          value={newData["Make *"].value}
          type="text"
          disabled={true}
        />
      </div>
      <div>
        <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-full"}>{"Model"}</label>
        <input
          className={"h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-full"}
          value={newData["Model *"].value}
          type="text"
          disabled={true}
        />
      </div>
      <button
        className="orangeButton"
        onClick={() => {
          let replaceData = {
            ...newData,
            "Name *": {
              ...newData["Name *"],
              value: currentState["Name *"].value,
            },
          };
          if (Step !== "Racks") {
            replaceData = {
              ...replaceData,
              "U Position *": {
                ...newData["U Position *"],
                value: currentState["U Position *"].value,
              },
            };
          }
          let payload = {
            Step: Step,
            current: current,
            value: replaceData,
          };
          dispatch(Actions.replaceCurrent(payload));
        }}>
        Use Prior
      </button>
    </div>
  );
}
