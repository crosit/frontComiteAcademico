import React, { useState } from "react";
import { useMutation } from "react-query";
import { uploadPDF } from "../services/formDocument.service";

type Props = {};

type UploadData = {
  file: any;
  module?: string
};

const useFormDocument = () => {

  const [fileData, setFileData] = useState<any>(null);

  const uploadData = useMutation((data:any) => uploadPDF(data), {
    onSuccess: (res) => {
      setFileData(res.data);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const handleUpload = (data: any) => {
    uploadData.mutate(data);
    return fileData;
  };


  return {
    handleUpload,
    fileData,
  };
};

export default useFormDocument;
