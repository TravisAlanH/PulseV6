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
        <div key={index} className="search-item h-[2.5rem]">
          <button
            className="text-left px-2 border-2 border-[#999] bg-gray-100 hover:bg-gray-200 text-black m-0"
            onClick={() => {
              payload.value = SearchData[item];
              setSearchInput(SearchData[item]);
              dispatch(Action.changeData(payload));
            }}>
            <div className="w-[25rem] flex flex-col">
              <p className="text-xs text-[#797979]">Model</p>
              <p>{SearchData[item]}</p>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
}
