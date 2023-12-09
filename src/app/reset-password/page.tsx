"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import MyButton from "@/components/ui/Button/Button";
import CircleSpinner from "@/components/ui/Spinner/CircleSpinner";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { resetPassSchema } from "@/schemas/resetPassword";
import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import { useRouter } from "next/navigation";

const ResetPassword = ({ searchParams }: any) => {
  const { email, token } = searchParams;
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();

  if (!email && !token) return null;

  const handleResetPassword = async (data: any) => {
    const newPassword = data.password;

    try {
      const res: any = await resetPassword({ email, newPassword, token });

      if (res?.data) {
        message.success("Password recovered");
        router.push("/login");
      } else {
        message.error("Something went wrong");
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };
  return (
    <div className="w-full min-h-[100vh] flex justify-center items-center ">
      <div>
        <h3>Reset Password</h3>
        <div className="mt-5">
          <Form
            submitHandler={handleResetPassword}
            resolver={yupResolver(resetPassSchema)}
          >
            <div className="min-w-[350px]">
              <FormInput
                name="password"
                type="password"
                size="large"
                label="New Password"
                placeholder="password"
              />
            </div>

            <div>
              <MyButton
                className="rounded-md mt-2"
                disabled={isLoading ? true : false}
                type="submit"
              >
                {isLoading ? (
                  <>
                    <CircleSpinner /> <span className="pl-3">Submitting</span>
                  </>
                ) : (
                  "Submit"
                )}
              </MyButton>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
