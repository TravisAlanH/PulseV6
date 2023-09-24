import React from "react";
import "./Search.css";

export default function SearchInput({ searchInput, setSearchInput, KeyName, Step, setShowTable }) {
  return (
    // <div className="searchInput ">
    // <div className="searchInput">
    <div>
      <input
        type="text"
        className="h-[2rem] w-[13rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit search-input"
        value={searchInput}
        onFocus={() => setShowTable(true)}
        onBlur={() =>
          setTimeout(() => {
            setShowTable(false);
          }, 200)
        }
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
}
