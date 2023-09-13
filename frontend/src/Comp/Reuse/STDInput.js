import React from "react";
import "./input.css";
import { useSelector, useDispatch } from "react-redux";

// use typeof === "type" to conditionaly render different inputs based on type

export default function STDInput({ keyName, Step }) {
  const state = useSelector((state) => state.data[Step]);
  const current = useSelector((state) => state.data.Current[Step]);
  const dispatch = useDispatch();

  if (keyName === "Status*" || keyName === "# Operation*" || keyName === "*Object*") {
    return null;
  }

  console.log(keyName);

  let STDInput;
  let typeOf = state[current][keyName].type;
  console.log(typeOf);

  switch (typeOf) {
    case (typeOf = "select"):
      STDInput = (
        <select>
          {state[current][keyName].options.map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
        </select>
      );
      break;
    case (typeOf = "bool"):
      STDInput = <input type="checkbox" value={state[current][keyName].value} />;
    default:
      STDInput = (
        <input
          type={state[current][keyName].type}
          defaultValue={state[current][keyName].value}
          placeholder={state[current][keyName].placeholder}
          required={state[current][keyName].required}
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
