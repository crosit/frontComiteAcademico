import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Card,
  Divider,
  Dropdown,
  MenuProps,
  Modal,
  notification,
  Space,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useLogicModal } from "../hooks";
import { SizesButton } from "../models";
import { deleteRow } from "../services/tableComponent.service";
import Btn from "./Btn";
import { useDispatch } from "react-redux";
import { reloadTable } from "../redux/app";

type Props = {
  itemsExtra: MenuProps["items"];
  title: string;
  subTitle?: string;
  children: JSX.Element;
  headerLeft?: JSX.Element;
  hasEdit: boolean;
  hasDelete: boolean;
  editFn?: (id: any) => void;
  deleteFn?: () => void;
  id: number;
  apiUrl: string;
  // buttonsBottom?: JSX.Element[]
};

export default function CardCustom({
  itemsExtra,
  children,
  title = "",
  subTitle = "",
  headerLeft = <></>,
  hasEdit = false,
  hasDelete = false,
  editFn,
  deleteFn,
  id,
  apiUrl,
}: // imageCompany = 'https://media.licdn.com/dms/image/C4E03AQHP3tXHx3rVqA/profile-displayphoto-shrink_800_800/0/1648572320885?e=2147483647&v=beta&t=RmqOF3IgHfcQheUU2tTwGWa9U1WIohmjDu8JsZxXGR4'
/*buttonsBottom = []*/
Props) {
  const [items, setItems] = useState<MenuProps["items"]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { open, handleOpen, handleClose } = useLogicModal(false);

  const dispatch = useDispatch();

  const query = useQueryClient();

  const mutation = useMutation(() => deleteRow(apiUrl, id), {
    onSuccess: async (data: any) => {
      if (data?.success || data?.succes) {
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
        dispatch(reloadTable());
      }
      query.invalidateQueries("fetchRows");
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

  const handleSubmit = () => {
    mutation.mutate();
    handleClose();
  };

  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = () => {
    setItems([]);
    const temp_items: MenuProps["items"] = [];

    if (hasEdit) {
      temp_items.push({
        label: (
          <Btn
            text={t("table.edit")}
            size={SizesButton.SMALL}
            className="button-plain-bgColor-white__option"
            onClick={editFn ? editFn : () => navigate("form/" + id)}
            startIcon={<EditOutlined />}
          />
        ),
        key: "101",

        // action: "edit",
        // onClick: null,
      });
    }

    if (hasDelete) {
      temp_items.push({
        label: (
          <Btn
            text={t("table.delete")}
            size={SizesButton.SMALL}
            className="button-plain-bgColor-white__option"
            onClick={deleteFn ? deleteFn : handleOpen}
            startIcon={<DeleteOutlined />}
          />
        ),
        key: "102",

        // action: "delete",
        // onClick: null,
      });
    }

    if (hasDelete || hasEdit)
      temp_items.push({
        type: "divider",
      });

    if (itemsExtra?.length) {
      temp_items.push(...itemsExtra);
    }

    setItems(temp_items);
  };

  return (
    <>
      <Card className="cardCustomContainer">
        <div className="card-custom__header">
          <div style={{ display: "flex", alignItems: "center" }}>
            {headerLeft}
          </div>

          <div style={{ display: "flex", justifyContent: "end" }}>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <MoreOutlined
                  rotate={90}
                  style={{ fontSize: "28px", paddingRight: 1, color: "white" }}
                />
              </a>
            </Dropdown>
          </div>
        </div>

        <div className="cardCustomTitle" >
          <span>{title}</span>
          <br></br>
          <span style={{ color: 'white', fontSize: '16px' }}>{subTitle}</span>
        </div>

        {children}

        {/* <div >
                {buttonsBottom.map((item) => item)}
            </div> */}
      </Card>

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
        onOk={handleSubmit}
        onCancel={handleClose}
      >
        <div>
          <p>{t("table.deleteConfirmation")}</p>
        </div>
      </Modal>
    </>
  );
}
