import React from "react";

const Logo = ({ fontSize, marginTop }) => {
  return (
    <div
      className="header"
      style={{ fontSize: fontSize, marginTop: marginTop }}
    >
      <h3>Present</h3>
      <h3 className="AI-logo-wording">AI</h3>
      <h3>ble</h3>
    </div>
  );
};

export default Logo;
