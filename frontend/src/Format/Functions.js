export function findOldestDuplicate(objectTemplates) {
  const duplicates = {};

  // Iterate through the object templates and find duplicates based on DataBaseUUID
  objectTemplates.forEach((template) => {
    const uuid = template.Current.DataBaseUUID;
    if (duplicates[uuid]) {
      // If a duplicate is found, compare the DataBaseTime to determine the oldest one
      const existingTime = new Date(duplicates[uuid].Current.DataBaseTime);
      const currentTime = new Date(template.Current.DataBaseTime);

      if (currentTime < existingTime) {
        // If the current template is older, replace the duplicate entry
        duplicates[uuid] = template;
      }
    } else {
      // If no duplicate is found, add the template to the duplicates object
      duplicates[uuid] = template;
    }
  });

  // Check if duplicates were found
  const uniqueTemplates = Object.values(duplicates);

  if (uniqueTemplates.length < objectTemplates.length) {
    // Duplicates were found, find the oldest one
    let oldestTemplate = uniqueTemplates[0];
    uniqueTemplates.forEach((template) => {
      const templateTime = new Date(template.Current.DataBaseTime);
      const oldestTime = new Date(oldestTemplate.Current.DataBaseTime);
      if (templateTime < oldestTime) {
        oldestTemplate = template;
      }
    });
    // Return the oldest duplicate
    return oldestTemplate;
  } else {
    // No duplicates found
    return false;
  }
}

export function findOldestNonUniqueEntries(locationLists) {
  const groupedEntries = {};

  // Group entries by DataBaseUUID
  locationLists.forEach((locationList) => {
    const { DataBaseUUID, DataBaseTime } = locationList.Current;
    if (!(DataBaseUUID in groupedEntries)) {
      groupedEntries[DataBaseUUID] = [];
    }
    groupedEntries[DataBaseUUID].push({ DataBaseTime, LocationList: locationList });
  });

  // Filter groups to keep only non-unique UUIDs
  const nonUniqueGroups = Object.values(groupedEntries).filter((group) => group.length > 1);

  // If there are no non-unique entries, return false
  if (nonUniqueGroups.length === 0) {
    return false;
  }

  // Find the oldest entry for each non-unique UUID
  const oldestEntries = nonUniqueGroups.map((group) => {
    // Sort entries within each group by DataBaseTime in ascending order
    group.sort((a, b) => a.DataBaseTime - b.DataBaseTime);
    // Return the oldest entry for this UUID
    return group[0].LocationList;
  });

  return oldestEntries;
}

export function getCurrentTimeInFormat() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

  const formattedTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}:${milliseconds} Z`;
  return formattedTime;
}

export function resetObjectKeysInArray(obj, keysArray) {
  if (typeof obj !== "object" || !Array.isArray(keysArray)) {
    throw new Error("Invalid input: obj should be an object and keysArray should be an array.");
  }

  keysArray.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      obj[key] = "";
    }
  });

  return obj;
}

export function resetObjectKeysNOTInArray(obj, keysArray) {
  if (typeof obj !== "object" || !Array.isArray(keysArray)) {
    throw new Error("Invalid input: obj should be an object and keysArray should be an array.");
  }
  const updatedObject = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (keysArray.includes(key)) {
        updatedObject[key] = obj[key];
      } else {
        if (
          key === "asset" ||
          key === "port" ||
          key === "asset2" ||
          key === "port2" ||
          key === "rack" ||
          key === "rack2"
        ) {
          updatedObject[key] = null;
        } else {
          updatedObject[key] = "";
        }
      }
    }
  }
  return updatedObject;
}
