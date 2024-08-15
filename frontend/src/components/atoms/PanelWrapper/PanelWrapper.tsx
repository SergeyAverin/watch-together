import React from "react";

import "./PanelWrapper.sass"

interface IPanelWrapperProps {
  children: React.ReactNode;
}

export const PanelWrapper: React.FC<IPanelWrapperProps> = ({ children }) => {
  return <div className="panel-wrapper">{children}</div>;
};
