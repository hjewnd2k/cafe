import { PlusCircleOutlined, StopOutlined } from "@ant-design/icons";
import { notification } from "antd";

export const openNotificationSuccess = (message, description, color) => {
  notification.open({
    message: message,
    description: description,

    icon: <PlusCircleOutlined style={{ color: color }} />,
  });
};

export const openNotificationFail = (message, description, color) => {
  notification.open({
    message: message,
    description: description,

    icon: <StopOutlined style={{ color: color }} />,
  });
};
