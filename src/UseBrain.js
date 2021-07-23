const brain = require("brain.js")
const fs = require("fs");
let rawdata = fs.readFileSync("pleaseWork.json");
let data = JSON.parse(rawdata);


var net = new brain.recurrent.LSTM();
net.fromJSON(data);
console.log("output = ", net.run("The experience was heavenly as I was served a meal fit for God himself. After my meal, I was knocked into a food coma."));

