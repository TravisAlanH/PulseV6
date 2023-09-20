import React from "react";
import * as FIND from "../../Format/Search";
import * as Action from "../../Store/Slices/Slice";
import { useDispatch, useSelector } from "react-redux";

export default function SearchTableModel({ SearchData, searchInput, Step, setSearchInput, keyName }) {
  const current = useSelector((state) => state.data.Current[Step]);
  const APIMatch = useSelector((state) => state.data[Step][current][keyName].APIMatch);
  const dispatch = useDispatch();
  let closestMatch = FIND.findClosestMatchesInArrayObject(SearchData, searchInput, APIMatch);

  let payload = {
    Step: Step,
    Current: current,
    Key: keyName,
  };

  return (
    <div>
      {closestMatch.map((item, index) => (
        <div key={index} className="search-item">
          <button
            className="text-left px-2 py-3 border-b-2 border-gray-200 bg-gray-400 hover:bg-gray-100 text-black"
            onClick={() => {
              setSearchInput(SearchData[item][APIMatch]);
              payload.value = SearchData[item][APIMatch];
              dispatch(Action.changeData(payload));
              setTimeout(() => {
                payload.Key = Step === "Racks" ? "RUHeight" : "Rails Used*";
                payload.value = SearchData[item].RackUnits;
                dispatch(Action.changeData(payload));
              }, 100);
            }}>
            <div className="flex flex-row justify-between">
              <div className="w-[25rem] flex flex-col">
                <p className="text-xs">Model</p>
                <p>{SearchData[item].Model}</p>
              </div>
              <div className="w-[10rem] flex flex-col">
                <p className="text-xs">Make</p>
                <p>{SearchData[item].Make}</p>
              </div>
              <div className="w-[5rem] flex flex-col">
                <p className="text-xs">RU</p>
                <p>{SearchData[item].RackUnits}</p>
              </div>
            </div>
          </button>
        </div>
      ))}
      <button id="SearchTableButton">Close</button>
    </div>
  );
}
