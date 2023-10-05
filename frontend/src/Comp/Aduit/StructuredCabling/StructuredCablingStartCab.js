import React from "react";
import { useSelector } from "react-redux";

import "../../../Styles/PDU.css";
import { BiArrowFromLeft } from "react-icons/bi";
import "./StructuredCabling.css";
// import AddToRacks from "./AddToRacks";
import Template from "../../../Store/Slices/Template";
import StructuredCablingDropInput from "./StructuredCablingDropInput";

export default function StructuredCablingStartCab({ setStartItem, RackIndex, startItem }) {
  const Assets = useSelector((state) => state.data["Assets"]);
  const PDUs = useSelector((state) => state.data["PDUs"]);
  const UPSs = useSelector((state) => state.data["UPSs"]);
  const ATSs = useSelector((state) => state.data["ATSs"]);
  const RackState = useSelector((state) => state.data["Racks"][RackIndex]);

  // const dispatch = useDispatch();
  let StartingArray = [];
  let EndingArray = [];
  let startMap = [];

  // let newObject = Template.StructuredCabling;

  let keys = Object.keys(Template.StructuredCabling);
  keys.map((item) => {
    if (item.includes("Starting")) StartingArray.push(item);
    if (item.includes("Ending")) EndingArray.push(item);
    return null;
  });
  if (Object.keys(startItem).length > 0) {
    for (let i = 0; i < startItem["Ports"].value; i++) {
      startMap.push(i + 1);
    }
    // startPortSpacing = startItem["Ports"].value / 2;
  }

  const buttons = document.getElementsByClassName("StartDevices");

  function removeSelected() {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        for (var j = 0; j < buttons.length; j++) {
          buttons[j].classList.remove("selectedStructuredCable");
        }
      });
    }
  }

  let holdOpenRU = [];

  let Layout = [];

  let Data = [...Assets, ...PDUs, ...UPSs, ...ATSs];

  // if (Object.keys(startItem).length > 0) {
  //   Input = (
  //     <div id="start">
  //       <div className="flex flex-row items-end justify-between px-2">
  //         <p className="font-semibold">Start Port: </p>
  //         <p className="text-sm">
  //           {(startItem["Name *"].value + "@ U" + startItem["U Position *"].value).slice(0, 20)}
  //         </p>
  //       </div>
  //       <div
  //         id="portsList"
  //         className={"w-[18rem] h-[6rem] overflow-x-scroll border-2 flex flex-col gap-1 justify-center p-1"}>
  //         <div className="flex gap-1 flex-row">
  //           {startMap.map((item, index) => {
  //             if (index % 2 === 0) {
  //               return (
  //                 <div
  //                   className="w-[2.5rem] h-[2.5rem] border-2 rounded-md flex flex-row items-center justify-center flex-shrink-0"
  //                   onClick={() => {
  //                     let Changes = {
  //                       ...newObject,
  //                       ["Starting Port Index *"]: {
  //                         ...newObject["Starting Port Index *"],
  //                         value: item,
  //                       },
  //                       ["Starting Item Name *"]: {
  //                         ...newObject["Starting Item Name *"],
  //                         value: RackState["Name *"].value,
  //                       },
  //                       ["Starting Item Location *"]: {
  //                         ...newObject["Starting Item Location *"],
  //                         value: RackState["Location *"].value,
  //                       },
  //                       ["Starting Port Name *"]: {
  //                         ...newObject["Starting Item Location *"],
  //                         value: RackState["Name *"].value,
  //                       },
  //                     };
  //                     setNewObject(Changes);
  //                   }}>
  //                   {item}
  //                 </div>
  //               );
  //             }
  //           })}
  //         </div>
  //         <div className="flex gap-1 flex-row">
  //           {startMap.map((item, index) => {
  //             if (index % 2 !== 0) {
  //               return (
  //                 <div
  //                   className="w-[2.5rem] h-[2.5rem] border-2 rounded-md flex flex-row items-center justify-center flex-shrink-0"
  //                   onClick={() => {
  //                     let Changes = {
  //                       ...newObject,
  //                       ["Starting Port Index *"]: {
  //                         ...newObject["Starting Port Index *"],
  //                         value: item,
  //                       },
  //                     };
  //                     setNewObject(Changes);
  //                   }}>
  //                   {item}
  //                 </div>
  //               );
  //             }
  //           })}
  //         </div>
  //       </div>
  //       <div id="inputs" className="flex flex-col gap-1 pt-2">
  //         {/* standard text input that i have used in the project with lable*/}
  //         {StartingArray.map((item, index) => {
  //           return (
  //             <div className="flex flex-row">
  //               <div className="flex flex-col justify-center items-center text-red-500 w-[1rem] h-full">
  //                 {item.includes("*") ? "*" : null}
  //               </div>
  //               <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[7rem]"}>
  //                 {item.replace("*", "").replace("Starting", "")}
  //               </label>
  //               {newObject[item].type === "select" ? (
  //                 <select
  //                   className={"Select h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[8rem]"}
  //                   onChange={(e) => {}}>
  //                   {newObject[item].options.map((option) => {
  //                     return <option value={option}>{option}</option>;
  //                   })}
  //                 </select>
  //               ) : (
  //                 <input
  //                   type={Template.StructuredCabling[item].value}
  //                   value={newObject[item].value}
  //                   className="h-[2rem] w-[8rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit "
  //                   onChange={(e) => {
  //                     let Changes = {
  //                       ...newObject,
  //                       [item]: {
  //                         ...newObject[item],
  //                         value: e.target.value,
  //                       },
  //                     };
  //                     setNewObject(Changes);
  //                   }}
  //                 />
  //               )}
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // }

  if (RackState === undefined) return null;
  for (let i = 1; i < RackState["RU Height"].value + 1; i++) {
    Data.map((object, index) => {
      if (object["U Position *"].value === i && object["Cabinet *"].value === RackState["Name *"].value) {
        let currentRU = i;
        for (let j = 0; j < object["RU Height"].value - 1; j++) {
          holdOpenRU.push(1);
        }
        i = object["RU Height"].value + i - 1;

        return Layout.push(
          <div key={i}>
            <div
              id={"StartItem" + i}
              className="StartDevices border-2 transition-all h-[2.5rem] overflow-hidden"
              onClick={() => {
                setStartItem(object);
                removeSelected();
                document.getElementById("StartItem" + i).classList.add("selectedStructuredCable");
              }}>
              <div className="h-[2.5rem]  flex flex-row w-[19rem] justify-between items-center border-2">
                <div className="border-r-2 w-[1.75rem] flex flex-row justify-center items-center h-full">
                  {currentRU}
                </div>
                <div key={index} className="flex flex-row pl-2 py-1 justify-between" onClick={() => {}}>
                  <div>
                    <div className="rounded-full bg-green-500 w-[.5rem] h-[.5rem] mt-[.1rem] mr-1"></div>
                  </div>
                  <div className="flex flex-col w-[4rem] justify-center">
                    <label className="text-xs h-[.75rem] flex flex-col justify-center">Make</label>
                    <div className="w-[10rem] h-[1rem] flex flex-col justify-center">
                      {object["Make *"].value.slice(0, 5)}
                    </div>
                  </div>
                  <div className="flex flex-col w-[7rem] justify-center">
                    <label className="text-xs h-[.75rem] flex flex-col justify-center">Model</label>
                    <div className="w-[10rem] h-[1rem] flex flex-col justify-center">
                      {object["Model *"].value.length > 9
                        ? object["Model *"].value.slice(0, 9) + "..."
                        : object["Model *"].value}
                    </div>
                  </div>
                </div>
                <button
                  className="orangeButton flex flex-row justify-center items-center text-[1.7rem] mr-2"
                  onClick={() => {}}>
                  <BiArrowFromLeft />
                </button>
              </div>
              <div className="flex flex-col items-center">
                {<StructuredCablingDropInput RackIndex={RackIndex} startItem={object} />}
              </div>
            </div>
          </div>
        );
      } else return null;
    });
  }

  // dispatch(Action.changeData(payload));

  return (
    <div className="flex flex-row">
      <div className="flex flex-col-reverse">{Layout}</div>
    </div>
  );
}
