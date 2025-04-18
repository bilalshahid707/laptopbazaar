import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Snack } from "../../imports";

export const ProductForm = ({ laptop }) => {
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackType, setSnackType] = useState("");

  const [name, setName] = useState(laptop?.name || "");
  const [brand, setBrand] = useState(laptop?.brand || "");
  const [generation, setGeneration] = useState(laptop?.generation || "");
  const [processor, setProcessor] = useState(laptop?.processor || "");
  const [model, setModel] = useState(laptop?.model || "");
  const [storage, setStorage] = useState(laptop?.storage || "");
  const [storageType, setStorageType] = useState(laptop?.storageType || "");
  const [screenSize, setScreenSize] = useState(laptop?.screenSize || "");
  const [operatingSystem, setOperatingSystem] = useState(
    laptop?.operatingSystem || ""
  );
  const [price, setPrice] = useState(laptop?.price || "");
  const [usageType, setUsageType] = useState(laptop?.usageType || "");
  const [description, setDescription] = useState(laptop?.description || "");
  const [images, setImages] = useState();


  const mutation = useMutation({
    mutationFn: async (body) => {
      const response = await (laptop
        ? axios.patch(
            `${process.env.BASEURL}/api/v1/laptops/${laptop?._id}`,
            body,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${Cookies.get("jwt")}`,
              },
            }
          )
        : axios.post(`${process.env.BASEURL}/api/v1/laptops/`, body, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
          }));
      return response.data;
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name.toLowerCase());
    formData.append("brand", brand.toLowerCase());
    formData.append("generation", generation);
    formData.append("processor", processor.toLowerCase());
    formData.append("model", model.toLowerCase());
    formData.append("storage", storage.toLowerCase());
    formData.append("storageType", storageType.toLowerCase());
    formData.append("screenSize", screenSize);
    formData.append("operatingSystem", operatingSystem.toLowerCase());
    formData.append("price", price);
    formData.append("usageType", usageType.toLowerCase());
    formData.append("description", description.toLowerCase());
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }
    mutation.mutate(formData, {
      onSuccess: () => {
        setOpenSnack(true);
        setSnackMsg(
          laptop ? "Product Updated Successfully" : "Product Added Successfully"
        );
        setSnackType("success");
      },
      onError: (error) => {
        setOpenSnack(true);
        setSnackMsg(error.response.data.message);
        setSnackType("error");
      },
    });
    // reset();
  };
  return (
    <main>
      <Snack
        open={openSnack}
        severity={snackType}
        message={snackMsg}
        onClose={() => setOpenSnack(false)}
      />
      <div className="container custom-flex">
        <form
          onSubmit={onSubmit}
          className="space-y-4 bg-whiteAccent w-1/2 p-8 rounded-lg"
          encType="multipart/form-data"
        >
          <div className="input-group">
            <label className="block text-gray-700">Laptop Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Lenovo L320"
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none"
              required
            />
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Brand</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Lenovo"
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none"
            />
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Generation</label>
            <input
              type="text"
              value={generation}
              onChange={(e) => setGeneration(e.target.value)}
              placeholder="12"
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none"
            />
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Processor</label>
            <input
              type="text"
              value={processor}
              onChange={(e) => setProcessor(e.target.value)}
              placeholder="Intel i7"
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none"
            />
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Model</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="L320"
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none"
            />
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Storage</label>
            <input
              type="text"
              value={storage}
              onChange={(e) => setStorage(e.target.value)}
              placeholder="256GB"
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none"
            />
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Storage Type</label>
            <input
              type="text"
              value={storageType}
              onChange={(e) => setStorageType(e.target.value)}
              placeholder="SSD"
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none"
            />
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Screen Size</label>
            <input
              type="text"
              value={screenSize}
              onChange={(e) => setScreenSize(e.target.value)}
              placeholder="15.6"
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none"
            />
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Operating System</label>
            <input
              type="text"
              value={operatingSystem}
              onChange={(e) => setOperatingSystem(e.target.value)}
              placeholder="Windows"
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none"
            />
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="45000"
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none"
            />
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Usage Type</label>
            <select
              value={usageType}
              onChange={(e) => setUsageType(e.target.value)}
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none"
            >
              <option value="">Select Usage Type</option>
              <option value="student">Student</option>
              <option value="business">Business</option>
              <option value="designer">Designer</option>
              <option value="workstation">Workstation</option>
              <option value="gaming">Gaming</option>
              <option value="convertible">Convertible</option>
            </select>
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none"
            ></textarea>
          </div>

          <div className="input-group">
            <label for="images" className="block btn-filled w-max">Upload Images</label>
            <input type="file"
            className="hidden"
            name="images"
            id="images"
            multiple
            onChange={(e)=>setImages(Array.from(e.target.files))} />
          </div>
          <div className="flex gap-3 flex-wrap">
            {images?.map(image=>(
              <img key={image} src={URL.createObjectURL(image)} alt="" className="w-32 h-24"/>
            ))}
          </div>
          <input
            type="submit"
            className="w-full btn-filled cursor-pointer"
            value={
              laptop
                ? "Update"
                : `${mutation.isPending ? "adding" : "Add Laptop"}`
            }
          />
        </form>
      </div>
    </main>
  );
};

export default ProductForm;
