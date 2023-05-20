import { useTranslation } from "react-i18next";
import { Btn } from "../components";
import * as history from "history";

type Props = {
  handleClose: () => void;
};

export default function useCloseSession({ handleClose }: Props) {
  const handleSubmit = () => {
    localStorage.removeItem("sabeeoToken");
    localStorage.removeItem("user");
    handleClose();
    const historyWeb = history.createBrowserHistory();
    historyWeb.push("login");
    window.location.reload();
  };

  const { t } = useTranslation();

  const footer = () => (
    <>
      <Btn
        text={t("common.cancel")}
        className="button-plain-border-main"
        onClick={handleClose}
      />
      <Btn
        text={t("common.closeSesion")}
        className="button-plain-bgColor-main"
        onClick={handleSubmit}
      />
    </>
  );

  return {
    footer,
  };
}
