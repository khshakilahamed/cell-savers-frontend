"use client";

import { Button, Col, Divider, Row, message } from "antd";
import signUpImage from "./../../assets/Signup.png";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useUserRegisterMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";

type FormValues = {
  email: string;
  password: string;
};

const RegisterPage = () => {
  const [userRegister, { isLoading }] = useUserRegisterMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      //   console.log(data);
      data["profilePicture"] = "https://i.ibb.co/pKwGF6G/camera-Icon.png";
      const res = await userRegister(data).unwrap();
      if (res.accessToken && !isLoading) {
        message.success("Successfully registered");
        storeUserInfo({ accessToken: res?.accessToken });
        router.push("/");
      } else {
        message.error("Something went wrong");
      }
    } catch (error) {}
  };
  return (
    <div className=" w-full">
      <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-screen gap-5">
        <div className="hidden w-full md:w-[50%] md:flex justify-center">
          <Image src={signUpImage} width="500" alt="login-image" />
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
            <Divider className="uppercase">Sign up here</Divider>
            <Form submitHandler={onSubmit}>
              <div className="min-w-[350px] flex flex-wrap  justify-between">
                <div className="w-full sm:w-[49%]">
                  <FormInput
                    name="firstName"
                    type="text"
                    size="large"
                    label="First Name"
                    placeholder="First Name"
                  />
                </div>
                <div className="w-full sm:w-[49%]">
                  <FormInput
                    name="lastName"
                    type="text"
                    size="large"
                    label="Last Name"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="min-w-[350px] my-2">
                <FormInput
                  name="email"
                  type="email"
                  size="large"
                  label="Email"
                  placeholder="abc@gmail.com"
                />
              </div>
              <div className="min-w-[350px] my-2">
                <FormInput
                  name="contactNo"
                  type="text"
                  size="large"
                  label="Contact Number"
                  placeholder="016XX-XXXXXX"
                />
              </div>
              <div className="min-w-[350px] my-2">
                <FormInput
                  name="password"
                  type="password"
                  size="large"
                  label="Password"
                  placeholder="Secret password"
                />
              </div>

              <Button type="primary" htmlType="submit" className="uppercase">
                Sign up
              </Button>

              <p className="mt-6">
                Already have an account? <Link href="/login">Login here</Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
