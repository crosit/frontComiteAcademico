import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Typography, Grid } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useSearcher from "../../hooks/useSearcher";
import { searchInput } from "../../models/tableComponent.model";
import FiltersHeaders from "./FiltersHeaders";
import { DefaultTFuncReturn } from "i18next";

type Props = {
  apiURL?: string;
  appURL?: string;
  hasCreate: boolean;
  textCreate?: string | DefaultTFuncReturn;
  searchInputs: searchInput[];
  hasExtra: any[];
  filters: any[];
  filtersDefaultValues: any;
};

const HeaderActions = (props: Props) => {
  const {
    hasCreate = false,
    textCreate = "",
    searchInputs = [],
    hasExtra = [],
    filters = [],
    filtersDefaultValues = null,
  } = props;

  const navigation = useNavigate();

  const { searchValues, handleInputChange, handleInputSearch } = useSearcher();

  const { t } = useTranslation();

  const { useBreakpoint } = Grid;

  const { sm } = useBreakpoint();

  return (
    <div>
      <div
        style={{
          display: sm ? "grid" : "flex",
          flexWrap: "wrap",
          flexDirection: "column-reverse",
          gridTemplateColumns: sm ? "1fr 4fr" : "1fr 1fr",
        }}
      >
        <div>
          {searchInputs.map((item, index) => {
            return (
              <div
                style={{ marginRight: "10px", minWidth: "200px" }}
                key={index}
              >
                <Input
                  id={item.name}
                  size="large"
                  className="input-primary"
                  placeholder={item.placeholder}
                  value={searchValues[item.name]}
                  onChange={(e) => handleInputChange(e, item)}
                  onKeyUp={handleInputSearch}
                />
              </div>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gridColumnStart: 4,
          }}
        >
          {hasExtra.map((item, index) => {
            return (
              <div
                style={
                  sm
                    ? {
                        marginRight: "10px",
                        marginLeft: "10px",
                      }
                    : {
                        marginRight: "10px",
                        marginBottom: 10,
                        marginLeft: "-10px",
                      }
                }
                key={index}
              >
                {item()}
              </div>
            );
          })}
          {hasCreate && (
            <Button
              className="button-plain-bgColor-main"
              style={
                sm
                  ? { fontWeight: "bold", marginLeft: "10px", paddingBottom: 5 }
                  : { fontWeight: "bold", paddingBottom: 5, marginBottom: 10 }
              }
              onClick={() => navigation("form")}
            >
              <PlusOutlined /> {textCreate || t("table.create")}
            </Button>
          )}
        </div>
      </div>
      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        <FiltersHeaders
          filters={filters}
          filtersDefaultValues={filtersDefaultValues}
        />
      </div>
    </div>
  );
};

export default HeaderActions;
