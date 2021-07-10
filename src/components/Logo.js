import React from "react";

const Logo = ({ fontSize, marginTop }) => {
  const presentbleColor = 'rgba(255,255,255,0.781)'
  return (
    <div
      className="header"
      style={{ fontSize: fontSize, marginTop: marginTop }}
    >
      <h3 style = {{color: presentbleColor}}>Present</h3>
      <h3 className="AI-logo-wording">AI</h3>
      <h3 style = {{color: presentbleColor}} >ble</h3>
    </div>
  );
};

export default Logo;
