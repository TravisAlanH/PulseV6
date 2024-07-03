import React from "react";

export default function BladeView({ SlottedItem, showingFront, setShowingFront }) {
  console.log(showingFront);
  console.log(SlottedItem);

  const frontCountArray = Array.from({ length: SlottedItem["Slots Front"].value }, (_, i) => i + 1);
  const backCountArray = Array.from({ length: SlottedItem["Slots Back"].value }, (_, i) => i + 1);

  const flipCard = {
    background: "transparent",
    width: "200px",
    height: "260px",
    perspective: "1000px",
  };
  const flipCardInner = {
    position: "relative",
    width: "100%",
    height: "100%",
    textAlign: "center",
    // transition: "transform 0.6s",
    transformStyle: "preserve-3d",
  };
  const flipCardFront = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
  };
  const flipCardBack = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    transform: "rotateY(180deg)",
  };

  function HandleFlippingCard() {
    let allCards = document.getElementsByClassName("FlipCardInner");
    for (let i = 0; i < allCards.length; i++) {
      allCards[i].style.transform = showingFront ? "rotateY(180deg)" : "rotateY(0deg)";
    }
    setShowingFront(!showingFront);
  }

  return (
    <div>
      <button className="orangeButton" onClick={() => HandleFlippingCard()}>
        {showingFront ? `Front (${SlottedItem["Slots Back"].value} In Back)` : `Back (${SlottedItem["Slots Front"].value} In Front)`}
      </button>
      <div style={flipCard}>
        <div style={flipCardInner} className="FlipCardInner">
          <div style={flipCardFront} className="">
            <div className="flex flex-row border-2 overflow-auto">{renderSlots()}</div>
          </div>
          <div style={flipCardBack} className="bg-red-300">
            <div className="flex flex-row border-2 overflow-auto">{renderSlots()}</div>
          </div>
        </div>
      </div>
    </div>
  );

  function renderSlots() {
    console.log(frontCountArray, backCountArray);
    return showingFront
      ? frontCountArray.map((slot) => (
          <div key={slot} className="flex flex-row items-center justify-center min-w-[2rem] h-[4rem] border-2 ">
            {slot}
          </div>
        ))
      : backCountArray.map((slot) => (
          <div key={slot} className="flex flex-row items-center justify-center w-[1rem] h-[3rem] border-2">
            {slot}
          </div>
        ));
  }
}
