"use client";

import Navbar from "@/components/ui/Navbar/Navbar";
import Sidebar from "@/components/ui/Sidebar/Sidebar";
import { isLoggedIn } from "@/services/auth.service";
import { useEffect, useState } from "react";
import { Layout, Row, Space, Spin } from "antd";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }
    setIsLoading(true);
  }, [router, isLoading]);

  if (!isLoading) {
    return (
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Space>
          <Spin tip="Loading" size="large"></Spin>
        </Space>
      </Row>
    );
  }

  return (
    <div>
      <Navbar />
      <Sidebar>{children}</Sidebar>
    </div>
  );
};

export default DashboardLayout;
