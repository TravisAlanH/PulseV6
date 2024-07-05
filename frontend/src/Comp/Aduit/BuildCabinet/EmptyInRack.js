import React from "react";

export default function EmptyInRack({ index, depth, side, Type, Chassis, setMLTClass, setChassis, setSideDepth, setUPosition, openAbover }) {
  return (
    <div className="flex flex-row justify-center">
      <button
        className={Type === "Rackable" ? "orangeButton" : "orangeButtonVertical"}
        onClick={() => {
          document.getElementById("ModalRackable").style.display = "block";
          // setMLTClass(Type);
          if (Type === "Blade") setChassis(Chassis);
          else setChassis("");
          setMLTClass(Type);
          setSideDepth({ Depth: depth, Side: side });
          setUPosition(index + 1);
          openAbover(index, depth);
          // setUpdate(!update);
        }}
      >
        Open {Type} {index + 1 === 0 ? "" : index + 1}
      </button>
    </div>
  );
}
