import React from "react";
import SearchInput from "./SearchInput";
import SearchTableMake from "./SearchTableMake";
import "./Search.css";
import SearchTableModel from "./SearchTableModel";

export default function SearchLayout({ KeyName, Step, Data }) {
  Step = "model";

  return (
    <div>
      <div id="SearchDiv" className="search">
        <SearchInput />
        <div id="SearchTable" className="search-content">
          {Step.includes("Make") ? <SearchTableMake /> : <SearchTableModel />}
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
