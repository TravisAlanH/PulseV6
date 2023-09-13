import React from "react";
import "../../Styles/BodyNav.css";
import RackLayout from "./Rack/RackLayout";
import AssetsLayout from "./Assets/AssetsLayout";
import LocationLayout from "../Location/LocationLayout";

export default function AuditNav({ setCurrentAudit, rackData }) {
  const buttons = document.getElementsByClassName("AuditLinks");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      for (var j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove("selected");
      }
      this.classList.add("selected");
    });
  }

  const buttonStyle = "bg-blue-500 text-white font-bold py-3 px-6 AuditLinks";

  return (
    <div>
      <button
        id="AuditLinks"
        className={buttonStyle}
        onClick={() => {
          setCurrentAudit(<LocationLayout />);
        }}>
        Location
      </button>
      <button
        id="AuditLinks"
        className={buttonStyle}
        onClick={() => {
          setCurrentAudit(<RackLayout rackData={rackData} />);
        }}>
        Cabinet
      </button>
      <button
        id="AuditLinks"
        className={buttonStyle}
        onClick={() => {
          setCurrentAudit(<AssetsLayout />);
        }}>
        Assets
      </button>
    </div>
  );
}
