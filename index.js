const { run } = require('./src/run');


try {
  run();
} catch (err) {
  console.error(err);
}
