import React from "react";
import AddFieldModal from "./AddFieldModal";

export default function AddFieldButton({ Step }) {
  window.onclick = function (event) {
    let modal = document.getElementById("AddFieldModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  return (
    <div>
      <button
        id="AddFieldButton"
        className=""
        onClick={() => {
          let modal = document.getElementById("AddFieldModal");
          modal.style.display = "block";
        }}>
        Add Field
      </button>
      <div className="modal" id="AddFieldModal">
        <div className="modal-content">
          <span
            className="close"
            onClick={() => {
              let modal = document.getElementById("AddFieldModal");
              modal.style.display = "none";
            }}>
            &times;
          </span>
          <AddFieldModal Step={Step} />
        </div>
      </div>
    </div>
  );
}
