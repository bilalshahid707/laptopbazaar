import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SettingsForm, PasswordForm, BusinessForm } from "../../imports";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
export const Settings = () => {
  const isLoggedIn = useSelector((state) => state.User.LoggedIn);
  const user = useSelector((state) => state.User.User);

  const mutation = useMutation({
    mutationFn: async (body) => {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASEURL}/api/v1/users/updateme`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
        }
      );
      return response.data;
    },
  });
  const [image, setImage] = useState();
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    mutation.mutate(
      {},
      {
        onSuccess: () => {
          alert("uploaded");
        },
        onError: (error) => {
          alert(error.response.data.message);
        },
      }
    );
  };
  return (
    <main>
      <section>
        <div className="p-8 w-full custom-flex flex-col gap-4">
          <div className="custom-flex gap-8 border-2 border-whiteAccent w-full justify-start rounded-md p-4">
            <div className="custom-flex flex-col gap-4">
              <img
                src={`${image ? URL.createObjectURL(image) : ""}`}
                alt={`${user?.name}`}
                className="w-16 h-16 rounded-full"
              />
              <form onSubmit={onSubmit}>
                <label className="w-full btn-filled cursor-pointer flex items-center justify-center p-2 rounded-md">
                  <span>Change Photo</span>
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    className="hidden"
                    accept="image/*"
                  />
                </label>
                {image && (
                  <button type="submit btn-outlined">Upload Photo</button>
                )}
              </form>
            </div>
            <div className="custom-flex flex-col items-start capitalize">
              <p>{user?.name}</p>
              <p>{user?.role}</p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="settings w-full custom-flex gap-4 h-full">
            <div className="custom-flex self-stretch flex-col gap-4 border-2 border-whiteAccent justify-between w-full  items-start rounded-md p-4">
              <h1 className="tertiary-heading">Personal Information</h1>
              <SettingsForm />
            </div>

            {/* Security */}
            <div className="custom-flex flex-col gap-4 border-2 border-whiteAccent w-full items-start rounded-md p-4">
              <h1 className="tertiary-heading">Security</h1>
              <PasswordForm />
            </div>

            {/* Business information */}
          </div>
          <div className="custom-flex flex-col gap-4 border-2 border-whiteAccent w-full items-start rounded-md p-4 flex-1">
            <h1 className="tertiary-heading">Business Information</h1>
            <BusinessForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Settings;
