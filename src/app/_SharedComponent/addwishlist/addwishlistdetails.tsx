"use client";

import addwishlist from "@/services/wishlistActions/addwishlist.service";

export default function AddWishlistdetails({
  productId,
}: {
  productId: string;
}) {
  async function addToWishlist() {
    try {
      const response = await addwishlist(productId);

      console.log(response);
    } catch (error) {
      console.log("Wishlist error:", error);
    }
  }

  return (
    <button
      onClick={addToWishlist}
      className="w-full border border-gray-200 hover:border-gray-300 text-gray-700 py-3 rounded-md font-medium flex items-center justify-center gap-2 transition-colors mt-2"
    >
      <span className="text-xl">♡</span>
      Add to Wishlist
    </button>
  );
}