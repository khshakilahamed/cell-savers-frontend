"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import UploadImage from "@/components/ui/UploadImage/UploadImage";
import { genderOptions } from "@/constants/global";
import { useAddCustomerMutation } from "@/redux/api/customerApi";
import { Button, Upload, message } from "antd";
import { Col, Row } from "antd";
import { SubmitHandler } from "react-hook-form";

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

const CreateTechnician = () => {
  const [addCustomer, { isError, error }] = useAddCustomerMutation();

  const onSubmit = async (data: any) => {
    try {
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
        const profilePicture = fileUploadResponse.url;

        data["profilePicture"] = profilePicture;
      }

      const res = await addCustomer(data).unwrap();

      if (res) {
        message.success("Customer created successfully");
      } else {
        message.error("Something went  wrong");
      }
    } catch (error: any) {
      console.log(message);
      message.error(error.message);
    }
  };
  return (
    <div>
      <ActionBar title="Create Customer"></ActionBar>

      <div>
        <Form submitHandler={onSubmit}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col
              className="gutter-row"
              span={6}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="text"
                name="firstName"
                size="large"
                label="First Name"
                placeholder="John"
              />
            </Col>

            <Col
              className="gutter-row"
              span={6}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="text"
                name="lastName"
                size="large"
                label="Last Name"
                placeholder="Doe"
              />
            </Col>
            <Col
              className="gutter-row"
              span={6}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="email"
                name="email"
                size="large"
                label="Email"
                placeholder="johndoe@gmail.com"
              />
            </Col>
            <Col
              className="gutter-row"
              span={6}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="password"
                name="password"
                size="large"
                label="Password"
                placeholder="XXXXXX"
              />
            </Col>
            <Col
              className="gutter-row"
              span={6}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormSelectField
                size="large"
                name="gender"
                options={genderOptions}
                label="Gender"
                placeholder="Select"
              />
            </Col>
            <Col
              className="gutter-row"
              span={6}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="text"
                name="contactNo"
                size="large"
                label="Contact No."
                placeholder="0145000000"
              />
            </Col>
            <Col
              className="gutter-row"
              span={6}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="text"
                name="emergencyContactNo"
                size="large"
                label="Emergency Contact No."
                placeholder="0145000000"
              />
            </Col>
            <Col
              className="gutter-row"
              span={6}
              style={{
                marginBottom: "10px",
              }}
            >
              <UploadImage name="file" />
            </Col>
            <Col
              className="gutter-row"
              span={12}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormTextArea
                name="presentAddress"
                label="Present Address"
                placeholder="Write here present address"
              />
            </Col>
            <Col
              className="gutter-row"
              span={12}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormTextArea
                name="permanentAddress"
                label="Permanent Address"
                placeholder="Write here permanent address"
              />
            </Col>
          </Row>

          <div className="my-3">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateTechnician;
