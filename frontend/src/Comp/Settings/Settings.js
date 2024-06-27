import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../Store/Slices/Slice";
import NamingCons from "./NamingCons";

export default function Settings() {
  const dispatch = useDispatch();
  const localStorageBool = true;
  console.log(localStorageBool);

  return (
    <div className="flex flex-col border-2 m-2">
      <div className="bg-[#F7F5F1] flex flex-row justify-start h-[3rem] items-center pl-6 text-lg font-bold">
        Settings
      </div>
      <div className="flex flex-col justify-items items-center w-full">
        {/* LOAD LOCAL STORAGE */}
        <div className="w-full">
          <label
            className={
              "text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[8rem]"
            }
          >
            Name Convention
          </label>
          <div>
            <NamingCons />
          </div>
        </div>
        {/* <div className="flex flex-row justify-start gap-6 px-6 w-[15rem]">
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
        </div> */}

        {/* LOCAL STORAGE ON OFF */}
        <div className="flex flex-row justify-start  gap-6 px-6 w-[15rem]">
          <div className="py-2 flex flex-row">
            <label
              className={
                "text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[8rem]"
              }
            >
              {
                "Local ON / OFF (Turns off local storage and resets data on refresh)"
              }
            </label>
            <div className="flex flex-col justify-center pl-2">
              <input
                type="checkbox"
                className="h-[1.4rem] w-[1.4rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit"
                checked={localStorageBool}
                onChange={() => {
                  let payload = {
                    value: !localStorageBool,
                  };
                  dispatch(actions.setLocalStorage(payload));
                }}
              />
            </div>
          </div>
        </div>
        {/* CLEAR LOCAL STORAGE AND DATA */}
        <div className="flex flex-row justify-start gap-6 px-6 w-[15rem]">
          <div className="py-2 flex flex-row">
            <label
              className={
                "text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[8rem]"
              }
            >
              Clear Data
            </label>
            <button
              className="redButton"
              onClick={() => {
                dispatch(actions.clearData());
              }}
            >
              Reset All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
