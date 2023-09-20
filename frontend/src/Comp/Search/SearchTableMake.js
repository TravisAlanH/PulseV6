import React from "react";
import * as FIND from "../../Format/Search";
import * as Action from "../../Store/Slices/Slice";
import { useDispatch, useSelector } from "react-redux";

export default function SearchTableMake({ SearchData, searchInput, Step, setSearchInput, keyName }) {
  let closestMatch = FIND.findClosestMatches(SearchData, searchInput);
  const dispatch = useDispatch();
  const current = useSelector((state) => state.data.Current[Step]);

  let payload = {
    Step: Step,
    Current: current,
    Key: keyName,
  };

  return (
    <div className="bg-white">
      {closestMatch.map((item, index) => (
        <div key={index} className="search-item">
          <button
            className="w-[10rem] text-left px-2 py-3 border-b-2 border-gray-200 hover:bg-gray-100"
            onClick={() => {
              payload.value = SearchData[item];
              setSearchInput(SearchData[item]);
              dispatch(Action.changeData(payload));
            }}>
            {SearchData[item]}
          </button>
        </div>
      ))}
    </div>
  );
}
