import { AuthProvider } from "../../../components";
import Error from "../../Errors/Error";
import FormUsers from "../components/FormUsers";

export const UsersRoutes = [
  {
    path: "/users/form",
    element: (
      <AuthProvider>
        <FormUsers />
      </AuthProvider>
    ),
    errorElement: <Error />,
  },
];
