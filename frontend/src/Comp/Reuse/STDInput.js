import React from "react";
import "./input.css";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../../Store/Slices/Slice";

export default function STDInput({ keyName, Step }) {
  const state = useSelector((state) => state.data[Step]);
  const current = useSelector((state) => state.data.Current[Step]);
  const dispatch = useDispatch();

  if (keyName === "Status*" || keyName === "# Operation*" || keyName === "Object*") {
    return null;
  }

  let STDInput;
  let typeOf = state[current][keyName].type;

  let payload = {
    Step: Step,
    Current: current,
    Key: keyName,
    value: undefined,
  };

  switch (typeOf) {
    case (typeOf = "select"):
      STDInput = (
        <select
          className="Select"
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
      break;
    case (typeOf = "bool"):
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
      break;
    case (typeOf = "number"):
      STDInput = (
        <input
          value={state[current][keyName].value}
          type="number"
          placeholder={state[current][keyName].placeholder}
          required={state[current][keyName].required}
          onChange={(e) => {
            payload.value = parseInt(e.target.value);
            dispatch(Actions.changeData(payload));
          }}
        />
      );
      break;
    default:
      STDInput = (
        <input
          value={state[current][keyName].value}
          type={state[current][keyName].type}
          placeholder={state[current][keyName].placeholder}
          required={state[current][keyName].required}
          onChange={(e) => {
            payload.value = e.target.value;
            dispatch(Actions.changeData(payload));
          }}
        />
      );
      break;
  }

  return (
    <div>
      <label>{keyName}</label>
      {STDInput}
    </div>
  );
}
