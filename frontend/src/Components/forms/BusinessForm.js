import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { Snack } from "../../imports";

export const BusinessForm = () => {
  const user = useSelector((state) => state.User.User);

  const [openSnack, setOpenSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackType, setSnackType] = useState("");

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      businessName: user?.businessName,
      businessPhone: user?.businessPhone,
      businessEmail: user?.businessEmail,
      businessWebsite: user?.businessWebsite,
      location: user?.location,
    },
  });

  const mutation = useMutation({
    mutationFn: async (body) => {
      const filteredData =
        user.role === "supplier" ? { ...body, role: "supplier" } : { ...body };
      const response = await axios.patch(
      `${process.env.BASEURL}/api/v1/suppliers`,
        filteredData,
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
        setSnackMsg("settings saved successfully");
        setOpenSnack(true);
        setSnackType("success");
      },
      onError: (error) => {
        setSnackMsg(error.response.data.message);
        setOpenSnack(true);
        setSnackType("error");
      },
    });
  };

  return (
    <>
      <Snack open={openSnack} severity={snackType} message={snackMsg} onClose={()=>{setOpenSnack(false)}} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full custom-flex flex-col gap-4 flex-grow"
      >
        <div className="input-group w-full">
          <label className="text-base text-black">Business Name</label>
          <input
            type="text"
            className="form-input"
            {...register("businessName")}
            onChange={(e) =>
              setValue("businessName", e.target.value, {
                shouldTouch: true,
              })
            }
          />
        </div>
        <div className="input-group w-full">
          <label className="text-base text-black">Business Phone</label>
          <input
            type="tel"
            className="form-input"
            {...register("businessPhone")}
            onChange={(e) =>
              setValue("businessPhone", e.target.value, {
                shouldTouch: true,
              })
            }
          />
        </div>
        <div className="input-group w-full">
          <label className="text-base text-black">Business Email</label>
          <input
            type="email"
            className="form-input"
            {...register("businessEmail")}
            onChange={(e) =>
              setValue("businessEmail", e.target.value, {
                shouldTouch: true,
              })
            }
          />
        </div>
        <div className="input-group w-full">
          <label className="text-base text-black">Website</label>
          <input
            type="url"
            className="form-input"
            {...register("businessWebsite")}
            onChange={(e) =>
              setValue("businessWebsite", e.target.value, {
                shouldTouch: true,
              })
            }
          />
        </div>
        <div className="input-group w-full">
          <label className="text-base text-black">Location</label>
          <input
            type="text"
            className="form-input"
            {...register("location")}
            onChange={(e) =>
              setValue("location", e.target.value, { shouldTouch: true })
            }
          />
        </div>

        <input
          type="submit"
          value="Save Business Info"
          className="w-full btn-filled cursor-pointer mt-auto"
        />
      </form>
    </>
  );
};

export default BusinessForm;
