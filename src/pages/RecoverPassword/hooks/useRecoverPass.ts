import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { recover_pass } from "../services/recover_pass.service";

export default function useRecoverPass() {
  const navigate = useNavigate();

  const mutation = useMutation(
    (variables: any) => recover_pass(variables.password, variables.token),
    {
      onSuccess: async (res: any) => {
        if (res.success) {
          alert("Contraseña cambiada con éxito!");
          navigate("/login");
        }
      },
      onError: async (error) => console.log("Errorcito: " + error),
    }
  );

  const onFinish = (password: string, token: any) => {
    console.log("OnFinish");
    mutation.mutate({ password, token });
  };

  const onFinishFailed = () => {
    console.log("onFinish Failed");
  };

  return {
    onFinish,
    onFinishFailed,
    isLoading: mutation.isLoading,
  };
}
