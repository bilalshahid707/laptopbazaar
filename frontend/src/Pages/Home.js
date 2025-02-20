import { ProductCard, Loader, Error } from "../imports";
import { useGetLaptopsQuery } from "../Services/laptopsApi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const Home = () => {

  const navigate = useNavigate();

  let { data:laptops, isLoading, isError } = useGetLaptopsQuery();
  laptops = laptops && laptops.data;

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const queryParams = new URLSearchParams(data);
    queryParams.delete('price')
    queryParams.append('price[lte]',data.price)
    navigate(`all-products/?${queryParams.toString()}`);
  };

  return (
    <main className="h-full">
      {/* Hero Section */}
      <section className="hero h-[90vh]">
        <div className="max-w-screen-xl mx-auto h-full custom-flex">
          <div className="welcome-form bg-white  shadow-xl w-[80%] p-6 rounded-lg">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex gap-3 text-base items-center justify-between"
            >
              <div className="input-group w-[40%] flex flex-col gap-2  ">
                <label for="price">Price Range</label>
                <input
                  type="number"
                  placeholder="15000"
                  className="form-input"
                  {...register("price")}
                />
              </div>
              <div className="input-group w-[40%] flex flex-col gap-2 ">
                <label for="price">Purpose of work</label>
                <select className="dropdown" {...register("usageType")}>
                  <option value="student" key="">
                    student
                  </option>
                  <option value="business" key="">
                    business
                  </option>
                  <option value="designer" key="">
                    designer
                  </option>
                  <option value="workstation" key="">
                    workstation
                  </option>
                  <option value="gaming" key="">
                    gaming
                  </option>
                  <option value="convertible" key="">
                    convertible
                  </option>
                </select>
              </div>
              <div className="input-group flex flex-col gap-2 ">
                <label className="invisible">purchase</label>
                <input
                  type="submit"
                  value="Purchase"
                  className="btn-filled self-center border-2 border-blue"
                />
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="brands h-max bg-white">
        <div className="container h-full custom-flex flex-col">
          <h1 className="tertiary-heading text-black">Popular Brands</h1>
          <div className="custom-flex flex-wrap justify-between w-full mt-6">
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
          <div className="custom-flex justify-between w-full flex-wrap mt-6">
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
          <div className="w-full custom-flex relative">
            <h1 className="tertiary-heading">Most Recent Listings</h1>
            <span className="absolute right-0 top-1/2 text-blue underline">
              <Link to="/all-products">See All</Link>
            </span>
          </div>
          {isError ? <Error /> : ""}
          {isLoading ? (
            <Loader />
          ) : (
            <div className="custom-flex justify-between flex-wrap gap-8 mt-6">
              {laptops &&
                laptops.slice(0, 8).map((laptop) => (
                  <Link to={`/${laptop.name}/${laptop._id}`} key={laptop._id}>
                    <ProductCard props={laptop} />
                  </Link>
                ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
