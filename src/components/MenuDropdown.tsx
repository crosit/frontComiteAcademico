import { AccountBookOutlined, MenuOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import HexaIconButton from "./HexaIconButton";

type Props = {
  options: Option[];
  iconMenu?: any;
  toolTip?: string;
  className?: string;
};

interface Option {
  name: string;
  icon: any;
  toolTip: string;
  path: string;
}

const MenuDropdown = ({ options, iconMenu, toolTip, className }: Props) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const wrapperRef:any = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className={"menu-container" + className } ref={wrapperRef}>
      <nav className="navMenu">
        <ul className="menu">
          <li
            onClick={() => setOpen(!open)}
            className={`li dropdown dropdown-5 ${open ? "click" : ""} `}
          >
            <HexaIconButton
              className="hexaMenuIconasdasd"
              color={open ? "warning-secondary" : "primary"}
              icon={iconMenu ? iconMenu : <MenuOutlined />}
              placement={"left"}
              toolTip={toolTip}
            />
            <ul className="dropdown_menu dropdown_menu-5">
              {options.map((option, index) => (
                <li key={index} className={`li dropdown_item-${index + 1}`}>
                  <HexaIconButton
                    toolTip={option.toolTip}
                    placement={"left"}
                    onClick={() => {
                      navigate(option.path)
                    }}
                    icon={option.icon}
                  />
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuDropdown;
