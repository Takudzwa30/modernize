// components/ui/Button.tsx
import React from "react";
import styles from "./Button.module.css"; // Make sure this file exists

interface ButtonProps {
  variant?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  text: string;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  style?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  onClick,
  disabled = false,
  text,
  icon,
  type = "button",
  style,
}) => {
  const buttonStyle = variant === true ? styles.export : styles.add;
  const disabledStyle = disabled ? styles.disabled : "";

  return (
    <button
      className={`${styles.button} ${buttonStyle} ${disabledStyle}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      type={type}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
