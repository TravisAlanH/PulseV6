import React from "react";
import "../../Styles/BodyNav.css";
import LocationLayout from "../Location/LocationLayout";
import PDULayout from "../Aduit/PDU/PDULayout";
import UPSLayout from "./UPS/UPSLayout";

export default function ElectricalNav({ setCurrentElectrical, AllData }) {
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
    <div className="flex flex-row flex-wrap " id="ElectricalNav">
      <button
        id="SurveyLinks"
        className={buttonStyle}
        onClick={(e) => {
          removeSelected();
          e.target.classList.add("selected");
          setCurrentElectrical(<LocationLayout />);
        }}>
        Location
      </button>
      <button
        id="SurveyLinks"
        className={buttonStyle}
        onClick={(e) => {
          removeSelected();
          e.target.classList.add("selected");
          setCurrentElectrical(<PDULayout AllData={AllData} />);
        }}>
        Rack PDU
      </button>
      <button
        id="SurveyLinks"
        className={buttonStyle}
        onClick={(e) => {
          removeSelected();
          e.target.classList.add("selected");
          setCurrentElectrical(<UPSLayout AllData={AllData} />);
        }}>
        UPS
      </button>
    </div>
  );
}
