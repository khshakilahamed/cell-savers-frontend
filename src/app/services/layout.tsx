import Navbar from "@/components/ui/Navbar/Navbar";
import React from "react";

const layout = ({
  children,
}: {
  children: React.ReactNode | React.ReactElement;
}) => {
  return (
    <div>
      <Navbar />
      <div className="my-5 px-5 lg:px-20 xl:px-64">{children}</div>
    </div>
  );
};

export default layout;
