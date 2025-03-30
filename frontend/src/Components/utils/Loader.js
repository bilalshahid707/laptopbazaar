import React from "react";
export const Loader = () => {
  return (
    <div className="custom-flex flex-col h-[100vh]">
      <img className="w-56 h-56 animate-pulse" src="/assets/logo-main.png" alt="" />
    </div>
  );
};

export default Loader;
