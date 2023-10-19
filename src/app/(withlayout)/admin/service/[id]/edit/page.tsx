"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import UploadImage from "@/components/ui/UploadImage/UploadImage";
import { genderOptions } from "@/constants/global";
import {
  useCustomerAgentQuery,
  useUpdateCustomerAgentMutation,
} from "@/redux/api/customerAgentApi";
import {
  useServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/api/serviceApi";
import { Button, message } from "antd";
import { Col, Row } from "antd";

const EditAdmin = ({ params }: { params: any }) => {
  const { id } = params;

  const { data } = useServiceQuery(id);
  const [updateService, { isLoading }] = useUpdateServiceMutation();

  const onSubmit = async (updatedData: any) => {
    try {
      message.loading("Updating...");
      let file;
      if (updatedData?.file) {
        file = updatedData["file"];
        delete updatedData["file"];

        const formData = new FormData();
        formData.append("file", file);

        formData.append("upload_preset", "cell-repair");

        const fileUpload = await fetch(
          "https://api.cloudinary.com/v1_1/dkpy2zq2x/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const fileUploadResponse = await fileUpload.json();
        const image = fileUploadResponse.url;

        updatedData["image"] = image;
      }

      const res = await updateService({ id, updatedData }).unwrap();

      if (res && !isLoading) {
        message.success("Service updated successfully");
      } else {
        message.error("Something went  wrong");
      }
    } catch (error: any) {
      console.log(message);
      message.error(error.message);
    }
  };

  const defaultValues = {
    title: data?.title || "",
    price: data?.price || "",
    description: data?.description || "",
  };
  return (
    <div>
      <ActionBar title="Update Service"></ActionBar>

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
                name="title"
                size="large"
                label="Service Title"
                placeholder="Display fix"
              />
            </Col>

            <Col
              className="gutter-row"
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="number"
                name="price"
                size="large"
                label="Price"
                placeholder="150"
              />
            </Col>

            <Col
              className="gutter-row"
              style={{
                marginBottom: "10px",
              }}
            >
              <FormTextArea
                name="description"
                label="Service Description"
                placeholder="Write here service description"
              />
            </Col>
            <Col
              className="gutter-row"
              style={{
                marginBottom: "10px",
              }}
            >
              <UploadImage name="file" />
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

export default EditAdmin;
