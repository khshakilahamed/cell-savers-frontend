import Footer from "@/components/ui/Footer/Footer";
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
      <div className="my-5 px-5 lg:px-20 xl:px-64 py-10">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
