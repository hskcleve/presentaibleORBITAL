const fs = require("fs");
const originalTrainingData = require("./trainingdata.json");
//useBrain.js
const brain = require("brain.js");
let rawdata = fs.readFileSync("trainedBraindata2.json");
let data = JSON.parse(rawdata);
var net = new brain.recurrent.LSTM();
net.fromJSON(data);
//to useBrain : net.run(<string>)

//thewink.js
const winkNLP = require("wink-nlp");
const its = require("wink-nlp/src/its.js");
const as = require("wink-nlp/src/as.js");

const model = require("wink-eng-lite-model");
const nlp = winkNLP(model);

const patterns = [
  {
    name: "descriptors",
    patterns: [
      "AUX ADJ",
      "ADJ AUX",
      "ADV ADJ",
      "ADJ ADV",
      "ADJ NOUN",
      "NOUN ADJ",
      "ADV VERB",
      "VERB ADV",
      "VERB ADJ",
      "VERB NOUN",
      "NOUN VERB",
      "INTJ",
    ],
  },
];
nlp.learnCustomEntities(patterns);
//to use wink : nlp.readDoc(<string>).customEntities().out(its.pos)

const reWrittenDatajson = originalTrainingData.map((item) => ({
  input: String(nlp.readDoc(item.input).customEntities().out(its.pos)),
  output: item.output,
}));
const reWrittenData = JSON.stringify(reWrittenDatajson);
//console.log(JSON.stringify(reWrittenData));
fs.writeFileSync("parsedTrainingData.json", reWrittenData);

const reWrittenDataTaggedjson = originalTrainingData.map((item) => ({
  input: nlp.readDoc(item.input).customEntities().out(its.pos),
  output: net.run(nlp.readDoc(item.input).customEntities().out(its.pos)),
}));
const reWrittenDataTagged = JSON.stringify(reWrittenDataTaggedjson);
fs.writeFileSync("parsedAutoTagData.json", reWrittenDataTagged);
