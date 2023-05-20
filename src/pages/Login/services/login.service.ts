import axios from "../../../interceptors/axiosInterceptor";
import { LoginUser } from "../models";

export const login = async (user: LoginUser) => {
  const { correo, password } = user;

  return await axios
    .post("authenticate/login", user)
    .then((res) => res)
    .catch((error) => {
      throw new Error(error);
    });
};

export const register = async (user: any) => {

  return await axios
    .post("authenticate/register", user)
    .then((res) => res)
    .catch((error) => {
      throw new Error(error);
    });
};
