import React from "react";
import "./PageLayout.scss";

const PageLayout = ({ children }) => {
  return (
    <div className="PageLayout">
      <div className="PageLayout-wrapper">{children}</div>
    </div>
  );
};

export default PageLayout;
