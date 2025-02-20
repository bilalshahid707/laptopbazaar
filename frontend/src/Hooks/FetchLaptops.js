import React from 'react'

const FetchLaptops = () => {
    const { data, isLoading , isError} = useGetLaptopsQuery(location.search);
    const laptops = data && data.data;
  return (
    <div>
      
    </div>
  )
}

export default FetchLaptops
