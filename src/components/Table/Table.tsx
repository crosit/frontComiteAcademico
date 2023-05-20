import {
  CaretDownOutlined,
  CaretUpOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  FolderOpenOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import HexaIconButton from "../HexaIconButton";

type Props = {
  columns: any;
  data: any;
  hasDelete?: boolean;
  hasEdit?: boolean;
  options?: any[];
  apiURL?: string;
  appURL?: string;
  setToggleReload?: any;
  pagination?: boolean;
  infoPagination?: any;
};

function Table(props: Props) {
  const {
    columns,
    data = [],
    pagination = false,
    infoPagination = {
      perPage: 10,
      page: 1,
    },
  } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  }: any = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    if (infoPagination) {
      if (infoPagination.perPage !== pageSize)
        setPageSize(infoPagination.perPage);
    }
  }, [infoPagination]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="tableContainer">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <HexaIconButton
                              color={"primary"}
                              icon={<CaretUpOutlined />}
                              size={"tiny"}
                            />
                          ) : (
                            <HexaIconButton
                              color={"primary"}
                              icon={<CaretDownOutlined />}
                              size={"tiny"}
                            />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: any, i: any) => {
              prepareRow(row);
              // console.log(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
            {!page.length && (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    textAlign: "center",
                    fontWeight: 600,
                    verticalAlign: "middle",
                  }}
                >
                  <FolderOpenOutlined style={{ fontSize: "1.5rem" }} /> No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* 
          Pagination 
        */}
        {pagination ? (
          <div className="pagination">
            <HexaIconButton
              icon={<DoubleLeftOutlined />}
              className="hexPagination"
              size={"tiny"}
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            />
            <HexaIconButton
              icon={<LeftOutlined />}
              className="hexPagination"
              size={"tiny"}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            />
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <HexaIconButton
              icon={<RightOutlined />}
              className="hexPagination"
              size={"tiny"}
              onClick={() => nextPage()}
              disabled={!canNextPage || !(isNaN(pageOptions.length))}
            />
            <HexaIconButton
              icon={<DoubleRightOutlined />}
              className="hexPagination"
              size={"tiny"}
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage || !(isNaN(pageOptions.length))}
            />
            <div className="custom-select">
              <select
                className="size"
                title="pageSize"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Table;
