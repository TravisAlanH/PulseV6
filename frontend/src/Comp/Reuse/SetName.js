import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../../Store/Slices/Slice";

export default function SetName({ Step }) {
  const fullState = useSelector((state) => state.data);
  const currentStep = useSelector((state) => state.data.Current[Step]);
  const currentAsset = useSelector((state) => state.data["Assets"][currentStep]);

  const currentRack = useSelector((state) => state.data.Current["Racks"]);
  const racks = useSelector((state) => state.data.Racks);

  const currentLocation = useSelector((state) => state.data["Location"][0]);
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
            (currentLocation["dcTrack Location Code *"].value !== ""
              ? "-" + currentLocation["dcTrack Location Code *"].value.slice(0, 2)
              : "")
          ).toUpperCase();
        }
        if (Step === "PDUs") {
          SetName = //STEP
            (
              "PDU" +
              "-" +
              //CABINET
              (racks[currentRack]["Name *"].value.split("-").length > 1
                ? racks[currentRack]["Name *"].value.split("-")[1]
                : racks[currentRack]["Name *"].value.slice(0, 2)) +
              (PDU["Cabinet Side *"].value === ""
                ? ""
                : "-" +
                  //CABINET SIDE or UP
                  PDU["Cabinet Side *"].value.slice(0, 1) +
                  PDU["Depth Position *"].value.slice(0, 1)) +
              (PDU["U Position *"].value === 1 ? "" : "-U" + PDU["U Position *"].value)
            ).toUpperCase();
        }
        if (Step === "Assets") {
          SetName = //CABINET
            (
              "DEV-" +
              (racks[currentRack]["Name *"].value.split("-").length > 1
                ? racks[currentRack]["Name *"].value.split("-")[1]
                : racks[currentRack]["Name *"].value.slice(0, 2)) +
              "-U" +
              //U POSITION
              currentAsset["U Position *"].value
            ).toUpperCase();
        }
        if (Step === "ATSs") {
          SetName = //CABINET
            (
              "ATS-" +
              (racks[currentRack]["Name *"].value.split("-").length > 1
                ? racks[currentRack]["Name *"].value.split("-")[1]
                : racks[currentRack]["Name *"].value.slice(0, 2)) +
              "-U" +
              //U POSITION
              currentAsset["U Position *"].value
            ).toUpperCase();
        }
        if (Step === "UPSs") {
          SetName = //CABINET
            (
              "UPS-" +
              (racks[currentRack]["Name *"].value.split("-").length > 1
                ? racks[currentRack]["Name *"].value.split("-")[1]
                : racks[currentRack]["Name *"].value.slice(0, 2)) +
              "-U" +
              //U POSITION
              currentAsset["U Position *"].value
            ).toUpperCase();
        }

        // This error is because the rack name is being set before
        if (Step === "Racks") {
          Object.keys(fullState).forEach((key) => {
            if (Array.isArray(fullState[key]) && fullState[key].length > 0) {
              for (let i = 0; i < fullState[key].length; i++) {
                if (
                  fullState[key][i].hasOwnProperty("Cabinet *") &&
                  fullState[key][i]["Cabinet *"].value === racks[currentRack]["Name *"].value
                ) {
                  let payload = {};
                  payload.value = SetName;
                  payload.Step = key;
                  payload.Current = i;
                  payload.Key = "Cabinet *";
                  dispatch(Actions.changeData(payload));
                }
              }
            }
          });
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
