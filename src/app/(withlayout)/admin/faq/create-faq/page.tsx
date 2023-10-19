"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import UploadImage from "@/components/ui/UploadImage/UploadImage";
import { useAddBlogMutation } from "@/redux/api/blogApi";
import { useAddFaqMutation } from "@/redux/api/faqApi";
import { useAddServiceMutation } from "@/redux/api/serviceApi";
import { Button, message } from "antd";
import { Col, Row } from "antd";

const CreateFaq = () => {
  const [addFaq, { isLoading, error }] = useAddFaqMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating...");

      const res = await addFaq(data).unwrap();

      if (res) {
        message.success("FAQ created successfully");
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
      <ActionBar title="Create FAQ"></ActionBar>

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
                type="text"
                name="question"
                size="large"
                label="Title of Question"
                // placeholder="Display fix"
              />
            </Col>

            <Col
              className="gutter-row"
              style={{
                marginBottom: "10px",
              }}
            >
              <FormTextArea
                name="answer"
                label="Answer"
                placeholder="Write here answer"
              />
            </Col>
          </div>

          <div className="my-3">
            <Button
              type="primary"
              htmlType="submit"
              disabled={isLoading ? true : false}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateFaq;
