import React from "react";
import Template from "../../../Store/Slices/Template";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../Store/Slices/Slice";
// import STDInput from "../../Reuse/STDInput";

export default function StructuredCablingInput() {
  const build = useSelector((state) => state.data.Current.StructuredCablingSet);
  const scCurrent = useSelector((state) => state.data.Current.StructuredCabling);

  const dispatch = useDispatch();
  let payload = {};
  let otherData = [];

  // console.log(build);

  let keys = Object.keys(Template.StructuredCabling);
  keys.map((item) => {
    if (
      !item.includes("Starting") &&
      !item.includes("Ending") &&
      !item.includes("Operation") &&
      !item.includes("Object") &&
      !item.includes("Data")
    )
      otherData.push(item);
    return null;
  });

  function UpdateBothPortData(e) {
    // state[action.payload.Step][action.payload.StartItemIndex]["Ports"][action.payload.PortIndex] = action.payload.startValue;
    e.preventDefault();

    payload = {
      Current: scCurrent,
      value: build,
    };
    console.log(payload);
    //!
    // dispatch(Actions.addToSC(payload))
    //!
  }

  function checkNonNullValues(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && (key.includes("Starting") || key.includes("Ending"))) {
        if (obj[key] === null || obj[key] === "") {
          return false;
        }
      }
    }
    return true;
  }

  return (
    <div className="w-[20rem] flex flex-row justify-center">
      {checkNonNullValues(build) ? (
        <form onSubmit={UpdateBothPortData} className="flex flex-col gap-1">
          {otherData.map((item, index) => {
            return (
              <div className="flex flex-row" key={index}>
                <div className="flex flex-col justify-center items-center text-red-500 w-[1rem] h-full">
                  {item.includes("*") ? "*" : null}
                </div>
                <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[7rem]"}>
                  {item.replace("*", "").replace("Ending", "")}
                </label>
                {Template.StructuredCabling[item].type === "select" ? (
                  <select
                    className={"Select h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[9.5rem]"}
                    onChange={(e) => {
                      payload.Key = item;
                      payload.value = e.target.value;
                      dispatch(Actions.BuildStructuredCableSet(payload));
                    }}>
                    {Template.StructuredCabling[item].options.map((option, index) => {
                      if (option === build[item])
                        return (
                          <option value={option} selected={true} key={index}>
                            {option}
                          </option>
                        );
                      return <option value={option}>{option}</option>;
                    })}
                  </select>
                ) : (
                  <input
                    // value={portsArray[portIndex][item].value}
                    value={build[item]}
                    className="h-[2rem] w-[9.5rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit "
                    onChange={(e) => {
                      payload.Key = item;
                      payload.value = e.target.value;
                      dispatch(Actions.BuildStructuredCableSet(payload));
                    }}
                  />
                )}
              </div>
            );
          })}
          <button type="submit" className="orangeButton">
            Submit
          </button>
        </form>
      ) : (
        <div>Select Ports</div>
      )}
    </div>
  );
}
