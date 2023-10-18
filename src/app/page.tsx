import Navbar from "@/components/ui/Navbar/Navbar";
import React from "react";
import { Avatar, Button, Dropdown, Space, Divider } from "antd";
import Link from "next/link";

const HomePage = () => {
  const login = true;
  const avatarItems = [
    {
      key: "name",
      label: (
        <div className="cursor-default min-w-[200px]">
          <p className="font-extrabold">Kh. Shakil</p>
          <p className="font-bold">Email</p>
          <Divider className="m-0 h-0" />
        </div>
      ),
    },
    {
      key: "/my-profile",
      label: <Link href="/my-profile">Profile</Link>,
    },
    {
      key: "/dashboard",
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: "logout",
      label: <a>Logout</a>,
    },
    {
      key: "/",
      label: (
        <Link className="lg:hidden lg:m-0 lg:p-0 invisible" href="/">
          Home
        </Link>
      ),
    },
    {
      key: "/services",
      label: (
        <Link className="lg:hidden lg:m-0 lg:p-0 invisible" href="/services">
          Services
        </Link>
      ),
    },
    {
      key: "/blog",
      label: (
        <Link className="lg:hidden lg:m-0 lg:p-0 invisible" href="/blogs">
          Blogs
        </Link>
      ),
    },
    {
      key: "/dashboard",
      label: (
        <Link className="lg:hidden lg:m-0 lg:p-0 invisible" href="/dashboard">
          Dashboard
        </Link>
      ),
    },
  ];
  const menuItems = [
    {
      key: "/",
      label: (
        <Link className="hidden lg:block" href="/">
          Home
        </Link>
      ),
    },
    {
      key: "/services",
      label: (
        <Link className="hidden lg:block" href="/services">
          Services
        </Link>
      ),
    },
    {
      key: "/blog",
      label: (
        <Link className="hidden lg:block" href="/blogs">
          Blogs
        </Link>
      ),
    },
    {
      key: "/about-us",
      label: (
        <Link className="hidden lg:block" href="/about-us">
          About us
        </Link>
      ),
    },
    {
      key: "/contact-us",
      label: (
        <Link className="hidden lg:block" href="/contact-us">
          Contact us
        </Link>
      ),
    },
    {
      key: "/dashboard",
      label: (
        <Link className="hidden lg:block" href="/dashboard">
          Dashboard
        </Link>
      ),
    },
  ];

  const loginItem = {
    key: "/login",
    label: (
      <Link className="hidden lg:block" href="/login">
        Login
      </Link>
    ),
  };

  const registerItem = {
    key: "/register",
    label: (
      <Link className="hidden lg:block" href="/register">
        Register
      </Link>
    ),
  };

  if (login) {
    avatarItems.push(loginItem);
    avatarItems.push(registerItem);
    menuItems.push(loginItem);
    menuItems.push(registerItem);
  }

  return (
    <div>
      <Navbar avatarItems={avatarItems} menuItems={menuItems} />
      <h1>Home Page</h1>
    </div>
  );
};

export default HomePage;
