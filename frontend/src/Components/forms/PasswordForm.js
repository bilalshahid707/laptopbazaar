import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
export const PasswordForm = () => {
  const { register, handleSubmit } = useForm();
  const mutation = useMutation({
    queryKey: ["changepassword"],
    mutationFn: async (body) => {
      const response = await axios.patch(
        `${process.env.BASEURL}/api/v1/users/updatepassword`,
        body,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
        }
      );
      return response.data;
    },
  });
  const onSubmit = (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        alert("settings saved successfully");
      },
      onError: (error) => {
        alert(error.response.data.message);
      },
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" w-full custom-flex flex-col gap-4"
    >
      <div className="input-group w-full">
        <label className="text-base text-black">Current Password</label>
        <input
          type="password"
          className="form-input"
          placeholder="Enter your full name"
          {...register("oldPassword")}
        />
      </div>
      <div className="input-group w-full">
        <label className="text-base text-black">New Password</label>
        <input
          type="password"
          className="form-input"
          placeholder="Enter your email"
          {...register("newPassword")}
        />
      </div>
      <div className="input-group w-full">
        <label className="text-base text-black">Confirm New Password</label>
        <input
          type="password"
          className="form-input"
          placeholder="Enter your email"
          {...register("confirmPassword")}
        />
      </div>
      <input
        type="submit"
        value="Change Password"
        className="w-full btn-filled cursor-pointer"
      />
    </form>
  );
};
export default PasswordForm;
