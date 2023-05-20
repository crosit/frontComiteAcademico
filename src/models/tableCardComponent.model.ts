import { DefaultTFuncReturn } from "i18next";
import { FilterObjType, Options, searchInput } from "./tableComponent.model";

export type Props = {
  title: string;
  columns: any;
  Card: Function;
  data?: any;
  apiURL: string;
  appURL: string;
  hasCreate: boolean;
  textCreate?: string | DefaultTFuncReturn;
  hasDelete: boolean;
  hasEdit: boolean;
  searchInputs: searchInput[];
  hasExtra: any[];
  filters: FilterObjType[];
  filtersDefaultValues: any;
  extraOptions: Options[];
};
