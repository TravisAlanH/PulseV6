import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../Store/Slices/Slice";

export default function Settings() {
  const dispatch = useDispatch();
  const localStorageBool = useSelector((state) => state.data.Settings.localStorage);

  return (
    <div className="flex flex-col border-2 m-2">
      <div className="bg-[#F7F5F1] flex flex-row justify-start h-[3rem] items-center pl-6 text-lg font-bold">
        Settings
      </div>
      <div className="flex flex-col justify-items items-center w-full">
        {/* LOAD LOCAL STORAGE */}
        <div className="flex flex-row justify-start gap-6 px-6 w-[15rem]">
          <div className="py-2 flex flex-row">
            <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[8rem]"}>
              Local Storage
            </label>
            <button
              className="orangeButton"
              onClick={() => {
                dispatch(actions.loadLocalStorage());
              }}>
              Load Data
            </button>
          </div>
        </div>

        {/* LOCAL STORAGE ON OFF */}
        <div className="flex flex-row justify-start  gap-6 px-6 w-[15rem]">
          <div className="py-2 flex flex-row">
            <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[8rem]"}>
              Local ON / OFF
            </label>
            <div className="flex flex-col justify-center pl-2">
              <input
                type="checkbox"
                className="h-[1.4rem] w-[1.4rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit"
                checked={localStorageBool}
                onChange={() => {
                  dispatch(actions.setLocalStorage(!localStorageBool));
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
