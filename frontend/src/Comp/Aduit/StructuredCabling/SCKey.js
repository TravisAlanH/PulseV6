import React from "react";

export default function SCKey() {
  return (
    <div className="flex flex-row gap-3 justify-center">
      <div className="flex flex-col items-center justify-center">
        <button className="selectedPort w-[2.5rem] h-[2.5rem] border-2 rounded-md" disabled={true}>
          #
        </button>
        <p className="text-sm">Selected</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <button className="border-2 rounded-md w-[2.5rem] h-[2.5rem]" disabled={true}>
          #
        </button>
        <p className="text-sm">No Connection</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <button className="border-2 rounded-full w-[2.5rem] h-[2.5rem]" disabled={true}>
          #
        </button>
        <p className="text-sm">Filled</p>
      </div>
    </div>
  );
}
