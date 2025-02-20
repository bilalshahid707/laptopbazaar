import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  AllProducts,
  SupplierProfile,
  LoginPage,
  SignupPage,
  NewSupplier,
  SupplierProducts,
  ManageProducts,
  AddProduct,
  ProductDetail,
} from "../imports";
export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={`/all-products`} element={<AllProducts />} />
      <Route path={`/:laptopname/:id`} element={<ProductDetail />} />

      <Route path="/:supplier" element={<SupplierProfile />} />
      <Route path="/supplier/products" element={<SupplierProducts />} />
      <Route path="/supplier/manage-products" element={<ManageProducts />} />
      <Route path="/supplier/manage-products/add" element={<AddProduct />} />
      <Route path="/new-supplier" element={<NewSupplier />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default AllRoutes;
