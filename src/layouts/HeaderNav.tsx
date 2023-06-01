import { BellOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import {
  Badge,
  Dropdown,
  MenuProps,
  Popover,
  Space,
  Tabs,
  Tooltip,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import HexaIconButton from "../components/HexaIconButton";
import MenuDropdown from "../components/MenuDropdown";
import ProfileDrawer from "../components/ProfileDrawer";
import { push as Menu } from "react-burger-menu";
import { headerButtons } from "../redux/headerNav";
import useLogicModal from "../hooks/useLogicModal";
import ModalSimple from "../components/ModalSimple";
import ContentModalCloseSession from "../components/ContentModalCloseSession";
import { useCloseSession } from "../hooks";
import logo from "/src/assets/logo_uni.jpeg";
import userImage from "/src/assets/userImage.png";
import { isSpanish } from "../utilities";
import { MX, US } from "country-flag-icons/react/3x2";
import i18next from "../utilities/multi-lng/i18n.utility";
import { Btn, ChangeViews } from "../components";
import { SizesButton } from "../models";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { reloadTable, setRows } from "../redux/app";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Notifications from "../components/Notifications/Notifications";
import { getNoReadNotificationsAsync } from "../redux/notifications";
import { PushNotificationHandler } from "../utilities/firebase-client.utility";
import { useLocalStorageSelector } from "react-localstorage-hooks";
import {
  Menu as MenuR,
  MenuItem,
  MenuButton,
  SubMenu,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const HeaderNav = () => {
  const buttons = useSelector((state: any) => state.headerNav.buttons);
  const { open, handleClose, handleOpen } = useLogicModal(false);

  const {
    open: openCloseSession,
    handleClose: handleCloseCloseSession,
    handleOpen: handleOpenCloseSession,
  } = useLogicModal(false);

  const { footer } = useCloseSession({ handleClose: handleCloseCloseSession });
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const notifications = useLocalStorageSelector(
    "notifications",
    (notifications: any) => notifications
  );

  const userLocal: any = localStorage.getItem("user");
  const user = JSON.parse(userLocal);

  const onChange = (key: string) => {
    console.log(key);
  };

  const noReadNotifications = useSelector(
    (state: any) => state.notifications.noRead
  );

  // useEffect(() => {
  //   dispatch(getNoReadNotificationsAsync);
  // }, []);

  // useEffect(() => {
  //   if (notifications?.notifications === true) {
  //     dispatch(getNoReadNotificationsAsync);
  //   }
  // }, [notifications]);

  const [notificationsState, setNotificationsState] = useState("0");

  const pushNotifications = new PushNotificationHandler();

  useEffect(() => {
    const initPush = async () => {
      await pushNotifications.init();

      pushNotifications.subscribe(() => {
        dispatch(getNoReadNotificationsAsync);
      });
    };
    initPush();
  }, []);

  const content = (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ChangeViews
          state={notificationsState}
          setState={setNotificationsState}
          options={[
            {
              type: "text",
              text: t("common.all").toString(),
            },
            {
              type: "text",
              text: t("common.unread").toString(),
            },
            {
              type: "text",
              text: t("common.read").toString(),
            },
          ]}
        />
      </div>
      {notificationsState === "0" && (
        <Notifications apiURL={"notifications/get"} />
      )}
      {notificationsState === "1" && (
        <Notifications apiURL={"notifications/get"} params={{ read: 0 }} />
      )}
      {notificationsState === "2" && (
        <Notifications apiURL={"notifications/get"} params={{ read: 1 }} />
      )}
    </>
  );

  return (
    <>
      <div id="outer-container" style={{ position: "absolute" }}>
        <Menu
          right
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
          isOpen={open}
          onClose={handleClose}
        >
          <ProfileDrawer />
        </Menu>
        <div id="page-wrap"></div>
      </div>

      <ModalSimple
        title={t("common.closeSesion")}
        open={openCloseSession}
        handleClose={handleCloseCloseSession}
        handleOpen={handleOpenCloseSession}
        handleSubmit={handleOpenCloseSession}
        content={<ContentModalCloseSession />}
        footer={footer()}
      />

      <div className="headerContainer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          id="symbols"
        >
          <symbol id="userHex" viewBox="0 0 322 97" preserveAspectRatio="none">
            <polygon
              points="308 48.5
                       288 90
                       7 90
                       7 7
                       288 7"
              strokeLinejoin="round"
              strokeWidth="8"
            />
          </symbol>
        </svg>
        <img
          className="logo"
          onClick={() => navigate("/")}
          src={logo}
          width={200}
          alt="logo"
        />

        <div className="navContainer">
          <div className="navMobile">
            <div>
              <Badge
                count={noReadNotifications}
                color="#336FE4"
                style={{ color: "#232323", fontWeight: "bold", marginRight: 6 }}
              >
                <Popover
                  title={
                    <Typography.Title
                      level={4}
                      style={{
                        background: "#336FE4",
                        margin: "-12px -12px 0 -12px",
                        borderRadius: "7px 7px 0px 0px",
                        padding: ".7rem",
                      }}
                    >
                      {t("common.notifications")}
                    </Typography.Title>
                  }
                  overlayInnerStyle={{
                    background: "#FDF8EB",
                  }}
                  style={{ backgroundColor: "#232323" }}
                  content={content}
                  placement={"bottom"}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space style={{ marginTop: '1px' }}>
                      <HexaIconButton
                        className="navItem"
                        icon={<BellOutlined />}
                        size={"small"}
                      />
                    </Space>
                  </a>
                </Popover>
              </Badge>
            </div>
            <div style={{ marginBottom: "1.2rem" }}>
              <MenuR
                menuStyle={{
                  background: "none",
                  boxShadow: "none",
                  width: "10px",
                }}
                align="end"
                menuButton={
                  <div style={{ height: "55px" }}>
                    <HexaIconButton
                      className=""
                      icon={<MenuOutlined />}
                      size={"middle"}
                    />
                  </div>
                }
                offsetY={12}
                transition
              >
                {buttons.map((button: any) =>
                  button.type === "menu" && ( !button.admin) ? (
                    <SubMenu
                      key={button.name}
                      label={
                        <div
                          style={{ marginLeft: "-1.55rem", background: "none" }}
                        >
                          <HexaIconButton icon={button.icon} />
                        </div>
                      }
                      menuStyle={{
                        background: "none",
                        boxShadow: "none",
                        width: "10px",
                      }}
                      offsetX={10}
                      offsetY={-6}
                    >
                      {button.menu.map((item: any) => (
                        <MenuItem
                          key={item.name}
                          style={{
                            display: "flex",
                            background: "none",
                            alignItems: "center",
                            justifyContent: "end",
                            width: "10px",
                            marginLeft: "45px",
                          }}
                        >
                          <HexaIconButton
                            key={item.name}
                            className="navItem"
                            toolTip={item.toolTip}
                            icon={item.icon}
                            onClick={() => navigate(item.path)}
                          />
                        </MenuItem>
                      ))}
                    </SubMenu>
                  ) : (
                    ( !button.admin) && (
                      <MenuItem
                        key={button.name}
                        style={{
                          display: "flex",
                          background: "none",
                          alignItems: "center",
                          justifyContent: "end",
                          width: "10px",
                          marginLeft: "45px",
                        }}
                      >
                        <HexaIconButton
                          key={button.name}
                          className="navItem"
                          toolTip={button.toolTip}
                          icon={button.icon}
                          onClick={() => navigate(button.path)}
                        />
                      </MenuItem>
                    )
                  )
                )}
              </MenuR>
            </div>
          </div>
          <div className="nav">
            {buttons.map((button: any) =>
              button?.type === "menu" && ( !button.admin) ? (
                <MenuDropdown
                  className="navItem"
                  key={button.name}
                  options={button.menu}
                  iconMenu={button.icon}
                  toolTip={button.toolTip}
                />
              ) : (
                ( !button.admin) && (
                  <HexaIconButton
                    key={button.name}
                    className="navItem"
                    toolTip={button.toolTip}
                    icon={button.icon}
                    onClick={() => {
                      navigate(button.path);
                    }}
                  />
                )
              )
            )}
            <Badge
              count={noReadNotifications || 8}
              color="#336FE4"
              style={{ color: "#fff", fontWeight: "bold" }}
            >
              <Popover
                title={
                  <Typography.Title
                    level={4}
                    style={{
                      background: "#336FE4",
                      margin: "-12px -12px 0 -12px",
                      borderRadius: "7px 7px 0px 0px",
                      padding: ".7rem",
                    }}
                  >
                    {t("common.notifications")}
                  </Typography.Title>
                }
                overlayInnerStyle={{
                  background: "#FDF8EB",
                }}
                style={{ backgroundColor: "#232323" }}
                content={content}
                placement={"bottom"}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space style={{ marginTop: '1px' }}>
                    <HexaIconButton
                      className="navItem"
                      icon={<BellOutlined />}
                    />
                  </Space>
                </a>
              </Popover>
            </Badge>
            <div id="test-3" className="userNav">
              <div className="userContainer">
                <Tooltip placement="bottom" title={t("headerNav.profile")}>
                  <img
                    className="userImage"
                    src={ '/src/assets/user.png' }
                    width={200}
                    alt="logo"
                    onClick={() => {
                      handleOpen();
                    }}
                  />
                </Tooltip>

                <Tooltip placement="bottom" title={t("headerNav.logout")}>
                  <LogoutOutlined
                    style={{ color: "white" }}
                    className="logout"
                    onClick={handleOpenCloseSession}
                  />
                </Tooltip>
              </div>
              <svg className="svgUser">
                <use xlinkHref="#userHex"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderNav;
