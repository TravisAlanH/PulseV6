import React from "react";

export default function StructuredCablingInput({ startItem, endItem }) {
  console.log(startItem);

  return (
    <div className="w-[20rem] flex flex-row justify-center">
      <div className="flex lg:flex-row flex-col">
        {Object.keys(startItem).length > 0 ? (
          <div id="start">
            start
            <div id="port" className="grid grid-cols-4">
              {startItem["Ports"].options.map((item, index) => {
                if (item === startItem["Ports"].value) {
                  return (
                    <div className="w-[2rem] h-[2rem] rounded-md bg-[#F3EEE7] flex flex-row justify-center items-center">
                      {item}
                    </div>
                  );
                } else {
                  return (
                    <div className="w-[2rem] h-[2rem] rounded-md  flex flex-row justify-center items-center">
                      {item}
                    </div>
                  );
                }
              })}
            </div>
            <div id="inputs"></div>
          </div>
        ) : null}

        <div id="end"></div>
      </div>
    </div>
  );
}
