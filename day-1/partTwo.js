const data = require("./data");

const source = [...data];
const memory = [0];
let runningTotal = 0;
let hasMatch = false;
let repeatedValue = undefined;

/*
  🤮 eww a while loop!
  🤔 I did try this with a recursive function, but it exceeded the call stack
*/
while (!hasMatch) {
  const currentValue = source.shift();
  runningTotal += currentValue;

  // Return the value which has been repeated
  if (memory.includes(runningTotal)) {
    repeatedValue = runningTotal;
    hasMatch = true;
    break;
  }

  // Move current value to end of the array
  source.push(currentValue);
  memory.push(runningTotal);
}

console.log(repeatedValue);
