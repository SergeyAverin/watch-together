import React from "react";

import './Submit.sass'


interface ISubmitProps {
  value: string
}

export const Submit: React.FC<ISubmitProps> = ({ value }) => {
  return (
    <input type="submit" value={ value } className="submit-btn" />
  )
}
