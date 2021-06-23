import { useContext, useState, useEffect } from "react";
import React from "react";
import brain from "brain.js/src/index";

//const model = require("wink-eng-lite-model");
//const nlp = winkNLP(model);

const AIContext = React.createContext();

export function useAI() {
  return useContext(AIContext);
}

export function AIProvider({ children }) {
  const fs = require("fs");
  const winkNLP = require("wink-nlp");
  const its = require("wink-nlp/src/its.js");
  const as = require("wink-nlp/src/as.js");
  const rawdata = require("./trainedBraindata2.json");
  const [brainNet, setBrainNet] = useState();
  const [loading, setLoading] = useState(true);
  //const [wink, setWink] = useState();

  //if return > 0.5 then it is considered good comment
  function useBrainPrediction(input) {
    innitBrain();
    /*
    const parsedInput = winkParse(input); //returns an array
    const originalLength = parsedInput.length;
    const results = parsedInput.map((shorts) => brainNet.run(shorts));
    const goodResultLength = results.filter(
      (result) => result === "good"
    ).length;
    return goodResultLength / originalLength; //ratio of "good" to total
    */
    return brainNet.run(input);
  }

  /*
  function winkParse(input) {
    return wink.readDoc(input).customEntities().out(its.pos);
  }*/

  useEffect(() => {
    innitBrain();
    //innitWink();
    setLoading(false);
  });

  function innitBrain() {
    let data = JSON.parse(rawdata);
    var net = new brain.recurrent.LSTM();
    setBrainNet(net.fromJSON(data));
  }

  /*
  function innitWink() {
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
    setWink(nlp.learnCustomEntities(patterns));
  }*/

  const value = {
    useBrainPrediction,
  };

  return (
    <AIContext.Provider value={value}>
      {!loading && children}
    </AIContext.Provider>
  );
}
