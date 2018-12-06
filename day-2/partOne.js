const data = require("./data");

const results = data.map(currentString => {
  const letterArray = currentString.split("");
  const resultsCache = [];

  const arrayOfMatches = letterArray.map(letter => {
    // short-circuit if we've already checked this letter
    if (resultsCache.includes(letter)) {
      return 0;
    }

    resultsCache.push(letter);

    const matches = letterArray.filter(x => x === letter).length;
    return matches;
  });

  const currentResult = {
    double: arrayOfMatches.includes(2),
    triple: arrayOfMatches.includes(3),
  };

  return currentResult;
});

const numberOfDoubles = results.filter(x => x.double).length;
const numberOfTriples = results.filter(x => x.triple).length;

const checksum = numberOfDoubles * numberOfTriples;

console.log(checksum);
