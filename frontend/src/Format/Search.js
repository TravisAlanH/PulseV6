function findClosestMatches(array, input) {
  // Remove special characters and convert to lowercase
  const normalizedInput = input.replace(/[^\w\s]/g, "").toLowerCase();

  // Sort the array based on the number of matching letters
  const sortedArray = array
    .map((item, index) => ({
      index,
      matchingLetters: countMatchingLetters(normalizedInput, item.replace(/[^\w\s]/g, "").toLowerCase()),
    }))
    .sort((a, b) => b.matchingLetters - a.matchingLetters);

  // Get the top 10 matches
  const closestMatches = sortedArray.slice(0, 10);

  // Return the indices of the closest matches
  return closestMatches.map((match) => match.index);
}

function findClosestMatchesInArrayObject(array, input, key) {
  // Remove special characters and convert to lowercase
  const normalizedInput = input.replace(/[^\w\s]/g, "").toLowerCase();

  // Sort the array based on the number of matching letters in the "Model" key
  const sortedArray = array
    .map((item, index) => ({
      index,
      matchingLetters: countMatchingLetters(normalizedInput, item[key].replace(/[^\w\s]/g, "").toLowerCase()),
    }))
    .sort((a, b) => b.matchingLetters - a.matchingLetters);

  // Get the top 10 matches
  const closestMatches = sortedArray.slice(0, 30);
  // const closestMatches = sortedArray;

  // Return the indices of the closest matches
  return closestMatches.map((match) => match.index);
}

// Function to count the number of matching letters between two strings
function countMatchingLetters(str1, str2) {
  let count = 0;
  const minLength = Math.min(str1.length, str2.length);

  for (let i = 0; i < minLength; i++) {
    if (str1[i] === str2[i]) {
      count++;
    }
  }

  return count;
}

export { findClosestMatches, findClosestMatchesInArrayObject };
