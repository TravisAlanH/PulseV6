import React from "react";
import "./input.css";
import { useSelector } from "react-redux";
// import * as Actions from "../../Store/Slices/Slice";
import Scanner from "./Scanner";
// import SetName from "./SetName";
// import { set } from "firebase/database";

export default function STDInput({ keyName, Step, newMLT, setNewMLT }) {
  const state = useSelector((state) => state.data[Step]);
  const current = useSelector((state) => state.data.Current[Step]);
  // const fullState = useSelector((state) => state.data);
  const currentRack = useSelector((state) => state.data.Current["Racks"]);
  const OpenRU = useSelector((state) => state.data.OpenRU);
  // const dispatch = useDispatch();

  let OpenRUHold = [];
  if (OpenRU.length > 0) OpenRUHold = [...OpenRU[currentRack].value];

  // let payload = {
  //   Step: Step,
  //   Current: current,
  //   Key: keyName,
  //   value: undefined,
  // };

  if (
    keyName === "Status *" ||
    keyName === "# Operation *" ||
    keyName === "Object *" ||
    keyName.includes("!!!")
  ) {
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

  if (Step === "Panels" || Step === "Receptacles") {
    labelSize = "w-[8rem]";
    inputSize = "w-[13rem]";
    inputSizeWithButton = "w-[9rem]";
    ShowAll = true;
  }

  let STDInput;
  let typeOf = state[current][keyName].type;

  if (typeOf === "number") {
    STDInput = (
      <input
        className={
          "h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit " +
          inputSize
        }
        value={newMLT[keyName].value}
        type="number"
        id={keyName + Step}
        disabled={state[current][keyName].disabled ? true : false}
        placeholder={state[current][keyName].placeholder}
        // required={state[current][keyName].required}
        onChange={(e) => {
          let holdUP = state[current][keyName].value;
          if (e.target.value === "") e.target.value = "";
          if (keyName === "U Position *") {
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
              setNewMLT((prevState) => ({
                ...prevState,
                [keyName]: { ...prevState[keyName], value: e.target.value },
              }));
            } else {
              setNewMLT((prevState) => ({
                ...prevState,
                [keyName]: { ...prevState[keyName], value: e.target.value },
              }));
              let Input = document.getElementById(keyName + Step);
              Input.value = holdUP;
              Input.blur();
              alert("Not enough space");
            }
          } else {
            setNewMLT((prevState) => ({
              ...prevState,
              [keyName]: { ...prevState[keyName], value: e.target.value },
            }));
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

    STDInput = (
      <select
        className={
          "Select h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit " +
          inputSize
        }
        onChange={(e) => {
          setNewMLT((prevState) => ({
            ...prevState,
            [keyName]: { ...prevState[keyName], value: e.target.value },
          }));
        }}
      >
        {newMLT[keyName].options.map((option, index) => {
          if (index === selectedIndex) {
            return (
              <option value={option} key={index} selected={true}>
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
        })}
      </select>
    );
  } else if (typeOf === "text") {
    STDInput = (
      <input
        id={keyName + Step}
        className={
          "h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit " +
          inputSize
        }
        value={newMLT[keyName].value}
        type="text"
        disabled={state[current][keyName].disabled ? true : false}
        placeholder={state[current][keyName].placeholder}
        // required={state[current][keyName].required}
        onChange={(e) => {
          if (keyName === "Name *") {
            document.getElementById("NameRequired").style.opacity = "0";
          }
          setNewMLT((prevState) => ({
            ...prevState,
            [keyName]: { ...prevState[keyName], value: e.target.value },
          }));
        }}
      />
    );
  } else if (typeOf === "date") {
    STDInput = (
      <input
        className={
          "h-[2rem] w-[13rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit " +
          inputSize
        }
        value={newMLT[keyName].value}
        type="date"
        placeholder={state[current][keyName].placeholder}
        // required={state[current][keyName].required}
        onChange={(e) => {
          setNewMLT((prevState) => ({
            ...prevState,
            [keyName]: { ...prevState[keyName], value: e.target.value },
          }));
        }}
      />
    );
  } else if (typeOf === "textarea") {
    STDInput = (
      <textarea
        className={"px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit "}
        value={newMLT[keyName].value}
        rows="4"
        cols="50"
        placeholder={state[current][keyName].placeholder}
        onChange={(e) => {
          setNewMLT((prevState) => ({
            ...prevState,
            [keyName]: { ...prevState[keyName], value: e.target.value },
          }));
        }}
      ></textarea>
    );
  } else if (typeOf === "Scan") {
    STDInput = (
      <div className="flex flex-row">
        <input
          className={
            "h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit " +
            inputSizeWithButton
          }
          value={newMLT[keyName].value}
          type="text"
          disabled={state[current][keyName].disabled ? true : false}
          placeholder={state[current][keyName].placeholder}
          // required={state[current][keyName].required}
          onChange={(e) => {
            setNewMLT((prevState) => ({
              ...prevState,
              [keyName]: { ...prevState[keyName], value: e.target.value },
            }));
          }}
        />
        <Scanner keyName={keyName} Step={Step} />
      </div>
    );
  }

  return (
    <div className="flex md:flex-row lg:flex-row flex-row justify-start">
      <div className="flex flex-row">
        <div className="w-[1rem] flex flex-row justify-center items-center text-red-500">
          {keyName.includes("*") ? "*" : ""}
        </div>
        <label
          className={
            "text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center " +
            labelSize
          }
        >
          {ShowAll
            ? keyName.replace("*", "")
            : keyName.slice(0, 12).replace("*", "")}
        </label>
      </div>
      <div className="">{STDInput}</div>
    </div>
  );
}
