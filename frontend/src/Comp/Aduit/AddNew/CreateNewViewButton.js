import React from "react";
import CreateNewModal from "./CreateNewModal";

export default function CreateNewViewButton({ Step }) {
  window.onclick = function (event) {
    let modal = document.getElementById("CreateNewModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  return (
    <div>
      <button
        id="CreateNewButton"
        className="orangeButton"
        onClick={() => {
          let modal = document.getElementById("CreateNewModal");
          modal.style.display = "block";
        }}>
        {"Create " + (Step === "Racks" ? "Cabinet" : Step)}
      </button>
      <div className="modal" id="CreateNewModal">
        <div className="modal-content">
          <span
            className="close"
            onClick={() => {
              let modal = document.getElementById("CreateNewModal");
              modal.style.display = "none";
            }}>
            &times;
          </span>
          <CreateNewModal Step={"New" + Step} />
        </div>
      </div>
    </div>
  );
}
