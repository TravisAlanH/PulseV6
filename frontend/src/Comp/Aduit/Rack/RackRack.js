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

  for (let i = RackState.RUHeight.value; i > 0; i--) {
    Layout.push(
      <div key={i}>
        {Step === "Racks" ? (
          <p>view</p>
        ) : (
          <div
            onClick={() => {
              setTimeout(() => {
                let payload = {
                  Step: Step,
                  Current: currentAsset + 1,
                  Key: "U Position*",
                  value: i,
                };
                dispatch(Action.changeData(payload));
                setTimeout(() => {
                  let payload = {
                    Step: Step,
                    Current: currentAsset + 1,
                    Key: "Cabinet*",
                    value: RackState["Name *"].value,
                  };
                  dispatch(Action.changeData(payload));
                }, 100);
              }, 100);
            }}
            className="flex flex-row">
            <div>{i}</div>
            {Assets.map((object, index) => {
              console.log(Assets);
              if (object["U Position*"].value === i && object["Cabinet*"].value === RackState["Name *"].value) {
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
            <AddToStep Step={"Assets"} />
          </div>
        )}
      </div>
    );
  }

  return <div className="flex flex-col">{Layout}</div>;
}
