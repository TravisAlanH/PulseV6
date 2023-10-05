import React from "react";
import { useSelector } from "react-redux";
import Template from "../../../Store/Slices/Template";
import { BiPlus } from "react-icons/bi";
// import { useDispatch } from "react-redux";
// import * as Actions from "../../../Store/Slices/Slice";

export default function StructuredCablingDropInput({ RackIndex, startItem }) {
  const RackState = useSelector((state) => state.data["Racks"][RackIndex]);
  const [newObject, setNewObject] = React.useState(Template.StructuredCabling);

  // const dispatch = useDispatch();

  let StartingArray = [];
  let startMap = [];

  let keys = Object.keys(Template.StructuredCabling);
  keys.map((item) => {
    if (item.includes("Starting")) StartingArray.push(item);
    return null;
  });
  if (Object.keys(startItem).length > 0) {
    for (let i = 0; i < startItem["Ports"].value; i++) {
      startMap.push(i + 1);
    }
  }

  return (
    <div id="start">
      <div className="flex flex-row items-end justify-between px-2">
        <p className="font-semibold">Start Port: </p>
        <p className="text-sm">{(startItem["Name *"].value + " @U" + startItem["U Position *"].value).slice(0, 20)}</p>
      </div>
      <div
        id="portsList"
        className={"w-[18rem] h-[7rem] overflow-x-scroll border-2 flex flex-col gap-1 justify-center p-1"}>
        <div className="flex gap-1 flex-row">
          {startMap.map((item, index) => {
            if (index % 2 === 0) {
              return (
                <div
                  className="w-[2.5rem] h-[2.5rem] border-2 rounded-md flex flex-row items-center justify-center flex-shrink-0"
                  onClick={() => {
                    let changes = { ...newObject };
                    changes["Starting Port Index *"].value = item;
                    changes["Starting Item Name *"].value = startItem["Name *"].value;
                    changes["Starting Item Location *"].value = RackState["Location *"].value;
                    changes["Starting Port Name *"].value = startItem["U Position *"].value + "-P" + item;
                    console.log(changes);

                    setNewObject(changes);
                  }}>
                  {item}
                </div>
              );
            } else return null;
          })}
        </div>
        <div className="flex gap-1 flex-row">
          {startMap.map((item, index) => {
            if (index % 2 !== 0) {
              return (
                <div
                  className="w-[2.5rem] h-[2.5rem] border-2 rounded-md flex flex-row items-center justify-center flex-shrink-0"
                  onClick={() => {
                    let changes = { ...newObject };
                    changes["Starting Port Index *"].value = item;
                    changes["Starting Item Name *"].value = startItem["Name *"].value;
                    changes["Starting Item Location *"].value = RackState["Location *"].value;
                    changes["Starting Port Name *"].value = startItem["U Position *"].value + "-P" + item;
                    console.log(changes);
                    setNewObject(changes);
                  }}>
                  {item}
                </div>
              );
            } else return null;
          })}
          <div
            className="rounded-md flex flex-row items-center justify-center flex-shrink-0 OrangeAddPort"
            onClick={() => {}}>
            <BiPlus />
          </div>
        </div>
      </div>
      <div id="inputs" className="flex flex-col gap-1 pt-2">
        {/* standard text input that i have used in the project with lable*/}
        {StartingArray.map((item, index) => {
          return (
            <div className="flex flex-row">
              <div className="flex flex-col justify-center items-center text-red-500 w-[1rem] h-full">
                {item.includes("*") ? "*" : null}
              </div>
              <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[7rem]"}>
                {item.replace("*", "").replace("Starting", "")}
              </label>
              {newObject[item].type === "select" ? (
                <select
                  className={"Select h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[8rem]"}
                  onChange={(e) => {}}>
                  {newObject[item].options.map((option) => {
                    if (option === newObject[item].value)
                      return (
                        <option value={option} selected={true}>
                          {option}
                        </option>
                      );
                    return <option value={option}>{option}</option>;
                  })}
                </select>
              ) : (
                <input
                  type={Template.StructuredCabling[item].value}
                  value={newObject[item].value}
                  className="h-[2rem] w-[8rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit "
                  onChange={(e) => {
                    let Changes = {
                      ...newObject,
                      [item]: {
                        ...newObject[item],
                        value: e.target.value,
                      },
                    };
                    setNewObject(Changes);
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
