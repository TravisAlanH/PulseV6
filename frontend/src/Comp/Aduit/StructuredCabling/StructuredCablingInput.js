import React from "react";

export default function StructuredCablingInput({ startItem, endItem }) {
  return (
    <div className="w-[20rem] flex flex-row justify-center">{JSON.stringify(startItem) + JSON.stringify(endItem)}</div>
  );
}
