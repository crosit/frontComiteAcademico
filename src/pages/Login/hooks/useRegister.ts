import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../models";
import { login, register } from "../services/login.service";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { notification } from "antd";

type Props = {};

export default function useRegister({ formik }: any) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch()

  const mutation = useMutation((user: LoginUser) => register(user), {
    onSuccess: async (data: any) => {
      notification.success({
        message: 'Usuario registrado correctamente',
        style: {
          borderRadius: "10px",
          fontWeight: "bold",
        },
      })
    },
  });

  const onSubmit = (dataUser: LoginUser, formik:any) => {
    mutation.mutate(dataUser);
    // console.log(mutation.isError)
  };

  useEffect(() => {
    if(mutation.isSuccess)
    formik.resetForm()
  

  }, [mutation.isSuccess])
  

  const onSubmitFailed = (error: any) => {
    console.log(error);
  };

  return {
    onSubmit,
    onSubmitFailed,
    isLoading: mutation.isLoading,
  };
}
