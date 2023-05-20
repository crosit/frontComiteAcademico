import { EditOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { useTranslation } from "react-i18next";
import Profile from "/src/assets/profile.png";

type Props = {
  photo: string;
};

export default function ImageProfile({ photo }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <div className="mask">
        <span>
          <EditOutlined /> <br />
          {t("common.changeImage").split(" ", 1)} <br />{" "}
          {t("common.changeImage").split(" ", 2)[1]}
        </span>
      </div>
      <Image
        className="image-profile"
        src={photo || "/src/assets/user.png"}
        preview={false}
      />
    </>
  );
}
