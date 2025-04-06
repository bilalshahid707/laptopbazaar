import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import axios from 'axios'
export const NewSupplier = () => {
  const user = useSelector((state) => state.User.User);
  const {register,reset,handleSubmit} = useForm()
  const mutation = useMutation({
    queryKey:["supplier"],
    mutationFn:async(body)=>{
      const response = await axios.post("http://127.0.0.1:8000/api/v1/suppliers",body,{
        headers:{
          "Content-Type":"application/json",
          'userid':`${user?._id}`
        }
      })
      return response.data
    }
  })
  
  const onSubmit = (data)=>{
    Object.keys(data).forEach(key=>{
      data[key]=data[key].toLowerCase()
    })
    mutation.mutate(data,{
      onSuccess:()=>{
        alert("You have been registered as supplier head over to login page")
      },onError:(error)=>{
        alert(error.response.data.message)
      }
    })
    reset()
  }
  return (
    <main>
        <section className="h-[50vh] bg-whiteAccent">
        <div className="container h-full custom-flex ">
          <div className="text-blue custom-flex flex-col">
            <h1 className="primary-heading text-center ">Become a Seller on Laptop Bazaar</h1>
            <p className="text-base text-center">
              Find the best laptops, accessories, and deals from trusted
              suppliers
            </p>
          </div>
        </div>
    </section>
    <section className='h-full'>
        <div className="container custom-flex">
        <div className="bg-white p-5 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="tertiary-heading text-black text-center">Supplier Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="input-group">
              <label className="block text-gray-700">Full Name</label>
              <input type="text" placeholder="Muhammad Salman" className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" {...register("name")}/>
            </div>
          <div className="input-group">
            <label className="block text-gray-700">Business Name</label>
            <input type="text" placeholder="salman laptops" className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" {...register("businessName")} />
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Business Phone</label>
            <input type="tel" placeholder="03203549004" className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" {...register("businessPhone")} />
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-group">
              <label className="block text-gray-700">Email</label>
              <input type="email" placeholder="example@gmail.com" className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" {...register('email')} />
            </div>
            <div className="input-group">
              <label className="block text-gray-700">Business Email</label>
              <input type="email" placeholder="info@example.com" className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" {...register("businessEmail")}/>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-group">
              <label className="block text-gray-700">Password</label>
              <input type="password" placeholder="******" className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" min={8} {...register("password")}/>
            </div>
            <div className="input-group">
              <label className="block text-gray-700">Confirm Password</label>
              <input type="password" placeholder="******" className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" min={8} {...register("confirmPassword")}/>
            </div>
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Business Website</label>
            <input type="url" placeholder="https://www.bestlaptopsstore.com" className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" {...register("businessWebsite")} />
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Business Type</label>
            <select className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" {...register("businessType")}>
              <option>Select Business Type</option>
              <option>Retail</option>
              <option>Wholesale</option>
            </select>
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Location</label>
            <input type="text" placeholder="wapda town" className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" {...register("location")} />
          </div>

          <input type='submit' value="Register" className="w-full btn-filled"/>
        </form>
      </div>
    </div>
      </section>
    </main>
  )
}

export default NewSupplier
