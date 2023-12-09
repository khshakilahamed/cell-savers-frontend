"use client";

import { Button, Divider, message } from "antd";
import loginImage from "./../../assets/Login.png";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import Link from "next/link";
import {
  useForgotPasswordMutation,
  useUserLoginMutation,
} from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.service";
import { useState } from "react";
import CSModal from "@/components/ui/Modal/CSModal";
import MyButton from "@/components/ui/Button/Button";
import CircleSpinner from "@/components/ui/Spinner/CircleSpinner";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPassSchema } from "@/schemas/forgotPassword";

type LoginFormTypes = {
  email: string;
  password: string;
};

type ForgotPasswordType = {
  email: string;
};

const LoginPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const [forgotPassword, { isLoading: isForgotLoading }] =
    useForgotPasswordMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormTypes> = async (data) => {
    try {
      const res = await userLogin(data).unwrap();
      if (res.accessToken && !isLoading) {
        message.success("Successfully logged in");
        storeUserInfo({ accessToken: res?.accessToken });
        router.push("/");
      } else {
        message.error("Something went wrong");
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const handleForgotPassword: SubmitHandler<ForgotPasswordType> = async (
    data
  ) => {
    try {
      const res: any = await forgotPassword(data);

      if (res?.data) {
        message.success(res.data);
        setOpenModal(false);
      } else {
        message.error("Something went wrong");
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  return (
    <div className=" w-full">
      <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-screen gap-5">
        <div className="md:w-[50%] hidden md:flex justify-center">
          <Image src={loginImage} width="500" alt="login-image" />
        </div>
        <div className="w-full md:w-[50%] px-5 md:px-0">
          <div className="min-w-[350px] md:w-[50%] border-2">
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
              <div className="min-w-[350px]">
                <FormInput
                  name="email"
                  type="email"
                  size="large"
                  label="Enter your email"
                  placeholder="Your Email"
                />
              </div>
              <div className="my-2 min-w-[350px]">
                <FormInput
                  name="password"
                  type="password"
                  size="large"
                  label="Password"
                  placeholder="********"
                />
              </div>
              <p
                className=" text-red-500 pb-2 cursor-pointer"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Forgot password?
              </p>

              <MyButton
                className="rounded-md mt-2"
                disabled={isLoading ? true : false}
                type="submit"
              >
                {isLoading ? (
                  <>
                    <CircleSpinner /> <span className="pl-3">Logging</span>
                  </>
                ) : (
                  "Login"
                )}
              </MyButton>

              <p className="mt-6">
                Don&apos;t have account?{" "}
                <Link href="/register">Sign up here</Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
      <CSModal
        title="Forgot Password"
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        // handleOk={() => deleteHandler(blogId)}
        showOkButton={false}
        showCancelButton={false}
      >
        <Form
          submitHandler={handleForgotPassword}
          resolver={yupResolver(forgotPassSchema)}
        >
          <div className="min-w-[350px]">
            <FormInput
              name="email"
              type="email"
              size="large"
              label="Enter your email"
              placeholder="Your Email"
            />
          </div>

          <div className="text-right">
            <MyButton
              className="rounded-md mt-2"
              disabled={isForgotLoading ? true : false}
              type="submit"
            >
              {isForgotLoading ? (
                <>
                  <CircleSpinner /> <span className="pl-3">Submitting</span>
                </>
              ) : (
                "Submit"
              )}
            </MyButton>
          </div>
        </Form>
      </CSModal>
    </div>
  );
};

export default LoginPage;
