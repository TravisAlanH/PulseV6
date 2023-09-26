import React, { useEffect } from "react";
import SearchInput from "./SearchInput";
import SearchTableMake from "./SearchTableMake";
import "./Search.css";
import SearchTableModel from "./SearchTableModel";
import * as FORMAT from "../../Format/FormatRacks";
import { useSelector } from "react-redux";

export default function SearchLayout({ KeyName, Step, AllData }) {
  const current = useSelector((state) => state.data.Current[Step]);
  const state = useSelector((state) => state.data[Step][current]);
  const currentMake = useSelector((state) => state.data[Step][current]["Make *"].value);
  const currentMakeAPI = useSelector((state) => state.data[Step][current]["Make *"].APIMatch);
  const [searchInput, setSearchInput] = React.useState(state[KeyName].value);
  const [showTable, setShowTable] = React.useState(false);

  let SearchData;
  let StepDataFilter = [];

  switch (Step) {
    case (Step = "Racks"):
      StepDataFilter = ["Cabinet"];
      break;
    case (Step = "PDUs"):
      StepDataFilter = ["Rack PDU"];
      break;
    case (Step = "Assets"):
      StepDataFilter = ["Device", "Network"];
      break;
    default:
      break;
  }

  useEffect(() => {
    setSearchInput(state[KeyName].value);
  }, [current, KeyName, state]);

  if (KeyName === "Make *") {
    SearchData = FORMAT.getStepData(AllData, StepDataFilter);
    SearchData = FORMAT.getUniqueMakes(SearchData);
  } else {
    if (currentMake === "") {
      SearchData = FORMAT.MinimalRacks(AllData);
      SearchData = FORMAT.getStepData(SearchData, StepDataFilter);
    } else {
      SearchData = FORMAT.MinimalRacks(AllData);
      SearchData = FORMAT.filterObjectsByValue(SearchData, currentMake, currentMakeAPI);
      SearchData = FORMAT.getStepData(SearchData, StepDataFilter);
    }
  }

  return (
    <div
      onClick={() => {
        window.addEventListener("click", function (e) {
          if (document.getElementById("SearchDiv").contains(e.target)) {
            setShowTable(true);
          } else {
            setShowTable(false);
          }
        });
      }}>
      <div
        className="SearchLayout"
        onClick={() => {
          console.log("in search div");
        }}>
        <div id="SearchDiv" className="search">
          <div className="flex flex-row">
            <div className="w-[1rem] flex flex-row justify-center items-center text-red-500">
              {KeyName.includes("*") ? "*" : ""}
            </div>
            <label className="search-label text-xs font-bold w-[6rem] p-1 bg-[#F7F5F1]  flex flex-col justify-center">
              {KeyName.replace("*", "")}
            </label>
            <SearchInput
              setSearchInput={setSearchInput}
              searchInput={searchInput}
              KeyName={KeyName}
              Step={Step}
              setShowTable={setShowTable}
            />
          </div>
          {/* <div id="SearchTable" className="search-content"> */}
          <div id="SearchTable" className={showTable ? "block search-content" : "hidden search-content"}>
            {KeyName.includes("Make") ? (
              <SearchTableMake
                keyName={KeyName}
                SearchData={SearchData}
                searchInput={searchInput}
                Step={Step}
                setSearchInput={setSearchInput}
              />
            ) : (
              <SearchTableModel
                keyName={KeyName}
                SearchData={SearchData}
                searchInput={searchInput}
                Step={Step}
                setSearchInput={setSearchInput}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// "Make *": {
//   type: "text",
//   value: "",
//   placeholder: "Input Here",
//   options: [],
//   required: false,
//   APIMatch: "",
//   NEXT: "HOLD FOR ADDITIONAL INFO",
// },
// "Model *": {
