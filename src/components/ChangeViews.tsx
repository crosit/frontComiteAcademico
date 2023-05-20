import { QuestionOutlined, UserOutlined } from "@ant-design/icons";
import { Radio } from "antd";
import React, { ReactElement, useState } from "react";
import HexaIconButton from "./HexaIconButton";

type Props = {
  options: Option[];
  state: any;
  setState: any;
};

type Option = {
  type: "icon" | "text";
  icon?: ReactElement;
  text?: string;
  toolTip?: string;
};

const ChangeViews = ({ options, state: value, setState: setValue }: Props) => {
  const onClick = (e: any) => {
    if (e.hasOwnProperty("target")) {
      return setValue(e.target.value);
    }

    return setValue(e);
  };

  return (
    <div className="changeViews">
      <div style={{ display: "flex" }}>
        {options.map((option, index) => {
          if (option.type === "icon") {
            return (
              <HexaIconButton
                key={index}
                className="hexaIconSwitch"
                color={value == index ? "warning-secondary" : "primary"}
                toolTip={option.toolTip}
                icon={option.icon || <QuestionOutlined />}
                size={"tiny"}
                onClick={() => onClick(index)}
              />
            );
          }

          return (
            <button
              key={index}
              className={value == index ? "active option" : "option"}
              onClick={onClick}
              value={index}
            >
              {option.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChangeViews;
