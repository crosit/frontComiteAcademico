import { useTranslation } from "react-i18next";

type Props = {};

export default function ContentModalCloseSession({}: Props) {
  const { t } = useTranslation();
  return (
    <div>
      <span>{t('common.closeSesionModal')}</span>
    </div>
  );
}
