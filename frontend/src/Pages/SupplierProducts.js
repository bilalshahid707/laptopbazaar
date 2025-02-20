import { ProductCard } from "../imports";
import { useGetSupplierLaptopsQuery } from "../Services/suppliersApi";
import { useParams } from "react-router-dom";
export const SupplierProducts = () => {

  const {suppliername} = useParams()
  let {data:laptops} = useGetSupplierLaptopsQuery(suppliername)
  laptops = laptops.data

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
        <div className="custom-flex justify-between flex-wrap gap-8 mt-6">
          {laptops && laptops.map((laptop)=>(
            <ProductCard props={laptop}/>
          ))}
        </div>
        </div>
      </section>
    </main>
  );
};

export default SupplierProducts;
