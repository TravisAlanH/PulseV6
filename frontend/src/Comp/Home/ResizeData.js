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
export function SMALLtoLARGE(simplifiedObj) {
  let templates = structuredClone(Templates);
  console.log(simplifiedObj);
  // console.log(simplifiedObj);
  // const SimObjKeys = Object.keys(simplifiedObj);
  // console.log(SimObjKeys);

  let ReturnedObject = {};

  for (const key in simplifiedObj) {
    if (
      Array.isArray(simplifiedObj[key]) && // Step Array Level
      simplifiedObj[key] !== null &&
      simplifiedObj[key].length > 0 &&
      key !== "OpenRU"
    ) {
      let stepArray = [];
      for (let i = 0; i < simplifiedObj[key].length; i++) {
        let useTemplate = templates[key];
        console.log(useTemplate);
        for (const keyName in useTemplate) {
          if ((keyName, simplifiedObj[key][i][keyName] === undefined)) {
            continue;
          }
          // console.log(key, simplifiedObj[key][i]);
          // console.log("0", keyName, simplifiedObj[key][i][keyName]);
          // console.log(simplifiedObj[key][i][keyName].value);
          // console.log(keyName, useTemplate[keyName]);
          // console.log("1", useTemplate[keyName]);
          // console.log(useTemplate);
          // console.log("frozed? ", Object.isFrozen(useTemplate));
          useTemplate[keyName].value = simplifiedObj[key][i][keyName].value;
        }
        stepArray.push({ ...useTemplate });
      }
      ReturnedObject[key] = [...stepArray];
    } else {
      ReturnedObject[key] = simplifiedObj[key];
    }
  }

  return ReturnedObject;
}
