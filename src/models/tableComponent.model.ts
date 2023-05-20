import { DefaultTFuncReturn } from "i18next";
import { ReactElement } from "react";

export type searchInput = {
  name: string;
  placeholder: string;
  searchKeys: string;
};

export type Props = {
  title: string;
  columns: any;
  data?: any;
  apiURL: string;
  appURL: string;
  hasCreate: boolean;
  textCreate?: DefaultTFuncReturn | string;
  hasDelete: boolean;
  hasEdit: boolean;
  searchInputs: searchInput[];
  hasExtra: any[];
  filters: FilterObjType[] | FilterObjTypeMisc[];
  filtersDefaultValues: any;
  extraOptions: Options[];
};

export type FilterObjType = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  miscsPath?: string;
  valueFieldEndpoint?: string;
  titleFieldEndpoint?: string;
  data?: any;
};

export type FilterObjTypeMisc = {
  miscsUrl: string;
  filters: FilterObjType[];
  extraFilters?: FilterObjType[];
};

export type Options = {
  title: string;
  action: string;
  icon: ReactElement;
  disabled?: boolean | any;
  visible?: boolean | any;
  onClick: null | any;
};

export type FilterFieldsI = {
  field: FilterObjType;
  form: any;
};
