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
      <div className="mt-20">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
