import {
  LoadingOutlined,
  PrinterFilled,
  ReloadOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";

const CircleSpinner = ({ fontSize = 16 }: { fontSize?: number }) => {
  return (
    <Spin indicator={<LoadingOutlined style={{ fontSize: fontSize }} spin />} />
  );
};

export default CircleSpinner;
