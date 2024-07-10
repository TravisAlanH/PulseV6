const FilterList = {
  Class: [
    "AC Distribution",
    "Battery",
    "Cabinet",
    "Data Panel",
    "DC Distribution",
    "DC Power System",
    "Device",
    "Floor PDU",
    "HVAC",
    "Network",
    "Passive",
    "Power Outlet",
    "Power Source",
    "Probe",
    "Rack PDU",
    "UPS",
  ],
  Subclass: [
    "AC Bay",
    "Load Device",
    "Other Device",
    "Power Panel",
    "Switch",
    "Transformer",
    "UPS Bank",
    "Container",
    "DC Bay",
    "DC Panel",
    "Plant",
    "Plant Bay",
    "Plant Panel",
    "Rectifier",
    "Blade Chassis",
    "Blade Server",
    "Standard",
    "Virtual Machine",
    "Busway",
    "Local",
    "Remote",
    "Cooling Unit",
    "Cooling Zone",
    "Heat Rejection",
    "Blade",
    "Chassis",
    "NetworkStack",
    "Blanking Plate",
    "Shelf",
    "Busway Outlet",
    "Whip Outlet",
    "Fuel Tank",
    "Generator",
    "Utility Feed",
    "AC Power",
    "DC FAP",
    "Rack Inverter",
  ],
  Mounting: ["Busway", "VStack", "Blade", "Rackable", "ZeroU", "Free-Standing", "Non-Rackable", "Suspended"],
};

// External function to filter and sort data
export function filterAndSortData(allData, combinedData, combinedSort, CombinedFilter) {
  if (CombinedFilter[0][0].length !== 0) {
    const classFilters = CombinedFilter[0][0].map((filter) => filter.toLowerCase());
    console.log(classFilters);
    allData = allData.filter((item) => {
      return item.Class && classFilters.includes(item.Class.toLowerCase());
    });
  }

  if (CombinedFilter[1][0].length !== 0) {
    const subclassFilters = CombinedFilter[1][0].map((filter) => filter.toLowerCase());
    console.log(subclassFilters);
    allData = allData.filter((item) => {
      return item.Subclass && subclassFilters.includes(item.Subclass.toLowerCase());
    });
  }

  if (CombinedFilter[2][0].length !== 0) {
    const mountingFilters = CombinedFilter[2][0];
    allData = allData.filter((item) => {
      return item.Mounting && mountingFilters.includes(item.Mounting);
    });
  }

  const filterData = () => {
    return allData.filter((item) => {
      if (!item || item === "") {
        return false;
      }

      return (
        (!combinedData[0][0] || (item.Make && item.Make.toLowerCase().includes(combinedData[0][0].toLowerCase()))) &&
        (!combinedData[1][0] || (item.Model && item.Model.toLowerCase().includes(combinedData[1][0].toLowerCase()))) &&
        (!combinedData[2][0] || (item.RUHeight && item.RUHeight <= parseInt(combinedData[2][0]))) &&
        (!combinedData[3][0] || (item.Class && item.Class.toLowerCase().includes(combinedData[3][0].toLowerCase()))) &&
        (!combinedData[4][0] || (item.Subclass && item.Subclass.toLowerCase().includes(combinedData[4][0].toLowerCase()))) &&
        (!combinedData[5][0] || (item.Mounting && item.Mounting.toLowerCase().includes(combinedData[5][0].toLowerCase()))) &&
        (!combinedData[6][0] || (item.DataPortsCount !== undefined && item.DataPortsCount === parseInt(combinedData[6][0]))) &&
        (!combinedData[7][0] || (item.PowerPortsCount !== undefined && item.PowerPortsCount === parseInt(combinedData[7][0]))) &&
        (!combinedData[8][0] || (item.FrontSlotsCount !== undefined && item.FrontSlotsCount === parseInt(combinedData[8][0]))) &&
        (!combinedData[9][0] || (item.BackSlotsCount !== undefined && item.BackSlotsCount === parseInt(combinedData[9][0])))
      );
    });
  };

  const sortData = () => {
    return filterData().sort((a, b) => {
      for (let i = 0; i < combinedSort.length; i++) {
        if (combinedSort[i][0] === 1) {
          if (a[Object.keys(a)[i]] < b[Object.keys(b)[i]]) return -1;
          if (a[Object.keys(a)[i]] > b[Object.keys(b)[i]]) return 1;
        }
        if (combinedSort[i][0] === -1) {
          if (a[Object.keys(a)[i]] > b[Object.keys(b)[i]]) return -1;
          if (a[Object.keys(a)[i]] < b[Object.keys(b)[i]]) return 1;
        }
        if (combinedSort[i][0] === 0) {
          continue;
        }
      }
      return 0;
    });
  };

  return sortData();
}

export default FilterList;
