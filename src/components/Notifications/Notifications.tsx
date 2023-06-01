import { Button } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useNotifications from "../../hooks/useNotifications";
import { NotificationModel } from "../../models/notifications.model";
import { RootState } from "../../redux/store";
import Loader from "../Loader";
import Notification from "./Notification";
import lottie from "lottie-web";
import animationData from "../../assets/lottie/lottie-noti.json";

type Props = {
  apiURL: string;
  params?: any;
};

const Notifications = (props: Props) => {
  const { apiURL, params } = props;

  const { t } = useTranslation();
  // const { onMarkRead, onMarkAllRead } = useNotifications(apiURL, params);

  // const notifications = useSelector(
  //   (state: RootState) => state.notifications.colleccion
  // );

  const isLoading = useSelector(
    (state: RootState) => state.notifications.isLoading
  );

  const containerRef = React.useRef<any>(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });
  }, []);

  return (
    <div>
      <div
        style={{
          marginTop: "0.5rem",
          borderRadius: "5px",
          padding: "10px",
          height: "500px",
          overflow: "scroll",
        }}
      >
          <div style={{ height: 300, width: 300 }}>
            <div ref={containerRef} />
          </div>
        {/* {notifications.length === 0 && (
          <div style={{ height: 300, width: 300 }}>
            <div ref={containerRef} />
          </div>
        )}
        {notifications.map((notification: NotificationModel) => (
          <Notification
            key={notification.id}
            notification={notification}
            onMarkRead={onMarkRead}
          />
        ))} */}
      </div>
      {params?.read !== 1 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: ".7rem",
          }}
        >
          <Button
            type="primary"
            className="button-submit"
            block
            size="large"
            //onClick={onMarkAllRead}
          >
            {t("notifications.allRead")}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Notifications;