import { Form, Input, notification } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { confirmUserDocument } from "../../pages/Home/services/userDocuments.service";
import Btn from "../Btn";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

type Props = {
  handleClose: () => void;
  handleRefetch: () => void;
};

const useModalConfirm = ({ handleClose, handleRefetch }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onConfirm = useMutation((id: number) => confirmUserDocument(id), {
    onSuccess: (res) => {
      notification.success({
        message: t("documents.confirmed"),
        description: t("documents.confirmed"),
        style: {
          background: "#ffe7a6",
          borderRadius: "10px",
          fontWeight: "bold",
          // border: "2px solid #52C41A",
        },
        icon: <CheckCircleOutlined style={{ color: "#52C41A" }} />,
      });
      handleRefetch();
    },
    onError: (error: any) => {
      notification.error({
        message: "error",
        description: "error",
        style: {
          background: "#ffe7a6",
          borderRadius: "10px",
          fontWeight: "bold",
        },
        icon: <CloseCircleOutlined style={{ color: "#FF4D4F" }} />,
      });
    },
  });

  const handleSubmit = async (id: number) => {
    await onConfirm.mutate(id);
    await handleClose();
  };

  // const [nip, setNip] = React.useState<Number | null>(null);
  const [motive, setMotive] = React.useState<string>("");
  const [openMotive, setOpenMotive] = React.useState<boolean>(false);

  const footer = (id: number) => (
    <>
      {!openMotive ? (
        <>
          {/* <Btn
            text={t("common.reject")}
            className="button-plain-border-main"
            onClick={() => {
              setOpenMotive(true);
            }}
          /> */}
          <Btn
            text={t("common.confirm")}
            className="button-plain-bgColor-main"
            onClick={() => {
              handleSubmit(id);
            }}
            //disabled={nip === null}
          />
        </>
      ) : (
        <>
          <Btn
            text={t("common.cancelMotive")}
            className="button-plain-border-main"
            onClick={() => {
              setOpenMotive(false);
            }}
          />
          <Btn
            text={t("common.sendMotive")}
            className="button-plain-bgColor-main"
            onClick={() => console.log("send")}
            //disabled={nip === null}
          />
        </>
      )}
    </>
  );

  const content = () => (
    <div>
      <p style={{ fontWeight: 500 }}>
        {openMotive ? (
          <>{t("common.rejectDocument")}</>
        ) : (
          <>{t("common.confirmationDocument")} </>
        )}
      </p>
      {openMotive && (
        <Form form={form} layout="horizontal">
          {/*<Form.Item name="nip" label={" NIP"} style={{ fontWeight: "bold" }}>
            <Input
            maxLength={4}
            type="number"
            onChange={(e) => {
              setNip(Number(e.target.value));
            }}
          />
        </Form.Item>*/}
          <Form.Item
            name="motive"
            label={t("common.motive")}
            style={{ fontWeight: "bold", marginTop: 15 }}
          >
            <Input.TextArea
              maxLength={150}
              showCount
              onChange={(e) => {
                setMotive(e.target.value);
              }}
            />
          </Form.Item>
        </Form>
      )}
    </div>
  );

  return {
    footer,
    content,
  };
};

export default useModalConfirm;
