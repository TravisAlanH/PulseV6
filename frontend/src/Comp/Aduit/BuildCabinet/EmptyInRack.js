import React from "react";
import { useDispatch } from "react-redux";
import * as Actions from "../../../Store/Slices/Slice";

export default function EmptyInRack({ index, depth, side, Type, Chassis, setMLTClass, setChassis, setSideDepth, setUPosition, openAbover }) {
  const dispatch = useDispatch();

  return (
    <div className={"flex flex-row justify-center " + (Type === "Rackable" ? null : "text-vertical")}>
      <button
        className={Type === "Rackable" ? "orangeButton" : "orangeButtonVertical"}
        onClick={() => {
          document.getElementById("ModalRackable").style.display = "block";
          // setMLTClass(Type);
          if (Type === "Blade") {
            setChassis(Chassis);
            const payload = {
              Chassis: Chassis,
              Slot: depth,
            };
            dispatch(Actions.setChassisSlot(payload));
          } else {
            setChassis("");
          }
          setMLTClass(Type);
          setSideDepth({ Depth: depth, Side: side });
          setUPosition(index + 1);
          openAbover(index, depth);
          // setUpdate(!update);
        }}
      >
        <div className={Type === "Rackable" ? "" : "text-vertical"}>
          {Type.includes("Rack PDU") ? Type.replace("Rack", "") : Type} {index + 1 === 0 ? "" : index + 1}
        </div>
      </button>
    </div>
  );
}
