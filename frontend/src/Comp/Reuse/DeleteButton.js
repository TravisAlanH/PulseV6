import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../Store/Slices/Slice";

export default function DeleteButton({ Step }) {
  const DeleteAction = actions.deleteCurrentIndex;

  const dispatch = useDispatch();
  const current = useSelector((state) => state.data.Current[Step]);
  const state = useSelector((state) => state.data[Step][current]);

  return (
    <button
      className="redButton"
      onClick={() => {
        dispatch(DeleteAction({ Step: Step, Current: current }));
      }}
    >
      Delete at {state["U Position *"].value}
    </button>
  );
}
