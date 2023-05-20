import axios from "../interceptors/axiosInterceptor";

export const getProfile = async () => {
  return await axios
    .get("profile")
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error);
    });
};

export const updateProfilePhoto = async (data: any, id: any) => {
  return await axios
    .patch(`user/${id}`, data)
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error);
    });
}
