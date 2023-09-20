import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../Store/Slices/Slice";

export default function AddToStep({ Step }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.data[Step]);

  let payload = {
    Step: Step,
  };

  return (
    <button
      className="orangeButton"
      onClick={() => {
        dispatch(actions.addToStep(payload));
        payload = {
          Step: Step,
          value: state.length,
        };
        dispatch(actions.updateCurrent(payload));
      }}>
      Add {Step === "Racks" ? "Cabinet" : Step}
    </button>
  );
}
