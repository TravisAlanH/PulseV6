import React from "react";

export default function PanRecepLayout() {
  const Step = "Panels & Receptacles";

  return (
    <div className="flex flex-col border-2 m-2">
      <div className="bg-[#F7F5F1] flex flex-row justify-start h-[3rem] items-center pl-6 text-lg font-bold">
        {Step === "Racks" ? "Cabinet" : Step}
      </div>
      <div className="flex flex-row gap-3 w-full justify-center p-2 border-b-2 mb-2">
        <p>Selections</p>
      </div>
      <div></div>
      <div className="flex flex-row justify-center lg:justify-center gap-6 px-6">
        <p>Left</p>
        <p>Right</p>
      </div>
    </div>
  );
}
