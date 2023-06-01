import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { notification } from "antd";

import axios from "../interceptors/axiosInterceptor";
import moment from "moment";
import { GeneralForm, StoreData, UpdateData } from "../models/generalForm";
import { setErrors } from "../utilities/form";
import { useMutation, useQuery } from "react-query";
import {
  fetchDataByIdForm,
  fetchMiscsForm,
  storeDataForm,
  updateDataForm,
} from "../services/generalForms.service";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const useGeneralForm = ({
  form,
  formFields,
  apiURL,
  moduleName = "",
  miscsPath = null,
  urlReturn = "",
  dateValues = [],
  labelArray = [],
  post = false,
  postURL = null,
}: any) => {
  const [formData, setFormData] = useState({});
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataId, setDataId] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);

  const { id: paramId } = useParams();

  const navigate = useNavigate();

  const storeData: any = useMutation(
    (data: StoreData) => storeDataForm(data, apiURL, postURL),
    {
      onSuccess: (res) => {
        setFormData(res.data);
        setDataId(res.data.id);
        notification.success({
          message: moduleName,
          placement: "top",
          description: `${moduleName} ${
            dataId ? "actualizado" : "registrado"
          } con éxito`,
          style: {
            borderRadius: "10px",
            fontWeight: "bold",
            // border: "2px solid #52C41A",
          },
          icon: <CheckCircleOutlined style={{ color: "#52C41A" }} />,
        });
      },
      onError: (error: any) => {
        notification.error({
          style: {
            borderRadius: "10px",
            fontWeight: "bold",
          },
          icon: <CloseCircleOutlined style={{ color: "#FF4D4F" }} />,
          message: moduleName,
          placement: "top",
          description: `${moduleName} ${
            dataId ? "actualizado" : "registrado"
          } erroneo`,
        });
        setError(true);
        if (error.response.status === 422) {
          setErrors({
            form,
            fields: [formFields],
            errors: error.response.data.data.errors,
          });
        }
      },
    }
  );

  const updateData: any = useMutation(
    (data: UpdateData) => updateDataForm(data, apiURL, dataId, paramId),
    {
      onSuccess: (res: any) => {
        setFormData(res.data);
        notification.success({
          style: {
            background: "#ffe7a6",
            borderRadius: "10px",
            fontWeight: "bold",
            // border: "2px solid #52C41A",
          },
          icon: <CheckCircleOutlined style={{ color: "#52C41A" }} />,
          message: moduleName,
          placement: "top",
          description: `${moduleName} ${
            dataId ? "actualizado" : "registrado"
          } con éxito`,
        });
      },
      onError: (error: any) => {
        notification.error({
          style: {
            background: "#ffe7a6",
            borderRadius: "10px",
            fontWeight: "bold",
          },
          icon: <CloseCircleOutlined style={{ color: "#FF4D4F" }} />,
          message: moduleName,
          placement: "top",
          description: `${moduleName} ${
            dataId ? "actualizado" : "registrado"
          } erroneo`,
        });
        setError(true);
        if (error.response.status === 422) {
          setErrors({
            form,
            fields: [formFields],
            errors: error.response.data.data.errors,
          });
        }
      },
    }
  );

  const [data, setData] = useState<any>([]);

  const dataById = useQuery(
    "fetchDataById",
    () => fetchDataByIdForm(apiURL, dataId, paramId),
    {
      onSuccess: (res: any) => {
        if (!res) {
          return;
        }
        if (dateValues.length > 0) {
          dateValues.map((item: any) => {
            if (res.data.hasOwnProperty(item)) {
              if (res.data[item] !== null) {
                const date = new Date(
                  `${res.data[item].slice(0, 10)} 12:00:00`
                );
                res.data[item] = moment(date);
              }
            }
          });
          setFormData(res);
          form.setFieldsValue(res);
        } else {
          const resCustom = res.data || res;
          setData(resCustom);

          labelArray.map((item: any) => {
            resCustom[item.array].forEach((element: any, index: number) => {
              resCustom[item.array][index] = resCustom[item.array][index].id;
            });
          });

          setFormData(resCustom);
          form.setFieldsValue(resCustom);
        }
      },
      onError: (error: any) => {
        if (error.response.status === 422) {
          setErrors({
            form,
            fields: formFields,
            errors: error.response.data.data.errors,
          });
        }
      },
    }
  );

  let miscs: any = useQuery(
    "fetchMiscs" + apiURL,
    () => fetchMiscsForm(apiURL, miscsPath),
    {}
  );

  const handleSubmit = async (data: any) => {
    if (dataId && post === false) {
      await updateData.mutate(data, apiURL);
    } else {
      await storeData.mutate(data, apiURL);
    }
  };

  useEffect(() => {
    if (!storeData.isLoading && !updateData.isLoading) {
      setPosting(false);
    } else {
      setPosting(true);
    }
  }, [storeData.isLoading, updateData.isLoading]);

  useEffect(() => {
    if (storeData?.data?.succes === true || updateData?.data?.succes === true || storeData?.data?.success === true || updateData?.data?.success === true) {
      setTimeout(() => {
        navigate(urlReturn);
      }, 500);
    }
  }, [storeData.isSuccess, updateData.isSuccess]);

  useEffect(() => {
    if (error) {
      setPosting(false);
    }
  }, [error]);

  useEffect(() => {
    form.setFields([formFields]);
    if (paramId) {
      setDataId(paramId);
      dataById.refetch();
    }
  }, []);

  useEffect(() => {
    if (dataId || paramId) {
      if (!dataById.isLoading && !miscs.isLoading) {
        setLoading(false);
      }
      return;
    }
    if (!miscs.isLoading) {
      setLoading(false);
    }
  }, [dataById.isLoading, miscs.isLoading]);

  return {
    loading,
    isEditing: dataId,
    handleSubmit,
    posting,
    miscs,
    formData,
    data,
    setLoading
  };
};

export default useGeneralForm;
