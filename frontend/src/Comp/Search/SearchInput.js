import React from "react";

export default function SearchInput({ setSearchInput }) {
  return (
    <div className="searchInput">
      <input type="text" onChange={(e) => setSearchInput(e.target.value)} />
    </div>
  );
}
