import { Form, Grid, Input, InputNumber } from "antd";
import React from "react";
import AutocompleteField from "./AutocompleteField";

type Props = {
  field: any;
  form: any;
};

const SelectFieldFilter = ({ field, form }: Props) => {
  const { useBreakpoint } = Grid;
  const { sm, md } = useBreakpoint();
  return (
    <Form.Item
      name={field.nameToVariable || field.name}
      style={{ width: "200px", marginBottom: "10px" }}
      valuePropName="value"
    >
      <AutocompleteField
        miscsPath={field.miscsPath}
        placeholder={field.placeholder}
        label={field.label}
        valueFieldEndpoint={field.valueFieldEndpoint}
        titleFieldEndpoint={field.titleFieldEndpoint}
        data={field.data}
        onChange={() => {
          const debounceTerm = setTimeout(() => {
            form.submit();
          }, 1000);

          return () => {
            clearTimeout(debounceTerm);
          };
        }}
      />
    </Form.Item>
  );
};

export default SelectFieldFilter;
