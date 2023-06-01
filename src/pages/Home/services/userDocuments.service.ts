import axios from "../../../interceptors/axiosInterceptor";

export const getUserDocuments = async () => {
    return await axios
      .get('solicitud')
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