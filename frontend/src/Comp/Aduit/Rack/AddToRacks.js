import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../Store/Slices/Slice";
import "../../../Styles/Inputs.css";

export default function AddToRacks({ Step, index }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.data[Step]);
  // const currentAsset = useSelector((state) => state.data.Current["Assets"]);
  const currentRacks = useSelector((state) => state.data.Current["Racks"]);
  const RackState = useSelector((state) => state.data["Racks"][currentRacks]);

  let payload = {
    Step: Step,
  };

  return (
    <button
      className="orangeButton"
      onClick={() => {
        payload = {
          Step: Step,
          UPosition: index,
          Cabinet: RackState["Name *"].value,
          value: state.length,
        };
        dispatch(actions.addToRacks(payload));
        dispatch(actions.updateCurrent(payload));
        // setTimeout(() => {
        //   payload = {
        //     Step: Step,
        //     Current: currentAsset,
        //     Key: "U Position*",
        //     value: index,
        //   };
        //   dispatch(actions.changeData(payload));
        //   payload = {
        //     Step: Step,
        //     Current: currentAsset,
        //     Key: "Cabinet*",
        //     value: RackState["Name *"].value,
        //   };
        //   dispatch(actions.changeData(payload));
        // }, 200);
      }}>
      Add to UP
    </button>
  );
}
