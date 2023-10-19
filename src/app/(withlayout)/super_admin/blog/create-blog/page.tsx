"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import UploadImage from "@/components/ui/UploadImage/UploadImage";
import { useAddBlogMutation } from "@/redux/api/blogApi";
import { useAddServiceMutation } from "@/redux/api/serviceApi";
import { Button, message } from "antd";
import { Col, Row } from "antd";

const CreateBlog = () => {
  const [addBlog, { isLoading, error }] = useAddBlogMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating...");

      let file;
      if (data?.file) {
        file = data["file"];
        delete data["file"];

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

        data["image"] = image;
      }

      const res = await addBlog(data).unwrap();

      if (res) {
        message.success("Blog created successfully");
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
      <ActionBar title="Create Blog"></ActionBar>

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

export default CreateBlog;
