import React from "react";
import EmptyInRack from "./EmptyInRack";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import ScrollableText from "./ScrollableText";
import EditButton from "./EditButton";
import * as Actions from "../../../Store/Slices/Slice";

export default function BladeView({ SlottedItem, showingFront, Step, setShowingFront, setMLTClass, setChassis, setSideDepth, setUPosition, openAbover }) {
  const Dispatch = useDispatch();
  const AllBlades = useSelector((state) => state.data.Blades);
  // console.log(AllBlades);
  const frontCountArray = Array.from({ length: SlottedItem["Slots Front"].value }, (_, i) => i + 1);
  const backCountArray = Array.from({ length: SlottedItem["Slots Back"].value }, (_, i) => i + 1);
  const [openBlade, setOpenBlade] = React.useState(-1);

  const SlottedBlades = AllBlades.filter((blade) => blade["Chassis *"].value === SlottedItem["Name *"].value);
  const SlottedBladesFront = SlottedBlades.filter((blade) => blade["Chassis Face *"].value === "Front");
  const SlottedBladesBack = SlottedBlades.filter((blade) => blade["Chassis Face *"].value === "Back");

  return (
    <div className="py-1">
      <button className={showingFront ? "orangeButton" : "grayButton"} disabled={showingFront} onClick={() => setShowingFront(!showingFront)}>
        {`Front (${SlottedItem["Slots Front"].value})`}
      </button>
      <button className={!showingFront ? "orangeButton" : "grayButton"} disabled={!showingFront} onClick={() => setShowingFront(!showingFront)}>
        {`Back (${SlottedItem["Slots Back"].value})`}
      </button>
      <div className="h-[10rem]">
        <div className="FlipCardInner">
          {showingFront ? <div>{renderSlots()}</div> : <div className="flex flex-row border-2 overflow-auto">{renderSlots()}</div>}
        </div>
      </div>
    </div>
  );

  function scrollToBlade(Slot, SlotsTotal) {
    const ScrollDivElement = document.getElementById(`ScrollableBladeView${SlottedItem["Name *"].value}`);
    const ChunkWidth = ScrollDivElement.scrollWidth / SlotsTotal;
    const ScrollPosition = ChunkWidth * Slot - ChunkWidth - ChunkWidth / 2;
    ScrollDivElement.scrollTo({
      left: ScrollPosition,
      behavior: "smooth",
    });
  }

  function openFilledSlot(ID, ClassName, slot, SlotsTotal, SlottedBlade) {
    const payload = {
      Step: "Blades",
      value: AllBlades.indexOf(SlottedBlade),
    };
    Dispatch(Actions.updateCurrent(payload));
    const OpenClass = "min-w-[16rem]";
    const CloseClass = "max-w-[2rem]";
    const AllItems = document.getElementsByClassName(ClassName);
    for (let i = 0; i < AllItems.length; i++) {
      AllItems[i].classList.remove(OpenClass);
      AllItems[i].classList.add(CloseClass);
    }
    if (openBlade === slot) {
      setOpenBlade(-1);
    } else {
      const OpenElement = document.getElementById(ID);
      scrollToBlade(slot, SlotsTotal);
      OpenElement.classList.add(OpenClass);
      OpenElement.classList.remove(CloseClass);
      setOpenBlade(slot);
    }
  }

  function renderSlots() {
    return showingFront ? (
      <div id={`ScrollableBladeView${SlottedItem["Name *"].value}`} className="flex flex-row border-2 overflow-auto w-[18.5rem]">
        {frontCountArray.map((slot, index) => {
          const SlottedBladeFront = SlottedBladesFront.find((item) => item["Slot Position *"].value === slot) || [];
          console.log(SlottedBladeFront);
          const SlottedBladeBack = SlottedBladesBack.find((item) => item["Slot Position *"].value === slot) || [];
          console.log(SlottedBladeBack);
          console.log();
          return (
            <div>
              {SlottedBladeFront.length !== 0 ? (
                <div
                  key={slot}
                  id={"Front" + index}
                  className="FilledSlotFront flex flex-row items-start justify-start max-w-[2rem] h-[10rem] border-2 transition-all ease-in-out overflow-clip"
                >
                  <div className="flex flex-col justify-evenly items-center max-w-[2rem] h-full">
                    <div className="flex flex-row justify-center">
                      <p>{slot}</p>
                    </div>
                    <div className="text-vertical px-2">
                      <p>
                        {`${SlottedBladeFront["Make *"].value.slice(0, 3)} 
                      ${
                        SlottedBladeFront["Model *"].value.length > 7
                          ? SlottedBladeFront["Model *"].value.slice(0, 7) + "..."
                          : SlottedBladeFront["Model *"].value
                      }`}
                      </p>
                    </div>
                    <button
                      className="orangeButtonSmall"
                      onClick={() => openFilledSlot("Front" + index, "FilledSlotFront", slot, frontCountArray.length, SlottedBladeFront)}
                    >
                      {openBlade === slot ? <MdOutlineKeyboardArrowLeft /> : <MdOutlineKeyboardArrowRight />}
                    </button>
                  </div>
                  <div>{BladeInfo(SlottedBladeFront)}</div>
                </div>
              ) : (
                <div key={slot} className="flex flex-row items-start justify-center min-w-[2rem] h-[10rem] border-2 ">
                  <div className="flex flex-col justify-start">
                    <div className="flex flex-row justify-center">
                      <p>{slot}</p>
                    </div>
                    <div className="text-vertical">
                      <EmptyInRack
                        index={-1}
                        side={"Front"}
                        depth={slot}
                        Type={"Blade"}
                        Step={Step}
                        Chassis={SlottedItem["Name *"].value}
                        setMLTClass={setMLTClass}
                        setChassis={setChassis}
                        setSideDepth={setSideDepth}
                        setUPosition={setUPosition}
                        openAbover={openAbover}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    ) : (
      backCountArray.map((slot) => (
        <div key={slot} className="flex flex-row items-center justify-center w-[1rem] h-[7rem] border-2">
          {slot}
        </div>
      ))
    );
  }

  function BladeInfo(BladeData) {
    const show = ["Make *", "Model *", "Name *", "Ports"];
    return (
      <div className="flex flex-col gap-1 p-1">
        {show.map((item, index) => {
          return (
            <div key={index} className="flex flex-row">
              <label className="text-xs font-bold p-1 bg-[#F7F5F1] flex flex-col justify-center w-[3rem]">{item.replace("*", "")}</label>
              <div className="border-[#F7F5F1] border-b-2 px-1">
                <ScrollableText text={BladeData[item].value} />
              </div>
            </div>
          );
        })}
        <div className="flex flex-row justify-end w-full">
          <EditButton Step={"Blades"} EditIndex={AllBlades.indexOf(BladeData)} />
        </div>
      </div>
    );
  }
}
