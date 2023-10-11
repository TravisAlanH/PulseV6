import React from "react";
import "./Message.css";

export default function MessageBox() {
  return (
    <div>
      <div className="container">
        <div className="rectangle">
          <div className="notification-text">
            <i className="material-icons">I</i>
            <span>&nbsp;&nbsp;This is a test notification.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
