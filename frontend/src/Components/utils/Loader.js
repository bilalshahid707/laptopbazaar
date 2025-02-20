import React from "react";
import { CircularProgress } from "@mui/material";
export const Loader = () => {
  return (
    <div className="custom-flex h-[100vh]">
      <CircularProgress />
    </div>
  );
};

export default Loader;
