import React from "react";
import { useSelector } from "react-redux";
// import createTable from "../../Format/CreateTable";
import download_to_excel from "../../Format/ExportExcel";
// import * as transitionData from "../../Components/CustomField/CustomFieldExportTemplates";

export default function ExportPageSurvey() {
  // const Data = useSelector((state) => state.data);
  // const keys = Object.keys(Data);
  const Global = useSelector((state) => state.data.SurveyGlobal[0]);
  const GlobalKeys = Object.keys(Global);

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
              <h1 className="text-black">Data:</h1>
            </div>
          </div>
        </div>
        <div className="text-black w-full">
          <div className="overflow-scroll">
            {/* <table id="ExportTable" className="text-xs">



            </table> */}

            <table id="ExportTable">
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
              </tbody>
            </table>
          </div>
          <div className="w-full flex flex-row justify-end">
            <button
              className="w-[4rem] h-[1.5rem] bg-slate-200 rounded-md m-4"
              onClick={(e) => {
                download_to_excel("xlsx");
              }}>
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
