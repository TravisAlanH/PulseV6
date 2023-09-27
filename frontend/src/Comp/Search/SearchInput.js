import React from "react";
import "./Search.css";
import { useSelector } from "react-redux";

export default function SearchInput({ searchInput, setSearchInput, KeyName, Step, setShowTable }) {
  const current = useSelector((state) => state.data.Current[Step]);
  const state = useSelector((state) => state.data[Step][current]);
  const Name = state["Name *"].value;

  return (
    // <div className="searchInput ">
    // <div className="searchInput">
    <div>
      <input
        type="text"
        className="h-[2rem] w-[13rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit search-input"
        value={searchInput}
        onFocus={() => {
          if (Name === "") {
            document.getElementById("NameRequired").style.opacity = "1";
            document.getElementById("Name *" + Step).focus();
          } else {
            setShowTable(true);
          }
        }}
        // onBlur={() =>
        //   setTimeout(() => {
        //     setShowTable(false);
        //   }, 100)
        // }
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
}
