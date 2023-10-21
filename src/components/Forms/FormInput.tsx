"use client";

import { Input } from "antd";
import { useFormContext, Controller } from "react-hook-form";

interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  disabled?: boolean;
}

const FormInput = ({
  name,
  type,
  size = "large",
  value,
  id,
  placeholder,
  label,
  disabled = false,
}: IInput) => {
  const { control } = useFormContext();

  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              {...field}
              type={type}
              value={value ? value : field.value}
              size={size}
              placeholder={placeholder}
            />
          ) : (
            <Input
              {...field}
              type={type}
              value={value ? value : field.value}
              size={size}
              placeholder={placeholder}
              disabled={disabled}
            />
          )
        }
      />
    </>
  );
};

export default FormInput;
