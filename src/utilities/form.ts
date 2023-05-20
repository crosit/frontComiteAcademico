export const setValues = ({ entity, form, fields }: any) => {
  Object.keys(entity).forEach((fieldName) => {
    const fieldIndex = fields.findIndex(
      (field: any) => field.name[0] === fieldName
    );
    if (fieldIndex > -1) {
      fields[fieldIndex].value = entity[fieldName];
    }
  });
  form.setFields(fields);
};

export const setErrors = ({ form, fields, errors }: any) => {
  const formValues = form.getFieldsValue(true);
  errors.forEach((error: any) => {
    const fieldName = Object.keys(error)[0];
    const message = Object.values(error)[0];
    const fieldIndex = fields.findIndex((field: any) => {
      const nameField = field[fieldName].name;
      return [nameField].join(".") === fieldName;
    });
    if (fieldIndex > -1) {
      fields[0][fieldName].errors = [message];
    }
  });
  console.log(fields);
  fields.forEach((field: any) => {
    if (formValues[field.name]) {
      field.value = formValues[field.name];
    }
  });
  form.setFields(fields);
};
