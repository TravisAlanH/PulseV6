import React from "react";
import EmptyInRack from "./EmptyInRack";

export default function BladeView({ SlottedItem, showingFront, Step, setShowingFront, setMLTClass, setChassis, setSideDepth, setUPosition, openAbover }) {
  const frontCountArray = Array.from({ length: SlottedItem["Slots Front"].value }, (_, i) => i + 1);
  const backCountArray = Array.from({ length: SlottedItem["Slots Back"].value }, (_, i) => i + 1);

  return (
    <div>
      <button className="orangeButton" onClick={() => setShowingFront(!showingFront)}>
        {showingFront ? `Front (${SlottedItem["Slots Back"].value} In Back)` : `Back (${SlottedItem["Slots Front"].value} In Front)`}
      </button>
      <div className="h-[10rem]">
        <div className="FlipCardInner">
          {showingFront ? (
            <div className="flex flex-row border-2 overflow-auto w-[17rem]">{renderSlots()}</div>
          ) : (
            <div className="flex flex-row border-2 overflow-auto">{renderSlots()}</div>
          )}
        </div>
      </div>
    </div>
  );

  function renderSlots() {
    console.log(frontCountArray, backCountArray);
    return showingFront
      ? frontCountArray.map((slot, index) => (
          <div key={slot} className="flex flex-row items-start justify-center min-w-[2rem] h-[10rem] border-2 ">
            <div className="flex flex-col justify-start">
              <p>{slot}</p>
              <div className="text-vertical">
                <EmptyInRack
                  index={-1}
                  CabinetSide={"Front"}
                  DepthPosition={slot}
                  Type={"Blade"}
                  Step={Step}
                  setMLTClass={setMLTClass}
                  setChassis={setChassis}
                  setSideDepth={setSideDepth}
                  setUPosition={setUPosition}
                  openAbover={openAbover}
                />
              </div>
            </div>
          </div>
        ))
      : backCountArray.map((slot) => (
          <div key={slot} className="flex flex-row items-center justify-center w-[1rem] h-[7rem] border-2">
            {slot}
          </div>
        ));
  }
}
