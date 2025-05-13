import React from "react";
import { Link } from "react-router-dom";

export const ProductCard = ({ props }) => {
  return (
    <Link to={`/${props.name}/${props._id}`}><div className="cursor-pointer hover:scale-105 transition-all max-w-60 min-w-56 rounded-lg border border-gray-200 shadow-sm overflow-hidden bg-white">
      <div className="h-52">
        <img className="w-full h-full object-cover" src={`${props.images[0]}`} alt="" />
      </div>
      <div className="bg-blueAccent p-2 text-sm text-blue font-medium capitalize">
        {props.brand}
      </div>
      <div className="p-4 custom-flex flex-col items-start gap-4">
        <div className="content-group">
          <h2 className="tertiary-heading mb-0 font-bold">Rs {props.price}</h2>
          <p className="text-black text-base capitalize">{props.name}</p>
        </div>
        <div className="content-group text-gray-500">
          <p className="text-sm mt-1 capitalize">
            {props.supplier?.businessName}
          </p>
          <div className="custom-flex justify-between text-sm mt-1 gap-3">
            <div className="">
              <span>{props.supplier?.location}</span>
            </div>
            <div className="text-sm">
              <span>{props.avgRating.toFixed(1)} ({props.ratingsQuantity})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};
export default ProductCard;
