"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import FormTimePicker from "@/components/Forms/FormTimePicker";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import UploadImage from "@/components/ui/UploadImage/UploadImage";
import { genderOptions } from "@/constants/global";
import {
  useCustomerAgentQuery,
  useUpdateCustomerAgentMutation,
} from "@/redux/api/customerAgentApi";
import {
  useTimeSlotQuery,
  useUpdateTimeSlotMutation,
} from "@/redux/api/timeSlotApi";
import { Button, message } from "antd";
import { Col, Row } from "antd";

const EditAdmin = ({ params }: { params: any }) => {
  const { id } = params;

  const { data } = useTimeSlotQuery(id);
  const [updateTimeSlot, { isLoading }] = useUpdateTimeSlotMutation();

  const onSubmit = async (updatedData: any) => {
    try {
      message.loading("Updating...");

      const res = await updateTimeSlot({ id, updatedData }).unwrap();

      if (res && !isLoading) {
        message.success("Time slot updated successfully");
      } else {
        message.error("Something went  wrong");
      }
    } catch (error: any) {
      console.log(message);
      message.error(error.message);
    }
  };

  const defaultValues = {
    startTime: data?.startTime || "",
    endTime: data?.endTime || "",
  };
  return (
    <div>
      <ActionBar title="Create Time Slot"></ActionBar>

      <div className="max-w-[400px]">
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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

export default EditAdmin;
