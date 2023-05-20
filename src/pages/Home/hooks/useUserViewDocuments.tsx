import React from "react";
import { useQuery } from "react-query";
import { getUserDocuments } from "../services/userDocuments.service";

const useUserViewDocuments = () => {
  let documents:any = useQuery("userDocumnets", () => getUserDocuments(), {});

  const handleRefetch = () => {
    documents.refetch();
  };

  return {
    documents: documents?.data?.result,
    isLoading: documents?.isLoading,
    handleRefetch
  };
};

export default useUserViewDocuments;
