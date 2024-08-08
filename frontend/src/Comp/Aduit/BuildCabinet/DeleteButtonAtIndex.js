import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../Store/Slices/Slice";

export default function DeleteButtonAtIndex({ item, Step, Current }) {
  const dispatch = useDispatch();
  const payload = {
    item: item,
    Step: Step,
    Current: Current,
  };

  function handleDelete() {
    dispatch(actions.deleteAtIndexUpdateOpenRu(payload));
  }

  return (
    <div>
      <button className="redButton" onClick={() => handleDelete()}>
        Delete At
      </button>
    </div>
  );
}
