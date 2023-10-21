"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import MyButton from "@/components/ui/Button/Button";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { Button, message } from "antd";
import { Col } from "antd";

const ChangePassword = () => {
  const [changePassword, { isLoading, error }] = useChangePasswordMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating...");

      const res: any = await changePassword(data);

      if (res.data) {
        message.success("Password updated successfully");
      } else {
        message.error("Something went wrong");
      }
    } catch (error: any) {
      console.log(message);
      message.error(error.message);
    }
  };
  return (
    <div>
      <ActionBar title="Change Password"></ActionBar>

      <div className="flex justify-center items-center h-full w-full">
        <div className="max-w-[400px]">
          <Form submitHandler={onSubmit}>
            <div>
              <Col
                className="gutter-row"
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="password"
                  name="oldPassword"
                  size="large"
                  label="Old password"
                  placeholder="*****"
                />
              </Col>
              <Col
                className="gutter-row"
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="password"
                  name="newPassword"
                  size="large"
                  label="New password"
                  placeholder="*****"
                />
              </Col>
            </div>

            <div className="my-3">
              <MyButton
                type="submit"
                className="px-3 py-2 rounded"
                disabled={isLoading ? true : false}
              >
                Change
              </MyButton>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
