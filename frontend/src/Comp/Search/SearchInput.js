import React from "react";

export default function SearchInput({ searchInput, setSearchInput, KeyName, Step }) {
  return (
    <div className="searchInput">
      <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
    </div>
  );
}
