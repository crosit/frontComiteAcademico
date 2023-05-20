import axios from "../interceptors/axiosInterceptor";

export const getNotifications = async (apiURL:string, params: any) => {
  return await axios
    .get(apiURL, { params })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error);
    });
};

export const markReadNotification = async (id:number|string) => {
  return await axios
    .patch(`notifications/read/${id}`)
    .then((res) => res)
    .catch((error) => {
      throw new Error(error);
    });
}

export const markAllReadNotification = async () => {
  return await axios
    .patch(`notifications/read-all`)
    .then((res) => res)
    .catch((error) => {
      throw new Error(error);
    });
}