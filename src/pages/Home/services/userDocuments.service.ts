import axios from "../../../interceptors/axiosInterceptor";

export const getUserDocuments = async () => {
    return await axios
      .get('regulations/user?page=1&perPage=99999')
      .then((res) => res)
      .catch((error) => {
        throw new Error(error);
      });
  };

export const confirmUserDocument = async (id: number) => {
    return await axios
      .patch(`confirmed_user/confirm/version/${id}`)
      .then((res) => res)
      .catch((error) => {
        throw new Error(error);
      });
  }