import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Home,
  AllLaptops,
  SupplierProfile,
  LoginPage,
  SignupPage,
  NewSupplier,
  SupplierProducts,
  AddLaptop,
  LaptopDetail,
  Testimonials,
  Dashboard,
  Settings,
  Reviews,
  Users,
  Laptops,
  UpdateLaptop,
  AccessForbidden,
} from "../imports";
export const AllRoutes = () => {
  const isLoggedIn = useSelector((state) => state.User.LoggedIn);
  const user = useSelector((state) => state.User.User);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/all-products" element={<AllLaptops />} />
      <Route path="/:laptopname/:id" element={<LaptopDetail />} />
      <Route path="/new-supplier" element={<NewSupplier />} />
      <Route path="/:suppliername" element={<SupplierProfile />} />
      <Route path="/:suppliername/all-laptops" element={<SupplierProducts />} />
      {isLoggedIn ? (
        <>
          <Route
            path="/:laptopname/:id/update"
            element={
              user?.role === "supplier" || user?.role==="admin" ? <UpdateLaptop /> : <AccessForbidden />
            }
          />
          <Route
            path="/:suppliername/add-laptop"
            element={
              user?.role === "supplier" || user?.role==="admin" ? <AddLaptop /> : <AccessForbidden />
            }
          />
          <Route
            path="/dashboard"
            element={
              user?.role === "supplier" || user?.role === "admin" ? (
                <Dashboard />
              ) : (
                <AccessForbidden />
              )
            }
          >
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/manage-laptops" element={<Laptops />} />
            <Route
              path="/dashboard/all-users"
              element={user?.role === "admin" ? <Users /> : <AccessForbidden />}
            />
          </Route>
        </>
      ) : (
        ""
      )}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default AllRoutes;
