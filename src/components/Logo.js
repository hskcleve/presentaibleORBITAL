import React from "react";

const Logo = ({ fontSize, marginTop }) => {
  const AIstyling = { color: "goldenrod" };
  return (
    <div
      className="header"
      style={{ fontSize: fontSize, marginTop: marginTop }}
    >
      Present<h3 style={AIstyling}>AI</h3>ble
    </div>
  );
};

export default Logo;
