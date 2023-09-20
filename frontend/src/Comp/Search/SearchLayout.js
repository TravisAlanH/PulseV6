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

  let SearchData;
  let StepDataFilter = [];

  switch (Step) {
    case (Step = "Racks"):
      StepDataFilter = ["Cabinet"];
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
    <div>
      <div id="SearchDiv" className="search">
        <label className="search-label">{KeyName}</label>
        <SearchInput setSearchInput={setSearchInput} searchInput={searchInput} KeyName={KeyName} Step={Step} />
        <div id="SearchTable" className="search-content">
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
