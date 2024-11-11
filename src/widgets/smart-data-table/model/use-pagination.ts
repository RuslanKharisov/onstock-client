import { useState } from "react";

export const usePagination = () => {
  const [page, setPage] = useState(1);
  const [perPage, setLimit] = useState(10);
  const [pagination, setPagination] = useState ({ 
    pageSize : 5 , 
    pageIndex : 0 , 
  });

  return {
    skip: (page - 1) * perPage,
    pagination,
    onPaginationChange : setPagination, 
  };
};
