const data = require("./data");

const filterToMatches = sourceArray =>
  sourceArray.filter(originalString => {
    const arrayFromString = originalString.split("");

    const checkedMatches = sourceArray.map(string => {
      // Return true/false for if each character at the same position matches
      const boolResults = arrayFromString.map(
        (char, idx) => string[idx] === char
      );

      // This returns a sorted array for each string
      // the correct result will have an array with one false as the first entry e.g.
      // false, true, true, true... cont
      return boolResults.sort();
    });

    const filteredMatches = checkedMatches.filter(results => {
      // If the first entry is false, and the second true then we have a match.
      return results[0] === false && results[1] === true;
    });

    // Because we're in a filter, return the two entries which still have data
    return filteredMatches.length > 0;
  });

const matchedStrings = filterToMatches(data);
const matchedAsArrays = matchedStrings.map(x => x.split(""));

// Find the character in the first string which doesn't appear in the second
const unMatchedCharacter = matchedAsArrays[0].find(
  char => !matchedAsArrays[1].includes(char)
);

// Remove the character which doesn't match from the string
const resultingString = matchedStrings[0].replace(unMatchedCharacter, "");

console.log(resultingString);
