import React from "react";
import "./Button.css";

type ButtonProps = {
  variant?: "outline" | "solid";
  children: React.ReactNode;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  variant = "solid",
  children,
  onClick,
}) => {
  return (
    <button className={`button ${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
