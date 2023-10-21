"use client";

import Spinner from "@/components/ui/Spinner/Spinner";
import { useMyProfileQuery } from "@/redux/api/userApi";
import { Button, Divider } from "antd";
import blankUser from "./../../../../assets/blankUser.png";
import Image from "next/image";
import Link from "next/link";
import MyButton from "@/components/ui/Button/Button";

const SuperAdminProfile = () => {
  const { data, isLoading } = useMyProfileQuery(undefined);
  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const {
    id,
    firstName,
    lastName,
    contactNo,
    email,
    profilePicture,
    permanentAddress,
    presentAddress,
    role,
  } = data;

  return (
    <div className="">
      <h2>My Profile</h2>
      <Divider />

      <div className="flex justify-center items-center gap-5 h-full w-full">
        <div>
          <div>
            {profilePicture ? (
              <Link href={profilePicture} target="blank">
                <Image
                  src={profilePicture}
                  width={200}
                  height={200}
                  alt="user profile picture"
                />
              </Link>
            ) : (
              <Image src={blankUser} width={200} alt="user profile picture" />
            )}
          </div>
        </div>
        <div>
          <p className="text-lg">
            Name:{" "}
            <span className="font-bold">
              {firstName} {lastName}
            </span>
          </p>
          <p className="text-lg">
            Contact Number: <a href={`tel:+${contactNo}`}>{contactNo}</a>
          </p>
          <p className="text-lg">
            Email: <a href={`mailto:${email}`}>{email}</a>
          </p>
          <p className="text-lg">PresentAddress: {presentAddress}</p>
          <p className="text-lg">PermanentAddress: {permanentAddress}</p>

          <Link href={`/${role}/my-profile/${id}/update-my-profile`}>
            <MyButton className="font-bold py-2 px-3">Edit</MyButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminProfile;
