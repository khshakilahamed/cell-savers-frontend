/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import type { CSSProperties } from "react";
import type { CollapseProps } from "antd";
import { Collapse, theme } from "antd";
import { useFaqsQuery } from "@/redux/api/faqApi";
import Spinner from "../Spinner/Spinner";

const FaqSection = () => {
  const { token } = theme.useToken();

  const { data, isLoading } = useFaqsQuery({ limit: 6, page: 1 });
  const faqs = data?.faqs;

  const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
    panelStyle
  ) =>
    faqs?.map((faq) => {
      return {
        key: faq?.id,
        label: faq?.question,
        children: <p>{faq?.answer}</p>,
        style: panelStyle,
      };
    });

  const panelStyle: React.CSSProperties = {
    marginBottom: 10,
    background: "#F2F2F2",
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  return (
    <div className="w-full flex justify-center">
      <div className="px-5 xl:px-0 max-w-[1280px]">
        <div className="text-center my-20">
          <h2 className="uppercase text-3xl font-bold">FAQS</h2>
          <p className="text-base mt-2">Quality Service is Our Guarantee</p>
        </div>
        <div className="flex flex-col md:flex-row gap-5 mt-10">
          <div className="hidden lg:block lg:w-[50%]">
            <img
              className="w-full"
              // src="https://i.ibb.co/0qJnZ17/faq-mobile-store.jpg"
              src="https://res.cloudinary.com/dkpy2zq2x/image/upload/v1702110316/cell-repair/faq-mobile-store_mjiryi.jpg"
              alt="mobile image"
            />
          </div>
          <div className="lg:w-[50%]">
            {isLoading ? (
              <div className="w-full h-full flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              <Collapse
                className="text-base"
                bordered={false}
                defaultActiveKey={[`${faqs && faqs[0].id}`]}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                style={{ background: token.colorBgContainer }}
                items={getItems(panelStyle)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
