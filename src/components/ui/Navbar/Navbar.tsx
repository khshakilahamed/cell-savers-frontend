"use client";

import { Layout, Menu } from "antd";
import Title from "antd/es/typography/Title";
import { Avatar, Button, Dropdown, Space, Divider } from "antd";
import { INavItems } from "../../../types/global";
import { usePathname } from "next/navigation";

const { Header, Content } = Layout;

type IProps = {
  avatarItems: INavItems;
  menuItems: INavItems;
};

const Navbar = ({ avatarItems, menuItems }: IProps) => {
  const pathname = usePathname();
  return (
    <Layout className="layout">
      <Header className="flex items-center">
        <Content>
          <Title className="text-white mb-0">CellSavers</Title>
        </Content>
        <Menu
          theme="dark"
          mode="horizontal"
          disabledOverflow
          selectedKeys={[pathname]}
          items={menuItems}
        />
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
      </Header>
    </Layout>
  );
};

export default Navbar;
