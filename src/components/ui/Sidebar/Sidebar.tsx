"use client";

import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, Drawer } from "antd";
import { sidebarItems } from "@/constants/sidebarItems";
import { getUserInfo } from "@/services/auth.service";
import { USER_ROLE } from "@/constants/role";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { onSidebarClose } from "@/redux/slices/sidebarSlice";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const Sidebar = ({
  children,
}: {
  children: React.ReactNode | React.ReactElement;
}) => {
  const data = getUserInfo() as any;
  const pathname = usePathname();
  const open = useAppSelector((state) => state.sidebar.open);

  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useAppDispatch();

  return (
    <Layout style={{ minHeight: "90vh" }}>
      <Layout className="lg:flex hidden">
        <Sider
          width={250}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={sidebarItems(data?.role)}
          />
        </Sider>
        <Layout>
          <Content className="bg-white p-4 m-3">{children}</Content>
        </Layout>
      </Layout>
      <Layout className="lg:hidden block">
        <Drawer
          title="Menus"
          placement="left"
          onClose={() => {
            dispatch(onSidebarClose());
          }}
          open={open}
        >
          <Menu
            theme="light"
            selectedKeys={[pathname]}
            mode="inline"
            items={sidebarItems(data?.role)}
          />
        </Drawer>
        <Content style={{ minHeight: "90vh" }} className="bg-white p-4 m-2">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Sidebar), { ssr: false });
