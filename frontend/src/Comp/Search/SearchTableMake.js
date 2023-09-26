import React from "react";
import * as FIND from "../../Format/Search";
import * as Action from "../../Store/Slices/Slice";
import { useDispatch, useSelector } from "react-redux";

export default function SearchTableModel({ SearchData, searchInput, Step, setSearchInput, keyName, setShowTable }) {
  const current = useSelector((state) => state.data.Current[Step]);
  const newData = useSelector((state) => state.data["New" + Step]);
  const dispatch = useDispatch();
  let closestMatch = FIND.findClosestMatches(SearchData, searchInput);

  let payload = {
    Step: Step,
    Current: current,
    Key: keyName,
  };

  //

  let tableContent = closestMatch.map((item, index) => (
    <tr
      key={index}
      onClick={() => {
        payload.value = SearchData[item];
        setSearchInput(SearchData[item]);
        dispatch(Action.changeData(payload));
        setShowTable(false);
      }}>
      <td data-label="Make" className="Make">
        {SearchData[item]}
      </td>
    </tr>
  ));

  // let newData = [];

  let tableAdd = newData.map((item, index) => (
    <tr
      key={index}
      onClick={() => {
        payload.value = item["Make *"].value;
        console.log(item["Make *"].value);
        setSearchInput(item["Make *"].value);
        dispatch(Action.changeData(payload));
        setShowTable(false);
      }}>
      <td data-label="Make" className="Make">
        {item["Make *"].value}
      </td>
    </tr>
  ));

  let newTableContent = newData.length > 0 ? <tbody>{tableAdd}</tbody> : null;
  let newTableView =
    newData.length > 0 ? (
      <thead className="sticky top-0 bg-white">
        <tr>
          <th className="Make bg-white">
            <div className="flex flex-row items-center justify-between w-[20rem] bg-white h-full">{"Make (ADDED)"}</div>
          </th>
        </tr>
      </thead>
    ) : null;

  return (
    <div className="search-item h-[20rem] overflow-scroll border-2 bg-white" id="SearchTable">
      <table id={"content-table3"} className="content-table3">
        {/*  */}
        {newTableView}
        {newTableContent}
        {/*  */}
        <thead className="sticky top-0 bg-white">
          <tr>
            <th className="Make bg-white">
              <div className="flex flex-row items-center justify-between w-[20rem] bg-white h-full">Make</div>
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </div>
  );
}
