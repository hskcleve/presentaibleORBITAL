import React from "react";
import Posts from "../components/Posts";

const DashboardPage = () => {
  return (
    console.log("DashboardPage reached"),
    (
      <div>
        <h1 className="header">My Dashboard</h1>

        <h1 className="containerForSubmission">
          <h3>My Submissions</h3>
          <Posts></Posts>
        </h1>
      </div>
    )
  );
};

export default DashboardPage;
