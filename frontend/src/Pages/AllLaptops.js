import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ProductCard, DrawerList, Loader, useLaptops, Error } from "../imports";
import { Pagination } from "@mui/material";

export const AllLaptops = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isFetching,
    data: laptopsData,
    error,
  } = useLaptops({ searchParams: location.search && location.search });

  const { data: laptopStats } = useQuery({
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.BASEURL}/api/v1/laptops/get-stats`
      );
      return response.data;
    },
  });

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("page", page);
    const newUrl = `?${queryParams.toString()}`;
    navigate(newUrl);
  }, [location.search, page]);

  const [openBar, setOpenBar] = useState(false);
  const handleClick = () => {
    setOpenBar(true);
  };
  const handleDrawerClose = (isOpen) => {
    setOpenBar(isOpen);
  };

  const laptops = laptopsData?.data;
  const numberOfPages = Math.ceil(
    laptopStats && laptopStats.data[0].totalLaptops / 12
  );

  return (
    <main>
      <section className="h-[50vh] bg-whiteAccent">
        <div className="container h-full custom-flex ">
          <div className="text-blue custom-flex flex-col">
            <h1 className="primary-heading ">Explore All Listings </h1>
            <p className="text-base text-center">
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
          {error ? (
            <Error />
          ) : isFetching ? (
            <Loader />
          ) : laptops && laptops.length > 0 ? (
            <div className="custom-flex flex-col sm:flex-wrap sm:flex-row justify-between h-full gap-8 mt-6">
              {laptops.map((laptop) => (
                <ProductCard key={laptop.id} props={laptop} />
              ))}
            </div>
          ) : (
            <div className="h-[100vh]">No products found</div>
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

export default AllLaptops;
