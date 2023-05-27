import { useTranslation } from "react-i18next";

const AppFooter = () => {
  const { t } = useTranslation();

  return (
    <div>
      Powered by  <b>Chris 🎮</b>
    </div>
  );
};

export default AppFooter;
