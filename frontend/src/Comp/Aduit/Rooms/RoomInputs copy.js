import React from "react";
import STDInput from "../../Reuse/STDInput";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../../../Store/Slices/Slice";

//* IF SUB LOCATION TYPE === ROW, FILL THE THE PARENT SUBLOCATION SELECTION WITH AISLE OPTIONS

export default function RoomInputs() {
  const dispatch = useDispatch();

  const Step = "Rooms";

  const Data = useSelector((state) => state.data[Step]);
  const current = useSelector((state) => state.data.Current[Step]);
  const State = useSelector((state) => state.data[Step][current]);
  const Keys = Object.keys(State);

  let payload = {
    Step: Step,
    Current: current,
    Key: undefined,
    value: undefined,
  };

  return (
    <div className="flex flex-col">
      {Keys.map((key, index) => {
        if (key === "Parent Sub Location") {
          if (State["Sub Location Type*"].value === "Row") {
            let ailes = Data.filter((item) => item["Sub Location Type*"].value === "Aisle");
            let inputData = {
              type: "select",
              value: "",
              placeholder: "Input Here",
              options: ailes.map((item) => item["Sub Location Name*"].value),
              required: false,
              APIMatch: "",
              NEXT: "HOLD FOR ADDITIONAL INFO",
            };
            return (
              <div key={index}>
                <label>Parent Sub Location*</label>
                <select
                  className="Select"
                  onChange={(e) => {
                    payload.Key = "Parent Sub Location";
                    payload.value = e.target.value;
                    dispatch(Actions.changeData(payload));
                  }}>
                  <option value="" disabled selected>
                    Select
                  </option>
                  {inputData.options.map((item, index) => {
                    return (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
            );
          } else return;
        }
        return (
          //* USE STDINPUT FOR PARENT SUBLOCATION BUT USE THE IF LOCATION TYPE === ROW AS LISTED ABOVE
          <STDInput key={index} keyName={key} Step={Step} />
        );
      })}
    </div>
  );
}
