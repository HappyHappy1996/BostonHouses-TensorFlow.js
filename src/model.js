const tf = require('@tensorflow/tfjs-node-gpu');

module.exports = {
  createModel,
  testModel,
};


function createModel(inputShape) {
  const model = tf.sequential();

  model.add(
    tf.layers.dense({ units: 128, inputShape: [inputShape], activation: 'relu' })
  );
  model.add(
    tf.layers.dense({ units: 1 })
  );

  return model;
}

async function testModel(model, testInputs, testLabels) {
  const preds = model.predict(testInputs);
  const diff = preds.sub(testLabels);
  const diffMean = diff.mean();

  const testLabelsArray = await testLabels.data();
  const predsArray = await preds.data();
  const diffArray = await diff.data();
  const diffMeanArray = await diffMean.data();

  for (let i = 0; i < testLabelsArray.length; i += 1) {
    console.log(`Original Y: ${testLabelsArray[i]} predicted: ${predsArray[i]} difference: ${diffArray[i]}`);
  }

  console.log(`Mean absolute error is: ${diffMeanArray[0]}`);
}
