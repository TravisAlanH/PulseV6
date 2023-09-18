import React from "react";
import * as FIND from "../../Format/Search";

export default function SearchTableMake({ SearchData, searchInput, Step }) {
  let closestMatch = FIND.findClosestMatches(SearchData, searchInput);

  return (
    <div className="bg-white">
      {closestMatch.map((item, index) => (
        <div key={index} className="search-item">
          <button
            className="w-[10rem] text-left px-2 py-3 border-b-2 border-gray-200 hover:bg-gray-100"
            onClick={() => {
              Step(item);
            }}>
            {item}
          </button>
        </div>
      ))}
    </div>
  );
}
