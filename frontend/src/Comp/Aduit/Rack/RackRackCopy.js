import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../../../Store/Slices/Slice";
import AddToRacks from "./AddToRacks";

export default function RackRack({ Step }) {
  const current = useSelector((state) => state.data.Current["Racks"]);
  const Assets = useSelector((state) => state.data["Assets"]);
  const RackState = useSelector((state) => state.data["Racks"][current]);
  // const currentAsset = useSelector((state) => state.data.Current["Assets"]);
  const dispatch = useDispatch();

  let Layout = [];

  // will need to remake this for PDU / Rack / Assets,
  // need to check inports for a raritain PDU 30 ru, to see if all import fields will pass import (Orientation)
  // need to check import for a Matrix C166 PUD, to see if Depth Position ** will pass import

  for (let i = RackState["RU Height"].value; i > 0; i--) {
    let Show = true;
    Layout.push(
      <div key={i}>
        <div className="flex flex-row w-[24rem] justify-start items-center border-2">
          <div className="border-r-2 w-[2rem] flex flex-row justify-center">{i}</div>
          {Assets.map((object, index) => {
            if (object["U Position *"].value === i && object["Cabinet *"].value === RackState["Name *"].value) {
              Show = false;
              i = i - 1;
              // i = i + object["RU Height"].value;
              return (
                <div
                  key={index}
                  className="flex flex-row pl-2"
                  onClick={() => {
                    let payload = {
                      Step: "Assets",
                      value: index,
                    };
                    dispatch(Action.updateCurrent(payload));
                  }}>
                  <div className="flex flex-col w-[7rem] justify-center">
                    <label className="text-xs">Make</label>
                    <div className="">{object["Make *"].value}</div>
                  </div>
                  <div className="flex flex-col w-[10rem] justify-center">
                    <label className="text-xs">Model</label>
                    <div className="w-[10rem]">{object["Model *"].value}</div>
                  </div>
                </div>
              );
            } else return null;
          })}
          {Step === "Assets" && Show ? (
            <div id="ADD" className="w-full flex flex-row justify-center">
              <AddToRacks Step={"Assets"} index={i} />
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return <div className="flex flex-col">{Layout}</div>;
}
