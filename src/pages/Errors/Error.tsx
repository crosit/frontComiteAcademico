import { useRouteError } from "react-router-dom";
import { Error404 } from "./Error404";
import { Error403 } from "./Error403";

type Props = {};

const Error = ({}: Props) => {
  const error: any = useRouteError();

  if (error.status === 404) return <Error404 />;
  if (error.status === 403) return <Error403 />;

  return null;
};

export default Error;
