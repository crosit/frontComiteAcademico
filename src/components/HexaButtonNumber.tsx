import React from "react";

type Props = {
  icon: React.ReactNode;
  onClick?: (data: any) => void;
  disabled?: boolean;
  color?: "primary" | "secondary" | "warning" | "danger" | "success" | "info";
  dataNumber?: number;
};

const HexaButtonNumber = (props: Props) => {
  return (
    <div className="hexContainer" onClick={props.onClick}>
      <div className="hex border">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M27,7 
             L72,7  Q76,7 78,11 
             L95,46 Q97,50 95,54 
             L78,91 Q76,95 72,95
             L28,95 Q24,95 22,91
             L5,54  Q3,50 5,46
             L22,11 Q24,7 28,7z"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className="spanHex">
          {props.dataNumber} {props.icon}
        </span>
      </div>
    </div>
  );
};

export default HexaButtonNumber;
