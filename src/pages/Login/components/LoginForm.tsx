import { Row, Form, Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Btn, BtnLng } from "../../../components";
import { SizesButton } from "../../../models";
import useLogin from "../hooks/useLogin";

type Props = {};

export default function LoginForm({}: Props) {
  //Deconstruir components
  const [form] = Form.useForm();
  const { Item } = Form;
  const { Password } = Input;

  //Hooks
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    layout,
    onSubmit,
    onSubmitFailed,
    tailLayout,
    isLoading,
    credentials,
    setCredentials,
  } = useLogin({});

  return (
    <div>
      <Form
        className="login-form"
        {...layout}
        name="login-form"
        form={form}
        onFinish={onSubmit}
        onFinishFailed={onSubmitFailed}
      >
        <Item
          name="email"
          rules={[{ required: true, message: `${t("login.userRequired")}` }]}
        >
          <Input
            style={credentials ? { borderColor: "red" } : {}}
            placeholder={t("common.user")!}
            size="large"
            className="login-input"
            onChange={() => {
              if (credentials) {
                setCredentials("");
              }
            }}
          />
        </Item>

        <Item
          name="password"
          rules={[{ required: true, message: `${t("login.passRequired")}` }]}
        >
          <Password
            style={credentials ? { borderColor: "red" } : {}}
            placeholder={t("common.password")!}
            size="large"
            className="login-input"
            onChange={() => {
              if (credentials) {
                setCredentials("");
              }
            }}
          />
        </Item>

        {credentials && (
          <Row justify="center" className="login-error">
            <span style={{ color: "red" }}>{credentials}</span>
          </Row>
        )}

        <Item {...tailLayout}>
          <Btn
            text={t("login.recoverPass")}
            onClick={() => navigate("/forgot-password")}
            type="text"
            className="button-text-white"
          />
        </Item>
        <Item {...tailLayout}>
          <Btn
            text={t("login.signIn")}
            htmlType="submit"
            className="button-login"
            size={SizesButton.LARGE}
            loading={isLoading}
          />
        </Item>
      </Form>
    </div>
  );
}
