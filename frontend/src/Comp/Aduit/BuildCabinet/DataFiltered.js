import React from "react";

export default function DataFiltered({
  CombinedData,
  AllData,
  CombinedSort,
  mltFilteredData,
  setMltFilteredData,
}) {
  let visable = 15;
  // Effect to filter data whenever any state in CombinedData changes
  React.useEffect(() => {
    const filterData = () => {
      return AllData.filter((item) => {
        return (
          (!CombinedData[0][0] ||
            item.Make.toLowerCase().includes(
              CombinedData[0][0].toLowerCase()
            )) &&
          (!CombinedData[1][0] ||
            item.Model.toLowerCase().includes(
              CombinedData[1][0].toLowerCase()
            )) &&
          (!CombinedData[2][0] ||
            item.RUHeight <= parseInt(CombinedData[2][0])) &&
          (!CombinedData[3][0] ||
            item.Class.toLowerCase().includes(
              CombinedData[3][0].toLowerCase()
            )) &&
          (!CombinedData[4][0] ||
            item.Subclass.toLowerCase().includes(
              CombinedData[4][0].toLowerCase()
            )) &&
          (!CombinedData[5][0] ||
            item.Mounting.toLowerCase().includes(
              CombinedData[5][0].toLowerCase()
            )) &&
          (!CombinedData[6][0] ||
            item.DataPortsCount === parseInt(CombinedData[6][0])) &&
          (!CombinedData[7][0] ||
            item.PowerPortsCount === parseInt(CombinedData[7][0])) &&
          (!CombinedData[8][0] ||
            item.FrontSlotsCount === parseInt(CombinedData[8][0])) &&
          (!CombinedData[9][0] ||
            item.BackSlotsCount === parseInt(CombinedData[9][0]))
        );
      });
    };

    const sortData = () => {
      return filterData().sort((a, b) => {
        for (let i = 0; i < CombinedSort.length; i++) {
          if (CombinedSort[i][0] === 1) {
            if (a[Object.keys(a)[i]] < b[Object.keys(b)[i]]) return -1;
            if (a[Object.keys(a)[i]] > b[Object.keys(b)[i]]) return 1;
          }
          if (CombinedSort[i][0] === -1) {
            if (a[Object.keys(a)[i]] > b[Object.keys(b)[i]]) return -1;
            if (a[Object.keys(a)[i]] < b[Object.keys(b)[i]]) return 1;
          }
        }
        return 0;
      });
    };

    setMltFilteredData(sortData());
  }, [CombinedData, AllData, CombinedSort]);

  return (
    <div>
      {mltFilteredData.slice(0, visable).map((item, index) => {
        return (
          <div key={index} className="flex flex-row">
            {Object.keys(item).map((key, index) => {
              if (key === "Height" || key === "Width" || key === "Depth")
                return;
              return (
                <div
                  key={index}
                  className="border-2 border-gray-300 w-[12rem] text-nowrap"
                >
                  {item[key]}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// {
//   "Make": "Raritan",
//   "Model": "DPCS12-30L-J",
//   "RUHeight": 29,
//   "Height": "49.30",
//   "Width": "2.20",
//   "Depth": "3.00",
//   "Class": "Rack PDU",
//   "Subclass": "AC Power",
//   "Mounting": "ZeroU",
//   "DataPortsCount": 2,
//   "PowerPortsCount": 21,
//   "FrontSlotsCount": 0,
//   "BackSlotsCount": 0
// },
