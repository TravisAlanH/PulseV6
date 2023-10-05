import React from "react";
import Template from "../../../Store/Slices/Template";

export default function StructuredCablingInput({ startItem, endItem }) {
  console.log(startItem);

  let startMap = [];
  let endMap = [];

  let StartingArray = [];
  let EndingArray = [];

  let keys = Object.keys(Template.StructuredCabling);
  keys.map((item) => {
    if (item.includes("Starting")) StartingArray.push(item);
    if (item.includes("Ending")) EndingArray.push(item);
  });

  if (Object.keys(startItem).length > 0) {
    for (let i = 0; i < startItem["Ports"].value; i++) {
      startMap.push(i + 1);
    }
    // startPortSpacing = startItem["Ports"].value / 2;
  }
  if (Object.keys(endItem).length > 0) {
    for (let i = 0; i < endItem["Ports"].value; i++) {
      endMap.push(i + 1);
    }
    // endPortSpacing = startItem["Ports"].value / 2;
  }

  return (
    <div className="w-[20rem] flex flex-row justify-center">
      <div className="flex flex-col">
        {Object.keys(startItem).length > 0 ? (
          <div id="start">
            <div className="flex flex-row items-end justify-between">
              <p className="font-semibold">Start Port: </p>
              <p className="text-sm">
                {(startItem["Model *"].value + "@ U" + startItem["U Position *"].value).slice(0, 20)}
              </p>
            </div>
            <div
              id="portsList"
              className={"w-[18rem] h-[6rem] overflow-x-scroll border-2 flex flex-col gap-1 justify-center p-1"}>
              <div className="flex gap-1 flex-row">
                {startMap.map((item, index) => {
                  if (index % 2 === 0) {
                    return (
                      <div className="w-[2.5rem] h-[2.5rem] border-2 rounded-md flex flex-row items-center justify-center flex-shrink-0">
                        {item}
                      </div>
                    );
                  }
                })}
              </div>
              <div className="flex gap-1 flex-row">
                {startMap.map((item, index) => {
                  if (index % 2 !== 0) {
                    return (
                      <div className="w-[2.5rem] h-[2.5rem] border-2 rounded-md flex flex-row items-center justify-center flex-shrink-0">
                        {item}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
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
                    <input
                      type={Template.StructuredCabling[item].value}
                      className="h-[2rem] w-[8rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit "
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
        <div className="flex flex-row justify-center">TO</div>

        {Object.keys(endItem).length > 0 ? (
          <div id="start">
            <div className="flex flex-row items-end justify-between">
              <p className="font-semibold">End Port: </p>
              <p className="text-sm">
                {(endItem["Model *"].value + "@ U" + endItem["U Position *"].value).slice(0, 20)}
              </p>
            </div>
            <div
              id="portsList"
              className={"w-[18rem] h-[6rem] overflow-x-scroll border-2 flex flex-col gap-1 justify-center p-1"}>
              <div className="flex gap-1 flex-row">
                {endMap.map((item, index) => {
                  if (index % 2 === 0) {
                    return (
                      <div className="w-[2.5rem] h-[2.5rem] border-2 rounded-md flex flex-row items-center justify-center flex-shrink-0">
                        {item}
                      </div>
                    );
                  }
                })}
              </div>
              <div className="flex gap-1 flex-row">
                {endMap.map((item, index) => {
                  if (index % 2 !== 0) {
                    return (
                      <div className="w-[2.5rem] h-[2.5rem] border-2 rounded-md flex flex-row items-center justify-center flex-shrink-0">
                        {item}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div id="inputs">{/* standard text input that i have used in the project with lable*/}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
