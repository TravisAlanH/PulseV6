import React from "react";
import DataFiltered from "./DataFiltered";
import { getMLTList } from "../../../FireActions";
import * as FireActions from "../../../FireActions";
import { useSelector } from "react-redux";

export default function InputFiltersNonMLT({ visable, setSelectedMLTItem }) {
  const user = FireActions.auth.currentUser;
  const MLTCount = useSelector((state) => state.data.Current.MLTCreatedCount);
  const DataKeys = ["Make", "Model", "RUHeight", "Class", "SubClass", "Mounting", "DataPortsCount", "PowerPortsCount", "FrontSlotsCount", "BackSlotsCount"];
  const [AllCustomData, setAllCustomData] = React.useState([]);

  console.log("MLTCount", MLTCount);

  React.useEffect(() => {
    getMLTList(user).then((data) => {
      console.log("data", data);
      setAllCustomData(data);
    });
  }, [user, MLTCount]);

  let AllDataFormatted = AllCustomData.map((item) => {
    let newItem = {};
    DataKeys.map((key) => {
      return (newItem[key] = item[key]);
    });
    return newItem;
  });

  const Headers = ["Make", "Model", "RUHeight", "Class", "Subclass", "Mounting", "DataPorts", "PowerPorts", "FrontSlots", "BackSlots"];

  return (
    <div className="flex flex-col">
      <div className="flex flex-row h-[2rem] sticky top-0 bg-white">
        <div className="min-w-[2.8rem]"></div>
        {Headers.map((item, index) => {
          return (
            <div className="flex flex-row justify-between min-w-[8rem] max-w-[8rem] border-2 border-gray-300 overflow-visable  bg-white">
              <div key={index} className=" text-nowrap">
                {item}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <DataFiltered setSelectedMLTItem={setSelectedMLTItem} mltFilteredData={AllDataFormatted} visable={visable} />
      </div>
    </div>
  );
}
