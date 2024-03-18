import React from "react";

import './Form.sass'


interface IFormProps extends React.PropsWithChildren {
  onSubmit: React.FormEventHandler
}

export const Form: React.FC<IFormProps> = ({ children, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      { children }
    </form>
  )
}
