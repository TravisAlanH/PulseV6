import React from "react";
import { useSelector } from "react-redux";
import STDInput from "../../Reuse/STDInput";
import AddToStep from "../../Reuse/AddToStep";

export default function RecepLayout() {
  const Step = "Receptacles";

  const Data = useSelector((state) => state.data[Step]);
  // const RackData = useSelector((state) => state.data["Racks"]);

  return (
    <div className="flex flex-col items-center gap-3">
      <AddToStep Step={Step} />
      {Data.map((item, ArrayIndex) => {
        return Object.keys(item).map((key, index) => {
          if (key === "Cabinet Placement" || key === "Wall Placement") {
            if (Data[ArrayIndex]["Placement"] === "Cabinet") {
              return <STDInput key={index} Step={Step} keyName={key} />;
            }
            if (Data[ArrayIndex]["Placement"] === "Cabinet") {
              return <STDInput key={index} Step={Step} keyName={key} />;
            }
            return null;
          } else {
            return (
              <div>
                <STDInput key={index} Step={Step} keyName={key} />
              </div>
            );
          }
        });
      })}
    </div>
  );
}
