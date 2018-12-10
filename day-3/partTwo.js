const data = require("./data");

// Not happy with the complexity of this one, but works so won't labour over it

const resolveDetails = providedInput => {
  const splitInput = providedInput.split(" ");

  const _leftAndTop = splitInput[2].replace(":", "").split(",");
  const _columnsAndRows = splitInput[3].split("x");

  const id = parseInt(splitInput[0].replace("#", ""));
  const leftOffset = parseInt(_leftAndTop[0]);
  const topOffset = parseInt(_leftAndTop[1]);
  const columns = parseInt(_columnsAndRows[0]);
  const rows = parseInt(_columnsAndRows[1]);

  return {
    id,
    leftOffset,
    topOffset,
    columns,
    rows,
  };
};

const canvasSize = 1000;
const canvas = [];

const noClashIds = [];
const clashIds = [];

// Populate our canvas
for (let i = 0; i < canvasSize; i += 1) {
  canvas.push(new Array(canvasSize).fill(0));
}

data.map(providedInput => {
  const { id, leftOffset, topOffset, columns, rows } = resolveDetails(
    providedInput
  );

  const heightWithOffset = rows + topOffset;

  // This generates a one row 'slice' of how the sheet will look, with right part trimmed e.g:
  // [0,0,4,4,4,4]
  const horizontalSlice = [
    ...new Array(leftOffset).fill(0),
    ...new Array(columns).fill(id),
  ];

  const clashReports = [];
  // Loop over the height of the current addition plus top offset
  for (let i = topOffset; i < heightWithOffset; i += 1) {
    const clashReport = horizontalSlice.map((entry, idx) => {
      // Skip if value to be added is a 0
      if (entry === 0) {
        return false;
      }

      if (canvas[i][idx] !== 0) {
        clashIds.push(canvas[i][idx]);
        canvas[i][idx] = entry;
        return true;
      }

      canvas[i][idx] = entry;
      return false;
    });

    clashReports.push(clashReport.includes(true));
  }

  if (!clashReports.includes(true)) {
    noClashIds.push(id);
  }
});

const uniqueClashIds = [...new Set(clashIds)].sort((a, b) => a - b);
const uniqueNoClashIds = [...new Set(noClashIds)].sort((a, b) => a - b);

const idWithNoClash = uniqueNoClashIds.filter(x => !uniqueClashIds.includes(x));

console.log(idWithNoClash[0]);
