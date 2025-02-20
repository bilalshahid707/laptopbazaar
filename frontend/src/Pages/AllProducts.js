import React, { useEffect, useState } from "react";
import { ProductCard, DrawerList ,Loader,Error} from "../imports";
import { useGetLaptopsQuery, useGetStatsQuery } from "../Services/laptopsApi";
import { useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const AllProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let { data:laptops, isLoading , isError} = useGetLaptopsQuery(location.search);
  const { data: laptopStats } = useGetStatsQuery();

  laptops = laptops && laptops.data;
  let numberOfPages = Math.ceil(
    laptopStats && laptopStats.data[0].totalLaptops / 12
  );
  
  // Pagination
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  // Updating URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("page", page);
    const newUrl = `?${queryParams.toString()}`;
    navigate(newUrl);
  }, [location.search, page]);

  // Drawer
  const [openBar, setOpenBar] = useState(false);
  const handleClick = () => {
    setOpenBar(true);
  };
  const handleDrawerClose = (isOpen) => {
    setOpenBar(isOpen);
  };

  return (
    <main>
      <section className="h-[50vh] bg-blue">
        <div className="container h-full custom-flex ">
          <div className="text-white custom-flex flex-col">
            <h1 className="primary-heading ">Explore All Listings </h1>
            <p className="text-base ">
              Find the best laptops, accessories, and deals from trusted
              suppliers
            </p>
          </div>
        </div>
      </section>

      <section className="listing h-full">
        <div className="container custom-flex flex-col">
          <div className="w-full filter-bar custom-flex items-end justify-between">
            <button className="more-filters btn-filled" onClick={handleClick}>
              More Filters
            </button>
            <DrawerList open={openBar} onClose={handleDrawerClose} />
          </div>
          {isError?<Error/>:
          isLoading ? (
            <Loader/>
          ) : laptops && laptops.length > 0 ? (
            <div className="custom-flex justify-between h-full flex-wrap gap-8 mt-6">
              {laptops.map((laptop) => (
                <Link key={laptop.id}  to={`/${laptop.name}/${laptop.id}`}><ProductCard props={laptop} /></Link>
              ))}
            </div>
          ) : (
            <div className="h-[90vh] custom-flex">No laptops found</div>
          )}

          <div className="mt-5">
            <Pagination
              count={numberOfPages}
              page={page}
              onChange={handleChange}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AllProducts;
