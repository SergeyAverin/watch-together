import React from "react";
import "./Button.sass";

export enum ButtonVariant {
  OUTLINE = "outlineButton",
  FULL = "fullButton",
}

interface IButtonProps extends React.PropsWithChildren {
  /** Функция вызываемая при клике на кнопку */
  onClick?: (event: React.MouseEvent) => void;

  /** Вариант кнопки, влияет на внешний вид кнопки */
  variant?: string;

  /** Тип кнопки */
  type?: "button" | "submit" | "reset" | undefined;
}

export const Button: React.FC<IButtonProps> = ({
  children,
  onClick,
  type,
  variant,
}) => {
  return (
    <button type={type} className={variant} onClick={() => onClick}>
      {children}
    </button>
  );
};
