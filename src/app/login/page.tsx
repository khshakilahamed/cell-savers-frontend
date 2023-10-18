"use client";

import { Button, Divider, message } from "antd";
import loginImage from "./../../assets/Login.png";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.service";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await userLogin(data).unwrap();
      if (res.accessToken && !isLoading) {
        message.success("Successfully logged in");
        storeUserInfo({ accessToken: res?.accessToken });
        router.push("/");
      } else {
        message.error("Access token not found");
      }
    } catch (error) {
      message.error("Something went wrong");
    }
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

              <Button
                type="primary"
                htmlType="submit"
                className="uppercase"
                loading={isLoading ? true : false}
              >
                Login
              </Button>

              <p className="mt-6">
                Don&apos;t have account?{" "}
                <Link href="/register">Sign up here</Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
