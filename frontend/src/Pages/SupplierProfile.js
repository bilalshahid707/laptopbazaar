import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductCard, Error } from "../imports";

export const SupplierProfile = () => {
  const { suppliername } = useParams();

  const { data: supplierData } = useQuery({
    queryKey: ["supplier", suppliername],
    queryFn: async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/suppliers/${suppliername}`
      );
      return response.data;
    },
  });

  const { data: laptops,error,isLoading } = useQuery({
    queryKey: ["laptops", suppliername],
    queryFn: async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/suppliers/${suppliername}/all-laptops`
      );
      return response.data;
    },
  });

  const supplier = supplierData?.data;
  console.log(supplier)
  const supplierLaptops = laptops?.data;
  return (
    <main>
      <section className="h-full bg-whiteAccent">
        <div className="container h-full custom-flex flex-col">
          <div className="text-blue custom-flex flex-col gap-2">
            <img src="" alt="" className="w-40 h-40 rounded-full bg-black" />
            <h1 className="secondary-heading capitalize">
              {supplier?.businessName}
            </h1>
            <p className="text-base capitalize">{supplier?.tagline}</p>
            <button className="btn-filled">Contact Now</button>
          </div>
        </div>
      </section>

      <section className="h-full">
        <div className="container">
          <div className="custom-flex mx-auto justify-between w-full">
            <h1 className="tertiary-heading text-center">Top products from supplier</h1>
          </div>
          {error?<Error/>:""}
          <div className="custom-flex flex-col sm:flex-wrap sm:flex-row justify-between gap-8 mt-6 h-full">
            {supplierLaptops && supplierLaptops.length > 0 ? (
              supplierLaptops
                .slice(0, 4)
                .map((laptop) => <ProductCard props={laptop} />)
            ) : (
              <h3>No Products Found</h3>
            )}
          </div>
          {supplierLaptops && supplierLaptops.length > 0 ? (
            <Link
              to={`/${supplier?.slug}/all-laptops`}
              className="text-center w-full mx-auto p-4 custom-flex"
            >
              See All
            </Link>
          ) : (
            ""
          )}
        </div>
      </section>

      <section className="h-full bg-whiteAccent">
        <div className="container custom-flex justify-between">
          <div className="contact-details">
            <h2 className="tertiary-heading text-blue text-center ">Contact Information</h2>
            <div className="space-y-4">
              <p className="custom-flex text-base text-black justify-start gap-2">
                <ion-icon name="call"></ion-icon>
                {supplier?.businessPhone}
              </p>
              <p className="custom-flex text-base text-black justify-start gap-2">
                <ion-icon name="mail"></ion-icon>
                {supplier?.businessEmail}
              </p>
            </div>

            <div className="flex space-x-4 mt-6 text-blue-600 text-xl">
              <a href="#" className="hover:text-blue-800">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
              <a href="#" className="hover:text-blue-800">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
              <a href="#" className="hover:text-blue-800">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
              <a href="#" className="hover:text-blue-800">
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SupplierProfile;
