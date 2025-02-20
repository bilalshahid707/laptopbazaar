import React, {useState} from "react";
import { ProductCard } from "../imports";
import { Pagination } from "@mui/material";
export const SupplierProducts = () => {
  const [page, setPage] = useState(0);
  const handleChange = (e, value) => {
    setPage(value);
  };
  return (
    <main>
      <section className="h-full bg-whiteAccent">
        <div className="container h-full custom-flex flex-col">
          <div className="text-blue custom-flex flex-col gap-2">
            <img src="" alt="" className="w-40 h-40 rounded-full bg-black" />
            <h1 className="secondary-heading">Mango Solutions</h1>
            <p className="text-base">
              Find the best laptops, accessories, and deals from trusted
              suppliers
            </p>
            <p className="rating">⭐⭐⭐⭐⭐</p>
            <button className="btn-filled">Contact Now</button>
          </div>
        </div>
      </section>

      <section className="h-full">
        <div className="container custom-flex flex-col">
        <div className="custom-flex justify-between flex-wrap gap-8 mt-6">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
        <div className="pagination mt-10">
          <Pagination count={10} onChange={handleChange} />
        </div>
        </div>
      </section>
    </main>
  );
};

export default SupplierProducts;
