import React from "react";
import InputFilters from "./InputFilters";
import { useSelector } from "react-redux";

export default function BuildLayout({ AllData }) {
  const CurrentRack = useSelector((state) => state.data.Current.Racks);
  const CurrentCabinet = useSelector((state) => state.data.Racks[CurrentRack]);
  const CurrentFilledCabinet = useSelector(
    (state) => state.data.OpenRU[CurrentRack]
  );
  const Assets = useSelector((state) => state.data.Assets);
  const PDUs = useSelector((state) => state.data.PDUs);
  const UPSs = useSelector((state) => state.data.UPSs);
  const ATSs = useSelector((state) => state.data.ATSs);

  // const [openAT, setOpenAT] = React.useState(-1);
  const [AvalableSlots, setAvalableSlots] = React.useState(
    CurrentCabinet["RU Height"].value
  );

  const InAllCabinets = [...Assets, ...PDUs, ...UPSs, ...ATSs];

  const RackedInCurrentCabinet = InAllCabinets.filter((item) => {
    return item["Cabinet *"].value === CurrentCabinet["Name *"].value;
  });

  const cleanRackData = (data) => {
    let cleanData = [...data];
    InAllCabinets.forEach((item) => {
      // let UP = item["U Position *"].value + 1;
      // let RU = item["RU Height"].value;
      // cleanData[UP] = -1;
      let start = item["U Position *"].value + item["RU Height"].value - 2;
      for (let i = 0; i < item["RU Height"].value - 1; i++) {
        cleanData[start - i] = -1;
      }
    });
    console.log(cleanData);
    return cleanData;
  };

  const openAbover = (index) => {
    let open = 0;
    for (let i = 0; i < CurrentFilledCabinet.value.length - index; i++) {
      if (CurrentFilledCabinet.value[i + index] === 0) {
        open = open + 1;
      }
      if (CurrentFilledCabinet.value[i + index] === 1) {
        setAvalableSlots(open);
        return open;
      }
    }
    setAvalableSlots(open);
    return open;
  };

  console.log(RackedInCurrentCabinet);
  return (
    <div>
      <div
        id="BuildCabinet_CabView"
        className="flex flex-col-reverse items-center"
      >
        {cleanRackData(CurrentFilledCabinet.value).map((item, index) => {
          if (item === -1) {
            return null;
          }
          return (
            <div
              key={index}
              className="flex flex-rows border-2 border-gray-500"
            >
              <div
                id="BuildCabinet_CabView_UP"
                className="border-r-2 border-gray-500"
              >
                {index + 1}
              </div>
              <div className="min-w-[10rem]">
                {item === 1 ? (
                  <div id="filled">{filledInRack(index)}</div>
                ) : (
                  <div id="empty">{emptyInRack(index)}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <InputFilters AllData={AllData} AvalableSlots={AvalableSlots} />
    </div>
  );

  function emptyInRack(index) {
    return (
      <div>
        <button onClick={() => console.log("index", index, openAbover(index))}>
          Open
        </button>
      </div>
    );
  }

  function filledInRack(index) {
    return (
      <div id="BuildCabinet_CabView_FilledInRack">
        {RackedInCurrentCabinet.filter(
          (items) => items["U Position *"].value === index + 1
        ).map((item, index) => {
          return <div>{item["Make *"].value}</div>;
        })}
      </div>
    );
  }
}
