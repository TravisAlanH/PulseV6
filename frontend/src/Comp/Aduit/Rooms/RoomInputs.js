import React from "react";
import STDInput from "../../Reuse/STDInput";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../../../Store/Slices/Slice";
import AddToStep from "../../Reuse/AddToStep";

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

  let newAisleRow = (
    <div className="w-[14rem] h-[6rem] flex flex-col justify-between">
      <div className="w-full border-2 ">
        <button>Add Row</button>
      </div>
      <div className="">
        <button>A</button>
      </div>
      <div className="w-full border-2">
        <button>Add Row</button>
      </div>
    </div>
  );

  return (
    <div>
      {}
      {newAisleRow}
      {}
    </div>
  );
}
