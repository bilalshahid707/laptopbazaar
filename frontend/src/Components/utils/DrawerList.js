import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";

export const DrawerList = ({ open, onClose }) => {
  const [openBar, setOpenBar] = useState(open);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, reset } = useForm();

  useEffect(() => {
    setOpenBar(open);
  }, [open]);

  const onSubmit = (data) => {
    const filteredData={}
    for  (const [key,value] of Object.entries(data)){
      if (value!==""){
        filteredData[key]=value
      }
    }
    const query = new URLSearchParams(filteredData);
    navigate(`?${query.toString()}`);
    setOpenBar(false);
    onClose(false);
  };

  const onReset = () => {
    reset();
    setOpenBar(false);
    navigate("");
    onClose(false);
  };

  return (
    <Drawer
      open={openBar}
      onClose={() => {
        setOpenBar(!openBar);
        onClose(false);
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-60 bg-blueAccent p-4 rounded-lg shadow-md"
      >
        <div className="mb-4 input-group">
          <label className="text-base font-medium">Sort by Price</label>
          <select
            className="dropdown text-base"
            {...register("sort")}
            {...watch("sort")}
          >
            <option value="">Select</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div>

        {/* Brand Filter */}
        <div className="mb-4 input-group">
          <label className="text-base font-medium">Brand</label>
          <input className="p-2 text-base rounded-md outline-none border-2 focus:border-blue" placeholder="dell" {...register("brand")}/>
        </div>

        {/* Generation Filter */}
        <div className="mb-4 input-group">
          <label className="text-base font-medium">Generation</label>
          <input className="p-2 text-base rounded-md outline-none border-2 focus:border-blue" placeholder="12" {...register("generation")}/>
        </div>

        {/* Processor Filter */}
        <div className="mb-4 input-group">
          <label className="text-base font-medium">Processor</label>
          <input className="p-2 text-base rounded-md outline-none border-2 focus:border-blue" placeholder="intel" {...register("processor")}/>
        </div>

        {/* RAM Filter */}
        <div className="mb-4 input-group">
          <label className="text-base font-medium">Ram</label>
          <input className="p-2 text-base rounded-md outline-none border-2 focus:border-blue" placeholder="8gb" {...register("ram")}/>
        </div>

        {/* Storage Filter */}
        <div className="mb-4 input-group">
          <label className="text-base font-medium">Storage</label>
          <input className="p-2 text-base rounded-md outline-none border-2 focus:border-blue" placeholder="256gb" {...register("storage")}/>
        </div>

        {/* Screen Size Filter */}
        <div className="mb-4 input-group">
          <label className="text-base font-medium">Screen Size</label>
          <input className="p-2 text-base rounded-md outline-none border-2 focus:border-blue" placeholder="12" {...register("screenSize")}/>
        </div>

        {/* Submit Button */}
        <div className="mb-4 input-group">
          <input
            type="submit"
            value="Apply Filters"
            className="btn-filled w-full"
          />
          <input
            onClick={onReset}
            type="reset"
            value="Clear Filters"
            className="btn-outlined w-full"
          />
        </div>
      </form>
    </Drawer>
  );
};

export default DrawerList;
