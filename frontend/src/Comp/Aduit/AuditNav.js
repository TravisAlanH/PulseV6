import React from "react";
import "../../Styles/BodyNav.css";
import RackLayout from "./Rack/RackLayout";
import PDULayout from "./PDU/PDULayout";
import AssetsLayout from "./Assets/AssetsLayout";
import LocationLayout from "../Location/LocationLayout";

import ExportPageAudit from "../Export/ExportPageAudit";
import StructuredCablingLayout from "./StructuredCabling/StructuredCablingLayout";
import BuildLayout from "./BuildCabinet/BuildLayout";

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

  const buttonStyle =
    "bg-[#F7F5F1] text-[black] font-bold py-2 px-6 AuditLinks flex-grow ";

  return (
    <div className="flex flex-row flex-wrap">
      <button
        id="AuditLinks"
        className={buttonStyle}
        onClick={(e) => {
          removeSelected();
          e.target.classList.add("selected");
          setCurrentAudit(<LocationLayout />);
        }}
      >
        Location
      </button>
      <button
        id="AuditLinks"
        className={buttonStyle}
        onClick={(e) => {
          removeSelected();
          e.target.classList.add("selected");
          setCurrentAudit(<RackLayout AllData={AllData} />);
        }}
      >
        Cabinet
      </button>
      <button
        id="AuditLinks"
        className={buttonStyle}
        onClick={(e) => {
          removeSelected();
          e.target.classList.add("selected");
          setCurrentAudit(<BuildLayout AllData={AllData} />);
        }}
      >
        Build Cabinet
      </button>
      <button
        id="AuditLinks"
        className={buttonStyle}
        onClick={(e) => {
          removeSelected();
          e.target.classList.add("selected");
          setCurrentAudit(<PDULayout AllData={AllData} />);
        }}
      >
        Rack PDU
      </button>
      <button
        id="AuditLinks"
        className={buttonStyle}
        onClick={(e) => {
          removeSelected();
          e.target.classList.add("selected");
          setCurrentAudit(<AssetsLayout AllData={AllData} />);
        }}
      >
        Assets
      </button>
      <button
        id="AuditLinks"
        className={buttonStyle}
        onClick={(e) => {
          removeSelected();
          e.target.classList.add("selected");
          setCurrentAudit(<StructuredCablingLayout />);
        }}
      >
        Structured Cabling
      </button>
      <button
        id="AuditLinks"
        className={buttonStyle}
        onClick={(e) => {
          removeSelected();
          e.target.classList.add("selected");
          setCurrentAudit(<ExportPageAudit />);
        }}
      >
        Export
      </button>
    </div>
  );
}
