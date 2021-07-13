const brain = require("brain.js");
const fs = require("fs");
const trainingDataJson = require("./mxData.json"); //change to prefered training data file
const network = new brain.recurrent.LSTM();
const trainingData = trainingDataJson.map((item) => ({
  input: item.input,
  output: item.output,
}));
const alternatedData = [];
for (var a = 0; a < trainingData.length/2; a++) {
  alternatedData.push(trainingData[a]);
  alternatedData.push(trainingData[trainingData.length - a - 1]);
}
console.log(alternatedData);
console.log("new one");
network.train(alternatedData, {
  iterations: 2000, // the maximum times to iterate the training data --> number greater than 0
  log: true, // true to use console.log, when a function is supplied it is used --> Either true or a function
  logPeriod: 1, // iterations between logging out --> number greater than 0
});

const json = network.toJSON();
const data = JSON.stringify(json);
fs.writeFileSync("pleaseWork3.json", data); //rewrite the name of trained model of brainjs
