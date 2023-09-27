import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../../../Store/Slices/Slice";

export default function PDUViewVertical({ CabinetSide, DepthPosition, setDepthSide, Step }) {
  const current = useSelector((state) => state.data.Current["Racks"]);
  const RackState = useSelector((state) => state.data["Racks"][current]);
  const PDUState = useSelector((state) => state.data["PDUs"]);
  const dispatch = useDispatch();
  // let buttonShow = true;

  let render =
    Step === "PDUs" ? (
      <div className="text-vertical flex flex-row gap-4 justify-center items-center w-[3rem] h-[24.5rem] pt-3">
        <button
          className="orangeButtonVertical flex flex-row items-center justify-center"
          onClick={() => {
            setDepthSide({ Depth: DepthPosition, Side: CabinetSide });
            let payload = {
              Step: "PDUs",
              CabinetSide: CabinetSide,
              DepthPosition: DepthPosition,
              UPosition: 1,
              Cabinet: RackState["Name *"].value,
            };
            dispatch(Action.addToPDU(payload));
          }}>
          <div className="text-vertical">Add PDU</div>
        </button>
      </div>
    ) : (
      <div className="text-vertical flex flex-row gap-4 justify-center items-center w-[3rem] h-[24.5rem] pt-3"></div>
    );

  PDUState.map((object, index) => {
    if (
      object["Cabinet *"].value === RackState["Name *"].value &&
      object["Cabinet Side *"].value === CabinetSide &&
      object["Depth Position *"].value === DepthPosition
    ) {
      return (render = (
        <div
          key={index}
          onClick={() => {
            let payload = {
              Step: "PDUs",
              value: index,
            };
            dispatch(Action.updateCurrent(payload));
          }}
          className="text-vertical flex flex-row gap-4 justify-start items-center w-[3rem] h-[24.5rem] pt-3">
          <div className="text-vertical flex flex-row items-end gap-2">
            <p className="text-sm">Make: </p>
            <p>{object["Make *"].value.slice(0, 10)}</p>
          </div>
          <div className="text-vertical flex flex-row items-end gap-2">
            <p className="text-sm">Model: </p>
            <p>{object["Model *"].value.slice(0, 10)}</p>
          </div>
        </div>
      ));
    } else return null;
  });

  let Label = `${CabinetSide.replace("Side", "")} - ${DepthPosition.slice(0, 1)}`;

  return (
    <div className="w-[2rem] flex flex-col justify-start items-center border-2 h-[34rem] top-[5rem]">
      <div className="text-vertical h-[7.5rem] border-b-2 w-full flex flex-row justify-center items-center">
        {Label}
      </div>
      {render}
      {/* {PDUState.map((object, index) => {
          if (
            object["Cabinet *"].value === RackState["Name *"].value &&
            object["Cabinet Side *"].value === CabinetSide &&
            object["Depth Position *"].value === DepthPosition
          ) {
            buttonShow = false;
            return (
              <div key={index} className="flex flex-col justify-center items-center border-2 w-[3rem] h-[3rem]">
                {object["U Position *"].value}
              </div>
            );
          }
        })}
        {buttonShow ? (
          <button
            className=" text-verticalButton w-[5rem] orangeButtonVertical"
            onClick={() => {
              console.log("Left Front");
              let payload = {
                Step: "PDUs",
                CabinetSide: CabinetSide,
                DepthPosition: DepthPosition,
                UPosition: 1,
                Cabinet: RackState["Name *"].value,
              };
              dispatch(Action.addToPDU(payload));
            }}>
            Add PDU
          </button>
        ) : null} */}
      <div className="h-[3rem] flex flex-row justify-center items-center border-t-2 w-full text-sm">1</div>
    </div>
  );
}
