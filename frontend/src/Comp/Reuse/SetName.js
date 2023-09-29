import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../../Store/Slices/Slice";

export default function SetName({ Step }) {
  const fullState = useSelector((state) => state.data);
  const currentStep = useSelector((state) => state.data.Current[Step]);
  const currentAsset = useSelector((state) => state.data["Assets"][currentStep]);
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
          SetName = //STEP
            (
              "PDU" +
              "-" +
              //CABINET
              (currentRackName.split("-").length > 1 ? currentRackName.split("-")[1] : currentRackName.slice(0, 2)) +
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
              (currentRackName.split("-").length > 1 ? currentRackName.split("-")[1] : currentRackName.slice(0, 2)) +
              "-U" +
              //U POSITION
              currentAsset["U Position *"].value
            ).toUpperCase();
        }

        if (Step === "Racks") {
          Object.keys(fullState).forEach((key) => {
            if (Array.isArray(fullState[key]) && fullState[key].length > 0) {
              for (let i = 0; i < fullState[key].length; i++) {
                if (
                  fullState[key][i].hasOwnProperty("Cabinet *") &&
                  fullState[key][i]["Cabinet *"].value === currentRackName
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
