import {
  ArrowLeftOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  EditOutlined,
  FileAddOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Grid,
  Image,
  Input,
  message,
  notification,
  Row,
  Select,
  Space,
  Tag,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Btn, HexaIconButton } from "../../../components";
import CustomSkeleton from "../../../components/CustomSekeleton";
import useGeneralForm from "../../../hooks/useGeneralForm";
import { TypeDocument } from "../../../utilities/data";
import { getFieldsMetadata } from "../hooks/FormFields";
import useFormDocument from "../hooks/useFormDocument";

const FormDocuments = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { loading, posting, isEditing, handleSubmit, miscs } = useGeneralForm({
    form,
    formFields: getFieldsMetadata({ t }),
    apiURL: "/solicitud",
    moduleName: 'solicitud',
    urlReturn: "/"
  });

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);
  const [dataCDP, setDataCDP] = useState<any>({
    company: [],
    departments: [],
    positions: [],
  });
  const [data, setData] = useState<any>({});

  const { handleUpload, fileData } = useFormDocument();

  const handleOnSubmit = async (values: any) => {
    const formData = new FormData();

    formData.append("file", values.url.file);
    formData.append("module", "regulation");
    
    //await handleUpload(formData);

    //setData(values);
    values.url = 'Example';
    handleSubmit(values);
  };

  useEffect(() => {
    if (fileData) {
      // data.version[0].urlFile = fileData.location;
      data.url= 'Example';
      handleSubmit(data);
    }
  }, [fileData]);

  return (
    <div style={{ margin: '20px' }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography.Title level={1}>
          Nueva peticion
        </Typography.Title>
        {/* <HexaIconButton
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/documents")}
          color="secondary"
          size="small"
        /> */}
        <Button
          onClick={() => navigate("/")}
        >
          Regresar
        </Button>
      </div>

      <div className="app-form-container">
        <div className="app-form-container__form">
          <Form
            form={form}
            name="CompanyBenefitsForm"
            layout="vertical"
            autoComplete="off"
            onFinish={handleOnSubmit}
            scrollToFirstError={true}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
          >
            {
              renderFields({
                posting,
                fieldsDefinition: getFieldsMetadata({ t }),
                isEditing,
                t,
                miscs,
                form,
                fileList,
                setFileList,
                setDisabledBtn,
                disabledBtn,
                keywords,
                setKeywords,
                dataCDP,
                setDataCDP,
              })
            }
          </Form>
        </div>
      </div>
    </div>
  );
};

const renderFields = ({
  fieldsDefinition,
  posting,
  isEditing,
  t,
  miscs,
  form,
  fileList,
  setFileList,
  setDisabledBtn,
  disabledBtn,
  keywords,
  setKeywords,
  dataCDP,
  setDataCDP,
}: any) => {
  const { Dragger } = Upload;

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      const isPDF = file.type === "application/pdf";
      if (!isPDF) {
        message.error("You can only upload PDF file!");
        setFileList([]);
      } else {
        setFileList([file]);
      }

      return false;
    },
    fileList,
  };

  return (
    <>
      <Row gutter={16}>
        <Col md={{ span: 24 }} xs={{ span: 24 }} className="gutter-row">
          <Form.Item
            label={fieldsDefinition.name.label}
            name={fieldsDefinition.name.name}
            rules={fieldsDefinition.name.rules}
            style={{ fontWeight: "bold" }}
          >
            <Input
              size="large"
              style={{ width: "100%" }}
              placeholder={fieldsDefinition.name.placeholder}
            />
          </Form.Item>
        </Col>
        <Col md={{ span: 24 }} xs={{ span: 24 }} className="gutter-row">
          <Form.Item
            label={fieldsDefinition.description.label}
            name={fieldsDefinition.description.name}
            rules={fieldsDefinition.description.rules}
            style={{ fontWeight: "bold" }}
          >
            <Input.TextArea
              rows={3}
              size="large"
              style={{ width: "100%" }}
              placeholder={fieldsDefinition.description.placeholder}
            />
          </Form.Item>
        </Col>
        <Col md={{ span: 24 }} xs={{ span: 24 }} className="gutter-row">
          <Form.Item
            label={fieldsDefinition.pdf.label}
            name={fieldsDefinition.pdf.name}
            rules={[
              {
                validator: () => {
                  if (fileList.length === 0) {
                    return Promise.reject(t("forms.required"));
                  }
                  return Promise.resolve();
                },
              },
            ]}
            style={{ fontWeight: "bold" }}
          >
            <Dragger {...props} style={{ background: "#fff" }}>
              <p className="ant-upload-drag-icon">
                <FileAddOutlined style={{ color: "#232323" }} />
              </p>
              <p className="ant-upload-text">{t("documents.upload")}</p>
            </Dragger>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button
          type="primary"
          className="button-submit"
          htmlType="submit"
          loading={posting}
          block
          size="large"
          disabled={posting}
        >
          {isEditing ? (
            <>
              <EditOutlined style={{ marginRight: "10px" }} />
              {t("forms.edit")}
            </>
          ) : (
            <>
              <SaveOutlined style={{ marginRight: "10px" }} />
              {t("forms.create")}
            </>
          )}
        </Button>
      </Form.Item>
    </>
  );
};

export default FormDocuments;
