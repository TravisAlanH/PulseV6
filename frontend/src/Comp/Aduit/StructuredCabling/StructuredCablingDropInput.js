import React from "react";
import Template from "../../../Store/Slices/Template";
import { BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../Store/Slices/Slice";
import { BsEthernet } from "react-icons/bs";

export default function StructuredCablingDropInput({ RackIndex, Asset }) {
  const RackState = useSelector((state) => state.data["Racks"][RackIndex]);
  const dispatch = useDispatch();
  const build = useSelector((state) => state.data.Current.StructuredCablingSet);
  const StructuredCabling = useSelector((state) => state.data.StructuredCabling);

  if (Asset.Ports.value === 0) {
    return (
      <div
        className="rounded-md flex flex-row items-center justify-center flex-shrink-0 OrangeAddPort"
        onClick={() => {}}>
        <BiPlus />
      </div>
    );
  }

  let StartingArray = [];

  const InputElements = structuredClone(Template.StructuredCabling);

  let keys = Object.keys(Template.StructuredCabling);
  keys.map((item) => {
    if (item.includes("Starting")) StartingArray.push(item);
    return null;
  });

  let payload = {
    Step: Asset.Step,
    Current: Asset.Index,
    PortIndex: 0,
  };

  let PortsMap = new Array(Asset.Ports.value).fill(0);

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
        <p className="text-sm">{(Asset["Name *"].value + " @U" + Asset["U Position *"].value).slice(0, 20)}</p>
      </div>
      <div
        id="portsList"
        className={"w-[18rem] h-[7rem] overflow-x-scroll border-2 flex flex-col gap-1 justify-center p-1"}>
        <div className="flex gap-1 flex-row">
          {PortsMap.map((item, index) => {
            let found = false;
            let foundObject = {};
            let rounded = "rounded-md";
            if (index === build.port) rounded = "rounded-xl";
            for (let i = 0; i < StructuredCabling.length; i++) {
              if (
                StructuredCabling[i]["Starting Item Name *"] === Asset["Name *"].value &&
                StructuredCabling[i].port === index
              ) {
                foundObject = StructuredCabling[i];
                found = true;
                rounded = "rounded-full";
                break;
              }
            }

            if (index % 2 === 0) {
              return (
                <div
                  key={index}
                  className={
                    "portButton w-[2.5rem] h-[2.5rem] border-2 flex flex-row items-center justify-center flex-shrink-0  " +
                    (index === build.port ? "selectedPort" : null) +
                    " " +
                    rounded
                  }
                  onClick={(e) => {
                    console.log(found);
                    if (found) {
                      payload.value = foundObject;
                      dispatch(Actions.replaceSetStructuredCabling(payload));
                    } else {
                      // if (StructuredCabling.length !== 0 && build.port2 === null) {
                      //   payload.value = Functions.resetObjectKeysNOTInArray(build, [
                      //     "rack",
                      //     "asset",
                      //     "port",
                      //     "rack2",
                      //     "asset2",
                      //   ]);
                      //   dispatch(Actions.replaceSetStructuredCabling(payload));
                      // }
                      payload.Key = ["port", "Connected"];
                      payload.value = [index, false];
                      dispatch(Actions.BuildMultiStructuredCableSet(payload));
                    }
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
          {PortsMap.map((item, index) => {
            let found = false;
            let foundObject = {};
            let rounded = "rounded-md";
            if (index === build.port) rounded = "rounded-xl";
            for (let i = 0; i < StructuredCabling.length; i++) {
              if (
                StructuredCabling[i]["Starting Item Name *"] === Asset["Name *"].value &&
                StructuredCabling[i].port === index
              ) {
                foundObject = StructuredCabling[i];
                found = true;
                rounded = "rounded-full";
                break;
              }
            }
            if (index % 2 !== 0) {
              return (
                <div
                  key={index}
                  className={
                    "portButton w-[2.5rem] h-[2.5rem] border-2 flex flex-row items-center justify-center flex-shrink-0 transition-all " +
                    (index === build.port ? "selectedPort" : null) +
                    " " +
                    rounded
                  }
                  onClick={(e) => {
                    console.log(found);
                    if (found) {
                      payload.value = foundObject;
                      dispatch(Actions.replaceSetStructuredCabling(payload));
                    } else {
                      // if (StructuredCabling.length !== 0 && build.port2 === null) {
                      //   payload.value = Functions.resetObjectKeysNOTInArray(build, [
                      //     "rack",
                      //     "asset",
                      //     "port",
                      //     "port2",
                      //     "rack2",
                      //     "asset2",
                      //   ]);
                      //   dispatch(Actions.replaceSetStructuredCabling(payload));
                      // }
                      payload.Key = ["port", "Connected"];
                      payload.value = [index, false];
                      dispatch(Actions.BuildMultiStructuredCableSet(payload));
                    }
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
      {build.port !== null ? (
        <div id="inputs" className="flex flex-col gap-1 pt-2">
          {StartingArray.map((item, index) => {
            return (
              <div className="flex flex-row">
                <div className="flex flex-col justify-center items-center text-red-500 w-[1rem] h-full">
                  {item.includes("*") ? "*" : null}
                </div>
                <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[7rem]"}>
                  {item.replace("*", "").replace("Starting", "")}
                </label>
                {InputElements[item].type === "select" ? (
                  <select
                    className={"Select h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[9.5rem]"}
                    onChange={(e) => {
                      let payload = {
                        Key: item,
                        value: e.target.value,
                      };
                      dispatch(Actions.BuildStructuredCableSet(payload));
                    }}>
                    {InputElements[item].options.map((option) => {
                      if (option === build[item])
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
                    value={build[item]}
                    className="h-[2rem] w-[9.5rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit "
                    onChange={(e) => {
                      let payload = {
                        Key: item,
                        value: e.target.value,
                      };
                      dispatch(Actions.BuildStructuredCableSet(payload));
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
                let PortName =
                  (RackState["Name *"].value.split("-").length > 1
                    ? RackState["Name *"].value.split("-")[1]
                    : RackState["Name *"].value.slice(0, 3)) +
                  "-U" +
                  Asset["U Position *"].value +
                  "-P" +
                  (build.port + 1);

                let payload = {};
                payload.Key = [
                  "Starting Item Location *",
                  "Starting Port Index *",
                  "Starting Item Name *",
                  "Starting Port Name *",
                ];
                payload.value = [RackState["Location *"].value, build.port + 1, build.asset, PortName];
                dispatch(Actions.BuildMultiStructuredCableSet(payload));
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
