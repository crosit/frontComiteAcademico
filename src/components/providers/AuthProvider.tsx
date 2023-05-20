import { useLocation, useNavigate } from "react-router-dom";
import Login from "../../pages/Login/Login";
import * as history from "history";
import { App, Form } from "antd";
import { AppLayout } from "../../layouts";
import { useEffect } from "react";

type Props = {
  children: any;
};



export default function AuthProvider({ children }: Props) {

  // const [form] = Form.useForm();


  // const location = useLocation();

  // useEffect(() => {
  //   form.resetFields();
  // }, [location]);

  const token = localStorage.getItem("sabeeoToken");
  const historyWeb = history.createBrowserHistory();
  const navigate = useNavigate();
  // console.log(children)

  //Si no esta logeado y trata de ingresar a una vista que no necesita auth
  if (!token && children?.type?.auth === false) {
    return children;
  }

  //Si no se ha logeado, lo redirige a Login
  if (!token) {
    // console.log("Logeate");
    return <Login />;
    // historyWeb.push('login')
    // window.location.reload()
  }

  //Si está logeado y quiere ir a login, recuperar contraseña, etc. (vistas que solo puede acceder sin iniciar sesión 'auth=false')
  if (token && children?.type?.auth === false) {
    // console.log(children)
    setTimeout(() => {
      historyWeb.push("/");
      window.location.reload();
    }, 1000);
    return <App />;
  }

  return <AppLayout>{children}</AppLayout>;
}
