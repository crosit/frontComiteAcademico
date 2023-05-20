import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Typography } from "antd";
import { useSelector } from "react-redux";
import useTable from "../../hooks/useTable";
import { Props } from "../../models/tableComponent.model";
import { RootState } from "../../redux/store";
import Btn from "../Btn";
import Loader from "../Loader";
import Pagination from "../TableCardComponent/Pagination";
import HeaderActions from "./HeaderActions";
import Table from "./Table";

function TableComponent(props: Props) {
  const {
    title,
    columns,
    data,
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

  const {
    rows,
    options,
    loading,
    pagination,
    setPagination,
    total,
    setToggleReload,
    columns_,

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

  console.log("dataRows", rows);

  return (
    <div>
      <Typography.Title level={1}>{title}</Typography.Title>

      <HeaderActions
        apiURL={apiURL}
        appURL={appURL}
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
        <div className="table">
          <Table
            columns={columns_}
            data={rows}
            setToggleReload={setToggleReload}
            infoPagination={pagination}
          />
          <Pagination
            pagination={pagination}
            setPagination={setPagination}
            total={total}
          />
        </div>
      )}
    </div>
  );
}

export default TableComponent;
