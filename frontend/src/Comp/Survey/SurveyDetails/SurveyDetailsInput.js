import React from "react";
// import STDInput from "../../Reuse/STDInput";
import { useSelector, useDispatch } from "react-redux";
import "./SurveySpreadStyles.css";
import { RiInformationLine } from "react-icons/ri";
import * as actions from "../../../Store/Slices/Slice";
import sort from "../../../Format/DataOrder";

export default function SurveyDetailsInput({ Step }) {
  const Current = useSelector((state) => state.data.Current[Step]);
  const State = useSelector((state) => state.data[Step][Current]);
  console.log(State);
  let Keys = Object.keys(State);

  const dispatch = useDispatch();

  let payload = {
    Step: Step,
    Update: "",
    Key: "",
    value: "",
  };

  sort(Keys, Step);

  return (
    <div className="flex flex-col gap-3">
      {Keys.map((Key, index) => (
        <div key={index} className="flex flex-row items-start border-b-2 pb-2">
          <div className="flex flex-row justify-center items-start">
            <span tooltip={State[Key]["check"]}>
              <RiInformationLine className="w-[2rem] h-[2rem]" />
            </span>
            <div className="w-[1rem] flex flex-row justify-center items-center text-red-500">
              {Key.includes("*") ? "*" : ""}
            </div>
            <label
              className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[10rem] h-[2rem] mr-2"}>
              {Key.replace("*", "")}
            </label>
            <div className="flex lg:flex-row gap-2 flex-col">
              {State[Key]["options"].map((option, index) => (
                <div key={index} className="flex flex-row gap-1 items-center">
                  <input
                    className="w-[1.5rem] h-[1.5rem]"
                    type="radio"
                    name={Key}
                    value={option}
                    checked={State[Key]["value"] === option}
                    onChange={(e) => {
                      if (State[Key].hasOwnProperty("score")) {
                        payload.Update = ["value", "score", "scoreWeight"];
                        payload.Key = Key;
                        if (e.target.value === "Complies") {
                          payload.value = [e.target.value, 0 * State[Key].valueXLate, 0];
                        } else if (e.target.value === "Does Not Comply") {
                          payload.value = [e.target.value, 10 * State[Key].valueXLate, 10];
                        } else {
                          payload.value = [e.target.value, 1 * State[Key].valueXLate, 1];
                        }
                        dispatch(actions.UpdateSurveyData(payload));
                      } else {
                        payload.Update = ["value"];
                        payload.Key = Key;
                        payload.value = [e.target.value];
                        dispatch(actions.UpdateSurveyData(payload));
                      }
                    }}
                  />
                  <label className="text-xs font-bold">{option}</label>
                </div>
              ))}
              {/* </div> */}
            </div>
          </div>
          <div className="flex flex-col">
            {State[Key].type === "select" || State[Key].type === "date" ? null : (
              <input
                type="text"
                className={"h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[15rem]"}
                value={State[Key]["value"]}
                placeholder={State[Key]["placeholder"]}
                onChange={(e) => {
                  payload.Update = ["value"];
                  payload.Key = Key;
                  payload.value = [e.target.value];
                  dispatch(actions.UpdateSurveyData(payload));
                }}
              />
            )}
            {State[Key].type === "date" ? (
              <input
                type="date"
                className={"h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[15rem]"}
                value={State[Key]["value"]}
                placeholder={State[Key]["placeholder"]}
                onChange={(e) => {
                  payload.Update = ["value"];
                  payload.Key = Key;
                  payload.value = [e.target.value];
                  dispatch(actions.UpdateSurveyData(payload));
                }}
              />
            ) : null}
          </div>
          {State[Key].hasOwnProperty("score") ? (
            <div className="flex flex-col text-sm">
              <div>Score: {State[Key].score}</div>
              <div>Weight: {State[Key].scoreWeight}</div>
              <div>Value: {State[Key].valueXLate}</div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
