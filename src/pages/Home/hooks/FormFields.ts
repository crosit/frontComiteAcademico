export const initFields = [
  { name: ["name"], value: null, errors: [] },
  { name: ["description"], value: null, errors: [] },
  { name: ["type"], value: null, errors: [] },
  { name: ["companyId"], value: null, errors: [] },
  { name: ["check"], value: null, errors: [] },
];

export const getFieldsMetadata = ({ t }: any) => {
  return {
    name: {
      label: 'Nombre del Documento',
      name: "nombreDocumento",
      placeholder: 'Nombre del Documento',
      rules: [
        {
          required: true,
          message: t("forms.required"),
        },
      ],
    },
    description: {
      label: 'Descripcion',
      name: "descripcion",
      placeholder: 'Descripcion',
      rules: [
        {
          required: true,
          message: t("forms.required"),
        },
      ],
    },
    type: {
      label: t("documents.table.type"),
      name: "type",
      placeholder: t("documents.table.type"),
      rules: [
        {
          required: true,
          message: t("forms.required"),
        },
      ],
    },
    company: {
      label: t("documents.table.company"),
      name: "company",
      placeholder: t("documents.table.company"),
      rules: [
        {
          required: true,
          message: t("forms.required"),
        },
      ],
    },
    department: {
      label: t("documents.table.department"),
      name: "department",
      placeholder: t("documents.table.department"),
      rules: [
        {
          required: true,
          message: t("forms.required"),
        },
      ],
    },
    position: {
      label: t("documents.table.position"),
      name: "position",
      placeholder: t("documents.table.position"),
      rules: [
        {
          required: true,
          message: t("forms.required"),
        },
      ],
    },
    pdf: {
      label: 'PDF',
      name: "url",
      placeholder: 'PDF',
      rules: [
        {
          required: true,
          message: t("forms.required"),
        },
      ],
    },
    keywords: {
      label: t("documents.keywords"),
      name: "keywords",
      placeholder: t("documents.keywords"),
      rules: [
      
      ],
    },
  };
};
