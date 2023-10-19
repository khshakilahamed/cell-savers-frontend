"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import UploadImage from "@/components/ui/UploadImage/UploadImage";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { useAddBlogMutation } from "@/redux/api/blogApi";
import { useAddFaqMutation } from "@/redux/api/faqApi";
import { useAddServiceMutation } from "@/redux/api/serviceApi";
import { Button, message } from "antd";
import { Col, Row } from "antd";

const ChangePassword = () => {
  const [changePassword, { isLoading, error }] = useChangePasswordMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating...");

      const res = await changePassword(data);

      if (res) {
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
              <Button
                type="primary"
                htmlType="submit"
                disabled={isLoading ? true : false}
              >
                Update
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
