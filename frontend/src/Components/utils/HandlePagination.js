import React, { useState } from 'react'

export const HandlePagination = ({e,value}) => {
    const [page,setPage] = useState(0)
    setPage(value)
  return (
    page
  )
}

export default HandlePagination
