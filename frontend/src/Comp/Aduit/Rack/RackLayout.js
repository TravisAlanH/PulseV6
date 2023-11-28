import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SetCurrentSelection from "../../Reuse/SetCurrentSelection";
import AddToStep from "../../Reuse/AddToStep";
import RackInput from "./RackInput";
// import RackRack from "./RackRack";
import RackFull from "./RackFull";
import PDUViewVerticalComp from "../PDU/PDUViewVerticalComp";
import { RiCloseCircleLine } from "react-icons/ri";
import * as Actions from "../../../Store/Slices/Slice";

export default function RackLayout({ AllData }) {
  let Step = "Racks";
  const Data = useSelector((state) => state.data[Step]);
  const Location = useSelector((state) => state.data.Location);
  const [bulkData, setBulkData] = useState({});
  const [bulkAdd, setBulkAdd] = useState(0);
  const newData = useSelector((state) => state.data["newData"]);

  console.log("newData", newData);

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

  return (
    <div>
      <div className="flex flex-col border-2 m-2">
        <div className="bg-[#F7F5F1] flex flex-row justify-start h-[3rem] items-center pl-6 text-lg font-bold">
          {Step === "Racks" ? "Cabinet" : Step}
        </div>
        <div className="flex lg:flex-row md:flex-row flex-col gap-3 w-full justify-center p-2 border-b-2 mb-2 items-center">
          <SetCurrentSelection Step={Step} />
          <div className="flex flex-row justify-between gap-5">
            <AddToStep Step={Step} />
            <button
              className={Data.length === 0 ? "grayButton" : "orangeButton"}
              disabled={Data.length === 0 ? true : false}
              onClick={() => {
                document.getElementById("BulkAddRacks").classList.replace("hidden", "block");
              }}>
              Bulk Add
            </button>
          </div>
        </div>
        {Data.length > 0 ? (
          <div className="flex md:flex-row lg:flex-row flex-col justify-center lg:justify-center gap-6 px-6">
            <div>
              <RackInput AllData={AllData} Step={Step} />
              <PDUViewVerticalComp Step={Step} />
            </div>
            {/* <RackRack Step={Step} /> */}
            <RackFull Step={Step} />
          </div>
        ) : null}
      </div>
      <div id="BulkAddRacks" className="hidden z-[9999] fixed top-0">
        <div className="w-screen h-screen bg-[#05030379] flex flex-row justify-center items-center">
          <div className="bg-white rounded-lg p-4 w-[20rem]">
            <div className="flex flex-row justify-between items-center pb-3">
              <div className="flex flex-row">
                <p>Bulk Add to: </p>
                <p className="orange font-bold pl-2">{Location[0]["dcTrack Location Code *"].value}</p>
              </div>
              <div
                onClick={() => {
                  document.getElementById("BulkAddRacks").classList.replace("block", "hidden");
                }}>
                <RiCloseCircleLine className="orange w-[2rem] h-[2rem]" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row">
                <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[8rem]"}>
                  {"Cabinet"}
                </label>
                <select
                  className="Select h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[10rem]"
                  id={"Selection" + Step}
                  onChange={(e) => {
                    if (e.target.value !== "default") {
                      setBulkData(Data[e.target.value]);
                    }
                    if (e.target.value === "default") setBulkData({});
                  }}>
                  <option value={"default"}>Select Cabinet</option>
                  {Data.map((option, index) => (
                    <option value={index} key={index}>
                      {findKeyNameWithSubstring(option, index)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row">
                <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[8rem]"}>
                  {"Make"}
                </label>
                <input
                  type="text"
                  value={Object.keys(bulkData).length !== 0 ? bulkData["Make *"].value : ""}
                  className="Select h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[10rem]"
                />
              </div>
              <div className="flex flex-row">
                <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[8rem]"}>
                  {"Model"}
                </label>
                <input
                  type="text"
                  value={Object.keys(bulkData).length !== 0 ? bulkData["Model *"].value : ""}
                  className="Select h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[10rem]"
                />
              </div>
              <div className="flex flex-row">
                <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[8rem]"}>
                  {"Bulk QTY"}
                </label>
                <select
                  className="Select h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[10rem]"
                  onChange={(e) => setBulkAdd(e.target.value)}>
                  {(() => {
                    let elements = [];
                    let numberOfTimes = 20;
                    for (let i = 0; i < numberOfTimes; i++) {
                      elements.push(<option key={i + 1}>{i + 1}</option>);
                    }
                    return elements;
                  })()}
                </select>
              </div>
              <div className="flex flex-row justify-end">
                <button
                  className="orangeButton"
                  onClick={() => {
                    console.log("Add Number", bulkAdd);
                    for (let i = 1; i < parseInt(bulkAdd) + 1; i++) {
                      console.log(i);
                      let SetName = (
                        "CAB-A" +
                        (Data.length + i) +
                        (Location[0]["dcTrack Location Code *"].value !== ""
                          ? "-" + Location[0]["dcTrack Location Code *"].value.slice(0, 2)
                          : "")
                      ).toUpperCase();
                      let holdData = structuredClone(bulkData);
                      holdData["Name *"].value = SetName;
                      let payload = { value: holdData };
                      dispatch(Actions.bulkAddToRacks(payload));
                    }
                  }}>
                  Bulk Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
