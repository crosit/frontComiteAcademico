import { CloseCircleOutlined } from "@ant-design/icons";
import { notification } from "antd";
import axios from "axios";
import * as history from "history";

const historyWeb = history.createBrowserHistory();

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
});

service.interceptors.request.use((config) => {
  if (localStorage.getItem("sabeeoToken")) {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "sabeeoToken"
    )}`;
  }

  return config;
});

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (!error.response) return error;
    let errorMessage = "Error al realizar la petición";
    const responseMessage = error.response.data
      ? error.response.data.message
      : "Error al realizar la petición";

    if (error.response.status === 401) {
      errorMessage = responseMessage;

      // localStorage.removeItem("sabeeoToken");
      // localStorage.removeItem("user");
      // setTimeout(() => {
      //   historyWeb.push("/login");
      //   window.location.reload();
      // }, 2000);
    }

    if (error.response.status === 404) errorMessage = responseMessage;

    if (error.response.status === 422) errorMessage = responseMessage;

    if (error.response.status === 403) {
      //errorMessage = responseMessage;
      // errorMessage = 'Unauthorized'
      // localStorage.removeItem("sabeeoToken");
      // localStorage.removeItem("user");
      // setTimeout(() => {
      //   historyWeb.push("/login");
      //   window.location.reload();
      // }, 2000);
    }

    if (error.response.status === 500) errorMessage = responseMessage;

    if (error.response.status === 508) errorMessage = responseMessage;

    if (error.response.status === 400) errorMessage = responseMessage;

    //alert(errorMessage)
    notification.error({
      message: errorMessage,
      style: {
        borderRadius: "10px",
        fontWeight: "bold",
      },
      icon: <CloseCircleOutlined style={{ color: "#FF4D4F" }} />,
    });


    throw new Error(error);
  }
);

export default service;
