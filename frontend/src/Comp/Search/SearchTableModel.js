import React from "react";
import * as FIND from "../../Format/Search";
import * as Action from "../../Store/Slices/Slice";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function SearchTableModel({ SearchData, searchInput, Step, setSearchInput, keyName, setShowTable }) {
  const current = useSelector((state) => state.data.Current[Step]);
  const APIMatch = useSelector((state) => state.data[Step][current][keyName].APIMatch);
  const newData = useSelector((state) => state.data["New" + Step]);
  let newDataCopy = [...newData];
  const currentRack = useSelector((state) => state.data.Current["Racks"]);
  const OpenRU = useSelector((state) => state.data["OpenRU"][currentRack]);
  const racks = useSelector((state) => state.data["Racks"]);

  const currentData = useSelector((state) => state.data[Step][current]);
  const dispatch = useDispatch();

  let Gap = 1;
  let currentUPosition = 0;
  if (currentData.hasOwnProperty("U Position *") && racks.length > 0) {
    currentUPosition = currentData["U Position *"].value;
    for (let i = currentUPosition; i < OpenRU.length; i++) {
      if (OpenRU[i] === 0) {
        Gap = Gap + 1;
      } else {
        break;
      }
    }
    SearchData = FIND.filterByUPosition(SearchData, Gap, "RackUnits");
    newDataCopy = FIND.filterByUPositionWithValue(newDataCopy, Gap, "Rack Units *");
  }
  let closestMatch = FIND.findClosestMatchesInArrayObject(SearchData, searchInput, APIMatch);

  let payload = {
    Step: Step,
    Current: current,
    Key: keyName,
  };

  //
  function sort(ascending, columnClassName, tableId) {
    // var tbody = document.getElementById(tableId).getElementsByTagName("tbody")[0];
    var tbody = document.getElementById("tbodyContent");
    var rows = tbody.getElementsByTagName("tr");
    var unsorted = true;
    while (unsorted) {
      unsorted = false;
      for (var r = 0; r < rows.length - 1; r++) {
        var row = rows[r];
        var nextRow = rows[r + 1];
        var value = row.getElementsByClassName(columnClassName)[0].innerHTML;
        var nextValue = nextRow.getElementsByClassName(columnClassName)[0].innerHTML;
        value = value.replace(",", ""); // in case a comma is used in float number
        nextValue = nextValue.replace(",", "");
        if (!isNaN(value)) {
          value = parseFloat(value);
          nextValue = parseFloat(nextValue);
        }
        if (ascending ? value > nextValue : value < nextValue) {
          tbody.insertBefore(nextRow, row);
          unsorted = true;
        }
      }
    }
  }

  let tableContent = closestMatch.map((item, index) => (
    <tr
      key={index}
      onClick={() => {
        setSearchInput(SearchData[item][APIMatch]);
        payload.value = SearchData[item][APIMatch];
        dispatch(Action.changeData(payload));
        console.log(SearchData[item]);

        payload.Key = "Ports";
        payload.value = SearchData[item]["DataPortsCount"];
        dispatch(Action.changeData(payload));
        if (Step === "Racks" || Step === "Assets" || Step === "PDUs" || Step === "UPSs" || Step === "ATSs") {
          setTimeout(() => {
            payload.Key = "RU Height";
            payload.value = SearchData[item].RackUnits;
            dispatch(Action.changeData(payload));
            setShowTable(false);
          }, 100);
        }
      }}>
      <td data-label="Model" className="Model">
        {SearchData[item].Model}
      </td>
      <td data-label="Make" className="Make">
        {SearchData[item].Make}
      </td>
      <td data-label="RackUnits" className="RackUnits">
        {SearchData[item].RackUnits}
      </td>
    </tr>
  ));

  // let newData = [];

  let tableAdd = newDataCopy.map((item, index) => (
    <tr
      key={index}
      onClick={() => {
        setSearchInput(item["Model Name *"].value);
        payload.value = item["Model Name *"].value;
        dispatch(Action.changeData(payload));
        if (Step === "Racks" || Step === "Assets" || Step === "PDUs" || Step === "UPSs" || Step === "ATSs") {
          setTimeout(() => {
            payload.Key = "RU Height";
            payload.value = item["Rack Units *"].value;
            dispatch(Action.changeData(payload));
            setShowTable(false);
          }, 100);
        }
      }}>
      <td className="">{item["Model Name *"].value}</td>
      <td className="">{item["Make *"].value}</td>
      <td className="">{item["Rack Units *"].value}</td>
    </tr>
  ));

  let newTableContent = newDataCopy.length > 0 ? <tbody>{tableAdd}</tbody> : null;
  let newTableView =
    newDataCopy.length > 0 ? (
      <thead className="sticky top-0 bg-white">
        <tr>
          <th className="Model bg-white">
            <div className="flex flex-row items-center justify-between w-[20rem] bg-white h-full">
              {"Model (ADDED)"}
            </div>
          </th>
          <th className="Make">
            <div className=" w-[8rem]">{"Make (ADDED)"}</div>
          </th>
          <th className="RackUnits bg-white">
            <div className="flex flex-row items-center justify-between w-[10rem] bg-white h-full">{"RU (ADDED)"}</div>
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
            <th className="Model bg-white">
              <div className="flex flex-row items-center justify-between w-[20rem] bg-white h-full">
                Model
                <div className="sort-table-arrows flex flex-row gap-2 items-center justify-end w-[5rem]">
                  <button
                    className="button orangeButton"
                    onClick={(e) => {
                      sort(true, "Model", "content-table3");
                    }}
                    title="Sort Model Descending">
                    <FaChevronUp />
                  </button>
                  <button
                    className="button orangeButton"
                    onClick={(e) => {
                      sort(false, "Model", "content-table3");
                    }}
                    title="Sort Model Ascending">
                    <FaChevronDown />
                  </button>
                </div>
              </div>
            </th>
            <th className="composer">Make</th>
            <th className="RackUnits bg-white">
              <div className="flex flex-row items-center justify-between w-[10rem] bg-white h-full">
                RackUnits
                <div className="sort-table-arrows flex flex-row gap-2 items-center justify-end w-[5rem]">
                  <button
                    className="button orangeButton"
                    onClick={(e) => {
                      sort(true, "RackUnits", "content-table3");
                    }}
                    title="Sort RackUnits Descending">
                    <FaChevronUp />
                  </button>
                  <button
                    className="button orangeButton"
                    onClick={(e) => {
                      sort(false, "RackUnits", "content-table3");
                    }}
                    title="Sort RackUnits Ascending">
                    <FaChevronDown />
                  </button>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody id="tbodyContent">{tableContent}</tbody>
      </table>
    </div>
  );
}
