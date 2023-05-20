import { AutoComplete, Select } from "antd";
import { Fragment, useEffect, useState } from "react";
import axiosClient from "../../../interceptors/axiosInterceptor";

interface MiscsType {
  value: number;
  label: string;
}

interface Props {
  value?: any;
  onChange: (value: any) => void;
  miscsPath: string | undefined;
  placeholder: string;
  label: string;
  valueFieldEndpoint?: string;
  titleFieldEndpoint?: string;
  data?: any;
}

const AutocompleteField = (props: Props) => {
  const {
    value,
    onChange,
    miscsPath = undefined,
    placeholder = "Selecciona una opción",
    label = "Selecciona una opción",
    valueFieldEndpoint = "id",
    titleFieldEndpoint = "name",
    data,
  } = props;

  // ** States
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<MiscsType[]>([]);

  const loading = options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    const fetchData = async () => {
      if (miscsPath !== undefined) {
        const response = await axiosClient.get(miscsPath || "");
        const arrMiscs = response.data.length
          ? response.data
          : response.data.data || response.data.result;

        if (active) {
          const arrData = arrMiscs.map((miscs: any) => ({
            value: miscs[valueFieldEndpoint],
            label: miscs[titleFieldEndpoint],
          }));
          setOptions(arrData);
        }
      } else if (data) {
        setOptions(data);
      }
    };
    fetchData();

    return () => {
      active = false;
    };
  }, [data]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    //El siguiente if se puso porque las options no se seteaban con dta en la función de fetchData()
    if (data)
      setOptions(data)
  }, [options]);

  const handleChange = (data: any) => {
    if (data === null) onChange({ value: "", label: "" });
    else onChange(data);
  };

  return (
    <Select
      status="warning"
      showSearch
      size="large"
      allowClear
      style={{ color: "#232323" }}
      placeholder={placeholder}
      options={options}
      loading={loading}
      onSelect={onChange}
      onClear={()=>onChange('')}
      filterOption={(input, option) => (option?.label ?? "").includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
      }
    />
  );
};

export default AutocompleteField;
