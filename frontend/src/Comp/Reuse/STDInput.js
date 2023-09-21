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

  if (Step === "Location") {
    labelSize = "w-[12rem]";
    inputSize = "w-[20rem]";
  }

  let STDInput;
  let typeOf = state[current][keyName].type;

  let payload = {
    Step: Step,
    Current: current,
    Key: keyName,
    value: undefined,
  };

  // switch (typeOf) {
  //   case (typeOf = "select"):
  //     STDInput = (
  //       <select
  //         className="Select"
  //         onChange={(e) => {
  //           payload.value = e.target.value;
  //           dispatch(Actions.changeData(payload));
  //         }}>
  //         {state[current][keyName].options.map((option, index) => (
  //           <option value={option} key={index}>
  //             {option}
  //           </option>
  //         ))}
  //       </select>
  //     );
  //     break;
  //   case (typeOf = "bool"):
  //     STDInput = (
  //       <input
  //         type="checkbox"
  //         value={state[current][keyName].value}
  //         onChange={() => {
  //           payload.value = !state[current][keyName].value;
  //           dispatch(Actions.changeData(payload));
  //         }}
  //       />
  //     );
  //     break;
  //   case (typeOf = "number"):
  //     STDInput = (
  //       <input
  //         value={state[current][keyName].value}
  //         type="number"
  //         placeholder={state[current][keyName].placeholder}
  //         // required={state[current][keyName].required}
  //         onChange={(e) => {
  //           payload.value = parseInt(e.target.value);
  //           dispatch(Actions.changeData(payload));
  //         }}
  //       />
  //     );
  //     break;
  //   default:
  //     STDInput = (
  //       <input
  //         value={state[current][keyName].value}
  //         type="text"
  //         placeholder={state[current][keyName].placeholder}
  //         // required={state[current][keyName].required}
  //         onChange={(e) => {
  //           payload.value = e.target.value;
  //           dispatch(Actions.changeData(payload));
  //         }}
  //       />
  //     );
  //     break;
  // }

  if (typeOf === "bool") {
    STDInput = (
      <input
        type="checkbox"
        value={state[current][keyName].value}
        onChange={() => {
          payload.value = !state[current][keyName].value;
          dispatch(Actions.changeData(payload));
        }}
      />
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
    STDInput = (
      <select
        className={"Select h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit " + inputSize}
        onChange={(e) => {
          payload.value = e.target.value;
          dispatch(Actions.changeData(payload));
        }}>
        {state[current][keyName].options.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
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
  }

  return (
    <div className="flex flex-row">
      <div className="w-[1rem] flex flex-row justify-center items-center text-red-500">
        {keyName.includes("*") ? "*" : ""}
      </div>
      <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center " + labelSize}>
        {Step === "Location" ? keyName.replace("*", "") : keyName.slice(0, 12).replace("*", "")}
      </label>
      {STDInput}
    </div>
  );
}
