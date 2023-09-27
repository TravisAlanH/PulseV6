import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../../Store/Slices/Slice";

export default function SetName({ Step }) {
  const currentStep = useSelector((state) => state.data.Current[Step]);
  const currentRack = useSelector((state) => state.data.Current["Racks"]);
  const currentRackName = useSelector((state) => state.data.Racks[currentRack]["Name *"].value);
  const currentLocationName = useSelector((state) => state.data.Location[0]["dcTrack Location Code *"].value);
  const currentPDU = useSelector((state) => state.data.Current["PDUs"]);
  const PDU = useSelector((state) => state.data.PDUs[currentPDU]);
  const dispatch = useDispatch();

  let SetName = "";

  return (
    <button
      className="orangeButton w-[4rem]"
      onClick={() => {
        if (Step === "Racks") {
          SetName = (
            "CAB-A" +
            (currentStep + 1) +
            (currentLocationName !== "" ? "-" + currentLocationName.slice(0, 2) : "")
          ).toUpperCase();
        }
        if (Step === "PDUs") {
          SetName = (
            "PDU" +
            "-" +
            (currentRackName.split("-").length > 0 ? currentRackName.split("-")[1] : currentRackName.split(0, 2)) +
            (PDU["Cabinet Side *"].value === ""
              ? ""
              : "-" + PDU["Cabinet Side *"].value.slice(0, 1) + PDU["Depth Position *"].value.slice(0, 1)) +
            (PDU["U Position *"].value === 1 ? "" : "-U" + PDU["U Position *"].value)
          ).toUpperCase();
        }
        let payload = {
          Step: Step,
          Current: currentStep,
          Key: "Name *",
          value: SetName,
        };
        dispatch(Actions.changeData(payload));
      }}>
      Fill
    </button>
  );
}
