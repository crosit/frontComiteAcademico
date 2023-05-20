import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { AppDispatch, RootState } from "../redux/store";
import { reloadTable, setSearcherParams } from "../redux/app";
import { useSelector } from "react-redux";

let peticion: any = "";

export default function useSearcher() {
  const [searchValues, setSearchValues] = useState<any>({});
  const [params, setParams] = useState<any>({});
  const dispatch = useDispatch<AppDispatch>();
  const paramsSafe = useSelector(
    (state: RootState) => state.app.searcherParams
  );
  let cancelToken: any;

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    param: any
  ) => {
    setSearchValues({
      ...searchValues,
      searchKeys: param.searchKeys,
    });

    const searchParam = e.target.value;

    if (cancelToken)
      cancelToken.cancel("Fetching rows canceled due new request");
    cancelToken = Axios.CancelToken.source();
    clearTimeout(peticion);

    peticion = setTimeout(() => {
      dispatch(
        setSearcherParams({ ...searchValues, searchValue: searchParam })
      );
      dispatch(reloadTable());
    }, 300);
  };

  const handleInputSearch = async (e: any) => {
    if (e?.keyCode === 13) {
      clearTimeout(peticion);
      dispatch(setSearcherParams({ search: e.target.value }));
      dispatch(reloadTable());

      // setRows(response.data.rows)
    }
  };

  const generateParams = async () => {
    let paramsTemp = {};
    const keys = Object.keys(searchValues) as Array<keyof typeof searchValues>;
    keys.map((key) => {
      if (
        searchValues[key] !== "" &&
        searchValues[key] !== null &&
        searchValues[key] !== undefined
      ) {
        paramsTemp = { ...paramsTemp, [key]: searchValues[key] };
      }
    });
    dispatch(setSearcherParams(paramsTemp));
    setParams(paramsTemp);
  };

  useEffect(() => {
    generateParams();
  }, [searchValues]);

  useEffect(() => {
    return () => {
      dispatch(setSearcherParams({}));
    };
  }, []);

  return {
    searchValues,
    handleInputChange,
    handleInputSearch,
    params,
  };
}
