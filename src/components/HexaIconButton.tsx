import { Tooltip } from "antd";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  onClick?: (data: any) => void;
  disabled?: boolean;
  color?:
    | "primary"
    | "secondary"
    | "warning"
    | "warning-secondary"
    | "danger"
    | "success"
    | "info";
  htmlType?: "button" | "submit" | "reset";
  size?: "large" | "middle" | "small" | "tiny";
  icon: ReactElement;
  className?: string;
  toolTip?: string;
  placement?: "top" | "left" | "right" | "bottom";
};

function HexaIconButton({
  disabled = false,
  onClick = () => {},
  color = "primary",
  htmlType = "button",
  size = "middle",
  icon,
  className = "",
  toolTip = "",
  placement = "bottom",
}: Props) {
  const { t } = useTranslation();

  return (
    <div>
      {toolTip !== "" ? (
        <Tooltip title={t(toolTip)} placement={placement}>
          <div
            onClick={() => {
              if (!disabled) onClick({});
            }}
            className={
              disabled
                ? `HexaIconContainer--disabled HexaIconContainer--${size} HexaIconContainer ${className}`
                : `HexaIconContainer--${color} HexaIconContainer--${size} HexaIconContainer ${className}`
            }
          >
            <div
              className={`HexaIcon HexaIcon--${color}`}
              style={
                size === "large"
                  ? { fontSize: "2rem" }
                  : size === "small"
                  ? { fontSize: "1.5rem" }
                  : size === "tiny"
                  ? { fontSize: "0.8rem" }
                  : { fontSize: "1.6rem" }
              }
            >
              {icon}
            </div>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width={
                size === "large"
                  ? "80"
                  : size === "small"
                  ? "40"
                  : size === "tiny"
                  ? "30"
                  : "60"
              }
              height={
                size === "large"
                  ? "80"
                  : size === "small"
                  ? "40"
                  : size === "tiny"
                  ? "30"
                  : "60"
              }
              viewBox="0 0 173.20508075688772 200"
              className="HexaSvg"
            >
              <path
                className={`HexaPath HexaPath--${color}`}
                d="M69.28203230275508 9.999999999999998Q86.60254037844386 0 103.92304845413264 9.999999999999998L155.88457268119896 40Q173.20508075688772 50 173.20508075688772 70L173.20508075688772 130Q173.20508075688772 150 155.88457268119896 160L103.92304845413264 190Q86.60254037844386 200 69.28203230275508 190L17.320508075688775 160Q0 150 0 130L0 70Q0 50 17.320508075688775 40Z"
              ></path>
            </svg>
          </div>
        </Tooltip>
      ) : (
        <div
          onClick={() => {
            if (!disabled) onClick({});
          }}
          className={
            disabled
              ? `HexaIconContainer--disabled HexaIconContainer--${size} HexaIconContainer ${className}`
              : `HexaIconContainer--${color} HexaIconContainer--${size} HexaIconContainer ${className}`
          }
        >
          <div
            className={`HexaIcon HexaIcon--${color}`}
            style={
              size === "large"
                ? { fontSize: "2rem" }
                : size === "small"
                ? { fontSize: "1.5rem" }
                : size === "tiny"
                ? { fontSize: "0.8rem" }
                : { fontSize: "1.6rem" }
            }
          >
            {icon}
          </div>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width={
              size === "large"
                ? "80"
                : size === "small"
                ? "40"
                : size === "tiny"
                ? "30"
                : "60"
            }
            height={
              size === "large"
                ? "80"
                : size === "small"
                ? "40"
                : size === "tiny"
                ? "30"
                : "60"
            }
            viewBox="0 0 173.20508075688772 200"
            className="HexaSvg"
          >
            <path
              className={`HexaPath HexaPath--${color}`}
              d="M69.28203230275508 9.999999999999998Q86.60254037844386 0 103.92304845413264 9.999999999999998L155.88457268119896 40Q173.20508075688772 50 173.20508075688772 70L173.20508075688772 130Q173.20508075688772 150 155.88457268119896 160L103.92304845413264 190Q86.60254037844386 200 69.28203230275508 190L17.320508075688775 160Q0 150 0 130L0 70Q0 50 17.320508075688775 40Z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
}

export default HexaIconButton;
