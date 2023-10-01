import React from "react";
import "./input.css";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../../Store/Slices/Slice";
import Scanner from "./Scanner";
import SetName from "./SetName";

export default function STDInput({ keyName, Step }) {
  const state = useSelector((state) => state.data[Step]);
  const current = useSelector((state) => state.data.Current[Step]);
  const fullState = useSelector((state) => state.data);

  const currentRack = useSelector((state) => state.data.Current["Racks"]);
  const OpenRU = useSelector((state) => state.data.OpenRU);
  const dispatch = useDispatch();

  let OpenRUHold = [];
  if (OpenRU.length > 0) OpenRUHold = [...OpenRU[currentRack]];

  let payload = {
    Step: Step,
    Current: current,
    Key: keyName,
    value: undefined,
  };

  if (keyName === "Status *" || keyName === "# Operation *" || keyName === "Object *" || keyName.includes("!!!")) {
    return null;
  }

  let labelSize = "w-[6rem]";
  let inputSize = "w-[13rem]";
  let inputSizeWithButton = "w-[9rem]";

  let ShowAll = false;

  if (Step === "Location" || Step.includes("Survey") || Step.includes("New")) {
    labelSize = "w-[12rem]";
    inputSize = "w-[20rem]";
    inputSizeWithButton = "w-[16rem]";
    ShowAll = true;
  }

  let STDInput;
  let typeOf = state[current][keyName].type;

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
        id={keyName + Step}
        disabled={state[current][keyName].disabled ? true : false}
        placeholder={state[current][keyName].placeholder}
        // required={state[current][keyName].required}
        onChange={(e) => {
          if (e.target.value === "") e.target.value = "";
          if (keyName === "U Position *") {
            let holdUP = state[current][keyName].value;
            for (let i = 0; i < state[current]["RU Height"].value; i++) {
              OpenRUHold[holdUP - 1 + i] = 0;
            }
            let fit = true;
            for (let i = 0; i < state[current]["RU Height"].value; i++) {
              if (OpenRUHold[e.target.value - 1 + i] === 1) {
                fit = false;
              }
            }
            if (fit) {
              payload.value = parseInt(e.target.value);
              dispatch(Actions.changeData(payload));
            } else {
              payload.value = holdUP;
              dispatch(Actions.changeData(payload));
              let Input = document.getElementById(keyName + Step);
              Input.value = holdUP;
              Input.blur();
              alert("Not enough space");
            }
          } else {
            payload.value = parseInt(e.target.value);
            dispatch(Actions.changeData(payload));
          }
        }}
      />
    );
  } else if (typeOf === "select") {
    const SelectedValue = state[current][keyName].value;
    let selectedIndex = state[current][keyName].options.indexOf(SelectedValue);
    if (selectedIndex === -1) {
      selectedIndex = 0;
    }
    // console.log("selectedIndex", selectedIndex);
    // console.log("SelectedValue", SelectedValue);

    STDInput = (
      <select
        className={"Select h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit " + inputSize}
        onChange={(e) => {
          payload.value = e.target.value;
          dispatch(Actions.changeData(payload));
        }}>
        {state[current][keyName].options.map((option, index) => {
          if (index === selectedIndex) {
            return (
              <option value={option} key={index} selected>
                {option}
              </option>
            );
          } else {
            return (
              <option value={option} key={index}>
                {option}
              </option>
            );
          }
          // return (
          //   <option value={option} key={index}>
          //     {option}
          //   </option>
          // );
        })}
      </select>
    );
  } else if (typeOf === "text") {
    if (keyName === "Name *" && Step !== "Racks") {
      STDInput = (
        <div>
          <input
            id={keyName + Step}
            className={"h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit " + inputSizeWithButton}
            value={state[current][keyName].value}
            type="text"
            disabled={state[current][keyName].disabled ? true : false}
            placeholder={state[current][keyName].placeholder}
            // required={state[current][keyName].required}
            onChange={(e) => {
              if (keyName === "Name *") {
                document.getElementById("NameRequired").style.opacity = "0";
              }
              payload.value = e.target.value;
              dispatch(Actions.changeData(payload));
            }}
          />
          <SetName Step={Step} keyName={keyName} />
        </div>
      );
    } else if (keyName === "Name *" && Step === "Racks") {
      STDInput = (
        <div>
          <input
            id={keyName + Step}
            className={"h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit " + inputSizeWithButton}
            value={state[current][keyName].value}
            type="text"
            disabled={state[current][keyName].disabled ? true : false}
            placeholder={state[current][keyName].placeholder}
            // required={state[current][keyName].required}
            onChange={(e) => {
              console.log("e.target.value", e.target.value);
              let CurrentRackName = fullState.Racks[fullState.Current.Racks]["Name *"].value;
              if (keyName === "Name *") {
                document.getElementById("NameRequired").style.opacity = "0";
              }
              payload.value = e.target.value;
              dispatch(Actions.changeData(payload));
              Object.keys(fullState).forEach((key) => {
                if (Array.isArray(fullState[key]) && fullState[key].length > 0) {
                  for (let i = 0; i < fullState[key].length; i++) {
                    if (
                      fullState[key][i].hasOwnProperty("Cabinet *") &&
                      fullState[key][i]["Cabinet *"].value === CurrentRackName
                    ) {
                      payload.value = e.target.value;
                      payload.Step = key;
                      payload.Current = i;
                      payload.Key = "Cabinet *";
                      dispatch(Actions.changeData(payload));
                    }
                  }
                }
              });
            }}
          />
          <SetName Step={Step} keyName={keyName} />
        </div>
      );
    } else {
      STDInput = (
        <input
          id={keyName + Step}
          className={"h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit " + inputSize}
          value={state[current][keyName].value}
          type="text"
          disabled={state[current][keyName].disabled ? true : false}
          placeholder={state[current][keyName].placeholder}
          // required={state[current][keyName].required}
          onChange={(e) => {
            if (keyName === "Name *") {
              document.getElementById("NameRequired").style.opacity = "0";
            }
            payload.value = e.target.value;
            dispatch(Actions.changeData(payload));
          }}
        />
      );
    }
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
  } else if (typeOf === "Scan") {
    STDInput = (
      <div className="flex flex-row">
        <input
          className={"h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit " + inputSizeWithButton}
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
        <Scanner keyName={keyName} Step={Step} />
      </div>
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
