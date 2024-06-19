import React from "react";
import InputFilters from "./InputFilters";
import { useSelector } from "react-redux";
import "./BuildCabinetModal.css";
import { useState } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import BuildInputs from "./BuildInputs";

export default function BuildLayout({ AllData }) {
  const CurrentRack = useSelector((state) => state.data.Current.Racks);
  const CurrentCabinet = useSelector((state) => state.data.Racks[CurrentRack]);
  const CurrentFilledCabinet = useSelector(
    (state) => state.data.OpenRU[CurrentRack]
  );
  const [visable, setVisable] = useState(15);

  const Assets = useSelector((state) => state.data.Assets);
  const PDUs = useSelector((state) => state.data.PDUs);
  const UPSs = useSelector((state) => state.data.UPSs);
  const ATSs = useSelector((state) => state.data.ATSs);
  const [SelectedMLTItem, setSelectedMLTItem] = useState({});
  const [UPosition, setUPosition] = useState(0);
  console.log(SelectedMLTItem);
  // const [openAT, setOpenAT] = React.useState(-1);
  const [AvalableSlots, setAvalableSlots] = React.useState(100);
  console.log(AvalableSlots);

  if (!CurrentCabinet) {
    return <div>Build Layout</div>;
  }
  if (!CurrentFilledCabinet) {
    return <div>Build Layout</div>;
  }
  if (!CurrentFilledCabinet.value) {
    return <div>Build Layout</div>;
  }

  const InAllCabinets = [...Assets, ...PDUs, ...UPSs, ...ATSs];

  const RackedInCurrentCabinet = InAllCabinets.filter((item) => {
    return item["Cabinet *"].value === CurrentCabinet["Name *"].value;
  });

  const cleanRackData = (data) => {
    let cleanData = [...data];
    InAllCabinets.forEach((item) => {
      let start = item["U Position *"].value + item["RU Height"].value - 2;
      for (let i = 0; i < item["RU Height"].value - 1; i++) {
        cleanData[start - i] = -1;
      }
    });
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
              <div className="min-w-[20rem]">
                {item === 1 ? (
                  <div id="filled" className="">
                    {filledInRack(index)}
                  </div>
                ) : (
                  <div id="empty" className="h-[2rem]">
                    {emptyInRack(index)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div id="ModalRackable" className="modal">
        <div className="modal-content">
          <div
            id="Entries and Close"
            className="flex flex-row justify-end gap-4"
          >
            <div id="Entries">
              <label>Show</label>
              <select onChange={(e) => setVisable(e.target.value)}>
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={45}>45</option>
                <option value={60}>60</option>
              </select>
              <label>Entries</label>
            </div>
            <div id="closeButton">
              <button
                className="redButton flex flex-row justify-center items-center"
                onClick={() => {
                  setSelectedMLTItem({});
                  document.getElementById("ModalRackable").style.display =
                    "none";
                }}
              >
                x
              </button>
            </div>
          </div>
          <div className="flex flex-row justify-center w-full">
            {Object.keys(SelectedMLTItem).length === 0 ? (
              <div id="MLTSearchingData Box">
                <button
                  id="MLTSearchingData Drop Button"
                  onClick={() => {
                    const DataDrops =
                      document.getElementsByClassName("DataDrop");
                  }}
                >
                  Down
                </button>
                <div
                  id="MLTDataDrop"
                  className="DataDrop overflow-scroll w-[38rem] h-[35rem] px-6 border-y-2 transition-all ease-in-out duration-300"
                >
                  <InputFilters
                    AllData={AllData}
                    AvalableSlots={AvalableSlots}
                    setAvalableSlots={setAvalableSlots}
                    visable={visable}
                    setSelectedMLTItem={setSelectedMLTItem}
                  />
                </div>
              </div>
            ) : (
              <BuildInputs
                SelectedMLTItem={SelectedMLTItem}
                UPosition={UPosition}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  function emptyInRack(index) {
    return (
      <div className="flex flex-row justify-center">
        <button
          className="orangeButton"
          onClick={() => {
            document.getElementById("ModalRackable").style.display = "block";
            setUPosition(index);
            openAbover(index);
          }}
        >
          Open
        </button>
      </div>
    );
  }

  function exspandFilledUnit(index) {
    const highSet = "h-[8rem]";
    const filledRacksUP = document.getElementsByClassName("filledRackUP");
    for (let i = 0; i < filledRacksUP.length; i++) {
      filledRacksUP[i].classList.remove(highSet);
    }
    document
      .getElementById("BuildCabinet_CabView_FilledInRack" + index)
      .classList.add(highSet);
  }

  function closeAllFilledUnits() {
    const highSet = "h-[8rem]";
    const filledRacksUP = document.getElementsByClassName("filledRackUP");
    for (let i = 0; i < filledRacksUP.length; i++) {
      filledRacksUP[i].classList.remove(highSet);
    }
  }

  function filledInRack(index) {
    return (
      <div
        id={"BuildCabinet_CabView_FilledInRack" + index}
        className="h-[2rem] filledRackUP overflow-clip transition-all ease-in-out duration-300"
        onClick={() => {
          exspandFilledUnit(index);
        }}
      >
        {RackedInCurrentCabinet.filter(
          (items) => items["U Position *"].value === index + 1
        ).map((item, index) => {
          return (
            <div>
              <div className="h-[2rem] flex flex-row">
                <div>{item["Make *"].value}</div>
              </div>
              <div className="h-[2rem]">{item["Model *"].value}</div>
              <div className="flex flex-row items-end justify-end">
                <button
                  className="orangeButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeAllFilledUnits();
                  }}
                >
                  <MdOutlineKeyboardArrowUp />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
