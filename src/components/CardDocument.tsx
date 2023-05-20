import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  DownloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLogicModal } from "../hooks";
import { formatDateReverse } from "../utilities/formats";
import HexaIconButton from "./HexaIconButton";
import useModalConfirm from "./Home/useModalConfirm";
import ModalSimple from "./ModalSimple";

type Props = {
  document: any;
  handleRefetch: any;
};

const CardDocument = ({ document, handleRefetch }: Props) => {
  const { t } = useTranslation();
  const {
    open: openConfirm,
    handleClose: handleCloseConfirm,
    handleOpen: handleOpenConfirm,
  } = useLogicModal(false);
  const { footer, content } = useModalConfirm({
    handleClose: handleCloseConfirm,
    handleRefetch,
  });

  const [id, setId] = React.useState<any>(null);

  return (
    <div className="cardContainer">
      <div className="headerCard">
        <div className="statusCard">
          <HexaIconButton
            icon={document.confirmationStatus === 'pending' ? <ArrowRightOutlined /> : <CheckOutlined />}
            size={"tiny"}
            color={"warning-secondary"}
          />
          <span className="statusText">{t(`documents.${document.confirmationStatus}`)}</span>
        </div>
        <div className="viwersCard">
          <span>62</span>
          <EyeOutlined />
        </div>
      </div>
      <div className="bodyCard">
        <span className="titleCard">{document?.name}</span>
        <span className="companieCard">
          <span className="companieTitle">{t('documents.table.company')}</span>
          <span className="companieDescription">
            {document?.metadata?.company?.map((company: any, index: number) => (
              <div key={index}>
                {company.name}
                <br />
              </div>
            ))}
          </span>
        </span>
        <span className="departamentsCard">
          <span className="departamentsTitle">{t('documents.table.department')}</span>
          <span className="departamentsDescription">
            {document?.departments?.map((department: any, index: number) => (
              <div key={index}>
                {department.name}
                <br />
              </div>
            ))}
          </span>
        </span>
        <span className="dateCard">
          <span className="dateTitle">{t('documents.table.date')}</span>
          <span className="dateDescription">{formatDateReverse({value: document.createdAt})}</span>
        </span>
      </div>
      <div className="footerCard">
        <div className="iconFooter">
          <Badge color={document?.color} dot>
            <HexaIconButton
              className="iconFooter"
              icon={<DownloadOutlined />}
              size={"small"}
              color={"warning-secondary"}
              onClick={() => {
                window.open(document?.urlFile, "_blank");
                if(document.confirmationStatus === 'pending'){
                  setId(document.id);
                  handleOpenConfirm();
                }
              }}
            />
          </Badge>
        </div>
      </div>
      <ModalSimple
        title={t("documents.confirmDocument")}
        open={openConfirm}
        handleClose={handleCloseConfirm}
        handleOpen={handleOpenConfirm}
        handleSubmit={() => {}}
        content={content()}
        footer={footer(id)}
      />
    </div>
  );
};

export default CardDocument;
