import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AddToStep from "../../Reuse/AddToStep";
import * as Action from "../../../Store/Slices/Slice";

export default function RackRack({ Step }) {
  const current = useSelector((state) => state.data.Current["Racks"]);
  const Assets = useSelector((state) => state.data["Assets"]);
  const RackState = useSelector((state) => state.data["Racks"][current]);
  const currentAsset = useSelector((state) => state.data.Current["Assets"]);
  const dispatch = useDispatch();

  let Layout = [];
  let show = true;

  for (let i = RackState.RUHeight.value; i > 0; i--) {
    Layout.push(
      <div key={i}>
        {Step === "Racks" ? (
          <p>view</p>
        ) : (
          <div className="flex flex-row">
            <div>{i}</div>
            {Assets.map((object, index) => {
              if (object["U Position*"].value === i && object["Cabinet*"].value === RackState["Name *"].value) {
                show = false;
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
              }
            })}
            {show ? (
              <div
                id="ADD"
                onClick={() => {
                  let payload = {
                    Step: Step,
                    Current: currentAsset + 1,
                    Key: "U Position*",
                    value: i,
                  };
                  dispatch(Action.changeData(payload));
                  payload = {
                    Step: Step,
                    Current: currentAsset + 1,
                    Key: "Cabinet*",
                    value: RackState["Name *"].value,
                  };
                  dispatch(Action.changeData(payload));
                }}>
                <AddToStep Step={"Assets"} />
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }

  return <div className="flex flex-col">{Layout}</div>;
}
