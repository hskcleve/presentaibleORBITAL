import React from "react";
import ViewSubmissionByClass from "./ViewSubmissionByClass";

const TutorSubmission = (props) => {
  const moduleList = props.modules;
  console.log(moduleList.map((mod) => console.log(mod.className)));
  return (
    <div>
      <h2 style={{ color: "ghostwhite" }}>My Classes</h2>
      <p style={{ color: "antiqueWhite" }}>Tutor views students' submissions by class</p>
      <ViewSubmissionByClass modules={moduleList}></ViewSubmissionByClass>
    </div>
  );
};

export default TutorSubmission;
