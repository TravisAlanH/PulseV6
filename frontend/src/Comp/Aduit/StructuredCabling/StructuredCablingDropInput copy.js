import React, { useEffect } from "react";
import Template from "../../../Store/Slices/Template";
import { BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../Store/Slices/Slice";
import { BsEthernet } from "react-icons/bs";

export default function StructuredCablingDropInput({
  RackIndex,
  startItem,
  setStartSCData,
  EndSCData,
  setBuild,
  build,
}) {
  const RackState = useSelector((state) => state.data["Racks"][RackIndex]);
  const [portIndex, setPortIndex] = React.useState();
  const portsArray = useSelector((state) => state.data[startItem.Step][startItem.Index]["Ports"]);
  const dispatch = useDispatch();

  let changes = structuredClone(portsArray[portIndex]);

  useEffect(() => {
    setBuild({ ...build, port: portIndex });
  }, [portIndex]);

  if (portsArray.length === 0) {
    return (
      <div
        className="rounded-md flex flex-row items-center justify-center flex-shrink-0 OrangeAddPort"
        onClick={() => {}}>
        <BiPlus />
      </div>
    );
  }

  let StartingArray = [];
  let startMap = [];

  let keys = Object.keys(Template.StructuredCabling);
  keys.map((item) => {
    if (item.includes("Starting")) StartingArray.push(item);
    return null;
  });
  if (Object.keys(startItem).length > 0) {
    for (let i = 0; i < startItem["Ports"].value; i++) {
      startMap.push(i + 1);
    }
  }

  let payload = {
    Step: startItem.Step,
    Current: startItem.Index,
    PortIndex: 0,
  };

  let PortButtons = document.querySelectorAll(".portButton");

  function removeSelected() {
    for (var i = 0; i < PortButtons.length; i++) {
      PortButtons[i].addEventListener("click", function () {
        for (var j = 0; j < PortButtons.length; j++) {
          PortButtons[j].classList.remove("selectedPort");
        }
      });
    }
  }

  return (
    <div id="start">
      <div className="flex flex-row items-end justify-between px-2">
        <p className="font-semibold">Start Port: </p>
        <p className="text-sm">{(startItem["Name *"].value + " @U" + startItem["U Position *"].value).slice(0, 20)}</p>
      </div>
      <div
        id="portsList"
        className={"w-[18rem] h-[7rem] overflow-x-scroll border-2 flex flex-col gap-1 justify-center p-1"}>
        <div className="flex gap-1 flex-row">
          {startItem["Ports"].map((item, index) => {
            if (index % 2 === 0) {
              return (
                <div
                  className="portButton w-[2.5rem] h-[2.5rem] border-2 rounded-md flex flex-row items-center justify-center flex-shrink-0"
                  onClick={(e) => {
                    setPortIndex(index);
                    setStartSCData(
                      Object.keys(portsArray[index])
                        .filter((key) => !key.includes("Ending"))
                        .reduce((obj, key) => {
                          obj[key] = portsArray[index][key];
                          return obj;
                        }, {})
                    );
                    // setStartSCData(portsArray[index]);
                    removeSelected();
                    e.target.classList.add("selectedPort");
                  }}>
                  {index + 1}
                </div>
              );
            } else return null;
          })}
        </div>
        <div className="flex gap-1 flex-row">
          {startItem["Ports"].map((item, index) => {
            if (index % 2 !== 0) {
              return (
                <div
                  className="portButton w-[2.5rem] h-[2.5rem] border-2 rounded-md flex flex-row items-center justify-center flex-shrink-0"
                  onClick={(e) => {
                    setBuild({ ...build, port: index });
                    setPortIndex(index);
                    setStartSCData(
                      Object.keys(portsArray[index])
                        .filter((key) => !key.includes("Ending"))
                        .reduce((obj, key) => {
                          obj[key] = portsArray[index][key];
                          return obj;
                        }, {})
                    );
                    // setStartSCData(portsArray[index]);
                    removeSelected();
                    e.target.classList.add("selectedPort");
                  }}>
                  {index + 1}
                </div>
              );
            } else return null;
          })}
          <div
            className="rounded-md flex flex-row items-center justify-center flex-shrink-0 OrangeAddPort"
            onClick={() => {}}>
            <BiPlus />
          </div>
        </div>
      </div>
      {portIndex !== undefined ? (
        <div id="inputs" className="flex flex-col gap-1 pt-2">
          {/* standard text input that i have used in the project with lable*/}
          {StartingArray.map((item, index) => {
            return (
              <div className="flex flex-row">
                <div className="flex flex-col justify-center items-center text-red-500 w-[1rem] h-full">
                  {item.includes("*") ? "*" : null}
                </div>
                <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[7rem]"}>
                  {item.replace("*", "").replace("Starting", "")}
                </label>
                {portsArray[portIndex][item].type === "select" ? (
                  <select
                    className={"Select h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[9.5rem]"}
                    onChange={(e) => {
                      changes[item].value = e.target.value;
                      payload.PortIndex = portIndex;
                      payload.value = changes;
                      setStartSCData(
                        Object.keys(changes)
                          .filter((key) => !key.includes("Ending"))
                          .reduce((obj, key) => {
                            obj[key] = changes[key];
                            return obj;
                          }, {})
                      );
                      // setStartSCData(changes);
                      dispatch(Actions.fillPortContent(payload));
                    }}>
                    {portsArray[portIndex][item].options.map((option) => {
                      if (option === portsArray[portIndex][item].value)
                        return (
                          <option value={option} selected={true}>
                            {option}
                          </option>
                        );
                      return <option value={option}>{option}</option>;
                    })}
                  </select>
                ) : (
                  <input
                    value={portsArray[portIndex][item].value}
                    className="h-[2rem] w-[9.5rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit "
                    onChange={(e) => {
                      changes[item].value = e.target.value;
                      payload.PortIndex = portIndex;
                      payload.value = changes;
                      setStartSCData(
                        Object.keys(changes)
                          .filter((key) => !key.includes("Ending"))
                          .reduce((obj, key) => {
                            obj[key] = changes[key];
                            return obj;
                          }, {})
                      );
                      // setStartSCData(changes);
                      dispatch(Actions.fillPortContent(payload));
                    }}
                  />
                )}
              </div>
            );
          })}
          <div className="w-full flex flex-row justify-end pr-2">
            <button
              className="orangeButton w-[5rem]"
              onClick={() => {
                changes["Starting Item Location *"].value = RackState["Location *"].value;
                changes["Starting Port Index *"].value = portIndex + 1;
                changes["Starting Item Name *"].value = startItem["Name *"].value;
                changes["Starting Item Location *"].value = RackState["Location *"].value;
                changes["Starting Port Name *"].value =
                  (RackState["Name *"].value.split("-").length > 1
                    ? RackState["Name *"].value.split("-")[1]
                    : RackState["Name *"].value.slice(0, 3)) +
                  "-U" +
                  startItem["U Position *"].value +
                  "-P" +
                  (portIndex + 1);
                payload.PortIndex = portIndex;
                payload.value = changes;
                setStartSCData(
                  Object.keys(changes)
                    .filter((key) => !key.includes("Ending"))
                    .reduce((obj, key) => {
                      obj[key] = changes[key];
                      return obj;
                    }, {})
                );
                // setStartSCData(changes);
                dispatch(Actions.fillPortContent(payload));
              }}>
              Fill
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full border-2 p-2 h-[12rem] mt-2 flex flex-col justify-center items-center">
          <BsEthernet className="text-[3rem] text-[#ff8c00]" />
          <p className="font-bold text-lg">Select a port</p>
        </div>
      )}
    </div>
  );
}
