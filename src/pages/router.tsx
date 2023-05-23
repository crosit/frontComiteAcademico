import { createBrowserRouter } from "react-router-dom";
import AuthProvider from "../components/providers/AuthProvider";
import Error from "./Errors/Error";
import { App } from "./Home";
import Login from "./Login/Login";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import RecoverPassword from "./RecoverPassword/RecoverPassword";
import { Error403 } from "./Errors/Error403";
import FormDocuments from "./Home/components/FormDocuments";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <AuthProvider>
        <App />
      // </AuthProvider>
    ),
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: (
      <AuthProvider>
        <Login />
      </AuthProvider>
    ),
    errorElement: <Error />,
  },
  {
    path: "/create",
    element: (
      // <AuthProvider>
        <FormDocuments />
      // </AuthProvider>
    ),
    errorElement: <Error />,
  },
  {
    path: "/forgot-password",
    element: (
      <AuthProvider>
        <ForgotPassword />
      </AuthProvider>
    ),
    errorElement: <Error />,
  },
  {
    path: "/recover-password/:token",
    element: (
      <AuthProvider>
        <RecoverPassword />
      </AuthProvider>
    ),
    errorElement: <Error />,
  },
  {
    path: "/error403",
    element: <Error403 />,
    errorElement: <Error />,
  },
]);
