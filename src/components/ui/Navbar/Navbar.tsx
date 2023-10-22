"use client";

import { Button, Layout, Menu } from "antd";
import Title from "antd/es/typography/Title";
import { INavItems } from "../../../types/global";
import { usePathname } from "next/navigation";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import { useMyProfileQuery } from "@/redux/api/userApi";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { showSidebarDrawer } from "@/redux/slices/sidebarSlice";
import { MenuUnfoldOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

type IProps = {
  avatar?: React.ReactElement | React.ReactNode;
  menuItems: INavItems;
};

const Navbar = () => {
  const pathname = usePathname();
  const user = getUserInfo() as any;

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
      key: "/login",
      label: (
        <>
          {!user.role && (
            <Link className="hidden lg:block" href="/login">
              Login
            </Link>
          )}
        </>
      ),
    },
    {
      key: "/register",
      label: (
        <>
          {!user?.role && (
            <Link className="hidden lg:block" href="/register">
              Register
            </Link>
          )}
        </>
      ),
    },
  ];

  const dispatch = useAppDispatch();

  return (
    <Layout className="layout">
      <Header className="flex gap-2 items-center fixed left-0 right-0 z-10">
        {pathname !== "/" && (
          <MenuUnfoldOutlined
            className="lg:hidden text-white text-2xl"
            onClick={() => dispatch(showSidebarDrawer())}
          />
        )}
        <Content>
          <Link href="/">
            <Title className="text-white mb-0 flex gap-2 text-xl md:text-2xl lg:text-4xl">
              CellSavers
            </Title>
          </Link>
        </Content>
        <Menu
          theme="dark"
          mode="horizontal"
          disabledOverflow
          selectedKeys={[pathname]}
          items={menuItems}
        />
        {(user as boolean) && <AvatarMenu />}
      </Header>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
