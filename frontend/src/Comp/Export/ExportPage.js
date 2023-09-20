import React from "react";
import { useSelector } from "react-redux";
import createTable from "../../Format/CreateTable";
import download_to_excel from "../../Format/ExportExcel";
// import * as transitionData from "../../Components/CustomField/CustomFieldExportTemplates";

export default function ExportPage() {
  const Data = useSelector((state) => state.data);
  const keys = Object.keys(Data);

  // const [modalBlock, setModalBlock] = React.useState();

  return (
    <div className="w-full text-white mb-3 flex flex-col border-[#F3EEE7] border-2">
      <div className="w-full h-[2.5rem] bg-[#F3EEE7] flex flex-row items-center justify-center">
        <h1 className="font-bold">Export </h1>
        <h1 className="font-black"> {""}</h1>
      </div>
      <div className="p-2">
        <div className="w-full text-white mb-3 flex flex-col border-[#F3EEE7] border-2">
          <div className="w-full h-[1.5rem] bg-[#F3EEE7] flex flex-row items-center justify-center">
            <h1>Data:</h1>
            <select
              id="ExportSelect"
              className="w-[10rem] h-full ml-2"
              onChange={(e) => {
                document.getElementById("ExportTable").innerHTML = "";

                if (e.target.value === "default") {
                  return;
                }

                // setModalBlock(e.target.value);
                let Input = Data[e.target.value];
                let Output = [];

                for (let i = 0; i < Input.length; i++) {
                  let temp = {};
                  for (let key in Input[i]) {
                    if (key === "Status *") continue;
                    if (key === "RUHeight") continue;
                    temp[key] = Input[i][key].value;
                  }

                  Output.push(temp);
                }
                createTable(Output, "ExportTable");
                // createTable(BASE_DATA[e.target.value][e.target.value + "Array"], "ExportTable");

                //
              }}>
              <option value="default">Select</option>
              {keys.map((key, index) => {
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
            }}>
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
