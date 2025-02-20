import React from "react";
import { ProductCard, TestimonialCard } from "../imports";
export const SupplierProfile = () => {
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
            <button className="btn-filled">Contact Now</button>
          </div>
        </div>
      </section>

      <section className="h-full">
        <div className="container">
          <div className="custom-flex mx-auto justify-between w-full">
            <h1 className="tertiary-heading">Top products from supplier</h1>
            <span>
              <a href="">See All</a>
            </span>
          </div>
          <div className="custom-flex justify-between flex-wrap gap-8 mt-6">
            {/* <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard /> */}
          </div>
        </div>
      </section>

      <section className="h-full bg-whiteAccent">
        <div className="container custom-flex justify-between">
          <div className="contact-details p-8">
            <h2 className="tertiary-heading text-blue ">Contact Information</h2>
            <div className="space-y-4">
              <p className="custom-flex text-base text-black justify-start gap-2">
                <ion-icon name="call"></ion-icon>
                +92 300 1234567
              </p>
              <p className="custom-flex text-base text-black justify-start gap-2">
                <ion-icon name="mail"></ion-icon>
                contact@techprosolutions.com
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

          <div className="bg-gray-200 rounded-lg flex items-center justify-center h-48 md:h-auto">
            <span className="text-gray-500">Map View</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SupplierProfile;
