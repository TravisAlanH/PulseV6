function MinimalRacks(rackData) {
  let temp = [];
  rackData.forEach((item, index) => {
    temp.push({
      Make: item["Make"],
      Model: item["Model"],
      RackUnits: item["RUHeight"],
      Class: item["Class"],
      ParentIndex: index,
    });
  });
  return temp;
}

function getUniqueMakes(rackData) {
  let makeSet = new Set();
  rackData.forEach((item) => {
    if (item["Make"]) {
      makeSet.add(item["Make"]);
    }
  });
  return Array.from(makeSet);
}

function filterObjectsByValue(objects, inputValue, APIMatch) {
  const filteredObjects = objects.filter((object) => object[APIMatch] === inputValue);
  return filteredObjects;
}

function getStepData(arrayOfObjects, filters) {
  const filteredObjects = arrayOfObjects.filter((obj) => filters.includes(obj.Class));

  return filteredObjects;
  // Use the filter method to find objects with "Class" equal to the filter value
  // const filteredObjects = arrayOfObjects.filter((obj) => obj["Class"] === filter);

  // return filteredObjects;
}

export { MinimalRacks, getUniqueMakes, filterObjectsByValue, getStepData };
