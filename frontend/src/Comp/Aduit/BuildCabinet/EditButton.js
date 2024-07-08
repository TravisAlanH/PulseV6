import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../Store/Slices/Slice";

export default function EditButton({ Step, EditIndex }) {
  const dispatch = useDispatch();
  const EditItem = useSelector((state) => state.data[Step][EditIndex]);
  const Current = useSelector((state) => state.data.Current[Step]);
  const CurrentName = useSelector((state) => state.data[Step][Current]["Name *"].value);
  console.log(EditItem);

  function handleDelete() {
    const payload = {
      Step: Step,
      Current: Current,
    };
    dispatch(actions.deleteCurrentIndex(payload));
    document.getElementById("modal" + CurrentName).style.display = "none";
  }

  return (
    <div>
      <button
        className="redButton"
        onClick={() => {
          document.getElementById("modal" + CurrentName).style.display = "block";
        }}
      >
        Delete
      </button>
      <div className={"modal"} id={"modal" + CurrentName}>
        <div className="modal-content">
          <div className="flex flex-col justify-start gap-3">
            <div className="flex flex-row justify-between items-center">
              <div>Message:</div>
              <div className="flex flex-row justify-center gap-3">
                <h2 className="font-bold">Delete: </h2>
                <p>Are you sure you want to delete this item?</p>
                <p>{CurrentName}</p>
              </div>
              <span
                className="close"
                onClick={() => {
                  document.getElementById("modal" + CurrentName).style.display = "none";
                }}
              >
                &times;
              </span>
            </div>

            <div className="flex flex-row justify-center gap-8">
              <div>
                <button
                  className="redButton"
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  Yes
                </button>
              </div>
              <div>
                <button
                  className="orangeButton"
                  onClick={() => {
                    document.getElementById("modal" + CurrentName).style.display = "none";
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
