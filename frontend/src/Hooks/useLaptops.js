import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const useLaptops = ({searchParams}) => {
  const { isFetching, data, error } = useQuery({
    queryKey: ["laptops", searchParams],
    queryFn: async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/laptops/${searchParams && searchParams}`
      );
      return response.data;
    },
    refetchOnMount: "always",
  });

  return { isFetching, data, error };
};

export default useLaptops;
