import React from "react";

const MyBlackButton = ({
  children,
}: {
  children?: string | React.ReactNode | React.ReactElement;
}) => {
  return (
    <button
      className="uppercase py-3 px-5 text-white cursor-pointer"
      style={{ backgroundColor: "#001529" }}
    >
      {children ? children : "Button"}
    </button>
  );
};

export default MyBlackButton;
