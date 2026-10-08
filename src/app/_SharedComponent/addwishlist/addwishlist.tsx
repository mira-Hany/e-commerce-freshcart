
"use client";

import addwishlist from "@/services/wishlistActions/addwishlist.service";

export default function AddWishlist( { productId }: { productId: string }) {

    async function addToWishlist(){
      const responce = await addwishlist(productId)
    }

  return (
    <button
      aria-label="Add to favorites"
      className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-green-700 hover:text-white transition"
      onClick={addToWishlist}
    >
      <span className="text-2xl">♡</span>
    </button>
  );
}