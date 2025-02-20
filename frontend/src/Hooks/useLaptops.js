import { useGetLaptopsQuery } from "../Services/laptopsApi";
export const useLaptops = ({ query }) => {
  const { data, isLoading, isError } = useGetLaptopsQuery(query);
  const laptops = data && data.data;
  return { laptops, isLoading, isError };
};

export default useLaptops;
