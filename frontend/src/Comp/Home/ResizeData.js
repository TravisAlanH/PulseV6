import Templates from "../../Store/Slices/Template";

// obj is the full object that needs to be simplified, the large data
export function LARGEtoSMALL(obj) {
  const keys = Object.keys(obj);
  let holdObj = {};

  keys.forEach((item) => {
    if (Array.isArray(obj[item]) && obj[item] !== null && obj[item].length > 0 && item !== "OpenRU") {
      let baseHoldArray = [];

      obj[item].forEach((itemLevel2) => {
        const level2Keys = Object.keys(itemLevel2);
        let newEntry = {};

        level2Keys.forEach((baseKey) => {
          newEntry[baseKey] = {
            value: itemLevel2[baseKey]?.value !== undefined ? itemLevel2[baseKey].value : "",
          };
        });
        baseHoldArray.push(newEntry);
      });
      holdObj[item] = baseHoldArray;
    } else {
      holdObj[item] = obj[item];
    }
  });
  return holdObj;
}

// !!!!!
// templates => an object with all the templates added into an object : {Location: {key1: {value: ''}, Assets: {value: ''}, ...}}
// simplifiedObj => as object that contains keys with only value : {Location: [{key1: {value: ''}, Assets: {value: ''}, ...}]}
// Import necessary function for deep cloning of objects
// Adjust this import based on your environment

// Function to convert a simplified object to a detailed object based on predefined templates
export function SMALLtoLARGE(simplifiedObj) {
  // Clone the templates to avoid mutating the original ones
  let templates = structuredClone(Templates);

  // Initialize the object that will be returned
  let ReturnedObject = {};

  // Iterate through each key in the simplified object
  for (const key in simplifiedObj) {
    // Skip if the value is an array and it's not empty and the key is not "OpenRU"
    if (Array.isArray(simplifiedObj[key]) && simplifiedObj[key] !== null && simplifiedObj[key].length > 0 && key !== "OpenRU") {
      // Initialize an array to hold the transformed items for the current key
      let stepArray = [];

      // Iterate through each item in the array
      for (let i = 0; i < simplifiedObj[key].length; i++) {
        // Clone the template corresponding to the current key to avoid mutation
        let useTemplate = structuredClone(templates[key]);

        // Iterate through each key in the template
        for (const keyName in useTemplate) {
          // If the key exists in the current item of the simplified object, assign its value to the template
          if (simplifiedObj[key][i][keyName] !== undefined) {
            useTemplate[keyName].value = simplifiedObj[key][i][keyName].value;
          }
        }

        // Push the transformed template to the step array
        stepArray.push(useTemplate);
      }

      // Assign the step array to the returned object for the current key
      ReturnedObject[key] = stepArray;
    } else {
      // If the value is not an array or the key is "OpenRU", directly assign the value to the returned object
      ReturnedObject[key] = simplifiedObj[key];
    }
  }

  // Return the transformed object
  return ReturnedObject;
}
