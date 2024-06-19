import React from "react";
import { MdFileDownloadDone } from "react-icons/md";

export default function DataFiltered({
  mltFilteredData,
  visable,
  setSelectedMLTItem,
}) {
  const [highlightedRow, setHighlightedRow] = React.useState(-1);

  return (
    <div className="flex flex-col gap-1">
      {mltFilteredData.slice(0, visable).map((item, indexRow) => {
        return (
          <div
            key={indexRow}
            className={"flex flex-row"}
            onClick={() => setHighlightedRow(indexRow)}
          >
            <div className="min-w-[2.8rem] flex flex-row justify-center items-center">
              <button
                className="orangeButton2 "
                onClick={() => {
                  setSelectedMLTItem(item);
                }}
              >
                <MdFileDownloadDone />
              </button>
            </div>
            {Object.keys(item).map((key, index) => {
              if (key === "Height" || key === "Width" || key === "Depth")
                return null;
              return (
                <div
                  key={index}
                  className={
                    "border-2 border-gray-300 min-w-[8rem] max-w-[8rem] text-nowrap overflow-clip" +
                    (highlightedRow === indexRow ? " bg-[#cacaca8f]" : "")
                  }
                >
                  {item[key]}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
