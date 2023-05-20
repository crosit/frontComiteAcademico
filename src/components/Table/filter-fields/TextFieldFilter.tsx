import { Form, Grid, Input } from "antd";
import React from "react";

type Props = {
  field: any;
  form: any;
};

const TextFieldFilter = ({field, form}: Props) => {
  const { useBreakpoint } = Grid;
  const { sm, md } = useBreakpoint();
  return (
    <Form.Item
      name={field?.name}
      style={{ width: "150px", marginBottom: !sm ? "10px" : "" }}
    >
      <Input
        size="large"
        className="input-border-primary"
        placeholder={field.placeholder}
      />
    </Form.Item>
  );
};

export default TextFieldFilter;
