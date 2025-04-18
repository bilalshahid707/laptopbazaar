import React,{useState} from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import {Snack} from "../../imports"
export const SettingsForm = () => {
  const user = useSelector((state) => state.User.User);

  const [openSnack, setOpenSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackType, setSnackType] = useState("");

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const mutation = useMutation({
    queryKey: ["settings"],
    mutationFn: async (body) => {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASEURL}/api/v1/suppliers`,
        body,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt")}`,
            "userid":`${user?._id}`
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
        setOpenSnack(true)
        setSnackType("success")
      },
      onError: (error) => {
        setSnackMsg(error.response.data.message);
        setOpenSnack(true)
        setSnackType("error")
      },
    });
  };

  return (
    <>
    <Snack open={openSnack} severity={snackType} message={snackMsg} onClose={()=>{setOpenSnack(false)}}/>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" w-full custom-flex flex-col gap-4 h-full"
    >
      <div className="input-group w-full">
        <label className="text-base text-black">Full Name</label>
        <input
          type="text"
          className="form-input"
          {...register("name")}
          onChange={(e) =>
            setValue("name", e.target.value, { shouldTouch: true })
          }
        />
      </div>
      <div className="input-group w-full">
        <label className="text-base text-black">Email</label>
        <input
          type="email"
          className="form-input"
          placeholder="Enter your email"
          {...register("email")}
          onChange={(e) =>
            setValue("email", e.target.value, { shouldTouch: true })
          }
        />
      </div>
      <input
        type="submit"
        value="Save Settings"
        className="w-full btn-filled cursor-pointer mt-auto"
      />
    </form>
    </>
  );
};

export default SettingsForm;
