import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Grid,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FilterObjType } from "../../models/tableComponent.model";
import { reloadTable, setQueryParamas } from "../../redux/app";
import { AppDispatch } from "../../redux/store";
import dayjs from "dayjs";
import AutocompleteField from "./filter-fields/AutocompleteField";
import { useTranslation } from "react-i18next";
import axiosClient from "../../interceptors/axiosInterceptor";
import { FieldSelector } from "./filter-fields";

type Props = {
  filters: FilterObjType[] | any;
  filtersDefaultValues: any;
};

interface MiscsType {
  value: number;
  label: string;
}

const FiltersHeaders = (props: Props) => {
  const { filters, filtersDefaultValues } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<MiscsType[]>([]);

  const [typeFilters, setTypeFilters] = useState<boolean>(false);

  const loading = options.length === 0;

  useEffect(() => {
    if (filters[0]) {
      if (filters[0].hasOwnProperty("miscsUrl")) {
        setTypeFilters(true);
      }
    }
  }, []);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    const fetchData = async () => {
      let arrays: any = {};
      if (filters[0]?.miscsUrl) {
        const response: any = await axiosClient.get(filters[0].miscsUrl);

        if (active) {
          filters[0].filters.map((miscs: any, index: number) => {
            arrays[miscs.name] = [];
            response[miscs.name].map((item: any) => {
              arrays[miscs.name].push({
                value: item[miscs.valueFieldEndpoint],
                label: item[miscs.titleFieldEndpoint],
              });
            });
            filters[0].filters[index].data = arrays[miscs.name];
          });

          setOptions(arrays);
        }
      }
    };
    fetchData();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  // useEffect(() => {
  //   //El siguiente if se puso porque las options no se seteaban con dta en la función de fetchData()
  //   if (data) setOptions(data);
  // }, [options]);

  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const [date, setDate] = useState<any>({});

  const { useBreakpoint } = Grid;
  const { sm, md } = useBreakpoint();

  // const cleanFilters = () => {
  //   dispatch(setQueryParamas({}));
  //   dispatch(reloadTable());
  //   resetFields();
  // };

  const onSubmit = async (data: any) => {
    const keyData = await Object.keys(date);
    data[keyData[0]] = date[keyData[0]];
    if (data[keyData[0]] === "Invalid Date") {
      data[keyData[0]] = "";
    }

    let filters = {};
    const keys = Object.keys(data);
    keys.map((key) => {
      if (data[key] || data[key] === 0) {
        if (!isNaN(Number(data[key])))
          filters = { ...filters, [key]: Number(data[key]) };
        else if (!!data[key]) filters = { ...filters, [key]: data[key] };
      }
    });
    dispatch(setQueryParamas(filters));
    dispatch(reloadTable());
  };

  useEffect(() => {
    let defaultValues = {};
    filtersDefaultValues.map((filter: any) => {
      const key = Object.keys(filter)[0];
      defaultValues = {
        ...defaultValues,
        [key]: filter[key].value,
      };
    });
    form.setFieldsValue(defaultValues);
  }, []);

  const { t } = useTranslation();

  return (
    <div>
      {typeFilters ? (
        <>
          {filters[0].filters.length > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: md ? "row" : "column",
                justifyContent: sm ? "" : "center",
              }}
            >
              <Typography.Text
                style={{
                  fontWeight: 600,
                  fontSize: sm ? "1.5rem" : "1.2rem",
                  marginRight: "10px",
                  marginLeft: "10px",
                  textAlign: "center",
                }}
              >
                <FilterOutlined /> {t("table.filter")}:
              </Typography.Text>
              <div>
                <Form
                  form={form}
                  style={{
                    display: "flex",
                    justifyContent: !sm ? "center" : "",
                  }}
                  layout="inline"
                  onFinish={onSubmit}
                  onChange={() => {
                    const debounceTerm = setTimeout(() => {
                      form.submit();
                    }, 1000);

                    return () => {
                      clearTimeout(debounceTerm);
                    };
                  }}
                >
                  {filters[0].filters.map((field: any, index: number) => (
                    <FieldSelector
                      field={field}
                      form={form}
                      key={`${field.name}-${index}`}
                    />
                  ))}
                  {filters[0].extraFilters &&
                    filters[0].extraFilters.map((field: any, index: number) => (
                      <FieldSelector
                        field={field}
                        form={form}
                        key={`${field.name}-${index}`}
                      />
                    ))}
                </Form>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {filters.length > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: md ? "row" : "column",
                justifyContent: sm ? "" : "center",
              }}
            >
              <Typography.Text
                style={{
                  fontWeight: 600,
                  fontSize: sm ? "1.5rem" : "1.2rem",
                  marginRight: "10px",
                  marginLeft: "10px",
                  textAlign: "center",
                }}
              >
                <FilterOutlined /> {t("table.filter")}:
              </Typography.Text>
              <div>
                <Form
                  form={form}
                  style={{
                    display: "flex",
                    justifyContent: !sm ? "center" : "",
                  }}
                  layout="inline"
                  onFinish={onSubmit}
                  onChange={() => {
                    const debounceTerm = setTimeout(() => {
                      form.submit();
                    }, 1000);

                    return () => {
                      clearTimeout(debounceTerm);
                    };
                  }}
                >
                  {filters.map((field: any, index: number) => (
                    <FieldSelector
                      field={field}
                      form={form}
                      key={`${field.name}-${index}`}
                    />
                  ))}
                </Form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FiltersHeaders;
