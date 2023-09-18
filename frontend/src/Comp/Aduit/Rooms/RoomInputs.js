import React from "react";
import STDInput from "../../Reuse/STDInput";
import { useSelector } from "react-redux";

//* IF SUB LOCATION TYPE === ROW, FILL THE THE PARENT SUBLOCATION SELECTION WITH AISLE OPTIONS

export default function RoomInputs() {
  const Step = "Rooms";

  const Data = useSelector((state) => state.data[Step]);
  const Current = useSelector((state) => state.data.Current[Step]);
  const State = useSelector((state) => state.data[Step][Current]);
  const Keys = Object.keys(State);

  console.log(Data.map((item) => item["Sub Location Name*"]));

  return (
    <div className="flex flex-col">
      {Keys.map((key, index) => {
        if (key === "Parent Sub Location") {
          if (State["Sub Location Type*"].value === "Row") {
            let inputData = {
              type: "select",
              value: "",
              placeholder: "Input Here",
              options: Data.map((item) => item["Sub Location Name*"].value),
              required: false,
              APIMatch: "",
              NEXT: "HOLD FOR ADDITIONAL INFO",
            };
            return (
              <div>
                <label>Parent Sub Location*</label>
                <select>
                  {inputData.options.map((item, index) => {
                    return <option value={item}>{item}</option>;
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
