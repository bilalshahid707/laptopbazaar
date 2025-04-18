import React from "react";
import { TestimonialCard } from "../imports";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export const Testimonials = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey:['reviews'],
    queryFn:async()=>{
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/v1/reviews/${id}`)
      return response.data
    }
  });
  reviews = data?.data;

  return (
    <main>
      <section className="h-full bg-whiteAccent">
        <div className="container h-full custom-flex flex-col">
          <div className="text-blue custom-flex flex-col gap-2">
            <h1 className="secondary-heading">Testimonials</h1>
          </div>
        </div>
      </section>

      <section className="h-full">
        <div className="container custom-flex flex-col">
          <div className="custom-flex justify-between flex-wrap gap-8 mt-6">
            {reviews && reviews.map((review)=>(
            <TestimonialCard props={review}/>
          ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Testimonials;
