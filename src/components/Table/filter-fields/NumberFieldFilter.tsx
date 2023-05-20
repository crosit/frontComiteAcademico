import { Form, Grid, Input, InputNumber } from "antd";
import React from "react";

type Props = {
  field: any;
  form: any;
};

const NumberFieldFilter = ({ field, form }: Props) => {
  const { useBreakpoint } = Grid;
  const { sm, md } = useBreakpoint();
  return (
    <Form.Item name={field.name} style={{ width: "150px" }}>
      <InputNumber
        className="input-border-primary"
        style={{ width: "150px" }}
        size="large"
        placeholder={field.placeholder}
        onChange={() => {
          const debounceTerm = setTimeout(() => {
            form.submit();
          }, 1000);

          return () => {
            clearTimeout(debounceTerm);
          };
        }}
      ></InputNumber>
    </Form.Item>
  );
};

export default NumberFieldFilter;
