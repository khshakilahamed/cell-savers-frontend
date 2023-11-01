import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

interface IMyButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  children?: string | React.ReactNode | React.ReactElement;
  className?: string;
  onChange?: (el?: any) => void;
  onClick?: (el?: any) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const MyButton = ({
  type = "button",
  children,
  className,
  onChange,
  onClick,
  disabled = false,
  style,
}: IMyButtonProps) => {
  const classDisableStyle = "bg-gray-200 text-black hover:bg-gray-200";

  const classStyles = twMerge(
    `uppercase py-3 px-5 text-white cursor-pointer bg-slate-800 hover:bg-slate-700 ${
      disabled && classDisableStyle
    }`,
    className
  );
  return (
    <button
      type={type}
      className={classStyles}
      onChange={onChange}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children ? children : "Button"}
    </button>
  );
};

export default MyButton;
