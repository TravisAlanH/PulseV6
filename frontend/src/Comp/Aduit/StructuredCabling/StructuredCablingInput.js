import React from "react";
import Template from "../../../Store/Slices/Template";

export default function StructuredCablingInput({ startItem, endItem }) {
  console.log(startItem);

  let startMap = [];
  let endMap = [];

  let StartingArray = [];
  let EndingArray = [];

  let keys = Object.keys(Template.StructuredCabling);
  keys.map((item) => {
    if (item.includes("Starting")) StartingArray.push(item);
    if (item.includes("Ending")) EndingArray.push(item);
  });

  if (Object.keys(startItem).length > 0) {
    for (let i = 0; i < startItem["Ports"].value; i++) {
      startMap.push(i + 1);
    }
    // startPortSpacing = startItem["Ports"].value / 2;
  }
  if (Object.keys(endItem).length > 0) {
    for (let i = 0; i < endItem["Ports"].value; i++) {
      endMap.push(i + 1);
    }
    // endPortSpacing = startItem["Ports"].value / 2;
  }

  return <div className="w-[20rem] flex flex-row justify-center"></div>;
}
