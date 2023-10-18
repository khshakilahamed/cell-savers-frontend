"use client";

import { useMyProfileQuery } from "@/redux/api/userApi";
import { removeUserInfo } from "@/services/auth.service";
import { Avatar, Divider, Dropdown, Space } from "antd";
import Link from "next/link";
import Spinner from "../Spinner/Spinner";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";

const AvatarMenu = () => {
  const { data, isLoading, isSuccess } = useMyProfileQuery(undefined);
  const role = data?.role;
  const router = useRouter();

  if (isLoading && !isSuccess) {
    return <Spinner />;
  }

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  const avatarItems = [
    {
      key: "name",
      label: (
        <div className="cursor-default min-w-[200px]">
          <p className="font-extrabold">
            {data?.firstName} {data?.lastName}
          </p>
          <p className="font-bold">
            <>{data?.email}</>
          </p>
          <Divider className="m-0 h-0" />
        </div>
      ),
    },
    {
      key: "/my-profile",
      label: <Link href={`${data?.role}/my-profile`}>Profile</Link>,
    },
    {
      key: "/dashboard",
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: "logout",
      label: <a onClick={logOut}>Logout</a>,
    },
    {
      key: "/",
      label: (
        <Link className="lg:hidden block" href="/">
          Home
        </Link>
      ),
    },
    {
      key: "/services",
      label: (
        <Link className="lg:hidden block" href="/services">
          Services
        </Link>
      ),
    },
    {
      key: "/blog",
      label: (
        <Link className="lg:hidden block" href="/blogs">
          Blogs
        </Link>
      ),
    },
    {
      key: "/dashboard",
      label: (
        <Link className="lg:hidden block" href="/dashboard">
          Dashboard
        </Link>
      ),
    },
  ];
  return (
    <Dropdown
      menu={{ items: avatarItems }}
      placement="bottomRight"
      trigger={["click"]}
    >
      <Space>
        <Avatar
          className="bg-gray-400 cursor-pointer"
          size={50}
          //   icon={<UserOutlined />}
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        ></Avatar>
      </Space>
    </Dropdown>
  );
};

export default AvatarMenu;
