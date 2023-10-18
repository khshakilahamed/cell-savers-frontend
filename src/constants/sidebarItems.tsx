import type { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  ThunderboltOutlined,
  CreditCardOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";

export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}`}>Account Profile</Link>,
      key: `/${role}/profile`,
      icon: <ProfileOutlined />,
    },
    {
      label: <Link href={`/${role}/change-password`}>Change Password</Link>,
      icon: <ProfileOutlined />,
      key: `/${role}/change-password`,
    },
    {
      label: <Link href={`/${role}/manage-booking`}>Manage Bookings</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-booking`,
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/manage-customer`}>Manage Customers</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-customer`,
    },
    {
      label: (
        <Link href={`/${role}/manage-technician`}>Manage Technicians</Link>
      ),
      icon: <TableOutlined />,
      key: `/${role}/manage-technician`,
    },
    {
      label: <Link href={`/${role}/service`}>Services</Link>,
      icon: <TableOutlined />,
      key: `/${role}/service`,
    },
    {
      label: <Link href={`/${role}/time-slot`}>Time Slots</Link>,
      icon: <TableOutlined />,
      key: `/${role}/time-slot`,
    },
    {
      label: <Link href={`/${role}/role`}>Roles</Link>,
      icon: <TableOutlined />,
      key: `/${role}/role`,
    },
    {
      label: <Link href={`/${role}/blog`}>Blog</Link>,
      icon: <TableOutlined />,
      key: `/${role}/blog`,
    },
    {
      label: <Link href={`/${role}/faq`}>FAQ</Link>,
      icon: <TableOutlined />,
      key: `/${role}/faq`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: <Link href={`/${role}/manage-admin`}>Manage-Admins</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-admin`,
    },
  ];

  const technicianSidebarItems: MenuProps["items"] = [...defaultSidebarItems];

  const customerSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/review`}>reviews</Link>,
      icon: <TableOutlined />,
      key: `/${role}/review`,
    },
    {
      label: <Link href={`/${role}/feedback`}>Feedback</Link>,
      icon: <ScheduleOutlined />,
      key: `/${role}/feedback`,
    },
    {
      label: <Link href={`/${role}/payment`}>Payment</Link>,
      icon: <CreditCardOutlined />,
      key: `/${role}/payment`,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.TECHNICIAN) return technicianSidebarItems;
  else if (role === USER_ROLE.CUSTOMER) return customerSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
