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

  for (let i = RackState.RUHeight.value; i > 0; i--) {
    let Show = true;
    Layout.push(
      <div key={i}>
        <div className="flex flex-row">
          <div>{i}</div>
          {Assets.map((object, index) => {
            if (object["U Position*"].value === i && object["Cabinet*"].value === RackState["Name *"].value) {
              Show = false;
              return (
                <div
                  key={index}
                  className="flex flex-row"
                  onClick={() => {
                    let payload = {
                      Step: "Assets",
                      value: index,
                    };
                    dispatch(Action.updateCurrent(payload));
                  }}>
                  <div className="w-[10rem]">{object["Model *"].value}</div>
                  <div className="w-[10rem]">{object["Make *"].value}</div>
                </div>
              );
            } else return null;
          })}
          {Step === "Assets" && Show ? (
            <div id="ADD">
              <AddToRacks Step={"Assets"} index={i} />
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return <div className="flex flex-col">{Layout}</div>;
}
