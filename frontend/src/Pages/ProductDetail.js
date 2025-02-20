import React from "react";
import { TestimonialCard, Loader } from "../imports";
import { Link, useParams } from "react-router-dom";
import { useGetLaptopQuery } from "../Services/laptopsApi";
import {
  useCreateReviewMutation,
  useGetLaptopReviewsQuery,
} from "../Services/reviewsApi";
import { useForm } from "react-hook-form";
export const ProductDetail = () => {
  // Fetching laptop data
  const { id } = useParams();
  let { data: laptop, isLoading: laptopLoading } = useGetLaptopQuery(id);
  laptop = laptop?.data;

  // Fetching reviews
  let { data: reviews } = useGetLaptopReviewsQuery(laptop?._id, {
    skip: !laptop?._id,
  });
  reviews = reviews?.data || [];

  // Posting review
  const { register, handleSubmit, reset } = useForm();
  const [createReview] = useCreateReviewMutation();
  const submitReview = async (data) => {
    let reviewData = { ...data, laptop: laptop._id, user:laptop.supplier._id };
    await createReview(reviewData);
    reset();
  };
  return (
    <>
      {laptopLoading ? (
        <Loader />
      ) : (
        <main>
          <section className="h-full">
            <div className="container custom-flex gap-4 items-start">
              <div className="images w-[60%] h-full">
                <div className="cover h-96 bg-black">
                  <img
                    src="/mnt/data/Screenshot 2025-02-17 105743.png"
                    alt="Laptop Display"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="images w-full flex gap-2 mt-2">
                  <div className="bg-gray-700 w-24 h-16"></div>
                  <div className="bg-gray-600 w-24 h-16"></div>
                  <div className="bg-gray-500 w-24 h-16"></div>
                  <div className="bg-gray-400 w-24 h-16"></div>
                  <div className="bg-gray-300 w-24 h-16"></div>
                </div>
              </div>

              <div className="w-[40%] h-full custom-flex flex-col gap-4">
                <div className="box">
                  <h2 className="secondary-heading font-bold text-blue text-blue-700">
                    Rs {laptop.price}
                  </h2>
                  <p className="text-blue tertiary-heading capitalize">
                    {laptop.name}
                  </p>
                </div>

                <div className="box custom-flex flex-col gap-4 items-start">
                  <h3 className="font-semibold">Listed by private supplier</h3>
                  <div className="custom-flex gap-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full">
                      <img src={laptop.supplier.logo} alt="" />
                    </div>
                    <div>
                      <p className="font-medium capitalize">
                        {laptop.supplier.name}
                      </p>
                      <p className="text-base text-gray-500">
                        Member since{" "}
                        {new Date(laptop.supplier.listedAt).toLocaleString(
                          "en-US",
                          { month: "long", year: "numeric" }
                        )}
                      </p>
                      <Link
                        to={`/${laptop.supplier.slug}`}
                        className="text-blue-600 text-base"
                      >
                        See profile &gt;
                      </Link>
                    </div>
                  </div>
                  <button className="w-full btn-filled">
                    Show phone number
                  </button>
                  <button className="w-full btn-outlined">
                    <a href="https://wa.me/03203529002?text=Hello%20there!"></a>{" "}
                    Chat
                  </button>
                </div>

                <div className="box">
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-gray-700 capitalize">
                    {laptop.supplier.location}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="">
            <div className="container custom-flex gap-4">
              <div className="description custom-flex flex-col items-start border-2 border-whiteAccent rounded-lg p-4 w-[70%]">
                <h2 className="tertiary-heading font-bold">Description</h2>
                <p className="text-base text-black">{laptop.description}</p>

                <h3 className="tertiary-heading font-bold">Features</h3>
                <ul className="list-disc list-inside text-black text-base capitalize">
                  <li>
                    <span className="font-bold">Brand:</span> {laptop.brand}
                  </li>
                  <li>
                    <span className="font-bold">generation:</span>{" "}
                    {laptop.generation}
                  </li>
                  <li>
                    <span className="font-bold">processor:</span>{" "}
                    {laptop.processor}
                  </li>
                  <li>
                    <span className="font-bold">model:</span> {laptop.model}
                  </li>
                  <li>
                    <span className="font-bold">storage:</span> {laptop.storage}
                  </li>
                  <li>
                    <span className="font-bold">operatingsystem:</span>{" "}
                    {laptop.operatingSystem}
                  </li>
                  <li>
                    <span className="font-bold">usagetype:</span>{" "}
                    {laptop.usageType}
                  </li>
                </ul>
              </div>
              <div className="review box self-stretch custom-flex flex-col w-[30%] ">
                <div className="custom-flex">
                  <div className="primary-heading text-yellow-400">
                    <ion-icon name="star"></ion-icon>
                  </div>
                  <p className="tertiary-heading text-blue">
                    <span className="primary-heading ">
                      {laptop.avgRating?laptop.avgRating?.toFixed(1):'N/A'}
                    </span>
                    /5.0
                  </p>
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
                        {...register("rating")}
                      />
                    </div>
                    <input
                      type="submit"
                      value="Post"
                      className="btn-filled w-full"
                    />
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
                  <a href="">See All</a>
                </span>
              </div>
              <div className="custom-flex flex-wrap gap-16 mt-6">
                {reviews?reviews.slice(0, 3).map((review) => (
                  <TestimonialCard key={review?.id} props={review} />
                )):<div>No Reviews yet</div>}
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default ProductDetail;
