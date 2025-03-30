import { ProductCard} from "../imports";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {Error,Loader} from "../imports"
export const SupplierProducts = () => {

  const {suppliername} = useParams()
  const {data,error,isLoading} = useQuery({
    queryKey:['laptops'],
    queryFn:async()=>{
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/suppliers/${suppliername}`)
      return response.data
    }
  })
  const laptops = data?.data

  return (
    <main>
      <section className="h-full bg-whiteAccent">
        <div className="container h-full custom-flex flex-col">
          <div className="text-blue custom-flex flex-col gap-2">
            <img src="" alt="" className="w-40 h-40 rounded-full bg-black" />
            <h1 className="secondary-heading">All Products from supplier</h1>
          </div>
        </div>
      </section>

      <section className="h-full">
        <div className="container custom-flex flex-col">
        <div className="custom-flex flex-col sm:flex-wrap sm:flex-row justify-between gap-8 mt-6">
          {error?<Error/>:''}
          {isLoading?<Loader/>:''}
          {laptops && laptops.length>0?laptops.map((laptop)=>(
            <ProductCard props={laptop}/>
          )):<div>No Products Found</div>}
        </div>
        </div>
      </section>
    </main>
  );
};

export default SupplierProducts;
