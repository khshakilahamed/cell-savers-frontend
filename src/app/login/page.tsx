"use client";

import { Button, Col, Divider, Row } from "antd";
import loginImage from "./../../assets/Login.png";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import Link from "next/link";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    try {
      console.log(data);
    } catch (error) {}
  };
  return (
    <div className=" w-full">
      <div className="flex items-center justify-evenly w-full min-h-screen">
        <div className="w-[50%] flex justify-center">
          <Image src={loginImage} width="500" alt="login-image" />
        </div>
        <div className="w-[50%]">
          <div className="w-[50%] border-2">
            <h1 className="text-center text-4xl pb-10">
              <Link
                href="/"
                className="text-black border-none"
                style={{ textDecoration: "none" }}
              >
                CellSavers
              </Link>
            </h1>
            <Divider className="uppercase">Login here</Divider>
            <Form submitHandler={onSubmit}>
              <div className="">
                <FormInput
                  name="email"
                  type="email"
                  size="large"
                  label="Enter your email"
                  placeholder="abc@gmail.com"
                />
              </div>
              <div className="my-2">
                <FormInput
                  name="password"
                  type="password"
                  size="large"
                  label="Password"
                  placeholder="Secret password"
                />
              </div>
              <p className=" text-red-500 pb-2">Forgot password?</p>

              <Button type="primary" htmlType="submit" className="uppercase">
                Login
              </Button>

              <p className="mt-6">
                Don&apos;t have account?{" "}
                <Link href="/register">Signup here</Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
