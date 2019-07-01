const path = require('path');
const {
  readData, extractXAndY, checkAndFilterData, shuffle
} = require('./dataset');
const { createModel, testModel } = require('./model');
const { convertToTensor, splitTensor, trainModel } = require('./train');


module.exports = {
  run,
};

async function run() {
  const FILE_PATH = process.env.FILE_PATH || path.join(__dirname, '../HousingData.csv');
  const rawData = await readData(FILE_PATH);

  const xy = extractXAndY(rawData);
  const filteredValues = checkAndFilterData(xy);
  const readyValues = shuffle(filteredValues);

  // convert to tensors
  const { inputs, labels } = convertToTensor(readyValues);
  const { trainTensor: trainInputs, testTensor: testInputs } = splitTensor(inputs);
  const { trainTensor: trainLabels, testTensor: testLabels } = splitTensor(labels);

  // Create the model
  const model = createModel(trainInputs.shape[1]);
  const history = await trainModel(model, trainInputs, trainLabels, 100);
  console.log(`Trained on ${history.params.samples} samples`);

  // Make some predictions using the model and compare them to the
  // original data
  await testModel(model, testInputs, testLabels);
}
