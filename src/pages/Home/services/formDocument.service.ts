import axios from "../../../interceptors/axiosInterceptor";

export const uploadPDF = async (formData: any) => {
    return await axios
      .post('solicitud/document', formData)
      .then((res) => res)
      .catch((error) => {
        throw new Error(error);
      });
  };