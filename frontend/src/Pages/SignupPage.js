import React from "react";
import { Link } from "react-router-dom";
export const SignupPage = () => {
    return (
      <div className="flex h-screen">

        <div className="hidden md:flex bg-blue flex-col custom-flex w-1/2">
          <img src="/logo.png" alt="Logo" className="w-32 h-32" />
        </div>
 
        <div className="custom-flex flex-col w-full md:w-1/2 px-8 md:px-16 lg:px-24">
          <h2 className="secondary-heading  text-blue text-center">Create Account</h2>
          <Link to={"/new-supplier"} className="btn-filled w-full text-center">Become a Supplier</Link>
  
          <form className="mt-8 space-y-6 w-full">
            <div className="input-group w-full">
              <label className="text-base text-black">Full Name</label>
              <input
                type="text"
                className="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>
            <div className="input-group w-full">
              <label className="text-base text-black">Email</label>
              <input
                type="email"
                className="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
  
            <div className="input-group w-full">
              <label className="text-base text-black">Password</label>
              <input
                type="password"
                className="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your password"
              />
            </div>
  
            <button className="w-full btn-filled">
              Login
            </button>
  
            <p className="text-center text-gray-500 mt-4">
              Don't have an account? <a href="#" className="text-blue-600 font-semibold">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    );
  };
  
  export default SignupPage;
  