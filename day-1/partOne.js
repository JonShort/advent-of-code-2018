const data = require("./data");

const reduceFunc = (total, operation) => total + operation;
const reducedData = data.reduce(reduceFunc);

console.log(reducedData);
