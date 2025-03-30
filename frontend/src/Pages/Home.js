import { ProductCard, Loader, useLaptops,Error } from "../imports";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export const Home = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const { isFetching, data, error } = useLaptops({searchParams:''})
  const onSubmit = (data) => {
    const queryParams = new URLSearchParams(data);
    queryParams.delete("price");
    queryParams.append("price[lte]", data.price);
    navigate(`all-products/?${queryParams.toString()}`);
  };
  
  const laptops = data?.data;

  return (
    <main className="h-full">
      <section className="hero h-[90vh]">
        <div className="max-w-screen-xl mx-auto h-full custom-flex">
          <div className="welcome-form bg-white  shadow-xl w-[80%] p-6 rounded-lg">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col sm:flex-row gap-3 text-base items-center justify-between"
            >
              <div className="input-group w-full md:w-[40%] flex flex-col gap-2  ">
                <label htmlFor ="price">Price Range</label>
                <input
                  type="number"
                  placeholder="15000"
                  className="form-input"
                  {...register("price")}
                />
              </div>
              <div className="input-group w-full md:w-[40%] flex flex-col gap-2 ">
                <label htmlFor ="price">Purpose of work</label>
                <select className="dropdown" {...register("usageType")}>
                  <option value="student" >
                    student
                  </option>
                  <option value="business" >
                    business
                  </option>
                  <option value="designer" >
                    designer
                  </option>
                  <option value="workstation" >
                    workstation
                  </option>
                  <option value="gaming" >
                    gaming
                  </option>
                  <option value="convertible" >
                    convertible
                  </option>
                </select>
              </div>
              <div className="input-group flex flex-col gap-2 w-full md:w-[20%]">
                <label className="invisible">purchase</label>
                <input
                  type="submit"
                  value="Purchase"
                  className="btn-filled self-center w-full px-4"
                />
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="brands h-max bg-white">
        <div className="container h-full custom-flex flex-col">
          <h1 className="tertiary-heading text-black">Popular Brands</h1>
          <div className="custom-flex flex-col sm:flex-wrap sm:flex-row gap-4 justify-between w-full mt-6">
            <img
              src="https://placehold.co/150x100"
              alt="Laptop with blue screen"
              className="image"
            />
            <img
              src="https://placehold.co/150x100"
              alt="Gaming laptop with red backlight"
              className="image"
            />
            <img
              src="https://placehold.co/150x100"
              alt="Chromebook with Chrome logo"
              className="image"
            />
            <img
              src="https://placehold.co/150x100"
              alt="Convertible laptop with stylus"
              className="image"
            />
          </div>
        </div>
      </section>

      <section className="categories h-max bg-white">
        <div className="container h-full custom-flex flex-col">
          <h1 className="tertiary-heading text-black">Popular Categories</h1>
          <div className="custom-flex flex-col sm:flex-wrap sm:flex-row gap-4 justify-between w-full mt-6  ">
            <img
              src="https://placehold.co/150x100"
              alt="Laptop with blue screen"
              className="image"
            />
            <img
              src="https://placehold.co/150x100"
              alt="Gaming laptop with red backlight"
              className="image"
            />
            <img
              src="https://placehold.co/150x100"
              alt="Chromebook with Chrome logo"
              className="image"
            />
            <img
              src="https://placehold.co/150x100"
              alt="Convertible laptop with stylus"
              className="image"
            />
          </div>
        </div>
      </section>

      <section className="recent-listings h-full">
        <div className="container custom-flex flex-col">
          <div className="w-full custom-flex">
            <h1 className="tertiary-heading">Most Recent Listings</h1>
          </div>
          {error ? <Error/> : ""}
          {isFetching ? (
            <Loader />
          ) : (
            <div className="custom-flex justify-between flex-col sm:flex-wrap sm:flex-row gap-8 mt-6 ">
              {laptops &&
                laptops
                  .slice(0, 8)
                  .map((laptop) => (
                    <ProductCard key={laptop._id} props={laptop} />
                  ))}
            </div>
          )}
          <span className="mt-4 text-blue underline text-base">
            <Link to="/all-products">See All</Link>
          </span>
        </div>
      </section>
    </main>
  );
};

export default Home;
