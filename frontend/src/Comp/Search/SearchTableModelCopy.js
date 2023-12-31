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
        <div key={index} className="search-item h-[2.5rem]">
          <button
            className="text-left px-2 border-2 border-[#999] bg-gray-100 hover:bg-gray-200 text-black m-0"
            onClick={() => {
              setSearchInput(SearchData[item][APIMatch]);
              payload.value = SearchData[item][APIMatch];
              dispatch(Action.changeData(payload));
              if (Step === "Racks" || Step === "Assets") {
                setTimeout(() => {
                  payload.Key = Step === "Racks" ? "RUHeight" : "Rails Used *";
                  payload.value = SearchData[item].RackUnits;
                  dispatch(Action.changeData(payload));
                }, 100);
              }
            }}>
            <div className="flex flex-row justify-between">
              <div className="w-[25rem] flex flex-col">
                <p className="text-xs text-[#797979]">Model</p>
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
    </div>
  );
}
