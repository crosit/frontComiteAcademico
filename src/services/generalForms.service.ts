import axios from "../interceptors/axiosInterceptor";
import { FetchDataById, StoreData, UpdateData } from "../models/generalForm";

export const storeDataForm = async (data: any, apiURL:string, postURL: string) => {
  return await axios
    .post(postURL || apiURL, data)
    .then((res) => res)
    .catch((error) => {
      throw new Error(error);
    });
};

export const updateDataForm = async (data:any, apiURL:string, dataId?:number, paramId?: string | undefined) => {
  return await axios
    .patch(`${apiURL}/${dataId || paramId}`, data)
    .then((res) => res)
    .catch((error) => {
      throw new Error(error);
    });
};

export const fetchDataByIdForm = async (
  apiURL: string,
  dataId: number,
  paramId: string | undefined
) => {
  if (!dataId && !paramId) {
    return;
  }
  return await axios
    .get(`${apiURL}/${dataId || paramId}`)
    .then((res) => res)
    .catch((error) => {
      throw new Error(error);
    });
};

export const fetchMiscsForm = async (
  apiURL: string,
  miscsPath: string | null
) => {
  if (!miscsPath) {
    return;
  }
  if (miscsPath.charAt(0) === "/") {
    return await axios
      .get(miscsPath)
      .then((res) => res.data.result || res.data)
      .catch((error) => {
        throw new Error(error);
      });
  }
  return await axios
    .get(`${apiURL}/${miscsPath}`)
    .then((res) => res.data.result || res.data)
    .catch((error) => {
      throw new Error(error);
    });
};
