import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import createTable from "../../Format/CreateTable";
import download_to_excel from "../../Format/ExportExcel";
import { sortObjectByTemplate } from "../../Format/DataOrder";
import "./Export.css";
import * as format from "./FormatPDU";
// import * as transitionData from "../../Components/CustomField/CustomFieldExportTemplates";

export default function ExportPageAudit() {
  const Data = useSelector((state) => state.data);

  let adjustedData = structuredClone(Data);
  adjustedData = format.formatDataForPDU(adjustedData);

  const keys = Object.keys(adjustedData);
  // const [modalBlock, setModalBlock] = React.useState();

  useEffect(() => {
    let OutputAll = [];
    Object.keys(adjustedData).forEach((key) => {
      OutputAll = [];
      if (adjustedData[key].length === 0) return;
      if (
        key === "Current" ||
        key === "LoggedIn" ||
        key.includes("Survey") ||
        key === "Settings" ||
        key.includes("New") ||
        key === "OpenRU" ||
        key.includes("Cabling")
      )
        return;
      let Input = adjustedData[key];

      for (let i = 0; i < Input.length; i++) {
        let temp = {};
        for (let key in Input[i]) {
          if (key === "Status *") continue;
          if (key === "RUHeight") continue;
          if (key === "RU Height") continue;
          if (key === "Ports") continue;
          if (Input[i][key]["Export"] === "") continue;
          // temp[key] = Input[i][key].value;
          temp[Input[i][key]["Export"]] = Input[i][key].value;
        }
        if (key === "Location") temp = sortObjectByTemplate(temp, key, Data);
        else temp = sortObjectByTemplate(temp, key);
        OutputAll.push(temp);
      }
      createTable(OutputAll, "ExportTable");
    });
  }, [adjustedData, Data]);

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
              <select
                id="ExportSelect"
                className="Select h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-white w-[10rem]"
                onChange={(e) => {
                  document.getElementById("ExportTable").innerHTML = "";

                  if (e.target.value === "default") {
                    return;
                  }

                  // setModalBlock(e.target.value);
                  let Input = adjustedData[e.target.value];
                  let Output = [];

                  for (let i = 0; i < Input.length; i++) {
                    let temp = {};
                    for (let key in Input[i]) {
                      console.log(Input[i][key]);
                      if (key === "Status *") continue;
                      if (key === "RUHeight") continue;
                      if (Input[i][key]["Export"] === "") continue;
                      // temp[key] = Input[i][key].value;
                      temp[Input[i][key]["Export"]] = Input[i][key].value;
                    }

                    Output.push(temp);
                  }

                  createTable(Output, "ExportTable");
                  // createTable(BASE_DATA[e.target.value][e.target.value + "Array"], "ExportTable");

                  //
                }}
              >
                <option value="default">Select</option>
                {keys.map((key, index) => {
                  if (key === "Current" || key === "LoggedIn" || key.includes("Survey")) return null;
                  return (
                    <option key={index} value={key}>
                      {key}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="text-black w-full">
          <div className="overflow-scroll">
            {/* <table id="ExportTable" className="text-xs"></table> */}
            <table id="ExportTable" className="text-xs"></table>
          </div>
          <div className="w-full flex flex-row justify-end">
            <button
              className="w-[4rem] h-[1.5rem] bg-slate-200 rounded-md m-4"
              onClick={(e) => {
                // delete modalBlock["ID"];
                // delete modalBlock["Name *"];
                // delete modalBlock["Index"];
                // download_to_excel(e, modalBlock, "ExportTable");
                download_to_excel("xlsx");
              }}
            >
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
