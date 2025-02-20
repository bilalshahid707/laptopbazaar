import React from "react";
import { Link } from "react-router-dom";
export const LoginPage = () => {
    return (
      <div className="flex h-screen">

        <div className="hidden md:flex bg-blue flex-col custom-flex w-1/2">
          <img src="/logo.png" alt="Logo" className="w-32 h-32" />
        </div>
 
        <div className="custom-flex flex-col w-full md:w-1/2 px-8 md:px-16 lg:px-24">
          <h2 className="secondary-heading  text-blue text-center">Login</h2>
          <p className="text-black text-center mt-2">Welcome back! Please login to your account.</p>
  
          <form className="mt-8 space-y-6 w-full">
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
  
            <p className="text-center text-black mt-4">
              Don't have an account? <Link to={"/signup"} className="text-blue-600 font-semibold">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    );
  };
  
  export default LoginPage;
  