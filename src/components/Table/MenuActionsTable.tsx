// ** React Imports
import { ReactElement, useState } from "react";

import { Dropdown, Menu, Modal, notification, Space } from "antd";
import HexaIconButton from "../HexaIconButton";
import { CheckCircleOutlined, CloseCircleOutlined, EllipsisOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { deleteRow } from "../../services/tableComponent.service";
import { useTranslation } from "react-i18next";

interface optionInterface {
  title: string;
  action: string;
  icon: ReactElement;
  onClick: any;
  disabled?: boolean;
  visible?: boolean;
}

type Props = {
  options: optionInterface[];
  appURL: string;
  apiURL: string;
  row: any;
  setToggleReload: any;
};

const MenuActionsTable = ({
  options,
  appURL,
  apiURL,
  row,
  setToggleReload,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const mutation = useMutation(() => deleteRow(apiURL, row.row.original.id), {
    onSuccess: async (data: any) => {
      notification.success({
        message: t("table.deleteConfirmationSuccess"),
        style: {
          background: "#ffe7a6",
          borderRadius: "10px",
          fontWeight: "bold",
          // border: "2px solid #52C41A",
        },
        icon: <CheckCircleOutlined style={{ color: "#52C41A" }} />,
      });
      setToggleReload((prevState: any) => !prevState);
    },
    onError: async () => {
      notification.error({
        message: t("table.deleteConfirmationError"),
        style: {
          background: "#ffe7a6",
          borderRadius: "10px",
          fontWeight: "bold",
        },
        icon: <CloseCircleOutlined style={{ color: "#FF4D4F" }} />,
      });
    },
  });

  const handleSubmitModal = () => {
    mutation.mutate();
    handleCloseDialog();
  };

  const { t } = useTranslation();

  const navigate = useNavigate();

  const clickEvent = (option: optionInterface, row: any) => {
    option.action === "edit"
      ? navigate(`/${appURL}/form/${row.row.original.id}`)
      : option.action === "delete"
      ? setOpen(true)
      : option.onClick(row.row.original);
  };

  const MenuIterable = (props: any) => {
    const { entries, selection } = props;

    return (
      <Menu>
        {entries.map((option: any, i: any) => (
          <Menu.Item key={i}>
            <div
              onClick={() => clickEvent(option, selection)}
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              <HexaIconButton
                color={"secondary"}
                size={"tiny"}
                icon={option.icon}
              />
              {option.label}
            </div>
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Dropdown
        overlayStyle={{ border: "2px solid #ffc858", borderRadius: 10 }}
        placement={"bottom"}
        overlay={<MenuIterable entries={options} selection={row} />}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HexaIconButton
              color={"secondary"}
              icon={<EllipsisOutlined />}
              size={"small"}
            />
          </Space>
        </a>
      </Dropdown>

      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <ExclamationCircleOutlined
              style={{
                color: "#ffc858",
                marginRight: "5px",
                fontSize: "1.5rem",
              }}
            />
            {t("table.deleteConfirmationTitle")}
          </div>
        }
        style={{ border: "2px solid #ffc858", borderRadius: 10 }}
        centered
        open={open}
        okText={t("table.deleteConfirmationYes")}
        cancelText={t("table.deleteConfirmationNo")}
        okButtonProps={{ style: { background: "#ffc858", color: "#232323" } }}
        cancelButtonProps={{ style: { background: "#232323", color: "#fff" } }}
        onOk={handleSubmitModal}
        onCancel={handleCloseDialog}
      >
        <div>
          <p>{t("table.deleteConfirmation")}</p>
        </div>
      </Modal>
    </div>
  );
};

export default MenuActionsTable;
