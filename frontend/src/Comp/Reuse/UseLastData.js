import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../../Store/Slices/Slice";

export default function UseLastData({ Step, DepthSide }) {
  const current = useSelector((state) => state.data.Current[Step]);
  const currentState = useSelector((state) => state.data[Step][current]);
  const stepState = useSelector((state) => state.data[Step]);
  const dispatch = useDispatch();

  let newData = { empty: false };

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
          // value={newData.empty ? newData["Make *"].value : ""}
          value={newData["Make *"].value}
          type="text"
          disabled={true}
        />
      </div>
      <div>
        <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-full"}>{"Model"}</label>
        <input
          className={"h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-full"}
          // value={newData.empty ? newData["Model *"].value : ""}
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
          if (replaceData.hasOwnProperty("Cabinet Side *")) {
            replaceData = {
              ...replaceData,
              "Cabinet Side *": {
                ...newData["Cabinet Side *"],
                value: DepthSide.Side,
              },
            };
          }
          if (replaceData.hasOwnProperty("Depth Position *")) {
            replaceData = {
              ...replaceData,
              "Depth Position *": {
                ...newData["Depth Position *"],
                value: DepthSide.Depth,
              },
            };
          }

          let payload = {
            Step: Step,
            current: current,
            value: replaceData,
          };
          console.log("payload", payload);

          dispatch(Actions.replaceCurrent(payload));
        }}>
        Use Prior
      </button>
    </div>
  );
}
