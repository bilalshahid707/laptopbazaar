import React from 'react'

export const AddProduct = () => {
  return (
    <main>
        <div className='container custom-flex'>
        <form className="space-y-4 bg-whiteAccent w-1/2 p-8 rounded-lg">
 
            <div className="input-group">
              <label className="block text-gray-700">Product Name</label>
              <input type="text" placeholder="Enter Name" className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" />
            </div>
            <div className="input-group">
              <label className="block text-gray-700">Product Price</label>
              <input type="text" placeholder="Enter Price" className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" />
            </div>
     
          <div className="input-group">
            <label className="block text-gray-700">Product description</label>
            <textarea type="text" placeholder="Product Description" className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" />
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Category</label>
            <select className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none">
              <option>Select Category</option>
              <option>Retail</option>
              <option>Wholesale</option>
              <option>Manufacturer</option>
              <option>Service Provider</option>
            </select>
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Select Processor</label>
            <select className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none">
              <option>Select Processor</option>
              <option>Retail</option>
              <option>Wholesale</option>
              <option>Manufacturer</option>
              <option>Service Provider</option>
            </select>
          </div>

          <div className="input-group">
            <label className="block text-gray-700">RAM</label>
            <input type="text" placeholder="16Gb" className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" />
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Storage</label>
            <input type="text" placeholder="256gb SSd" className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" />
          </div>

          <div className="input-group">
            <label className="block text-gray-700">Generation</label>
            <input type="url" placeholder="12" className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#003E71] focus:outline-none" />
          </div>

          <button className="w-full btn-filled">
            Add
          </button>
        </form>
        </div>
    </main>
  )
}

export default AddProduct
