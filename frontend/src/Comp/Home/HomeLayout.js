import React from "react";

export default function HomeLayout() {
  return (
    <div className="flex flex-col border-2 m-2">
      <div className="bg-[#F7F5F1] flex flex-row justify-start h-[3rem] items-center pl-6 text-lg font-bold">
        Created Locations
      </div>
      <div className="flex flex-row gap-3 w-full justify-center p-2 border-b-2 mb-2">
        {/* <SetCurrentSelection Step="Location" />
    <AddToStep Step={"Location"} /> */}
      </div>
      <div className="flex flex-row justify-center gap-6 px-6">list of created locations</div>
    </div>
  );
}
