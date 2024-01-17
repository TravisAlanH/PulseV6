import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function ImportPopup() {
  const [excelData, setExcelData] = useState(null);

  const handleFileUpload = (event) => {
    const input = event.target;

    if ("files" in input && input.files.length > 0) {
      const file = input.files[0];

      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Assuming you want to read data from the first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Parse sheet data
        const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        setExcelData(sheetData);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  useEffect(() => {
    if (excelData) {
      console.log("Excel Data:", excelData);
    }
  }, [excelData]);

  return (
    <div
      className="w-screen h-screen fixed top-0 left-0 hidden flex-row justify-center items-center z-[50] bg-[#95959576]"
      id="ImportPopup">
      <div className="bg-[white] rounded-md p-[1.5rem]">
        <div className="flex flex-row">
          <label className="text-xs font-bold p-1 bg-[#F7F5F1] flex flex-col justify-center w-[7rem] pl-2">Type</label>
          <select className="h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[12rem]">
            <option value="">Select</option>
            <option value="dct">JSON</option>
            <option value="tool">CSV</option>
          </select>
        </div>
        <div>
          <input type="file" className="" onChange={handleFileUpload} />
        </div>
        <div className="flex flex-row justify-end">
          <button
            className="orangeButton"
            onClick={() => {
              document.getElementById("ImportPopup").classList.remove("flex");
              document.getElementById("ImportPopup").classList.add("hidden");
            }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
