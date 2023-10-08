import React from "react";
import Template from "../../../Store/Slices/Template";
// import STDInput from "../../Reuse/STDInput";

export default function StructuredCablingInput({ startItem, endItem, StartSCData, EndSCData }) {
  let otherData = [];

  let keys = Object.keys(Template.StructuredCabling);
  keys.map((item) => {
    if (
      !item.includes("Starting") &&
      !item.includes("Ending") &&
      !item.includes("Operation") &&
      !item.includes("Object")
    )
      otherData.push(item);
    return null;
  });

  console.log(StartSCData);

  return (
    <div className="w-[20rem] flex flex-row justify-center">
      {Object.keys(StartSCData).length > 0 && Object.keys(EndSCData).length > 0 ? (
        <form>
          {otherData.map((item) => {
            return (
              <div className="flex flex-row">
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
                      // changes[item].value = e.target.value;
                      // payload.PortIndex = portIndex;
                      // payload.value = changes;
                      // setEndSCData(changes);
                      // dispatch(Actions.fillPortContent(payload));
                    }}>
                    {Template.StructuredCabling[item].options.map((option) => {
                      // if (option === portsArray[portIndex][item].value)
                      //   return (
                      //     <option value={option} selected={true}>
                      //       {option}
                      //     </option>
                      //   );
                      return <option value={option}>{option}</option>;
                    })}
                  </select>
                ) : (
                  <input
                    // value={portsArray[portIndex][item].value}
                    value={""}
                    className="h-[2rem] w-[9.5rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit "
                    onChange={(e) => {
                      // changes[item].value = e.target.value;
                      // payload.PortIndex = portIndex;
                      // payload.value = changes;
                      // setEndSCData(changes);
                      // dispatch(Actions.fillPortContent(payload));
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
