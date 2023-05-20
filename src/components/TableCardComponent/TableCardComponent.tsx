import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  IdcardOutlined,
  LeftOutlined,
  RightOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Typography, Grid } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import useTable from "../../hooks/useTable";
import { Props } from "../../models/tableCardComponent.model";
import { RootState } from "../../redux/store";
import ChangeViews from "../ChangeViews";
import Loader from "../Loader";
import HeaderActions from "../Table/HeaderActions";
import Table from "../Table/Table";
import Pagination from "./Pagination";

const TableCardComponent = (props: Props) => {
  const {
    title,
    columns,
    Card,
    apiURL = "",
    appURL = "/",
    hasCreate = false,
    textCreate = "",
    hasDelete = false,
    hasEdit = false,
    searchInputs = [],
    hasExtra = [],
    filters = [],
    filtersDefaultValues = null,
    extraOptions = [],
  } = props;

  const [state, setState] = useState(0);

  const {
    rows,
    columns_,
    pagination,
    setPagination,
    total,
    // options,
    loading,
    // setToggleReload,

    // filtersDefaultValues
  } = useTable({
    apiURL,
    appURL,
    hasEdit,
    hasDelete,
    filters,
    extraOptions,
    columns,
  });

  const dataRows = useSelector((state: RootState) => state.app.rows);

  const { useBreakpoint } = Grid;

  const { lg, sm } = useBreakpoint();

  return (
    <div>
      <div className="headerDepartments">
        <Typography.Title level={sm ? 1 : 2}>{title}</Typography.Title>
        <ChangeViews
          state={state}
          setState={setState}
          options={[
            {
              type: "icon",
              icon: <TableOutlined />,
              toolTip: "departments.table",
            },
            {
              type: "icon",
              icon: <IdcardOutlined />,
              toolTip: "departments.card",
            },
          ]}
        />
      </div>
      <HeaderActions
        hasCreate={hasCreate}
        textCreate={textCreate}
        searchInputs={searchInputs}
        hasExtra={hasExtra}
        filters={filters}
        filtersDefaultValues={filtersDefaultValues}
      />
      {loading && columns_ !== undefined ? (
        <Loader />
      ) : (
        <div>
          <div>
            {state === 0 && (
              <div className="table">
                <Table
                  infoPagination={pagination}
                  columns={columns_}
                  data={rows}
                />
              </div>
            )}
            {state === 1 && <div>{<Card />}</div>}
          </div>
          <Pagination
            pagination={pagination}
            setPagination={setPagination}
            total={total}
          />
        </div>
      )}
    </div>
  );
};

export default TableCardComponent;
