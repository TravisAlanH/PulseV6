import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../../Store/Slices/Slice";

export default function UseLastData({ Step, DepthSide }) {
  const current = useSelector((state) => state.data.Current[Step]);
  const currentState = useSelector((state) => state.data[Step][current]);
  const stepState = useSelector((state) => state.data[Step]);
  const dispatch = useDispatch();

  let newData;

  let Render;

  for (let index = stepState.length - 1; index >= 0; index--) {
    if (stepState[index]["Make *"].value !== "" && stepState[index]["Model *"].value !== "") {
      newData = stepState[index];

      Render = (
        <div>
          <div>
            <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center  w-full"}>
              {"Make"}
            </label>
            <input
              className={"h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-full"}
              // value={newData.empty ? newData["Make *"].value : ""}
              value={newData["Make *"].value}
              type="text"
              disabled={true}
            />
          </div>
          <div>
            <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-full"}>
              {"Model"}
            </label>
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
                ...stepState[index],
                "Name *": {
                  ...stepState[index]["Name *"],
                  value: currentState["Name *"].value,
                },
              };
              if (Step !== "Racks") {
                replaceData = {
                  ...replaceData,
                  "U Position *": {
                    ...stepState[index]["U Position *"],
                    value: currentState["U Position *"].value,
                  },
                };
              }
              if (replaceData.hasOwnProperty("Cabinet Side *")) {
                replaceData = {
                  ...replaceData,
                  "Cabinet Side *": {
                    ...stepState[index]["Cabinet Side *"],
                    value: DepthSide.Side,
                  },
                };
              }
              if (replaceData.hasOwnProperty("Depth Position *")) {
                replaceData = {
                  ...replaceData,
                  "Depth Position *": {
                    ...stepState[index]["Depth Position *"],
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
      break;
    }
  }
  return Render;
}
