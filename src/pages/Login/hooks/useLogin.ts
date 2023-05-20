import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../models";
import { login } from "../services/login.service";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

type Props = {};

export default function useLogin({}: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch()

  const [credentials, setCredentials] = useState<any>("");

  const mutation = useMutation((user: LoginUser) => login(user), {
    onSuccess: async (data: any) => {
      if (data?.success) {
        localStorage.setItem("sabeeoToken", data?.data?.token);
        localStorage.setItem("user", JSON.stringify(data?.data?.user));

        navigate("/");
      }
    },
    onError: async () => {
      localStorage.removeItem("sabeeoToken");
      localStorage.removeItem("user");
      setCredentials(t("common.credentials"));
    },
  });

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { span: 24 },
  };

  const onSubmit = (dataUser: LoginUser) => {
    console.log(dataUser, 'datauser')
    mutation.mutate(dataUser);
    // console.log(mutation.isError)
  };

  const onSubmitFailed = (error: any) => {
    console.log(error);
  };

  return {
    layout,
    onSubmit,
    onSubmitFailed,
    tailLayout,
    isLoading: mutation.isLoading,
    credentials,
    setCredentials,
  };
}
