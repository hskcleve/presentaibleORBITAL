import React from "react";
import Posts from "../components/Posts";

const DashboardPage = () => {
  return (
    console.log("DashboardPage reached"),
    (
      <div className="pagefiller">
        <h2 className="header">My Dashboard</h2>

        <h1 className="containerForSubmission">
          <h3>My Submissions</h3>
          <Posts></Posts>
          <h1
            style={{ backgroundColor: "lightseagreen" }}
            className="btnForSubmissions"
          >
            submission1_21/5/21.mp4
          </h1>
          <h1
            style={{ backgroundColor: "lightseagreen" }}
            className="btnForSubmissions"
          >
            submission2_24/5/21.mp4
          </h1>
        </h1>
      </div>
    )
  );
};

export default DashboardPage;
