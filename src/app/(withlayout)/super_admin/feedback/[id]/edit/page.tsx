"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import UploadImage from "@/components/ui/UploadImage/UploadImage";
import { genderOptions } from "@/constants/global";
import { useBlogQuery, useUpdateBlogMutation } from "@/redux/api/blogApi";
import {
  useCustomerAgentQuery,
  useUpdateCustomerAgentMutation,
} from "@/redux/api/customerAgentApi";
import { Button, message } from "antd";
import { Col, Row } from "antd";

const EditBlog = ({ params }: { params: any }) => {
  const { id } = params;

  const { data } = useBlogQuery(id);
  const [updateBlog, { isLoading }] = useUpdateBlogMutation();

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
        const profilePicture = fileUploadResponse.url;

        updatedData["image"] = profilePicture;
      }

      const res = await updateBlog({ id, updatedData }).unwrap();

      if (res && !isLoading) {
        message.success("Blog updated successfully");
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
    description: data?.description || "",
  };
  return (
    <div>
      <ActionBar title="Update Blog"></ActionBar>

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
                label="Title"
                placeholder="Display fix"
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
                label="Description"
                placeholder="Write here blog"
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

export default EditBlog;
