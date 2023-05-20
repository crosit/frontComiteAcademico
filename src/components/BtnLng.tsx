import i18next from "../utilities/multi-lng/i18n.utility";
import { useTranslation } from "react-i18next";
import { MX, US } from "country-flag-icons/react/3x2";
import "../styles/main.scss";
import { Btn } from ".";
import { SizesButton } from "../models";
import { isSpanish } from "../utilities";

interface Props {
  className?: string;
}

export const BtnLng = ({ className = "button-lng-black" }: Props) => {
  const { t } = useTranslation();

  return (
    // <button onClick={() => i18next.changeLanguage('en')}>
    <Btn
      text={t("common.btn-change-lng")}
      startIcon={
        isSpanish() ? (
          <MX title="México" className="flags" />
        ) : (
          <US title="United States" className="flags" />
        )
      }
      className={className}
      onClick={() => {
        isSpanish()
          ? i18next.changeLanguage("en")
          : i18next.changeLanguage("es");
      }}
      size={SizesButton.SMALL}
    />
  );
};
