import React from "react";
import { Link } from "react-router-dom";
import "./LinkButton.sass";

interface ILinkProps extends React.PropsWithChildren {
  to: string;
}

export const LinkButton: React.FC<ILinkProps> = ({ to, children }) => {
  return (
    <div className="linkButton">
      <Link to={to}>{children}</Link>
    </div>
  );
};
