"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import UploadImage from "@/components/ui/UploadImage/UploadImage";
import { useAddBlogMutation } from "@/redux/api/blogApi";
import { useAddFeedbackMutation } from "@/redux/api/feedbackApi";
import { useAddServiceMutation } from "@/redux/api/serviceApi";
import { Button, message } from "antd";
import { Col, Row } from "antd";

const CreateFeedback = () => {
  const [addFeedback, { isLoading, error }] = useAddFeedbackMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Submitting...");

      const res = await addFeedback(data).unwrap();

      if (res) {
        message.success("Feedback submitted successfully");
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
      <ActionBar title="Feedback"></ActionBar>

      <div className="flex flex-col-reverse md:flex-row gap-10 w-full">
        <div className="md:w-[50%] text-lg text-justify">
          <p>Dear Valued Customers,</p>
          <p>
            At <span className="font-bold">CellSavers</span>, we are constantly
            striving to provide exceptional services and a memorable shopping
            experience for all our customers. Your feedback is incredibly
            valuable to us, as it helps us understand what we&apos;re doing
            right and where we can improve. We invite you to share your
            thoughts, experiences, and suggestions about our store. Whether you
            visited us for a mobile repair, purchased an accessory, or simply
            enjoyed our customer service, we want to hear from you! Your
            feedback not only helps us improve but also assists fellow shoppers
            in making informed decisions.
          </p>
          <br />
          <div>
            Warm regards,
            <br /> Admin
            <br /> CellSavers
            <br /> +8801687732227
            <br /> Dhaka
          </div>
        </div>

        <div className="md:w-[50%]">
          <p className="font-bold text-lg">Please, Write here your feedback-</p>
          <Form submitHandler={onSubmit}>
            <div>
              <Col
                className="gutter-row w-full"
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea
                  name="comment"
                  //   label=""
                  placeholder="Write here..."
                  rows={10}
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
    </div>
  );
};

export default CreateFeedback;
