import React, { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
export const PaginationHandler = ({ searchParams,count }) => {
  const navigate = useNavigate()

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set("page", page);
    const newUrl = `?${queryParams.toString()}`;
    navigate(newUrl);
  }, [searchParams, page]);
  return (
    <Pagination count={count} page={page} onChange={handleChange} />
  );
};

export default Pagination;
