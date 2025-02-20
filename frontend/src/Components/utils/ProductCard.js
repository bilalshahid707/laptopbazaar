import React from "react";

// import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
export const ProductCard = ({props}) => {

  return (
    <div className="cursor-pointer hover:scale-105 transition-all max-w-60 min-w-60 rounded-lg border border-gray-200 shadow-sm overflow-hidden bg-white">
      <div className="h-52 bg-gray-200"></div>
      <div className="bg-blueAccent p-2 text-sm text-blue font-medium capitalize">
        {props.brand}
      </div>
      <div className="p-4 custom-flex flex-col items-start gap-4">
        <div className="content-group">
          <h2 className="tertiary-heading mb-0 font-bold">Rs {props.price}</h2>
          <p className="text-black text-base capitalize">
            {props.name}
          </p>
        </div>
        <div className="content-group text-gray-500">
          <p className="text-sm mt-1 capitalize">{props.supplier && props.supplier.businessName}</p>
          <div className="custom-flex justify-between text-sm mt-1">
            <div className="">
              <span>Hall Road</span>
            </div>
            <div className="">
              <span>4.7</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};
export default ProductCard;
