import React from "react";
import "../../Styles/BodyNav.css";
import RackLayout from "./Rack/RackLayout";
import AssetsLayout from "./Assets/AssetsLayout";
import LocationLayout from "../Location/LocationLayout";

import ExportPage from "../Export/ExportPage";

export default function AuditNav({ setCurrentAudit, AllData }) {
  const buttons = document.getElementsByClassName("AuditLinks");

  function removeSelected() {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        for (var j = 0; j < buttons.length; j++) {
          buttons[j].classList.remove("selected");
        }
      });
    }
  }

  const buttonStyle = "bg-[#F7F5F1] text-[black] font-bold py-2 px-6 AuditLinks flex-grow";

  return (
    <div className="flex flex-row">
      <button
        id="AuditLinks"
        className={buttonStyle}
        onClick={(e) => {
          removeSelected();
          e.target.classList.add("selected");
          setCurrentAudit(<LocationLayout />);
        }}>
        Location
      </button>
      {/* <button
        id="AuditLinks"
        className={buttonStyle}
        onClick={() => {
          setCurrentAudit(<RoomLayout />);
        }}>
        Room
      </button> */}
      <button
        id="AuditLinks"
        className={buttonStyle}
        onClick={(e) => {
          removeSelected();
          e.target.classList.add("selected");
          setCurrentAudit(<RackLayout AllData={AllData} />);
        }}>
        Cabinet
      </button>
      <button
        id="AuditLinks"
        className={buttonStyle}
        onClick={(e) => {
          removeSelected();
          e.target.classList.add("selected");
          setCurrentAudit(<AssetsLayout AllData={AllData} />);
        }}>
        Assets
      </button>
      <button
        id="AuditLinks"
        className={buttonStyle}
        onClick={(e) => {
          removeSelected();
          e.target.classList.add("selected");
          setCurrentAudit(<ExportPage />);
        }}>
        Export
      </button>
    </div>
  );
}
