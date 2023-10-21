import { twMerge } from "tailwind-merge";

interface IMyButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  children?: string | React.ReactNode | React.ReactElement;
  className?: string;
  onChange?: (el: any) => void;
  disabled?: boolean;
}

const MyButton = ({
  type = "button",
  children,
  className,
  onChange,
  disabled = false,
}: IMyButtonProps) => {
  const classDisableStyle = "bg-gray-400";

  const classStyles = twMerge(
    `uppercase py-3 px-5 text-white cursor-pointer bg-slate-800 ${
      disabled && classDisableStyle
    }`,
    className
  );
  return (
    <button
      type={type}
      className={classStyles}
      onChange={onChange}
      disabled={disabled}
    >
      {children ? children : "Button"}
    </button>
  );
};

export default MyButton;
