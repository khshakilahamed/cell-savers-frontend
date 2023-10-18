"use client";

import { FormProvider, useForm, SubmitHandler } from "react-hook-form";

type FormConfig = {
  defaultValues?: Record<string, any>;
};

type FormProps = {
  children?: React.ReactNode | React.ReactElement;
  submitHandler: SubmitHandler<any>;
} & FormConfig;

const Form = ({ children, submitHandler, defaultValues }: FormProps) => {
  const formConfig: FormConfig = {};

  if (!!defaultValues) formConfig["defaultValues"] = defaultValues;

  const methods = useForm<FormProps>(formConfig);

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: any) => {
    submitHandler(data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
