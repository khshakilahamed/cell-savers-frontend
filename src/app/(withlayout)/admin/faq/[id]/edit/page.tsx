"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import { useFaqQuery, useUpdateFaqMutation } from "@/redux/api/faqApi";
import { Button, message } from "antd";
import { Col } from "antd";

const EditFaq = ({ params }: { params: any }) => {
  const { id } = params;

  const { data } = useFaqQuery(id);
  const [updateFaq, { isLoading }] = useUpdateFaqMutation();

  const onSubmit = async (updatedData: any) => {
    try {
      message.loading("Updating...");

      const res = await updateFaq({ id, updatedData }).unwrap();

      if (res && !isLoading) {
        message.success("FAQ updated successfully");
      } else {
        message.error("Something went  wrong");
      }
    } catch (error: any) {
      console.log(message);
      message.error(error.message);
    }
  };

  const defaultValues = {
    answer: data?.answer || "",
    question: data?.question || "",
  };
  return (
    <div>
      <ActionBar title="Update FAQ"></ActionBar>

      <div className="max-w-[400px]">
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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
              Update
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditFaq;
