import React from "react";
import Chart from "react-google-charts";

const Feedback = (props) => {
  const { feedback, goodFeedbacks, badFeedbacks, isPost } = props;
  const tooltipDisplayText = isPost ? "value" : "percentage";
  console.log("received some info for chart", feedback);
  const loadChart = () => {
    if (feedback) {
      return displayChart(goodFeedbacks, badFeedbacks, tooltipDisplayText);
    } else {
      return noFeedbackChart();
    }
  };
  return <div>{loadChart()}</div>;
};
export default Feedback;

function noFeedbackChart() {
  return (
    <Chart
      width={"200px"}
      height={"200px"}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={[
        ["Rating", "percentage"],
        ["", 100],
      ]}
      options={{
        title: "No feedbacks yet...",
        titleTextStyle: { fontSize: 13 },
        pieHole: 0.5,
        backgroundColor: "transparent",
        width: 200,
        height: 200,
        legend: "none",
        slices: [
          {
            color: "#fff", //white colour
          },
        ],
        tooltip: { isHtml: true, trigger: "none" },
        enableInteractivity: false,
      }}
      rootProps={{ "data-testid": "3" }}
    />
  );
}

function displayChart(goodFeedbacks, badFeedbacks, tooltipDisplayText) {
  return (
    <Chart
      width={"200px"}
      height={"200px"}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={[
        ["Rating", "percentage"],
        ["Good", goodFeedbacks],
        ["Bad", badFeedbacks],
      ]}
      options={{
        title: "Feedback ratings",

        pieHole: 0.5,
        backgroundColor: "transparent",
        width: 200,
        height: 200,
        legend: "none",
        pieSliceText: "none",
        slices: [
          {
            color: "#79D45E", //mantis green
          },
          {
            color: "#F4889A", //pink sherbet
          },
        ],
        tooltip: {
          text: tooltipDisplayText,
          textStyle: { color: "#000" },
        },
      }}
      rootProps={{ "data-testid": "3" }}
    />
  );
}
/*

*/
