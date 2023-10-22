"use client";

import { Dropdown, Layout, Menu } from "antd";
import Title from "antd/es/typography/Title";
import { INavItems } from "../../../types/global";
import { usePathname } from "next/navigation";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { showSidebarDrawer } from "@/redux/slices/sidebarSlice";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Space } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

type IProps = {
  avatar?: React.ReactElement | React.ReactNode;
  menuItems: INavItems;
};

const Navbar = () => {
  const pathname = usePathname();
  const user = getUserInfo() as any;

  const menuItems: MenuProps["items"] = [
    {
      key: "/",
      label: <Link href="/">Home</Link>,
    },
    {
      key: "/services",
      label: <Link href="/services">Services</Link>,
    },
    {
      key: "/blog",
      label: <Link href="/blogs">Blogs</Link>,
    },
    {
      key: "/about-us",
      label: <Link href="/about-us">About us</Link>,
    },
    {
      key: "/contact-us",
      label: <Link href="/contact-us">Contact us</Link>,
    },
    {
      key: "/login",
      label: <>{!user.role && <Link href="/login">Login</Link>}</>,
    },
    {
      key: "/register",
      label: <>{!user?.role && <Link href="/register">Register</Link>}</>,
    },
  ];

  const dispatch = useAppDispatch();

  return (
    <Layout className="layout" style={{ padding: "0" }}>
      <Header className="flex gap-2 items-center fixed left-0 right-0 z-10">
        {pathname !== "/" && (
          <MenuUnfoldOutlined
            className="lg:hidden text-white text-2xl"
            onClick={() => dispatch(showSidebarDrawer())}
          />
        )}
        <Content>
          <Link href="/">
            <Title className="text-white mb-0 flex gap-2 text-2xl lg:text-4xl">
              CellSavers
            </Title>
          </Link>
        </Content>
        {/* when display lg */}
        <Menu
          className="hidden lg:flex"
          theme="dark"
          mode="horizontal"
          disabledOverflow
          selectedKeys={[pathname]}
          items={menuItems}
        />
        {!(!!user as boolean) && (
          <Dropdown
            className="flex lg:hidden"
            menu={{ items: menuItems }}
            trigger={["click"]}
          >
            <a
              className="text-white text-xl"
              onClick={(e) => e.preventDefault()}
            >
              <Space>
                <MenuOutlined />
              </Space>
            </a>
          </Dropdown>
        )}
        {(user as boolean) && <AvatarMenu />}
      </Header>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
