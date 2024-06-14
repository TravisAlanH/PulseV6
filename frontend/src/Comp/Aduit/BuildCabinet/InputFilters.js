import React, { useState } from "react";
import DataFiltered from "./DataFiltered";

export default function InputFilters({ AllData, AvalableSlots, AllUnique }) {
  const [mltFilteredData, setMltFilteredData] = React.useState([...AllData]);

  console.log("test");

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [ruHeight, setRuHeight] = useState(AvalableSlots);
  const [deviceClass, setDeviceClass] = useState("");
  const [subclass, setSubclass] = useState("");
  const [mounting, setMounting] = useState("");
  const [dataPortsCount, setDataPortsCount] = useState("");
  const [powerPortsCount, setPowerPortsCount] = useState("");
  const [frontSlotsCount, setFrontSlotsCount] = useState("");
  const [backSlotsCount, setBackSlotsCount] = useState("");

  const [makeSort, setMakeSort] = useState(0);
  const [modelSort, setModelSort] = useState(0);
  const [ruHeightSort, setRuHeightSort] = useState(0);
  const [deviceClassSort, setDeviceClassSort] = useState(0);
  const [subclassSort, setSubclassSort] = useState(0);
  const [mountingSort, setMountingSort] = useState(0);
  const [dataPortsCountSort, setDataPortsCountSort] = useState(0);
  const [powerPortsCountSort, setPowerPortsCountSort] = useState(0);
  const [frontSlotsCountSort, setFrontSlotsCountSort] = useState(0);
  const [backSlotsCountSort, setBackSlotsCountSort] = useState(0);

  const [makeFilter, setMakeFilter] = useState([]);
  const [modelFilter, setModelFilter] = useState([]);
  const [ruHeightFilter, setRuHeightFilter] = useState([]);
  const [deviceClassFilter, setDeviceClassFilter] = useState([]);
  const [subclassFilter, setSubclassFilter] = useState([]);
  const [mountingFilter, setMountingFilter] = useState([]);
  const [dataPortsCountFilter, setDataPortsCountFilter] = useState([]);
  const [powerPortsCountFilter, setPowerPortsCountFilter] = useState([]);
  const [frontSlotsCountFilter, setFrontSlotsCountFilter] = useState([]);
  const [backSlotsCountFilter, setBackSlotsCountFilter] = useState([]);

  React.useEffect(() => {
    setRuHeight(AvalableSlots);
  }, [AvalableSlots]);

  let CombinedData = [
    [make, setMake],
    [model, setModel],
    [ruHeight, setRuHeight],
    [deviceClass, setDeviceClass],
    [subclass, setSubclass],
    [mounting, setMounting],
    [dataPortsCount, setDataPortsCount],
    [powerPortsCount, setPowerPortsCount],
    [frontSlotsCount, setFrontSlotsCount],
    [backSlotsCount, setBackSlotsCount],
  ];

  let CombinedSort = [
    [makeSort, setMakeSort],
    [modelSort, setModelSort],
    [ruHeightSort, setRuHeightSort],
    [deviceClassSort, setDeviceClassSort],
    [subclassSort, setSubclassSort],
    [mountingSort, setMountingSort],
    [dataPortsCountSort, setDataPortsCountSort],
    [powerPortsCountSort, setPowerPortsCountSort],
    [frontSlotsCountSort, setFrontSlotsCountSort],
    [backSlotsCountSort, setBackSlotsCountSort],
  ];

  let CombinedFilter = [
    [makeFilter, setMakeFilter],
    [modelFilter, setModelFilter],
    [ruHeightFilter, setRuHeightFilter],
    [deviceClassFilter, setDeviceClassFilter],
    [subclassFilter, setSubclassFilter],
    [mountingFilter, setMountingFilter],
    [dataPortsCountFilter, setDataPortsCountFilter],
    [powerPortsCountFilter, setPowerPortsCountFilter],
    [frontSlotsCountFilter, setFrontSlotsCountFilter],
    [backSlotsCountFilter, setBackSlotsCountFilter],
  ];

  const Headers = [
    "Make",
    "Model",
    "RUHeight",
    "Class",
    "Subclass",
    "Mounting",
    "DataPortsCount",
    "PowerPortsCount",
    "FrontSlotsCount",
    "BackSlotsCount",
  ];

  function showHideFilterBar(shownIndex) {
    let filterBar = document.getElementById("FilterBar" + shownIndex);
    let filterBarHide = document.getElementsByClassName("filterBar");
    if (filterBar.classList.contains("flex")) {
      filterBar.classList.add("hidden");
      filterBar.classList.remove("flex");
      return;
    }

    for (let i = 0; i < filterBarHide.length; i++) {
      filterBarHide[i].classList.add("hidden");
      filterBarHide[i].classList.remove("flex");
    }
    filterBar.classList.remove("hidden");
    filterBar.classList.add("flex");
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row h-[2.5rem]">
        {Headers.map((item, index) => {
          return (
            <div className="flex flex-row justify-between w-[12rem] border-2 border-gray-300 overflow-visable">
              <div key={index} className=" text-nowrap">
                {item}
              </div>
              <div className="flex flex-col">
                {FilterButton(index)}
                {FilterData(index)}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row">
        {CombinedData.map((item, index) => {
          return (
            <div key={index} className="w-[12rem]">
              <input
                type="text"
                className="border-2 border-gray-300 w-full"
                value={item[0]}
                onChange={(e) => item[1](e.target.value)}
              />
            </div>
          );
        })}
      </div>
      <div>
        <DataFiltered
          CombinedData={CombinedData}
          AllData={AllData}
          CombinedSort={CombinedSort}
          CombinedFilter={CombinedFilter}
          mltFilteredData={mltFilteredData}
          setMltFilteredData={setMltFilteredData}
        />
      </div>
    </div>
  );

  function FilterButton(index) {
    return (
      <div className="flex flex-row">
        <button
          className={
            CombinedSort[index][0] !== 0 ? "orangeButtonActive" : "orangeButton"
          }
          onClick={() => showHideFilterBar(index)}
        >
          {"F"}
        </button>
      </div>
    );
  }

  function FilterData(index) {
    return (
      <div
        id={"FilterBar" + index}
        className="filterBar hidden relative -translate-x-[300%]"
      >
        <div className="bg-white p-2 border-2 absolute">
          <div className="flex flex-row ">
            <button
              className="orangeButton"
              onClick={() => CombinedSort[index][1](-1)}
            >
              {"▲"}
            </button>
            <button
              className="orangeButton"
              onClick={() => CombinedSort[index][1](0)}
            >
              {"X"}
            </button>
            <button
              className="orangeButton"
              onClick={() => CombinedSort[index][1](1)}
            >
              {"▼"}
            </button>
          </div>
          <div className="overflow-scroll h-[10rem]">
            {/* {AllUnique.map((item, index) => {
              return (
                <div>
                  <input
                    type="checkbox"
                    value={item}
                    onChange={(e) => {
                      if (e.target.checked) {
                        CombinedFilter[index][1]([
                          ...CombinedFilter[index][0],
                          e.target.value,
                        ]);
                      } else {
                        CombinedFilter[index][1](
                          CombinedFilter[index][0].filter(
                            (item) => item !== e.target.value
                          )
                        );
                      }
                    }}
                  />
                  {item}
                </div>
              );
            })} */}
          </div>
          {/* test */}
        </div>
      </div>
    );
  }
}
