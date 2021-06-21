import React from "react";
import ViewSubmissionByClass from "./ViewSubmissionByClass";

const TutorSubmission = (props) => {
  const moduleList = props.modules;
  console.log(moduleList.map((mod) => console.log(mod.className)));
  return (
    <div>
      <h2>My Classes</h2>
      <p>Tutor views students' submissions by class</p>
      <ViewSubmissionByClass moduleCode={"Orbital"}></ViewSubmissionByClass>
    </div>
  );
};

export default TutorSubmission;
