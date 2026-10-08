import AddBtnDetails from "@/app/_SharedComponent/AddBtnDetails/AddBtnDetails";
import DetailsSlider from "@/app/_SharedComponent/DetailsSlider/DetailsSlider";
import getProductDetails from "@/services/productDetails.service";
import Image from "next/image";
import { ProductResponce } from "@/interface/response.type";

import AddWishlistdetails from "../../../_SharedComponent/addwishlist/addwishlistdetails"


const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>;
const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>;

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await getProductDetails(id);


  return (
    <div className="max-w-7xl mt-20 ml-4 " dir="ltr">
      
      

   <div className="grid grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)] gap-10 items-start">
          
          {/* ===== Product Images (Left) ===== */}
          <div className="lg:sticky lg:top-6 self-start flex flex-col gap-3 w-full">
            <DetailsSlider imglist={data.images} />
          </div>

          {/* ===== Product Details (Right) ===== */}

          <div className="w-full min-w-0 flex flex-col gap-4">

    {/* Tags */}
    <div className="flex gap-2">
      <span className="bg-[#e8f5e9] text-[#2e7d32] text-xs font-medium px-3 py-1 rounded-full">
        {data.category.name}
      </span>

      <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
       {data.brand.name}
      </span>
    </div>

    {/* Title */}
    <h1 className="text-3xl font-bold text-gray-900">
     {data.title}
    </h1>

    {/* Rating */}
    <div className="flex items-center gap-2">
      <div className="flex">
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <span className="text-gray-300">
          <StarIcon />
        </span>
      </div>

      <span className="text-sm text-gray-500">
       {data.ratingsAverage}
      </span>
    </div>

    {/* Price */}
    <div className="text-3xl font-bold text-gray-900 mt-2">
      {data.price} EGP
    </div>

    {/* Stock */}
    <div>
      <span className="inline-flex items-center gap-1.5 bg-[#e8f5e9] text-[#2e7d32] text-xs font-medium px-3 py-1 rounded-full">
        <span className="w-2 h-2 rounded-full bg-[#2e7d32]"></span>
        In Stock
      </span>
    </div>

    {/* Description */}
    <p className="text-gray-600 text-sm mt-2">
      {data.description}
    </p>

    <hr className="border-gray-100 my-2" />

    {/* Quantity */}
    <div className="flex flex-col gap-4">

      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium">
          Quantity
        </span>

        <div className="flex items-center border border-gray-300 rounded-md">
          <button className="px-3 py-1 text-gray-500 hover:bg-gray-50">
            -
          </button>

          <input
            type="text"
            value="1"
            readOnly
            className="w-12 text-center border-x border-gray-300 py-1 outline-none text-gray-800"
          />

          <button className="px-3 py-1 text-gray-500 hover:bg-gray-50">
            +
          </button>
        </div>

        <span className="text-sm text-gray-400">
          {data.quantity}
        </span>
      </div>

      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md mt-2">
        <span className="text-gray-700 font-medium">
          Total Price:
        </span>

        <span className="text-2xl font-bold text-[#22c55e]">
          149.00 EGP
        </span>
      </div>

    </div>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-3 mt-2">

       <AddBtnDetails productId={data._id}  />

      <button className="flex-1 bg-[#111827] hover:bg-black text-white py-3 px-6 rounded-md font-medium flex items-center justify-center gap-2 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 011.913-.143z"
            clipRule="evenodd"
          />
        </svg>

        Buy Now
      </button>

    </div>

{/* Wishlist */}
<AddWishlistdetails productId={data._id} />



    {/* Features */}
    <div className="grid grid-cols-3 gap-4 mt-6 border-t border-gray-100 pt-6">

      <div className="flex flex-col items-center text-center gap-1">
        <div className="text-[#22c55e]">
          🚚
        </div>
        <span className="text-xs font-medium text-gray-800">
          Free Delivery
        </span>
      </div>

      <div className="flex flex-col items-center text-center gap-1">
        <div className="text-[#22c55e]">
          🔄
        </div>
        <span className="text-xs font-medium text-gray-800">
          30 Days Return
        </span>
      </div>

      <div className="flex flex-col items-center text-center gap-1">
        <div className="text-[#22c55e]">
          🛡️
        </div>
        <span className="text-xs font-medium text-gray-800">
          Secure Payment
        </span>
      </div>

    </div>

          </div>
          
        </div>

      </div>
    
  );
}