import axios from "../interceptors/axiosInterceptor";

export const fetchRows = async (apiURL: string, params: Object) => {
  return await axios
    .get(apiURL, params)
    .then((res) => res)
    .catch((error) => {
      throw new Error(error);
    });
};

export const deleteRow = async (apiURL: string, id: Object) => {
  return await axios
    .delete(`${apiURL}/${id}`)
    .then((res) => res)
    .catch((error) => {
      throw new Error(error);
    });
};
