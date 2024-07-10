import React from "react";
import InputFilters from "./InputFilters";
import { useSelector } from "react-redux";
import "./BuildCabinetModal.css";
import { useState } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import BuildInputs from "./BuildInputs";
import LoadingSpinner from "../../Reuse/LoadingSpinner/Spinner";
import { useDispatch } from "react-redux";
import * as actions from "../../../Store/Slices/Slice";
import PDUViewVertical from "./PDUViewVertical";
import { GrDatabase } from "react-icons/gr";
import BladeView from "./BladeView";
import EmptyInRack from "./EmptyInRack";
import NewModelLayout from "./AddNewModel/NewModelLayout";
import InputFiltersNonMLT from "./InputFiltersNonMLT";

export default function BuildLayout({ AllData }) {
  const dispatch = useDispatch();
  const CurrentRack = useSelector((state) => state.data.Current.Racks);
  const CurrentCabinet = useSelector((state) => state.data.Racks[CurrentRack]);
  const CurrentFilledCabinet = useSelector((state) => state.data.OpenRU[CurrentRack]);
  const BladeSupport = useSelector((state) => state.data.Blades);
  const [visable, setVisable] = useState(15);
  const [MLTClass, setMLTClass] = useState("");

  // const [MLTData, setMLTData] = React.useState(AllData);
  const Assets = useSelector((state) => state.data.Assets);
  const PDUs = useSelector((state) => state.data.PDUs);
  const UPSs = useSelector((state) => state.data.UPSs);
  const ATSs = useSelector((state) => state.data.ATSs);
  const [SelectedMLTItem, setSelectedMLTItem] = useState({});
  const [UPosition, setUPosition] = useState(0);
  const [SideDepth, setSideDepth] = useState({ Depth: "", Side: "" });
  const [savingData, setSavingData] = React.useState({});
  const [Step, setStep] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  // const [openAT, setOpenAT] = React.useState(-1);
  const [AvalableSlots, setAvalableSlots] = React.useState(100);
  const [OpenView, setOpenView] = React.useState(-1);
  const [showingFront, setShowingFront] = React.useState(true);
  const [tabView, setTabView] = React.useState(0);
  const [Chassis, setChassis] = React.useState("");

  // const [customFilteredData, setCustomFilteredData] = React.useState(AllCustomData);
  // console.log(customFilteredData);

  const [mltFilteredData, setMltFilteredData] = React.useState(
    // filterAndSortData(AllData, CombinedData, CombinedSort)
    AllData
  );
  let InAllCabinets = [...Assets, ...PDUs, ...UPSs, ...ATSs];

  let RackedInCurrentCabinet = InAllCabinets.filter((item) => {
    return item["Cabinet *"].value === CurrentCabinet["Name *"].value && item["Mounting"].value !== "ZeroU";
  });

  if (!CurrentCabinet) {
    return <div>Build Layout</div>;
  }
  if (!CurrentFilledCabinet) {
    return <div>Build Layout</div>;
  }
  if (!CurrentFilledCabinet.value) {
    return <div>Build Layout</div>;
  }

  const cleanRackData = (data) => {
    let cleanData = [...data];

    RackedInCurrentCabinet.forEach((item) => {
      let start = item["U Position *"].value + item["RU Height"].value - 2;
      for (let i = 0; i < item["RU Height"].value - 1; i++) {
        cleanData[start - i] = -1;
      }
    });
    return cleanData;
  };

  const openAbover = (index, depth) => {
    if (depth === "") {
      setAvalableSlots(100);
      // Filter the MLTData based on the available slots
      setMltFilteredData(
        AllData.filter((obj) => {
          return obj.RUHeight <= 100;
        })
      );
      return 100;
    }
    let open = 0;

    // Ensure index is within bounds of the array
    if (index < 0 || index >= CurrentFilledCabinet.value.length) {
      console.error("Index out of bounds");
      return 0;
    }

    // Loop through the array starting from the given index
    for (let i = 0; i < CurrentFilledCabinet.value.length - index; i++) {
      // Check if the slot is open (denoted by 0)
      if (CurrentFilledCabinet.value[i + index] === 0) {
        open += 1;
      }
      // Stop counting if a filled slot (denoted by 1) is encountered
      if (CurrentFilledCabinet.value[i + index] === 1) {
        break;
      }
    }

    // Update the available slots state
    setAvalableSlots(open);

    // Filter the MLTData based on the available slots
    // setMLTData(
    //   MLTData.filter((obj) => {
    //     return obj.RUHeight <= open;
    //   })
    setMltFilteredData(
      mltFilteredData.filter((obj) => {
        return obj.RUHeight <= open;
      })
    );
    return open;
  };

  return (
    <div className="flex flex-row gap-3 justify-center m-4">
      <div>
        <ZeroUPDULeft />
      </div>
      <div id="BuildCabinet_CabView" className="flex flex-col-reverse items-center">
        {cleanRackData(CurrentFilledCabinet.value).map((item, index) => {
          if (item === -1) {
            return null;
          }
          return (
            <div key={index} className="flex flex-rows border-2 border-gray-500">
              <div id="BuildCabinet_CabView_UP" className="border-r-2 border-gray-500">
                {index + 1}
              </div>
              <div className="min-w-[20rem]">
                {item === 1 ? (
                  <div id="filled" className="">
                    {filledInRack(index)}
                  </div>
                ) : (
                  <div id="empty" className="h-[2rem]">
                    {/* {EmptyInRack(index, "", "", "Rackable")} */}
                    {/* EmptyInRack(index, depth, side, Type, Chassis, setMLTClass, setChassis, setSideDepth, setUPosition, openAbover) */}
                    <EmptyInRack
                      index={index}
                      depth={""}
                      side={""}
                      Type={"Rackable"}
                      Chassis={""}
                      setMLTClass={setMLTClass}
                      setChassis={setChassis}
                      setSideDepth={setSideDepth}
                      setUPosition={setUPosition}
                      openAbover={openAbover}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div id="ModalRackable" className="modal w-full">
        <div className="modal-content overflow-auto mb-3">
          <div className="flex flex-col justify-center w-full">
            {Object.keys(SelectedMLTItem).length === 0 ? (
              <div>
                <div id="Entries and Close" className="flex flex-row justify-end gap-4">
                  {EntriesNumber()}
                  {CloseButton()}
                </div>
                {/* //! MLTSearchingData Box */}
                <div id="MLTSearchingData Box">
                  <button
                    id="MLTSearchingData Drop Button"
                    className="orangeButton"
                    onClick={() => {
                      const DataDrop = document.getElementById("MLTDataDrop");
                      const allDataDrops = document.getElementsByClassName("DataDrop");
                      if (DataDrop.classList.contains("h-[30rem]")) {
                        DataDrop.classList.remove("h-[30rem]");
                        DataDrop.classList.add("h-[0rem]");
                      } else {
                        for (let i = 0; i < allDataDrops.length; i++) {
                          allDataDrops[i].classList.remove("h-[30rem]");
                          allDataDrops[i].classList.add("h-[0rem]");
                        }
                        DataDrop.classList.remove("h-[0rem]");
                        DataDrop.classList.add("h-[30rem]");
                      }
                    }}
                  >
                    MLT Data Base
                  </button>
                  <div id="MLTDataDrop" className="DataDrop overflow-scroll w-[40rem] h-[30rem] border-y-2 transition-all ease-in-out duration-300">
                    <InputFilters
                      AllData={AllData}
                      AvalableSlots={AvalableSlots}
                      setAvalableSlots={setAvalableSlots}
                      visable={visable}
                      MLTClass={MLTClass}
                      setSelectedMLTItem={setSelectedMLTItem}
                      mltFilteredData={mltFilteredData}
                      setMltFilteredData={setMltFilteredData}
                    />
                  </div>
                </div>
                {/* //! Common Use Search Box */}
                <div id="CommonSearchingData Box">
                  <button
                    id="MLTSearchingData Drop Button"
                    className="orangeButton"
                    onClick={() => {
                      const DataDrop = document.getElementById("CommonDataDrop");
                      const allDataDrops = document.getElementsByClassName("DataDrop");
                      if (DataDrop.classList.contains("h-[30rem]")) {
                        DataDrop.classList.remove("h-[30rem]");
                        DataDrop.classList.add("h-[0rem]");
                      } else {
                        for (let i = 0; i < allDataDrops.length; i++) {
                          allDataDrops[i].classList.remove("h-[30rem]");
                          allDataDrops[i].classList.add("h-[0rem]");
                        }
                        DataDrop.classList.remove("h-[0rem]");
                        DataDrop.classList.add("h-[30rem]");
                      }
                    }}
                  >
                    Common Used Data Base
                  </button>
                  <div id="CommonDataDrop" className="DataDrop overflow-scroll w-[40rem] h-[0rem]  border-y-2 transition-all ease-in-out duration-300">
                    <InputFilters
                      AllData={AllData}
                      AvalableSlots={AvalableSlots}
                      setAvalableSlots={setAvalableSlots}
                      visable={visable}
                      MLTClass={MLTClass}
                      setSelectedMLTItem={setSelectedMLTItem}
                      mltFilteredData={mltFilteredData}
                      setMltFilteredData={setMltFilteredData}
                    />
                  </div>
                </div>
                {/* //! Created Items Seach Box */}
                <div id="CreatedSearchingData Box">
                  <div className="flex flex-row justify-between">
                    <button
                      id="MLTSearchingData Drop Button"
                      className="orangeButton"
                      onClick={() => {
                        const DataDrop = document.getElementById("CreatedDataDrop");
                        const allDataDrops = document.getElementsByClassName("DataDrop");
                        if (DataDrop.classList.contains("h-[30rem]")) {
                          DataDrop.classList.remove("h-[30rem]");
                          DataDrop.classList.add("h-[0rem]");
                        } else {
                          for (let i = 0; i < allDataDrops.length; i++) {
                            allDataDrops[i].classList.remove("h-[30rem]");
                            allDataDrops[i].classList.add("h-[0rem]");
                          }
                          DataDrop.classList.remove("h-[0rem]");
                          DataDrop.classList.add("h-[30rem]");
                        }
                      }}
                    >
                      Created Data Base
                    </button>{" "}
                    <NewModelLayout />
                  </div>
                  <div id="CreatedDataDrop" className="DataDrop overflow-scroll w-[40rem] h-[0rem]  border-y-2 transition-all ease-in-out duration-300">
                    <InputFiltersNonMLT visable={visable} setSelectedMLTItem={setSelectedMLTItem} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full">
                <div className="w-full flex flex-row justify-end">{CloseButton()}</div>
                <BuildInputs
                  SelectedMLTItem={SelectedMLTItem}
                  UPosition={UPosition}
                  setSavingData={setSavingData}
                  setStep={setStep}
                  SideDepth={SideDepth}
                  Chassis={Chassis}
                />
                <div className="flex flex-row justify-end gap-8">
                  <button
                    className="redButton"
                    onClick={() => {
                      setSavingData({});
                      setSelectedMLTItem({});
                      document.getElementById("ModalRackable").style.display = "none";
                      setAvalableSlots(100);
                      setMltFilteredData(
                        AllData.filter((obj) => {
                          return obj.RUHeight <= 100;
                        })
                      );
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="orangeButton"
                    onClick={() => {
                      if (savingData["Name *"].value === "") {
                        alert("Please fill in the Name field");
                        return;
                      }
                      setLoading(true);
                      if (Step !== "Blades") {
                        const payload = {
                          Step: Step,
                          value: savingData,
                          RUHeight: savingData["RU Height"].value,
                          UPosition: UPosition - 1,
                        };
                        dispatch(actions.AddToStepFullData(payload));
                        dispatch(actions.AdjustOpenRU(payload));
                      } else {
                        const payload = {
                          Step: Step,
                          value: savingData,
                        };
                        dispatch(actions.AddToStepFullData(payload));
                      }
                      setTimeout(() => {
                        setSavingData({});
                        setSelectedMLTItem({});
                        document.getElementById("ModalRackable").style.display = "none";
                        setAvalableSlots(100);
                        setMltFilteredData(
                          AllData.filter((obj) => {
                            return obj.RUHeight <= 100;
                          })
                        );
                        setLoading(false);
                      }, 3000);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {loading && <LoadingSpinner />}
      <div>
        <ZeroUPDURight />
      </div>
    </div>
  );

  function CloseButton() {
    return (
      <div id="closeButton">
        <button
          className="redButton flex flex-row justify-center items-center"
          onClick={() => {
            setSelectedMLTItem({});
            document.getElementById("ModalRackable").style.display = "none";
            setAvalableSlots(100);

            // Filter the MLTData based on the available slots
            setMltFilteredData(
              AllData.filter((obj) => {
                return obj.RUHeight <= 100;
              })
            );
          }}
        >
          x
        </button>
      </div>
    );
  }

  function EntriesNumber() {
    return (
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
    );
  }

  // function EmptyInRack(index, depth, side, Type, Chassis) {
  //   return (
  //     <div className="flex flex-row justify-center">
  //       <button
  //         className={Type === "Rackable" ? "orangeButton" : "orangeButtonVertical"}
  //         onClick={() => {
  //           document.getElementById("ModalRackable").style.display = "block";
  //           // setMLTClass(Type);
  //           if (Type === "Blade") setChassis(Chassis);
  //           else setChassis("");
  //           setMLTClass(Type);
  //           setSideDepth({ Depth: depth, Side: side });
  //           setUPosition(index + 1);
  //           openAbover(index, depth);
  //           // setUpdate(!update);
  //         }}
  //       >
  //         Open {Type} {index + 1 === 0 ? "" : index + 1}
  //       </button>
  //     </div>
  //   );
  // }

  function exspandFilledUnit(index) {
    const highSet = "h-[17.5rem]";
    const filledRacksUP = document.getElementsByClassName("filledRackUP");
    for (let i = 0; i < filledRacksUP.length; i++) {
      filledRacksUP[i].classList.remove(highSet);
    }
    document.getElementById("BuildCabinet_CabView_FilledInRack" + index).classList.remove("h-[2rem]");
    document.getElementById("BuildCabinet_CabView_FilledInRack" + index).classList.add(highSet);
  }

  function closeAllFilledUnits(index) {
    const highSet = "h-[17.5rem]";
    const filledRacksUP = document.getElementsByClassName("filledRackUP");
    document.getElementById("BuildCabinet_CabView_FilledInRack" + index).classList.add("h-[2rem]");
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
          setOpenView(index);
          exspandFilledUnit(index);
        }}
      >
        <div className="h-[2rem] flex flex-col justify-between px-2">
          {RackedInCurrentCabinet.filter((items) => items["U Position *"].value === index + 1).map((item, indexRack) => {
            const hasSlots = item["Slots Front"].value !== 0 || item["Slots Back"].value !== 0;
            return (
              <div className="flex flex-col h-full">
                <div className="flex flex-row gap-3 justify-between items-center">
                  <div className="flex flex-row gap-3">
                    <div className="h-[2rem] flex flex-row items-center">{item["Make *"].value}</div>
                    <div className="h-[full] flex flex-row items-center">
                      {item["Model *"].value.length > 16 && OpenView !== index ? item["Model *"].value.slice(0, 16) + "..." : item["Model *"].value}
                    </div>
                  </div>
                  <div className="flex flex-row gap-3">
                    <div className="flex flex-row">
                      {hasSlots && OpenView !== index ? (
                        <div className="flex flex-row justify-center items-center h-full rotate-90 text-xl">
                          <GrDatabase />
                        </div>
                      ) : null}
                    </div>
                    {OpenCloseButtonPerSlot(hasSlots)}
                  </div>
                </div>
                {TabsPerFilledUP()}
                <div>{tabView === 0 ? InfoTab() : tabView === 1 ? BladeViewTab(hasSlots, item) : InfoTab()}</div>
              </div>
            );
          })}
          <div className="flex flex-row items-end justify-between">
            <div></div>
          </div>
        </div>
      </div>
    );

    function TabsPerFilledUP() {
      const Tabs = ["Info", "Blades", "testing"];
      const tabButtons = document.getElementsByClassName("TabButtons");

      function removeSelected() {
        for (var i = 0; i < tabButtons.length; i++) {
          tabButtons[i].addEventListener("click", function () {
            for (var j = 0; j < tabButtons.length; j++) {
              tabButtons[j].classList.remove("selected");
            }
          });
        }
      }

      return (
        <div className="flex flex-row gap-2">
          {Tabs.map((tab, index) => {
            return (
              <div
                key={index}
                className={"bg-[#F7F5F1] text-[black] font-bold py-2 px-6 TabButtons  " + (index === tabView ? "selected" : "")}
                onClick={(e) => {
                  removeSelected();
                  e.target.classList.add("selected");
                  setTabView(index);
                }}
              >
                {tab}
              </div>
            );
          })}
        </div>
      );
    }

    function InfoTab() {
      return <div>INFORMATIONs</div>;
    }

    function BladeViewTab(hasSlots, item) {
      if (BladeSupport) {
        return (
          <div>
            {hasSlots ? (
              <BladeView
                SlottedItem={item}
                showingFront={showingFront}
                Step={Step}
                setShowingFront={setShowingFront}
                setMLTClass={setMLTClass}
                setChassis={setChassis}
                setSideDepth={setSideDepth}
                setUPosition={setUPosition}
                openAbover={openAbover}
                // ! HAVE TO SET DEPTH AND SIDE
                // emptyInRack={EmptyInRack(-1, "", "", "Blade", item["Name *"].value)}
                // <EmptyInRack index={-1} depth={""} side={""} Type={"Blade"} Chassis={item["Name *"].value} setMLTClass={setMLTClass} setChassis={setChassis} setSideDepth={setSideDepth} setUPosition={setUPosition} openAbover={openAbover} />
              />
            ) : (
              "No Slots (Front Or Back)"
            )}
          </div>
        );
      }
      return <div>Blade Not Supported</div>;
    }

    function OpenCloseButtonPerSlot() {
      return (
        <div className="flex flex-row items-center">
          {OpenView === index ? (
            <button
              className="orangeButton"
              onClick={(e) => {
                setOpenView(-1);
                e.stopPropagation();
                closeAllFilledUnits(index);
              }}
            >
              <MdOutlineKeyboardArrowUp />
            </button>
          ) : (
            <button
              className="orangeButton"
              onClick={(e) => {
                setOpenView(index);
                e.stopPropagation();
                exspandFilledUnit(index);
              }}
            >
              <MdOutlineKeyboardArrowDown />
            </button>
          )}
        </div>
      );
    }
  }

  // function ZeroUPDULeft() {
  //   return (
  //     <div className="flex flex-row gap-2 sticky top-[5rem]">
  //       <PDUViewVertical CabinetSide={"Left Side"} DepthPosition={"Front"} Step={Step} emptyInRack={EmptyInRack(0, "Front", "Left Side", "ZeroU")} />
  //       <PDUViewVertical CabinetSide={"Left Side"} DepthPosition={"Center"} Step={Step} emptyInRack={EmptyInRack(0, "Center", "Left Side", "ZeroU")} />
  //       <PDUViewVertical CabinetSide={"Left Side"} DepthPosition={"Back"} Step={Step} emptyInRack={EmptyInRack(0, "Back", "Left Side", "ZeroU")} />
  //     </div>
  //   );
  // }

  // function ZeroUPDURight() {
  //   return (
  //     <div className="flex flex-row gap-2 sticky top-[5rem]">
  //       <PDUViewVertical CabinetSide={"Right Side"} DepthPosition={"Back"} Step={Step} emptyInRack={EmptyInRack(0, "Front", "Right Side", "ZeroU")} />
  //       <PDUViewVertical CabinetSide={"Right Side"} DepthPosition={"Center"} Step={Step} emptyInRack={EmptyInRack(0, "Center", "Right Side", "ZeroU")} />
  //       <PDUViewVertical CabinetSide={"Right Side"} DepthPosition={"Front"} Step={Step} emptyInRack={EmptyInRack(0, "Back", "Right Side", "ZeroU")} />
  //     </div>
  //   );
  // }

  function ZeroUPDULeft() {
    return (
      <div className="flex flex-row gap-2 sticky top-[5rem]">
        <PDUViewVertical
          CabinetSide={"Left Side"}
          DepthPosition={"Front"}
          Step={Step}
          setMLTClass={setMLTClass}
          setChassis={setChassis}
          setSideDepth={setSideDepth}
          setUPosition={setUPosition}
          openAbover={openAbover}
        />
        <PDUViewVertical
          CabinetSide={"Left Side"}
          DepthPosition={"Center"}
          Step={Step}
          setMLTClass={setMLTClass}
          setChassis={setChassis}
          setSideDepth={setSideDepth}
          setUPosition={setUPosition}
          openAbover={openAbover}
        />
        <PDUViewVertical
          CabinetSide={"Left Side"}
          DepthPosition={"Back"}
          Step={Step}
          setMLTClass={setMLTClass}
          setChassis={setChassis}
          setSideDepth={setSideDepth}
          setUPosition={setUPosition}
          openAbover={openAbover}
        />
      </div>
    );
  }

  function ZeroUPDURight() {
    return (
      <div className="flex flex-row gap-2 sticky top-[5rem]">
        <PDUViewVertical
          CabinetSide={"Right Side"}
          DepthPosition={"Back"}
          Step={Step}
          setMLTClass={setMLTClass}
          setChassis={setChassis}
          setSideDepth={setSideDepth}
          setUPosition={setUPosition}
          openAbover={openAbover}
        />
        <PDUViewVertical
          CabinetSide={"Right Side"}
          DepthPosition={"Center"}
          Step={Step}
          setMLTClass={setMLTClass}
          setChassis={setChassis}
          setSideDepth={setSideDepth}
          setUPosition={setUPosition}
          openAbover={openAbover}
        />
        <PDUViewVertical
          CabinetSide={"Right Side"}
          DepthPosition={"Front"}
          Step={Step}
          setMLTClass={setMLTClass}
          setChassis={setChassis}
          setSideDepth={setSideDepth}
          setUPosition={setUPosition}
          openAbover={openAbover}
        />
      </div>
    );
  }
}
