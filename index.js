const fs = require("fs");

module.exports = function fsPipeLine(inputFileName, outputFileName, callback) {
  return new Promise((resolve, reject) => {
    fs.readFile(inputFileName, "utf-8", (error, data) => {
      if (error) {
        reject(error);
        if (callback && typeof callback === "function") {
          callback(error, null);
        }
        return;
      }

      fs.writeFile(outputFileName, data, "utf-8", (error) => {
        if (error) {
          reject(error);
          if (callback && typeof callback === "function") {
            callback(error, null);
          }
          return;
        }

        const successMessage = `Data successfully copied from ${inputFileName} to ${outputFileName}.`;
        resolve(successMessage);

        if (callback && typeof callback === "function") {
          callback(null, successMessage);
        }
      });
    });
  });
};
