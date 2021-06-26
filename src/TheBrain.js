const brain = require("brain.js");
const fs = require("fs");
const trainingDataJson = require("./mxData.json"); //change to prefered training data file
const network = new brain.recurrent.LSTM();

console.log((start = new Date().getTime()));
const trainingData = trainingDataJson.map((item) => ({
  input: item.input,
  output: item.output,
}));

network.train(trainingData, { iterations: 2000 });

const output = network.run("Presentation was clear");
console.log((end = new Date().getTime()), (end - start) / 1000);
console.log("output:" + output);
console.log(
  "starting to transfer the brain to json",
  (start = new Date().getTime())
);
const json = network.toJSON();
const data = JSON.stringify(json);
fs.writeFileSync("twobraincellstrained3.json", data); //rewrite the name of trained model of brainjs
console.log((end = new Date().getTime()), (end - start) / 1000);
