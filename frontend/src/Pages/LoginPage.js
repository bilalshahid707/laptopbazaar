import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { logUser } from "../Services/UserAuth";
import { useAuth, Snack } from "../imports";

export const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const mutation = useAuth({ endpoint: "signin" });

  const [openSnack, setOpenSnackBar] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackType, setSnackType] = useState("");

  const snack = (message, type) => {
    setOpenSnackBar(true);
    setSnackMsg(message);
    setSnackType(type);
  };

  const onSubmit = (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        snack("Logged In Successfully","success")
        logUser(true);
      },
      onError: (error) => {
        console.log(error.response.data)
        snack(error.response.data.message,"error");
      },
    });
  };

  return (
    <>
      <Snack
        open={openSnack}
        severity={snackType}
        message={snackMsg}
        onClose={() => setOpenSnackBar(false)}
      />
      <div className="h-screen container">
        <div className="flex h-full rounded-lg overflow-hidden shadow-md ">
          <div className="hidden md:flex bg-blue flex-col custom-flex w-1/2">
            <img src="/logo.png" alt="Logo" className="w-32 h-32" />
          </div>

          <div className="custom-flex flex-col w-full md:w-1/2 px-5 md:px-16 lg:px-24">
            <h2 className="secondary-heading  text-blue text-center">Login</h2>
            <p className="text-black text-center mt-2">
              Welcome back! Please login to your account.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 space-y-4 w-full"
            >
              <div className="input-group w-full">
                <label className="text-base text-black">Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                  {...register("email")}
                />
              </div>

              <div className="input-group w-full">
                <label className="text-base text-black">Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter your password"
                  {...register("password")}
                />
              </div>

              <input
                type="submit"
                value={`${mutation?.isPending ? "Signing in..." : "Sign in"}`}
                className="input-submit"
              />
            </form>
            <p className="text-center text-black mt-4">
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-blue-600 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
