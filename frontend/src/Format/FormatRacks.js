function MinimalRacks(rackData) {
  let temp = [];
  rackData.forEach((item, index) => {
    temp.push({
      Make: item["Make *"],
      Model: item["Model Name *"],
      RackUnits: item["Rack Units *"],
      ParentIndex: index,
    });
  });
  return temp;
}

function getUniqueMakes(rackData) {
  let makeSet = new Set();
  rackData.forEach((item) => {
    if (item["Make *"]) {
      makeSet.add(item["Make *"]);
    }
  });
  return Array.from(makeSet);
}

export { MinimalRacks, getUniqueMakes };