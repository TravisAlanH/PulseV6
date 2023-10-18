import React from "react";
import { useSelector, useDispatch } from "react-redux";
import StructuredCablingStartCab from "./StructuredCablingStartCab";
import StructuredCablingEndCab from "./StructuredCablingEndCab";
import StructuredCablingInput from "./StructuredCablingInput";
import * as Actions from "../../../Store/Slices/Slice";

export default function StructuredCablingLayout() {
  const Racks = useSelector((state) => state.data.Racks);
  const [RackIndex, setRackIndex] = React.useState(0);
  const [EndRackIndex, setEndRackIndex] = React.useState(0);

  const dispatch = useDispatch();
  let payload = {};

  return (
    <div className="w-screen h-screen p-3">
      <div className="w-full mb-3 flex flex-col border-[#F3EEE7] border-2">
        <div className="w-full h-[2.5rem] bg-[#F3EEE7] flex flex-row items-center justify-start pl-3">
          <h1 className="font-bold text-black">Structured Cabling </h1>
          <h1 className="font-black"> {""}</h1>
        </div>
        <div className="p-2 flex flex-row justify-center">
          <div className="w-[20rem] mb-3 flex flex-col border-[#F3EEE7] border-2">
            <div className="w-full h-[2rem] bg-[#F3EEE7] flex flex-row items-center justify-center">
              <h1 className="text-black">Starting Cabinet</h1>
              <select
                //!
                id="rackStart"
                onChange={(e) => {
                  setRackIndex(e.target.value);
                  //!
                  var selectElement = document.getElementById("rackStart");
                  var selectedOption = selectElement.options[selectElement.selectedIndex];
                  var optionText = selectedOption.innerHTML;
                  payload.Key = "rack";
                  payload.value = optionText;
                  dispatch(Actions.BuildStructuredCableSet(payload));
                  //!
                }}>
                <option value="">Select</option>
                {Racks.length > 0
                  ? Racks.map((item, index) => {
                      return (
                        <option key={index} value={index}>
                          {item["Name *"].value}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
            <div>
              <StructuredCablingStartCab RackIndex={RackIndex} />
            </div>
          </div>
          {/*  */}
          <div className="hidden lg:block">
            <StructuredCablingInput />
          </div>
          {/*  */}
          <div className="w-[20rem] mb-3 flex flex-col border-[#F3EEE7] border-2">
            <div className="w-full h-[2rem] bg-[#F3EEE7] flex flex-row items-center justify-center">
              <h1 className="text-black">Ending Cabinet</h1>
              <select
                id="rackEnd"
                onChange={(e) => {
                  setEndRackIndex(e.target.value);
                  var selectElement = document.getElementById("rackEnd");
                  var selectedOption = selectElement.options[selectElement.selectedIndex];
                  var optionText = selectedOption.innerHTML;
                  payload.Key = "rack2";
                  payload.value = optionText;
                  dispatch(Actions.BuildStructuredCableSet(payload));
                }}>
                <option value="0">Select</option>
                {Racks.length > 0
                  ? Racks.map((item, index) => {
                      return (
                        <option key={index} value={index}>
                          {item["Name *"].value}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
            <div>
              <StructuredCablingEndCab RackIndex={EndRackIndex} />
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="lg:hidden w-full flex flex-row justify-center">
        <StructuredCablingInput />
      </div>
      {/*  */}
    </div>
  );
}
