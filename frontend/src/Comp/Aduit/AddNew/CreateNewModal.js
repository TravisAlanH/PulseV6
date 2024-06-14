import React from "react";
import { useSelector } from "react-redux";
import STDInput from "../../Reuse/STDInput";
import STDInput2 from "../../Reuse/STDInput copy";
import CreateNewButton from "./CreateNewButton";
import SetCurrentSelection from "../../Reuse/SetCurrentSelection";
import * as FireActions from "../../../FireActions";
import TemplateRacks from "./CreateNewTemplatesRacks";
import TemplateAsets from "./CreateTemplatesAssets";
import TemplatePDU from "./CreateTemplatesPDU";
import LoadingSpinner from "../../Reuse/LoadingSpinner/Spinner";

export default function CreateNewModal({ Step }) {
  const state = useSelector((state) => state.data[Step]);
  const current = useSelector((state) => state.data.Current[Step]);
  const [newMLT, setNewMLT] = React.useState(
    Step === "Racks"
      ? TemplateRacks
      : Step === "Assets"
      ? TemplateAsets
      : TemplatePDU
  );
  const [loading, setLoading] = React.useState(false);

  const user = FireActions.auth.currentUser;

  return (
    <div className="">
      <div className="flex flex-row gap-2 pb-2 justify-center">
        <SetCurrentSelection Step={Step} />
        <CreateNewButton Step={Step} />
      </div>
      {user.displayName === "Travis Heidelberger" ? (
        <div>
          <button
            onClick={() => {
              FireActions.addToMLTList("test", user);
            }}
          >
            add
          </button>
          <button
            onClick={() => {
              console.log(newMLT);
            }}
          >
            log
          </button>
        </div>
      ) : null}
      {state.length > 0 ? (
        <div className="flex flex-col gap-1 pl-12">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              const added = FireActions.addToMLTList(newMLT, user);
              if (added) {
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
                setNewMLT(
                  Step === "Racks"
                    ? TemplateRacks
                    : Step === "Assets"
                    ? TemplateAsets
                    : TemplatePDU
                );
                console.log("added");
              } else {
                console.log("error");
              }
            }}
          >
            {Object.keys(state[current]).map((keyName, index) => (
              <div key={index}>
                {user.displayName === "Travis Heidelberger" ? (
                  <STDInput2
                    Step={Step}
                    keyName={keyName}
                    newMLT={newMLT}
                    setNewMLT={setNewMLT}
                  />
                ) : (
                  <STDInput Step={Step} keyName={keyName} />
                )}
              </div>
            ))}
            {user.displayName === "Travis Heidelberger" ? (
              <input type="submit"></input>
            ) : null}
          </form>
        </div>
      ) : null}
      {loading ? <LoadingSpinner /> : null}
    </div>
  );
}
