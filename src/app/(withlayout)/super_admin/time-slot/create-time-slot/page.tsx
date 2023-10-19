"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import FormTimePicker from "@/components/Forms/FormTimePicker";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import UploadImage from "@/components/ui/UploadImage/UploadImage";
import { useAddServiceMutation } from "@/redux/api/serviceApi";
import { useAddTimeSlotMutation } from "@/redux/api/timeSlotApi";

import { Button, Upload, message } from "antd";
import { Col, Row } from "antd";

const CreateTimeSlot = () => {
  const [addTimeSlot, { isLoading, error }] = useAddTimeSlotMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating...");

      const res = await addTimeSlot(data).unwrap();

      if (res) {
        message.success("Time slot created successfully");
      } else {
        message.error("Something went wrong");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };
  return (
    <div>
      <ActionBar title="Create Time Slot"></ActionBar>

      <div className="max-w-[400px]">
        <Form submitHandler={onSubmit}>
          <Col
            className="gutter-row"
            style={{
              marginBottom: "10px",
            }}
          >
            <FormTimePicker name="startTime" label="Start time" />
          </Col>
          <Col
            className="gutter-row"
            style={{
              marginBottom: "10px",
            }}
          >
            <FormTimePicker name="endTime" label="End time" />
          </Col>

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

export default CreateTimeSlot;
