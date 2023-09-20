import React from "react";

export default function SearchInput({ searchInput, setSearchInput, KeyName, Step }) {
  return (
    <div className="searchInput ">
      <input
        type="text"
        className="h-[2rem] w-[10rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
}
