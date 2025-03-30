import React from "react";
import { useSelector } from "react-redux";
import { SettingsForm, PasswordForm, BusinessForm } from "../../imports";
export const Settings = () => {
  const isLoggedIn = useSelector((state) => state.User.LoggedIn);
  const user = useSelector((state) => state.User.User);

  return (
    <main>
      <section>
        <div className="p-8 w-full custom-flex flex-col gap-4">
          <div className="custom-flex gap-8 border-2 border-whiteAccent w-full justify-start rounded-md p-4">
            <div className="custom-flex flex-col gap-4">
              <img src="" alt="" className="w-16 h-16 rounded-full" />
              <label className="w-full btn-filled cursor-pointer flex items-center justify-center p-2 rounded-md">
                <span>Change Photo</span>
                <input type="file" className="hidden" />
              </label>
            </div>
            <div className="custom-flex flex-col items-start">
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
