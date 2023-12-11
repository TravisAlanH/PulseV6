import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../Store/Slices/Slice";

export default function CreateNewButton({ Step }) {
  const dispatch = useDispatch();

  let payload = {
    Step: Step,
  };

  return (
    <button
      id="CreateNewButton"
      className="orangeButton"
      onClick={() => {
        dispatch(actions.addToNewItem(payload));
      }}>
      {"Create Missing " + (Step === "Racks" ? "Cabinet" : Step) + "not in MLT"}
    </button>
  );
}
