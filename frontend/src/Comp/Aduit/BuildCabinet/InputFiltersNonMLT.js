import React from "react";
import DataFiltered from "./DataFiltered";

export default function InputFiltersNonMLT({ AllData, AvalableSlots, visable, setSelectedMLTItem }) {
  console.log(AvalableSlots);

  const Headers = ["Make", "Model", "RUHeight", "Class", "Subclass", "Mounting", "DataPorts", "PowerPorts", "FrontSlots", "BackSlots"];

  return (
    <div className="flex flex-col">
      <div className="flex flex-row h-[2rem] sticky top-0 bg-white">
        <div className="min-w-[2.8rem]"></div>
        {Headers.map((item, index) => {
          return (
            <div className="flex flex-row justify-between min-w-[8rem] max-w-[8rem] border-2 border-gray-300 overflow-visable  bg-white">
              <div key={index} className=" text-nowrap">
                {item}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <DataFiltered setSelectedMLTItem={setSelectedMLTItem} mltFilteredData={AllData} visable={visable} />
      </div>
    </div>
  );
}
