import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setQueryParamas, setRows, setSearcherParams } from "../redux/app";
import { AppDispatch, RootState } from "../redux/store";
import { Options } from "../models/tableComponent.model";
import { useQuery } from "react-query";
import { fetchRows } from "../services/tableComponent.service";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import MenuActionsTable from "../components/Table/MenuActionsTable";
import { useTranslation } from "react-i18next";

export default function useTable({
  apiURL = "",
  appURL = "",
  hasEdit = false,
  hasDelete = false,
  extraOptions = [],
  filters = [],
  columns = [],
}: any) {
  const dispatch = useDispatch<AppDispatch>();
  const reloadTable = useSelector((state: RootState) => state.app.reloadTable);
  const queryParams = useSelector((state: RootState) => state.app.params);
  const searcherParamas = useSelector(
    (state: RootState) => state.app.searcherParams
  );

  const [total, setTotal] = useState(0);
  const [term, setTerm] = useState(null);
  const [toggleReload, setToggleReload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState<Options[]>([]);
  const [filtersDefaultValues, setFiltersDefaultValues] = useState<any>();
  const [rowsSave, setRowsSave] = useState<any>([]);
  const [ready, setReady] = useState(false);
  const [pagination, setPagination] = useState({
    perPage: 10,
    page: 1,
    // orderBy: "id",
    // desc: 0,
    // term: "",
  });

  const handleTermChange = async ($event: any) => {
    setTerm($event.target.value);
  };

  let rows: any = useQuery(
    "fetchRows" + apiURL,
    () =>
      fetchRows(apiURL, {
        params: { ...pagination, term, ...queryParams, ...searcherParamas },
      }),
    {
      onSuccess(data: any) {
        setTotal(data?.data?.total || data?.total);
        dispatch(setRows(data.result || data.data.result || data.data));
        setRowsSave(data.result || data.data.result || data.data);
      },
      onError: async () => {
        rows = [];
        setRowsSave([]);
        setTotal(0);
      },
      enabled: false,
    }
  );

  useEffect(() => {
    setIsLoading(rows.isRefetching || rows.isLoading) ;
  }, [rows]);

  useEffect(() => {
    loadOptions();
  }, [isLoading]);

  const { t } = useTranslation();

  const loadOptions = async () => {
    setOptions([]);
    const temp_options = [];

    if (hasEdit) {
      temp_options.push({
        label: t("table.edit"),
        action: "edit",
        icon: <EditOutlined />,
        onClick: null,
      });
    }

    if (hasDelete) {
      temp_options.push({
        label: t("table.delete"),
        action: "delete",
        icon: <DeleteOutlined />,
        onClick: null,
      });
    }

    if (extraOptions.length) {
      temp_options.push(...extraOptions);
    }
    setOptions(temp_options);
  };

  const generateFiltersDefault = () => {
    let filtersDefaultValuesTemp = {};
    filters.map((filter: any) => {
      if (filter.type === "select") {
        filtersDefaultValuesTemp = {
          ...filtersDefaultValuesTemp,
          [filter.name]: "",
        };
      } else {
        filtersDefaultValuesTemp = {
          ...filtersDefaultValuesTemp,
          [filter.name]: "",
        };
      }
    });

    setFiltersDefaultValues(filtersDefaultValuesTemp);
  };

  useEffect(() => {
    if (term === null) return;
    const debounceTerm = setTimeout(() => {
      rows.refetch();
    }, 1000);

    return () => {
      clearTimeout(debounceTerm);
    };
  }, [term]);

  useEffect(() => {
    if (!ready) return;
    rows.refetch();
  }, [
    toggleReload,
    pagination,
    reloadTable,
    queryParams,
    ready,
  ]);

  useEffect(() => {
    if (!searcherParamas) {
      rows.refetch();
    }
  }, [searcherParamas]);

  useEffect(() => {
    generateFiltersDefault();
  }, []);

  useEffect(() => {
    dispatch(setQueryParamas({}));
    dispatch(setSearcherParams({}));
    setReady(true);
  }, []);

  const [columns_, setColumns_] = useState<any>([]);

  const loadColumns = async () => {
    if (options.length) {
      const find = columns.indexOf(
        columns.find((column: any) => column.Header === t("common.actions"))
      );
      if (find === -1) {
        columns.push({
          Header: t("common.actions"),
          width: 100,
          Cell: (row: any) => (
            <>
              <MenuActionsTable
                options={options}
                appURL={appURL}
                apiURL={apiURL}
                row={row}
                setToggleReload={setToggleReload}
              />
            </>
          ),
        });
      }
    }
    await setColumns_(columns);
  };

  useEffect(() => {
    loadColumns();
  }, [options]);

  useEffect(() => {
    setIsLoading(rows.isLoading);
  }, [rows.isLoading]);

  return {
    rows: rowsSave,
    options,
    loading: isLoading,
    pagination: {
      ...pagination,
    },
    setPagination,
    total,
    columns_,
    setToggleReload,
    handleTermChange,
    filtersDefaultValues,
  };
}
