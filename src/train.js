const tf = require('@tensorflow/tfjs-node-gpu');


module.exports = {
  convertToTensor,
  splitTensor,
  trainModel,
};


/**
 * Convert the input data to tensors that we can use for machine
 * learning. We will also do the important best practices of _shuffling_
 * the data and _normalizing_ the data
 * MPG on the y-axis.
 */
function convertToTensor(data) {
  // Wrapping these calculations in a tidy will dispose any intermediate tensors.
  return tf.tidy(() => {
    tf.util.shuffle(data);

    const inputs = data.map(o => [
      o.X.CRIM,
      o.X.ZN,
      o.X.INDUS,
      o.X.CHAS,
      o.X.NOX,
      o.X.RM,
      o.X.AGE,
      o.X.DIS,
      o.X.RAD,
      o.X.TAX,
      o.X.PTRATIO,
      o.X.B,
      o.X.LSTAT,
    ]);
    const labels = data.map(o => [o.Y.MEDV]);

    const inputTensor = tf.tensor2d(inputs, [inputs.length, inputs[0].length ? inputs[0].length : 1]);
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

    // Step 3. Normalize the data to the range 0 - 1 using min-max scaling
    const axis = 0;
    const inputMax = inputTensor.max(axis);
    const inputMin = inputTensor.min(axis);

    const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));

    return {
      inputs: normalizedInputs,
      labels: labelTensor,
    };
  });
}

function splitTensor(tensor) {
  const n = tensor.shape[0];
  // 10%
  const testSize = Math.ceil(n / 10);
  const trainSize = n - testSize;
  const [trainTensor, testTensor] = tf.split(tensor, [trainSize, testSize]);
  return {
    trainTensor,
    testTensor
  };
}

async function trainModel(model, inputs, labels, epochs = 100) {
  const learningRate = 0.01;
  const optimizer = tf.train.sgd(learningRate);

  model.compile({
    optimizer,
    loss: tf.losses.absoluteDifference,
    metrics: [tf.metrics.meanSquaredError],
  });

  const batchSize = 5;

  return model.fit(inputs, labels, {
    batchSize,
    epochs,
    shuffle: true,
    validationSplit: 0.1
  });
}
