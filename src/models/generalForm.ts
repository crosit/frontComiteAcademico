export type GeneralForm = {
  form: any;
  formFields: any;
  apiURL: string;
  moduleName: string;
  miscsPath: string | null;
  urlReturn: string;
  dateValues: any;
};

export type StoreData = {
  data: any;
  apiURL: string;
};

export type UpdateData = {
  data: any;
  apiURL: string;
};

export type FetchDataById = {
  apiURL: string;
  dataId?: number;
  paramId?: number;
}


