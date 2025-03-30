import React from 'react'
import { ProductForm } from '../imports'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {Loader} from "../imports"
export const UpdateLaptop = () => {
    const {id} = useParams()
    let {data:laptop,isLoading} = useQuery({
        queryKey:['laptop',id],
        queryFn:async()=>{
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/laptops/${id}`)
            return response.data
        }
    })
    laptop=laptop?.data
  return (
    isLoading?<Loader/>:<ProductForm laptop={laptop}/>
  )
}

export default UpdateLaptop
