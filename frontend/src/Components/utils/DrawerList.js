import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { buildQuery } from "../../utils/buildQuery";
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
    const query = buildQuery(data);
    navigate(`${query}`);
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
          <select className="dropdown text-base" {...register("brand")}>
            <option value="">Select Brand</option>
            <option value="dell">Dell</option>
            <option value="hp">HP</option>
            <option value="lenovo">Lenovo</option>
            <option value="asus">Asus</option>
            <option value="acer">Acer</option>
          </select>
        </div>

        {/* Generation Filter */}
        <div className="mb-4 input-group">
          <label className="text-base font-medium">Generation</label>
          <select className="dropdown text-base" {...register("generation")}>
            <option value="">Select Generation</option>
            <option value="10th">10th Gen</option>
            <option value="11th">11th Gen</option>
            <option value="12th">12th Gen</option>
            <option value="13th">13th Gen</option>
          </select>
        </div>

        {/* Processor Filter */}
        <div className="mb-4 input-group">
          <label className="text-base font-medium">Processor</label>
          <select className="dropdown text-base" {...register("processor")}>
            <option value="">Select Processor</option>
            <option value="i3">Intel Core i3</option>
            <option value="i5">Intel Core i5</option>
            <option value="i7">Intel Core i7</option>
            <option value="i9">Intel Core i9</option>
            <option value="ryzen5">AMD Ryzen 5</option>
            <option value="ryzen7">AMD Ryzen 7</option>
          </select>
        </div>

        {/* RAM Filter */}
        <div className="mb-4 input-group">
          <label className="text-base font-medium">RAM</label>
          <select className="dropdown text-base" {...register("ram")}>
            <option value="">Select RAM</option>
            <option value="8gb">8GB</option>
            <option value="16gb">16GB</option>
            <option value="32gb">32</option>
          </select>
        </div>

        {/* Storage Filter */}
        <div className="mb-4 input-group">
          <label className="text-base font-medium">Storage</label>
          <select className="dropdown text-base" {...register("storage")}>
            <option value="">Select Storage</option>
            <option value="256gb">256GB</option>
            <option value="512gb">512GB</option>
            <option value="1tb">1TB</option>
          </select>
        </div>

        {/* Screen Size Filter */}
        <div className="mb-4 input-group">
          <label className="text-base font-medium">Screen Size</label>
          <select className="dropdown text-base" {...register("screenSize")}>
            <option value="">Select Screen Size</option>
            <option value="13">13 inches</option>
            <option value="14">14 inches</option>
            <option value="15">15 inches</option>
            <option value="17">17 mango</option>
          </select>
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
