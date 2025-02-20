import React from 'react'

export const NewSupplier = () => {
  return (
    <main>
        <section className="h-[50vh] bg-blue">
        <div className="container h-full custom-flex ">
          <div className="text-white custom-flex flex-col">
            <h1 className="primary-heading ">Become a Seller on Laptop Bazaar</h1>
            <p className="text-base ">
              Find the best laptops, accessories, and deals from trusted
              suppliers
            </p>
          </div>
        </div>
    </section>
    <section className='h-full'>
        <div className="container custom-flex">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="tertiary-heading text-black text-center">Supplier Registration</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-group">
              <label className="block text-gray-700">First Name</label>
              <input type="text" placeholder="Enter First Name" className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" />
            </div>
            <div className="input-group">
              <label className="block text-gray-700">Last Name</label>
              <input type="text" placeholder="Enter Last Name" className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" />
            </div>
          </div>
          <div className="input-group">
            <label className="block text-gray-700">Business Name</label>
            <input type="text" placeholder="Enter Business Name" className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" />
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Business Phone</label>
            <input type="tel" placeholder="Enter Business Phone" className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" />
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Business Email</label>
            <input type="email" placeholder="Enter Business Email" className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" />
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Password</label>
            <input type="password" placeholder="Enter Password" className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" />
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Business Website</label>
            <input type="url" placeholder="Enter Business Website" className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" />
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Business Type</label>
            <select className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none">
              <option>Select Business Type</option>
              <option>Retail</option>
              <option>Wholesale</option>
              <option>Manufacturer</option>
              <option>Service Provider</option>
            </select>
          </div>

          <button className="w-full btn-filled">
            Register
          </button>
        </form>
      </div>
    </div>
      </section>
    </main>
  )
}

export default NewSupplier
