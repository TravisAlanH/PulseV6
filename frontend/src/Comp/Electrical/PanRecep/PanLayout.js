import React from "react";
import { useSelector } from "react-redux";
import AddToStep from "../../Reuse/AddToStep";
import STDInput from "../../Reuse/STDInput";

export default function PanLayout() {
  const Step = "Panels";
  const Data = useSelector((state) => state.data[Step]);

  return (
    <div className="flex flex-col items-center gap-3">
      <AddToStep Step={Step} />
      {Data.map((item, index) => {
        return Object.keys(item).map((key, index) => {
          return (
            <div>
              <STDInput key={index} Step={Step} keyName={key} />
            </div>
          );
        });
      })}
    </div>
  );
}
