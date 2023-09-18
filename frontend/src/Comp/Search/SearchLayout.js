import React from "react";
import SearchInput from "./SearchInput";
import SearchTableMake from "./SearchTableMake";
import "./Search.css";
import SearchTableModel from "./SearchTableModel";
import * as FORMAT from "../../Format/FormatRacks";

export default function SearchLayout({ KeyName, Step, AllData }) {
  const [searchInput, setSearchInput] = React.useState("");

  let SearchData;

  if (KeyName === "Make *") {
    SearchData = FORMAT.getUniqueMakes(AllData);
  } else {
    SearchData = FORMAT.MinimalRacks(AllData);
  }

  return (
    <div>
      <div id="SearchDiv" className="search">
        <SearchInput setSearchInput={setSearchInput} />
        <div id="SearchTable" className="search-content">
          {KeyName.includes("Make") ? (
            <SearchTableMake SearchData={SearchData} searchInput={searchInput} Step={Step} />
          ) : (
            <SearchTableModel SearchData={SearchData} searchInput={searchInput} Step={Step} />
          )}
        </div>
      </div>
      <input type="text" placeholder="TEST" />
      <input type="text" placeholder="TEST" />
      <input type="text" placeholder="TEST" />
      <input type="text" placeholder="TEST" />
      <input type="text" placeholder="TEST" />
      <input type="text" placeholder="TEST" />
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
