import React from "react";
import { useSelector } from "react-redux";
// import createTable from "../../Format/CreateTable";
import download_to_excel from "../../Format/ExportExcel";
import "../../Styles/BodyNav.css";
import sortArrayToMatchReference from "../../Format/DataOrder";

// import * as transitionData from "../../Components/CustomField/CustomFieldExportTemplates";

export default function ExportPageSurvey() {
  const [tableView, setTableView] = React.useState(0);
  const Data = useSelector((state) => state.data);
  // const keys = Object.keys(Data);
  const Global = useSelector((state) => state.data.SurveyGlobal[0]);
  const GlobalKeys = sortArrayToMatchReference(Object.keys(Global), "SurveyGlobal");
  const Site = useSelector((state) => state.data.SurveySite[0]);
  let SiteKeys = sortArrayToMatchReference(Object.keys(Site), "SurveySite");
  const Safety = useSelector((state) => state.data.SurveySafety[0]);
  let SafetyKeys = sortArrayToMatchReference(Object.keys(Safety), "SurveySafety");
  console.log(SafetyKeys);
  const StateKeys = Object.keys(Data);

  const SurveyKeys = StateKeys.filter((item) => item.includes("Survey")).filter((item) => !item.includes("Room"));

  const buttonStyle = "bg-[#F7F5F1] text-[black] font-bold py-2 px-6 AuditLinks flex-grow ";

  function removeSelected() {
    const buttons = document.getElementsByClassName("AuditLinks");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        for (var j = 0; j < buttons.length; j++) {
          buttons[j].classList.remove("selected");
        }
      });
    }
  }

  const tableSet = [
    <tbody>
      <tr>
        <td colSpan={"5"}>Global Checks</td>
      </tr>
      <tr>
        <td>Item to Check</td>
        <td>Information</td>
        <td>Regulatory</td>
        <td>Complete</td>
        <td>Notes</td>
      </tr>
      {GlobalKeys.map((key, index) => (
        <tr key={index}>
          <td>{Global[key]["check"]}</td>
          <td>{Global[key]["information"]}</td>
          <td>{Global[key]["regulatory"]}</td>
          <td>{Global[key]["value"]}</td>
          <td>{Global[key]["notes"]}</td>
        </tr>
      ))}
    </tbody>,
    <tbody>
      <tr>
        <td colSpan={"5"}>Site Details</td>
      </tr>
      <tr>
        <td>Planning Activity</td>
        <td>Information</td>
        <td>Supporting Notes</td>
      </tr>
      {SiteKeys.map((key, index) => (
        <tr key={index}>
          <td>{key}</td>
          <td className="w-[40%]">{Site[key].value}</td>
          <td>{Site[key]["check"]}</td>
        </tr>
      ))}
    </tbody>,
    <tbody>
      <tr>
        <td colSpan={"8"}>Physical Security/ Life Safety</td>
      </tr>
      <tr>
        <td>Scoring Items</td>
        <td>Information</td>
        <td>Regulatory</td>
        <td>{"Value (drop down)"}</td>
        <td>Notes</td>
        <td>Scoring Weight</td>
        <td>Score</td>
        <td>Value xlate</td>
      </tr>
      {SafetyKeys.map((key, index) => (
        <tr key={index}>
          <td>{key}</td>
          <td>{Safety[key].check}</td>
          <td>{Safety[key].regulatory}</td>
          <td>{Safety[key].value}</td>
          <td>{Safety[key].notes}</td>
          <td>{Safety[key].scoreWeight}</td>
          <td>{Safety[key].score}</td>
          <td>{Safety[key].valueXLate}</td>
        </tr>
      ))}
    </tbody>,
  ];

  return (
    <div className="w-screen h-screen p-3">
      <div className="w-full text-white mb-3 flex flex-col border-[#F3EEE7] border-2">
        <div className="w-full h-[2.5rem] bg-[#F3EEE7] flex flex-row items-center justify-start pl-3">
          <h1 className="font-bold text-black">Export </h1>
          <h1 className="font-black"> {""}</h1>
        </div>
        <div className="p-2">
          <div className="w-full text-white mb-3 flex flex-col border-[#F3EEE7] border-2">
            <div className="w-full h-[2rem] bg-[#F3EEE7] flex flex-row items-center justify-center">
              <div className="flex flex-row w-full">
                {SurveyKeys.map((key, index) => (
                  <button
                    key={index}
                    id="AuditLinks"
                    className={buttonStyle}
                    onClick={(e) => {
                      removeSelected();
                      e.target.classList.add("selected");
                      setTableView(index);
                    }}>
                    {key.replace("Survey", "")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="text-black w-full">
          <div className="overflow-scroll">
            <table id="ExportTable">{tableSet[tableView]}</table>
          </div>
          <div className="w-full flex flex-row justify-end">
            <button
              className="w-[4rem] h-[1.5rem] bg-slate-200 rounded-md m-4"
              onClick={(e) => {
                download_to_excel("xlsx");
              }}>
              Export
            </button>
            {/* <button>Save XLSX file</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
