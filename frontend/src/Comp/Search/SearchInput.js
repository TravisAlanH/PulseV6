import React from "react";
import "./Search.css";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../../Store/Slices/Slice";

export default function SearchInput({ searchInput, setSearchInput, KeyName, Step, setShowTable }) {
  const current = useSelector((state) => state.data.Current[Step]);
  const state = useSelector((state) => state.data[Step][current]);
  const dispatch = useDispatch();
  const Name = state["Name *"].value;

  console.log(window.screen.height);

  return (
    <div>
      <input
        type="text"
        className="h-[2rem] w-[13rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit search-input"
        value={searchInput}
        onFocus={() => {
          setTimeout(() => {
            console.log(window.screen.height);
          }, 1000);

          if (Name === "") {
            document.getElementById("NameRequired").style.opacity = "1";
            document.getElementById("Name *" + Step).focus();
          } else {
            setShowTable(true);
          }
        }}
        onChange={(e) => {
          let payload = {
            Step: Step,
            Current: current,
            Key: KeyName,
            value: e.target.value,
          };
          dispatch(Action.changeData(payload));
          setSearchInput(e.target.value);
        }}
      />
    </div>
  );
}
