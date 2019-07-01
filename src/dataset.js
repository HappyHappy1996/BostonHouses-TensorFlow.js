const lodash = require('lodash');
const { csvService } = require('./csv-reader');


module.exports = {
  readData,
  extractXAndY,
  checkAndFilterData,
  shuffle,
  splitData,
};

async function readData(path) {
  return csvService.readFile(path, { headers: true });
}

function extractXAndY(data) {
  return data.map(row => ({
    X: {
      CRIM: parseFloat(row.CRIM),
      ZN: parseFloat(row.ZN),
      INDUS: parseFloat(row.INDUS),
      CHAS: parseFloat(row.CHAS),
      NOX: parseFloat(row.NOX),
      RM: parseFloat(row.RM),
      AGE: parseFloat(row.AGE),
      DIS: parseFloat(row.DIS),
      RAD: parseFloat(row.RAD),
      TAX: parseFloat(row.TAX),
      PTRATIO: parseFloat(row.PTRATIO),
      B: parseFloat(row.B),
      LSTAT: parseFloat(row.LSTAT),
    },
    Y: {
      MEDV: parseFloat(row.MEDV)
    },
  }));
}

function checkAndFilterData(data) {
  return data.filter(row => !hasNanValues(row.X) && !hasNanValues(row.Y));
}

function shuffle(arr) {
  return lodash.shuffle(arr);
}

function hasNanValues(obj) {
  let atLeastOneNan = false;

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (Number.isNaN(value)) {
      logNanObject(obj);
      atLeastOneNan = true;
    }
  });

  return atLeastOneNan;
}

function logNanObject(obj) {
  if (process.env.DO_NOT_PRINT_NAN_ERRORS) return;
  console.log('Object has NaN values');
  console.log(obj);
}

function splitData(data) {
  const testSize = Math.ceil(data.length / 10);
  const trainData = lodash.take(data, data.length - testSize);
  const testData = lodash.takeRight(data, testSize);
  return {
    trainData,
    testData,
  };
}
