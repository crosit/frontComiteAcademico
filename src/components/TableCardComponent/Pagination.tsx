import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import HexaIconButton from "../HexaIconButton";

type Props = {
  pagination: any;
  setPagination: any;
  total: number;
};

const Pagination = (props: Props) => {
  const { pagination, setPagination, total } = props;
  const { t } = useTranslation();
  return (
    <div
      className="pagination"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <HexaIconButton
        icon={<DoubleLeftOutlined />}
        className="hexPagination"
        size={"tiny"}
        onClick={() => setPagination({ ...pagination, page: 1 })}
        disabled={pagination.page === 1}
      />
      <HexaIconButton
        icon={<LeftOutlined />}
        className="hexPagination"
        size={"tiny"}
        onClick={() =>
          setPagination({ ...pagination, page: pagination.page - 1 })
        }
        disabled={pagination.page === 1}
      />
      <span>
        {t("table.page")}{" "}
        <strong>
          {pagination.page} {" " + t("table.of") + " "}{" "}
          {isNaN(Math.ceil(total / pagination.perPage)) ? 1 : Math.ceil(total / pagination.perPage)}
        </strong>{" "}
      </span>
      <HexaIconButton
        icon={<RightOutlined />}
        className="hexPagination"
        size={"tiny"}
        onClick={() =>
          setPagination({ ...pagination, page: pagination.page + 1 })
        }
        disabled={pagination.page === Math.ceil(total / pagination.perPage) || isNaN(Math.ceil(total / pagination.perPage))}
      />
      <HexaIconButton
        icon={<DoubleRightOutlined />}
        className="hexPagination"
        size={"tiny"}
        onClick={() =>
          setPagination({
            ...pagination,
            page: Math.ceil(total / pagination.perPage),
          })
        }
        disabled={pagination.page === Math.ceil(total / pagination.perPage) || isNaN(Math.ceil(total / pagination.perPage))}
      />
      <div className="custom-select">
        <select
          className="size"
          title="perPage"
          value={pagination.perPage}
          onChange={(e) =>
            setPagination({
              ...pagination,
              perPage: Number(e.target.value),
              page: 1,
            })
          }
        >
          {[10, 20, 30, 40, 50].map((perPage) => (
            <option key={perPage} value={perPage}>
              Show {perPage}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
