import React from "react";


interface IInputProps {
  name?: string,
  type?: string
}

export const Input: React.FC<IInputProps> = ({ name, type }) => {
  return (
    <input  name={name} type={type} />
  )
}

Input.defaultProps = {
  type: 'string'
}
