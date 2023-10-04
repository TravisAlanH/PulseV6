import React from "react";
import { useSelector } from "react-redux";
import StructuredCablingStartCab from "./StructuredCablingStartCab";
import StructuredCablingEndCab from "./StructuredCablingEndCab";
import StructuredCablingInput from "./StructuredCablingInput";

export default function StructuredCablingLayout() {
  const Racks = useSelector((state) => state.data.Racks);
  const [startItem, setStartItem] = React.useState({});
  const [endItem, setEndItem] = React.useState({});
  const [RackIndex, setRackIndex] = React.useState(0);
  const [EndRackIndex, setEndRackIndex] = React.useState(0);

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
                onChange={(e) => {
                  setRackIndex(e.target.value);
                }}>
                <option value="0">Select</option>
                {Racks.length > 0
                  ? Racks.map((item, index) => {
                      return <option value={index}>{item["Name *"].value}</option>;
                    })
                  : null}
              </select>
            </div>
            <div>
              <StructuredCablingStartCab setStartItem={setStartItem} RackIndex={RackIndex} />
            </div>
          </div>
          {/*  */}
          <div className="hidden lg:block">
            <StructuredCablingInput startItem={startItem} endItem={endItem} />
          </div>
          {/*  */}
          <div className="w-[20rem] mb-3 flex flex-col border-[#F3EEE7] border-2">
            <div className="w-full h-[2rem] bg-[#F3EEE7] flex flex-row items-center justify-center">
              <h1 className="text-black">Ending Cabinet</h1>
              <select
                onChange={(e) => {
                  setEndRackIndex(e.target.value);
                }}>
                <option value="0">Select</option>
                {Racks.length > 0
                  ? Racks.map((item, index) => {
                      return <option value={index}>{item["Name *"].value}</option>;
                    })
                  : null}
              </select>
            </div>
            <div>
              <StructuredCablingEndCab setEndItem={setEndItem} RackIndex={EndRackIndex} />
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="lg:hidden block">
        <StructuredCablingInput startItem={startItem} endItem={endItem} />
      </div>
      {/*  */}
    </div>
  );
}
