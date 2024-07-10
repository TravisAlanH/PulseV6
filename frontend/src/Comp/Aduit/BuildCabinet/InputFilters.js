import React, { useState } from "react";
import DataFiltered from "./DataFiltered";
import { ImSortAmountAsc, ImSortAmountDesc, ImCircleDown } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { TbClearAll } from "react-icons/tb";
import FilterList from "./Filters";
import { filterAndSortData } from "./Filters";

export default function InputFilters({
  AllData,
  AvalableSlots,
  // setAvalableSlots,
  visable,
  MLTClass,
  setSelectedMLTItem,
  mltFilteredData,
  setMltFilteredData,
}) {
  console.log(AllData);
  // const [mltFilteredData, setMltFilteredData] = React.useState([...AllData]);

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [ruHeight, setRuHeight] = useState();
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

  const [deviceClassFilter, setDeviceClassFilter] = useState([]);
  const [subclassFilter, setSubclassFilter] = useState([]);
  const [mountingFilter, setMountingFilter] = useState([]);

  React.useEffect(() => {
    setMountingFilter([MLTClass]);
  }, [MLTClass, setMountingFilter]);

  React.useEffect(() => {
    setRuHeight(AvalableSlots);
  }, [AvalableSlots, setRuHeight]);

  // AllData = AllData.filter((item) => item.Mounting === MLTClass);

  let CombinedData = React.useMemo(
    () => [
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
    ],
    [make, model, ruHeight, deviceClass, subclass, mounting, dataPortsCount, powerPortsCount, frontSlotsCount, backSlotsCount]
  );

  let CombinedSort = React.useMemo(
    () => [
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
    ],
    [
      makeSort,
      modelSort,
      ruHeightSort,
      deviceClassSort,
      subclassSort,
      mountingSort,
      dataPortsCountSort,
      powerPortsCountSort,
      frontSlotsCountSort,
      backSlotsCountSort,
    ]
  );

  let CombinedFilter = React.useMemo(
    () => [
      [deviceClassFilter, setDeviceClassFilter],
      [subclassFilter, setSubclassFilter],
      [mountingFilter, setMountingFilter],
    ],
    [deviceClassFilter, subclassFilter, mountingFilter]
  );

  React.useEffect(() => {
    setMltFilteredData(filterAndSortData(AllData, CombinedData, CombinedSort, CombinedFilter));
  }, [CombinedFilter, CombinedSort, CombinedData, setMltFilteredData, AllData]);

  // console.log(CombinedFilter);

  // const [mltFilteredData, setMltFilteredData] = React.useState(
  //   // filterAndSortData(AllData, CombinedData, CombinedSort, CombinedFilter)
  //   AllData
  // );

  React.useEffect(() => {
    setRuHeight(AvalableSlots);
  }, [AvalableSlots, setRuHeight]);

  const Headers = ["Make", "Model", "RUHeight", "Class", "Subclass", "Mounting", "DataPorts", "PowerPorts", "FrontSlots", "BackSlots"];

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

  function closeAllFilterBars() {
    let filterBarHide = document.getElementsByClassName("filterBar");
    for (let i = 0; i < filterBarHide.length; i++) {
      filterBarHide[i].classList.add("hidden");
      filterBarHide[i].classList.remove("flex");
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row h-[2rem] sticky top-0 bg-white">
        <div className="min-w-[2.8rem]"></div>
        {Headers.map((item, index) => {
          return (
            <div className="flex flex-row justify-between min-w-[8rem] max-w-[8rem] border-2 border-gray-300 overflow-visable  bg-white">
              <div key={index} className=" text-nowrap">
                {item}
              </div>
              <div className="flex flex-col relative">
                {FilterButton(index)}
                {FilterData(index)}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row sticky top-[2rem] bg-white">
        <div className="min-w-[2.8rem]"></div>
        {CombinedData.map((item, index) => {
          return (
            <div key={index} className="min-w-[8rem] max-w-[8rem] flex flex-row">
              {Headers[index] === "RUHeight" ||
              Headers[index] === "DataPorts" ||
              Headers[index] === "PowerPorts" ||
              Headers[index] === "FrontSlots" ||
              Headers[index] === "BackSlots" ? (
                <input
                  id={"FilterInput" + index}
                  type="number"
                  className="border-2 border-gray-300 w-full"
                  value={item[0]}
                  onChange={(e) => {
                    item[1](e.target.value);
                    setMltFilteredData(filterAndSortData(AllData, CombinedData, CombinedSort, CombinedFilter));
                  }}
                />
              ) : (
                <input
                  id={"FilterInput" + index}
                  type="text"
                  className="border-2 border-gray-300 w-full"
                  value={item[0]}
                  onChange={(e) => {
                    item[1](e.target.value);
                    setMltFilteredData(filterAndSortData(AllData, CombinedData, CombinedSort, CombinedFilter));
                  }}
                />
              )}
              <button
                className="w-[2rem] border-2 rounded-md"
                onClick={() => {
                  item[1]("");
                  closeAllFilterBars();
                  setMltFilteredData(filterAndSortData(AllData, CombinedData, CombinedSort, CombinedFilter));
                }}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
      <div>
        <DataFiltered setSelectedMLTItem={setSelectedMLTItem} mltFilteredData={mltFilteredData} visable={visable} />
      </div>
    </div>
  );

  function FilterButton(index) {
    return (
      <div className="flex flex-row">
        <button className={CombinedSort[index][0] !== 0 ? "orangeButtonActive" : "orangeButton"} onClick={() => showHideFilterBar(index)}>
          <ImCircleDown />
        </button>
      </div>
    );
  }

  function FilterData(index) {
    return (
      <div id={"FilterBar" + index} className="filterBar hidden absolute -translate-x-[9.8rem] translate-y-[3.8rem] min-w-[30rem]">
        <div className="bg-white p-2 border-2 sticky z-10">
          <div className="flex flex-col ">
            <div>
              <button
                className="flex flex-row gap-3 items-center"
                onClick={() => {
                  if (CombinedSort[index][0] !== -1) CombinedSort[index][1](-1);
                  if (CombinedSort[index][0] === -1) CombinedSort[index][1](0);
                  setMltFilteredData(filterAndSortData(AllData, CombinedData, CombinedSort, CombinedFilter));
                }}
              >
                <ImSortAmountAsc />
                <label className="cursor-pointer">Sort Ascending</label>
              </button>
            </div>
            <div>
              <button
                className="flex flex-row gap-3 items-center"
                onClick={() => {
                  if (CombinedSort[index][0] !== 1) CombinedSort[index][1](1);
                  if (CombinedSort[index][0] === 1) CombinedSort[index][1](0);
                  setMltFilteredData(filterAndSortData(AllData, CombinedData, CombinedSort, CombinedFilter));
                }}
              >
                <ImSortAmountDesc />
                <label className="cursor-pointer">Sort Descending</label>
              </button>
            </div>
            <div>
              <button
                className="flex flex-row gap-3 items-center"
                onClick={() => {
                  CombinedSort[index][1](0);
                  setMltFilteredData(filterAndSortData(AllData, CombinedData, CombinedSort, CombinedFilter));
                }}
              >
                <IoClose /> <label className="cursor-pointer">Clear Sort</label>
              </button>
            </div>
            <div className="flex flex-row">
              <input
                type="text"
                className="border-2 w-[9rem]"
                defaultValue={CombinedData[index][0]}
                onFocus={() => {
                  document.getElementById("FilterInput" + index).focus();
                  closeAllFilterBars();
                }}
              />
              <button
                className="w-[2rem] border-2 rounded-md"
                onClick={() => {
                  CombinedData[index][1]("");
                  closeAllFilterBars();
                }}
              >
                X
              </button>
            </div>
          </div>
          {FilterScrollBoxes(index)}
          <div>
            <button
              className="flex flex-row gap-3 items-center"
              onClick={() => {
                CombinedData[index][1]("");
                CombinedSort[index][1](0);
                setMltFilteredData(filterAndSortData(AllData, CombinedData, CombinedSort, CombinedFilter));
              }}
            >
              <TbClearAll />
              <label className="cursor-pointer">Clear All</label>
            </button>
          </div>
        </div>
      </div>
    );
  }

  function FilterScrollBoxes(index) {
    return (
      <div>
        {Headers[index] === "Class" ? (
          <div className="overflow-scroll h-[10rem]" id="Filter">
            {FilterList[Headers[index]].map((item, index) => {
              return (
                <div key={index} className="flex flex-row gap-2">
                  <input
                    type="checkbox"
                    checked={CombinedFilter[0][0].includes(item)}
                    onChange={() => {
                      if (CombinedFilter[0][0].includes(item)) {
                        CombinedFilter[0][1](CombinedFilter[0][0].filter((i) => i !== item));
                        setMltFilteredData(filterAndSortData(AllData, CombinedData, CombinedSort, CombinedFilter));
                      } else {
                        CombinedFilter[0][1]([...CombinedFilter[0][0], item]);
                        setMltFilteredData(filterAndSortData(AllData, CombinedData, CombinedSort, CombinedFilter));
                      }
                    }}
                  />
                  <label>{item}</label>
                </div>
              );
            })}
          </div>
        ) : null}

        {Headers[index] === "Subclass" ? (
          <div className="overflow-scroll h-[10rem]" id="Filter">
            {FilterList[Headers[index]].map((item, index) => {
              return (
                <div key={index} className="flex flex-row gap-2">
                  <input
                    type="checkbox"
                    checked={CombinedFilter[1][0].includes(item)}
                    onChange={() => {
                      if (CombinedFilter[1][0].includes(item)) {
                        CombinedFilter[1][1](CombinedFilter[1][0].filter((i) => i !== item));
                        setMltFilteredData(filterAndSortData(AllData, CombinedData, CombinedSort, CombinedFilter));
                      } else {
                        CombinedFilter[1][1]([...CombinedFilter[1][0], item]);
                        setMltFilteredData(filterAndSortData(AllData, CombinedData, CombinedSort, CombinedFilter));
                      }
                    }}
                  />
                  <label>{item}</label>
                </div>
              );
            })}
          </div>
        ) : null}

        {Headers[index] === "Mounting" ? (
          <div className="overflow-scroll h-[10rem]" id="Filter">
            {FilterList[Headers[index]].map((item, index) => {
              return (
                <div key={index} className="flex flex-row gap-2">
                  <input
                    type="checkbox"
                    checked={CombinedFilter[2][0].includes(item)}
                    onChange={() => {
                      if (CombinedFilter[2][0].includes(item)) {
                        CombinedFilter[2][1](CombinedFilter[2][0].filter((i) => i !== item));
                        setMltFilteredData(filterAndSortData(AllData, CombinedData, CombinedSort, CombinedFilter));
                      } else {
                        CombinedFilter[2][1]([...CombinedFilter[2][0], item]);
                        setMltFilteredData(filterAndSortData(AllData, CombinedData, CombinedSort, CombinedFilter));
                      }
                    }}
                  />
                  <label>{item}</label>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}
