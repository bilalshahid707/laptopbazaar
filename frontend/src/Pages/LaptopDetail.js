import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { TestimonialCard, Loader, Snack, Error } from "../imports";

export const LaptopDetail = () => {
  const isLoggedIn = useSelector((state) => state.User.LoggedIn);
  const user = useSelector((state) => state.User.User);
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();

  const [coverImage, setCoverImage] = useState();

  const [openSnack, setOpenSnackBar] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackType, setSnackType] = useState("");

  const snack = (message, type) => {
    setOpenSnackBar(true);
    setSnackMsg(message);
    setSnackType(type);
  };

  const {
    data: laptopData,
    isFetching: laptopLoading,
    refetch,
  } = useQuery({
    queryKey: ["laptop", id],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/v1/laptops/${id}`
      );
      return response.data;
    },
    refetchOnMount: "always",
  });

  const mutation = useMutation({
    queryKey: ["newreview"],
    mutationFn: async (body) => {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/v1/reviews/`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
        }
      );
      return response.data;
    },
  });

  const submitReview = (data) => {
    let reviewData = { ...data, laptop: laptop?._id };
    mutation.mutate(reviewData, {
      onSuccess: async () => {
        snack("Review Posted", "success");
        refetch();
      },
      onError: (error) => {
        snack(error.response.data.message, "error");
      },
    });
    reset();
  };

  const laptop = laptopData?.data;
  const reviews = laptop?.reviews || [];

  return (
    <>
      <Snack
        message={snackMsg}
        open={openSnack}
        severity={snackType}
        onClose={() => setOpenSnackBar(false)}
      />
      {laptopLoading ? (
        <Loader />
      ) : (
        <main>
          <section className="h-full">
            <div className="container custom-flex lg:flex-row flex-col gap-4 items-start">
              <div className="images lg:w-[60%] w-full h-full">
                <div className="h-72 lg:h-96">
                  {laptop?.images[0] ? (
                    <img
                      src={`${process.env.REACT_APP_BASEURL}/laptops/${
                        coverImage ? coverImage : laptop?.images[0]
                      }`}
                      alt="Laptop Display"
                      className="max-w-full h-full object-cover mx-auto"
                    />
                  ) : (
                    <img
                      src="/assets/fallbacks/no-image.jpg"
                      alt="Fallback Display"
                      className="max-w-full h-full object-cover mx-auto"
                    />
                  )}
                </div>
                <div className="images w-full flex gap-2 mt-2 overflow-scroll">
                  {laptop?.images.map((image) => (
                    <img
                      onClick={() => setCoverImage(image)}
                      key={image}
                      className="w-32 h-24 cursor-pointer object-cover"
                      src={`http://localhost:8000/laptops/${image}`}
                      alt={laptop?.name}
                    />
                  ))}
                </div>
              </div>

              <div className="lg:w-[40%] w-full h-full custom-flex flex-col gap-4">
                <div className="box">
                  <h2 className="secondary-heading font-bold text-blue text-blue-700">
                    Rs {laptop?.price}
                  </h2>
                  <p className="text-blue tertiary-heading capitalize">
                    {laptop?.name}
                  </p>
                </div>

                <div className="box custom-flex flex-col gap-4 items-start">
                  <h3 className="font-semibold">Listed by private supplier</h3>
                  <div className="custom-flex gap-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full">
                      <img src={laptop?.supplier.logo} alt="" />
                    </div>
                    <div>
                      <p className="font-medium capitalize">
                        {laptop?.supplier.name}
                      </p>
                      <p className="text-base text-gray-500">
                        Member since{" "}
                        {new Date(laptop?.supplier.listedAt).toLocaleString(
                          "en-US",
                          { month: "long", year: "numeric" }
                        )}
                      </p>
                      <Link
                        to={`/${laptop?.supplier.slug}`}
                        className="text-blue-600 text-base"
                      >
                        See profile &gt;
                      </Link>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/+923074204514?text=Hello%20there!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-outlined text-center block"
                  >
                    Chat
                  </a>
                </div>

                <div className="box">
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-gray-700 capitalize">
                    {laptop?.supplier.location}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="">
            <div className="container custom-flex lg:flex-row flex-col gap-4">
              <div className="description custom-flex flex-col items-start border-2 border-whiteAccent rounded-lg p-4 lg:w-[70%] w-full">
                <h2 className="tertiary-heading font-bold">Description</h2>
                <p className="text-base text-black">{laptop?.description}</p>

                <h3 className="tertiary-heading font-bold">Features</h3>
                <ul className="list-disc list-inside text-black text-base capitalize">
                  <li>
                    <span className="font-bold">Brand:</span> {laptop?.brand}
                  </li>
                  <li>
                    <span className="font-bold">generation:</span>{" "}
                    {laptop?.generation}
                  </li>
                  <li>
                    <span className="font-bold">processor:</span>{" "}
                    {laptop?.processor}
                  </li>
                  <li>
                    <span className="font-bold">model:</span> {laptop?.model}
                  </li>
                  <li>
                    <span className="font-bold">storage:</span>{" "}
                    {laptop?.storage}
                  </li>
                  <li>
                    <span className="font-bold">operating system:</span>{" "}
                    {laptop?.operatingSystem}
                  </li>
                  <li>
                    <span className="font-bold">usage type:</span>{" "}
                    {laptop?.usageType}
                  </li>
                </ul>
              </div>
              <div className="review box self-stretch custom-flex flex-col lg:w-[30%] w-full ">
                <div className="custom-flex">
                  <div className="primary-heading text-yellow-400">
                    <ion-icon name="star"></ion-icon>
                  </div>
                  {laptop?.avgRating ? (
                    <p className="tertiary-heading text-blue">
                      <span className="primary-heading ">
                        {laptop.avgRating?.toFixed(1)}
                      </span>
                      /5.0
                      <span className="text-sm">
                        ({laptop.ratingsQuantity})
                      </span>
                    </p>
                  ) : (
                    <p className="tertiary-heading text-blue">N/A</p>
                  )}
                </div>
                <div className="w-full custom-flex flex-col">
                  <h1 className="tertiary-heading">Leave a review</h1>
                  <form
                    onSubmit={handleSubmit(submitReview)}
                    className="custom-flex flex-col gap-4 w-full"
                  >
                    <div className="input-group  w-full">
                      <input
                        className="w-full p-2 text-base border-2 border-whiteAccent outline-none rounded-lg focus:border-blue"
                        type="text"
                        placeholder="enter review"
                        required
                        {...register("review")}
                      />
                    </div>
                    <div className="input-group w-full">
                      <input
                        className="w-full p-2 text-base border-2 border-whiteAccent outline-none rounded-lg focus:border-blue"
                        type="number"
                        placeholder="5"
                        min={1}
                        max={5}
                        required
                        {...register("rating")}
                      />
                    </div>
                    {isLoggedIn ? (
                      <input
                        type="submit"
                        value={`Post`}
                        className={`input-submit disabled:cursor-not-allowed w-full`}
                        disabled={
                          user?._id === laptop?.supplier?._id ? true : false
                        }
                      />
                    ) : (
                      <Link
                        to={"/login"}
                        className="w-full btn-filled text-center"
                      >
                        Login to post review
                      </Link>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </section>

          <section className="h-full">
            <div className="container">
              <div className="custom-flex mx-auto justify-between w-full">
                <h1 className="tertiary-heading">What customers say</h1>
                <span>
                  <Link to={`/${laptop?.name}/${laptop?._id}/testimonials`}>
                    See All
                  </Link>
                </span>
              </div>
              <div className="custom-flex overflow-scroll gap-16 mt-6">
                {reviews ? (
                  reviews
                    .slice(0, 3)
                    .map((review) => (
                      <TestimonialCard key={review?._id} props={review} />
                    ))
                ) : (
                  <div>No Reviews yet</div>
                )}
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default LaptopDetail;
