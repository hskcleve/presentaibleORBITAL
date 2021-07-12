const brain = require("brain.js");
const fs = require("fs");
const trainingDataJson = require("./mxData.json"); //change to prefered training data file
const network = new brain.recurrent.LSTM();
const trainingData = trainingDataJson.map((item) => ({
  input: item.input,
  output: item.output,
}));
const alternatedData = [];
for (var a = 0; a < trainingData.length / 2 - 10; a++) {
  alternatedData.push(trainingData[a]);
  alternatedData.push(trainingData[trainingData.length - a - 1]);
}
console.log(alternatedData);
console.log("new one");
network.train(alternatedData);

const json = network.toJSON();
const data = JSON.stringify(json);
fs.writeFileSync("pleaseWork2.json", data); //rewrite the name of trained model of brainjs
