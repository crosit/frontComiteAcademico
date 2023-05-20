import { EyeOutlined, FileOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { NotificationModel } from "../../models/notifications.model";
import HexaIconButton from "../HexaIconButton";

type Props = {
  notification: NotificationModel;
  onMarkRead: (id: number) => void;
};

const Notification = (props: Props) => {
  const { notification, onMarkRead } = props;
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          background: notification.read ? "#fff8eb" : "#EFEADE",
        }}
        className="notification-container"
      >
        <div
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => {
            if (notification.redirectUrl) navigate(notification.redirectUrl);
          }}
        >
          <div style={{ marginRight: ".5rem" }}>
            <HexaIconButton
              icon={<FileOutlined />}
              toolTip="notifications.title"
              size="tiny"
              color="warning-secondary"
            />
          </div>
          <div>
            <Typography.Text
              ellipsis
              style={{
                fontWeight: "bold",
                width: "225px",
              }}
            >
              {notification.subject}
            </Typography.Text>
            <Typography.Text
              ellipsis
              style={{
                width: "225px",
              }}
            >
              {notification.content}
            </Typography.Text>
          </div>
        </div>
        {notification.read ? null : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: ".5rem",
            }}
          >
            <HexaIconButton
              icon={<EyeOutlined />}
              toolTip="notifications.read"
              size="tiny"
              color="warning-secondary"
              onClick={() => onMarkRead(notification.id)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
