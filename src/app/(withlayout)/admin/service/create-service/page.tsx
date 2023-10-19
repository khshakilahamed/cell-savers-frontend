"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import UploadImage from "@/components/ui/UploadImage/UploadImage";
import { genderOptions } from "@/constants/global";
import { useAddServiceMutation } from "@/redux/api/serviceApi";

import { Button, Upload, message } from "antd";
import { Col, Row } from "antd";

// type FormValues = {
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   profilePicture: string;
//   gender: string;
//   contactNo: string;
//   emergencyContactNo: string;
//   presentAddress: string;
//   permanentAddress: string;
// };

const CreateAdmin = () => {
  const [addService, { isLoading, error }] = useAddServiceMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating...");

      data["price"] = Number(data?.price);

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

      const res = await addService(data).unwrap();

      if (res) {
        message.success("Service created successfully");
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
      <ActionBar title="Create Service"></ActionBar>

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

export default CreateAdmin;
