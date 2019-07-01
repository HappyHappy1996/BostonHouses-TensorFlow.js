const csv = require('fast-csv');


module.exports = {
  csvService: {
    readFile,
  },
};

function readFile(path, options = undefined) {
  return new Promise((resolve, reject) => {
    const arr = [];
    const stream = csv.parseFile(path, options);

    stream
      .on('error', (error) => {
        console.error(error);
        reject(`An error has occurred in attempt to parse data in CSV file. Err: ${error}`);
      })
      .on('data', (row) => {
        arr.push(row);
      })
      .on('end', (rowCount) => {
        console.log(`Parsed ${rowCount} rows`);
        resolve(arr);
      });
  });
}
