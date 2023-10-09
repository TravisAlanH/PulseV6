import React, { useEffect } from "react";
import Template from "../../../Store/Slices/Template";
import { useDispatch } from "react-redux";
import * as Actions from "../../../Store/Slices/Slice";
// import STDInput from "../../Reuse/STDInput";

export default function StructuredCablingInput({ startItem, endItem, StartSCData, EndSCData }) {
  // const FullState = useSelector((state) => state.data);
  const [SendData, setSendData] = React.useState({ ...StartSCData, ...EndSCData });
  const dispatch = useDispatch();
  let otherData = [];

  useEffect(() => {
    let fullCopyStart = structuredClone(StartSCData);
    let fullCopyEnd = structuredClone(EndSCData);
    setSendData({ ...fullCopyStart, ...fullCopyEnd });
  }, [StartSCData, EndSCData]);

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

  function UpdateBothPortData(e) {
    // state[action.payload.Step][action.payload.StartItemIndex]["Ports"][action.payload.PortIndex] = action.payload.startValue;
    e.preventDefault();

    let payload = {
      StartStep: startItem.Step,
      StartIndex: startItem.Index,
      EndStep: endItem.Step,
      EndIndex: endItem.Index,
      StartPortIndex: SendData["Starting Port Index *"].value - 1,
      EndPortIndex: SendData["Ending Port Index *"].value - 1,
      value: SendData,
    };
    dispatch(Actions.fillPortData(payload));
  }

  return (
    <div className="w-[20rem] flex flex-row justify-center">
      {Object.keys(StartSCData).length > 0 && Object.keys(EndSCData).length > 0 ? (
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
                      setSendData({ ...SendData, [item]: { ...SendData[item], value: e.target.value } });
                      // state[action.payload.Step][action.payload.StartItemIndex]["Ports"][action.payload.PortIndex] = action.payload.startValue;
                    }}>
                    {Template.StructuredCabling[item].options.map((option, index) => {
                      if (option === SendData[item].value)
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
                    value={SendData[item].value}
                    className="h-[2rem] w-[9.5rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit "
                    onChange={(e) => {
                      setSendData({ ...SendData, [item]: { ...SendData[item], value: e.target.value } });
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
