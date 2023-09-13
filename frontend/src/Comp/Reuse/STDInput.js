import React from "react";
import "./input.css";

// use typeof === "type" to conditionaly render different inputs based on type

export default function STDInput({ key, object }) {
  let type = {
    type: "text",
    placeholder: "test",
    value: "",
    onChange: () => {},
  };

  switch (key) {
    case typeof object.key === "string":
      type.type = "text";
      type.placeholder = object.key;
      type.value = object.value;
      break;
    case typeof object.key === "number":
      type.type = "number";
      type.placeholder = object.key;
      type.value = object.value;
      break;
    case typeof object.key === "boolean":
      type.type = "checkbox";
      type.placeholder = object.key;
      type.value = object.value;
      break;
    default:
      break;
  }

  return (
    <div>
      <input
        className="input"
        type={type.type}
        placeholder={type.placeholder}
        value={type.value}
        onChange={type.onChange}
      />
    </div>
  );
}
