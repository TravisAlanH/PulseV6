import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../Store/Slices/Slice";
import TempAssets from "./AddFieldTemplatesAssets";
import TempLocation from "./AddFieldTemplatesLocation";
import TempPDUs from "./AddFieldTemplatesPDU";

export default function AddFieldModal({ Step }) {
  const Template = {
    Assets: TempAssets,
    PDUs: TempPDUs,
    Location: TempLocation,
  };

  const dispatch = useDispatch();

  //Set to 0 because all indexes are updated, adding fields is not specific to an index
  const AssetsArray = useSelector((state) => state.data[Step][0]);

  return (
    <div className="z-40">
      <form
        className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-3"
        onSubmit={(e) => {
          e.preventDefault();

          e.target.querySelectorAll('input[type="checkbox"]').forEach((element) => {
            let payload = {
              Step: Step,
              checked: element.checked,
              keyName: element.value,
              keyValue: Template[Step][element.value],
            };
            dispatch(actions.addRemoveCustomFields(payload));
          });
        }}>
        {Object.keys(Template[Step]).map((keyName, index) => (
          <div key={index}>
            <input
              type="checkbox"
              className="h-[1.4rem] w-[1.4rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit mr-2"
              id={keyName}
              name={keyName}
              value={keyName}
              defaultChecked={AssetsArray.hasOwnProperty(keyName)}
            />
            {keyName}
          </div>
        ))}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
