import React from "react";
import "../../Styles/BodyNav.css";
import LocationLayout from "../Location/LocationLayout";
import SurveyRoomLayout from "./SurveyRoom/SurveyRoomLayout";
import ExportPageSurvey from "../Export/ExportPageSurvey";

export default function SurveyNav({ setCurrentSurvey }) {
  const buttons = document.getElementsByClassName("SurveyLinks");

  function removeSelected() {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        for (var j = 0; j < buttons.length; j++) {
          buttons[j].classList.remove("selected");
        }
      });
    }
  }

  const buttonStyle = "bg-[#F7F5F1] text-[black] font-bold py-2 px-6 SurveyLinks flex-grow";

  return (
    <div className="flex flex-row flex-wrap">
      <button
        id="SurveyLinks"
        className={buttonStyle}
        onClick={(e) => {
          removeSelected();
          e.target.classList.add("selected");
          setCurrentSurvey(<LocationLayout />);
        }}>
        Location
      </button>
      <button
        id="SurveyLinks"
        className={buttonStyle}
        onClick={(e) => {
          removeSelected();
          e.target.classList.add("selected");
          setCurrentSurvey(<SurveyRoomLayout Step={"SurveySecurity"} />);
        }}>
        Security
      </button>
      <button
        id="SurveyLinks"
        className={buttonStyle}
        onClick={(e) => {
          removeSelected();
          e.target.classList.add("selected");
          setCurrentSurvey(<SurveyRoomLayout Step={"SurveyRoom"} />);
        }}>
        Room
      </button>
      <button
        id="SurveyLinks"
        className={buttonStyle}
        onClick={(e) => {
          removeSelected();
          e.target.classList.add("selected");
          setCurrentSurvey(<SurveyRoomLayout Step={"SurveyFire"} />);
        }}>
        Fire
      </button>
      <button
        id="AuditLinks"
        className={buttonStyle}
        onClick={(e) => {
          removeSelected();
          e.target.classList.add("selected");
          setCurrentSurvey(<ExportPageSurvey />);
        }}>
        Export
      </button>
    </div>
  );
}
