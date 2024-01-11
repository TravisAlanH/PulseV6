import React from "react";
import ImportPopup from "./ImportPopup";

export default function ImportButton() {
  return (
    <div className="px-3">
      <button
        className="orangeButton"
        onClick={() => {
          document.getElementById("ImportPopup").classList.remove("hidden");
          document.getElementById("ImportPopup").classList.add("flex");
        }}>
        Import
      </button>
      <ImportPopup />
    </div>
  );
}
