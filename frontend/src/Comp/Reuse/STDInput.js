import React from "react";
import "./input.css";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../../Store/Slices/Slice";

export default function STDInput({ keyName, Step }) {
  const state = useSelector((state) => state.data[Step]);
  const current = useSelector((state) => state.data.Current[Step]);
  const dispatch = useDispatch();

  if (keyName === "Status *" || keyName === "# Operation *" || keyName === "Object *") {
    return null;
  }

  let labelSize = "w-[6rem]";
  let inputSize = "w-[13rem]";

  let ShowAll = false;

  if (Step === "Location" || Step.includes("Survey")) {
    labelSize = "w-[12rem]";
    inputSize = "w-[20rem]";
    ShowAll = true;
  }

  let STDInput;
  let typeOf = state[current][keyName].type;

  let payload = {
    Step: Step,
    Current: current,
    Key: keyName,
    value: undefined,
  };

  if (typeOf === "bool") {
    STDInput = (
      <div className="flex flex-col justify-center pl-2">
        <input
          type="checkbox"
          className="h-[1.4rem] w-[1.4rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit"
          checked={state[current][keyName].value}
          onChange={() => {
            payload.value = !state[current][keyName].value;
            dispatch(Actions.changeData(payload));
          }}
        />
      </div>
    );
  } else if (typeOf === "number") {
    STDInput = (
      <input
        className={"h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit " + inputSize}
        value={state[current][keyName].value}
        type="number"
        placeholder={state[current][keyName].placeholder}
        // required={state[current][keyName].required}
        onChange={(e) => {
          payload.value = parseInt(e.target.value);
          dispatch(Actions.changeData(payload));
        }}
      />
    );
  } else if (typeOf === "select") {
    const SelectedValue = state[current][keyName].value;
    let selectedIndex = state[current][keyName].options.indexOf(SelectedValue);
    if (selectedIndex === -1) {
      selectedIndex = 0;
    }

    STDInput = (
      <select
        defaultValue={SelectedValue}
        className={"Select h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit " + inputSize}
        onChange={(e) => {
          payload.value = e.target.value;
          dispatch(Actions.changeData(payload));
        }}>
        {state[current][keyName].options.map((option, index) => {
          // if (index === selectedIndex) {
          //   return (
          //     <option value={option} key={index} selected>
          //       {option}
          //     </option>
          //   );
          // } else {
          //   return (
          //     <option value={option} key={index}>
          //       {option}
          //     </option>
          //   );
          // }
          return (
            <option value={option} key={index}>
              {option}
            </option>
          );
        })}
      </select>
    );
  } else if (typeOf === "text") {
    STDInput = (
      <input
        className={"h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit " + inputSize}
        value={state[current][keyName].value}
        type="text"
        disabled={state[current][keyName].disabled ? true : false}
        placeholder={state[current][keyName].placeholder}
        // required={state[current][keyName].required}
        onChange={(e) => {
          payload.value = e.target.value;
          dispatch(Actions.changeData(payload));
        }}
      />
    );
  } else if (typeOf === "date") {
    STDInput = (
      <input
        className={"h-[2rem] w-[13rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit " + inputSize}
        value={state[current][keyName].value}
        type="date"
        placeholder={state[current][keyName].placeholder}
        // required={state[current][keyName].required}
        onChange={(e) => {
          payload.value = e.target.value;
          dispatch(Actions.changeData(payload));
        }}
      />
    );
  } else if (typeOf === "GPS") {
    function showPosition(position) {
      payload.value = position.coords.latitude + ", " + position.coords.longitude;
    }

    STDInput = (
      <button
        className="orangeButton"
        onClick={() => {
          //
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else {
          }
          // if ("geolocation" in navigator) {
          //   navigator.geolocation.getCurrentPosition(
          //     (position) => {
          //       const latitude = position.coords.latitude;
          //       const longitude = position.coords.longitude;
          //       payload.value = `Latitude: ${latitude}, Longitude: ${longitude}`;
          //     },
          //     (error) => {
          //       payload.value = `Error: ${error.message}`;
          //     }
          //   );
          // } else {
          //   payload.value = "Not Available";
          // }
          //
          dispatch(Actions.changeData(payload));
        }}>
        {state[current][keyName].value}
      </button>
    );
  } else if (typeOf === "textarea") {
    STDInput = (
      <textarea
        className={"px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit "}
        value={state[current][keyName].value}
        rows="4"
        cols="50"
        placeholder={state[current][keyName].placeholder}
        // required={state[current][keyName].required}
        onChange={(e) => {
          payload.value = e.target.value;
          dispatch(Actions.changeData(payload));
        }}></textarea>
    );
  }

  return (
    <div className="flex flex-row">
      <div className="w-[1rem] flex flex-row justify-center items-center text-red-500">
        {keyName.includes("*") ? "*" : ""}
      </div>
      <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center " + labelSize}>
        {ShowAll ? keyName.replace("*", "") : keyName.slice(0, 12).replace("*", "")}
      </label>
      {STDInput}
    </div>
  );
}
