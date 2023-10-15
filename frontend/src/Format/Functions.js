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
    // Duplicates were found, return the oldest one
    return uniqueTemplates;
  } else {
    // No duplicates found
    return false;
  }
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
