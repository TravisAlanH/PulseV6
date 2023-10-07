import React from "react";
import Template from "../../../Store/Slices/Template";

export default function StructuredCablingInput({ startItem, endItem }) {
  let otherData = [];

  let keys = Object.keys(Template.StructuredCabling);
  keys.map((item) => {
    if (!item.includes("Starting")) otherData.push(item);
    if (!item.includes("Ending")) otherData.push(item);
    return null;
  });

  return <div className="w-[20rem] flex flex-row justify-center"></div>;
}
