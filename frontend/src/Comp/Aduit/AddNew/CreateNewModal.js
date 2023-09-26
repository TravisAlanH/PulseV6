import React from "react";
import { useSelector } from "react-redux";
import STDInput from "../../Reuse/STDInput";
import CreateNewButton from "./CreateNewButton";
import SetCurrentSelection from "../../Reuse/SetCurrentSelection";

export default function CreateNewModal({ Step }) {
  const state = useSelector((state) => state.data[Step]);
  const current = useSelector((state) => state.data.Current[Step]);

  return (
    <div className="">
      <div className="flex flex-row gap-2 pb-2 justify-center">
        <SetCurrentSelection Step={Step} />
        <CreateNewButton Step={Step} />
      </div>
      {state.length > 0 ? (
        <div className="flex flex-col gap-1 pl-12">
          {Object.keys(state[current]).map((keyName, index) => (
            <div key={index}>
              <STDInput Step={Step} keyName={keyName} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
