import { useTranslation } from "react-i18next";

const AppFooter = () => {
  const { t } = useTranslation();

  return (
    <div>
      <b>Sabeeo</b> {t('common.footerSabeeo')} <b>KINCE IT 🐝</b>
    </div>
  );
};

export default AppFooter;
