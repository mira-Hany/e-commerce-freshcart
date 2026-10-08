"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import deleteWishlistItem from "../../../services/wishlistActions/deletewishlist.service";

export default function WishlistItems({
  products,
}: {
  products: any[];
}) {
  const [wishlistProducts, setWishlistProducts] = useState(products);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleDelete(productId: string) {
    try {
      setLoadingId(productId);

      const response = await deleteWishlistItem(productId);


      if (response?.status === "success") {
        setWishlistProducts((currentProducts) =>
          currentProducts.filter(
            (product) => product._id !== productId
          )
        );
      }
    } catch (error) {
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {wishlistProducts.map((product: any) => {
        const productId = product._id;
        const isLoading = loadingId === productId;

        return (
          <div
            key={productId}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group"
          >

            {/* Image */}
            <Link href={`/productDetails/${productId}`}>
              <div className="relative w-full h-64 bg-gray-50">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition duration-300"
                />
              </div>
            </Link>

            {/* Product Info */}
            <div className="p-4">

              <p className="text-sm text-green-600 mb-1">
                {product.category?.name}
              </p>

              <Link href={`/productDetails/${productId}`}>
                <h2 className="font-semibold text-gray-800 line-clamp-2 min-h-12 hover:text-green-600 transition">
                  {product.title}
                </h2>
              </Link>

              {/* Price */}
              <div className="mt-3">
                <span className="text-lg font-bold text-green-600">
                  {product.price} EGP
                </span>
              </div>

              {/* Delete */}
              <button
                onClick={() => handleDelete(productId)}
                disabled={isLoading}
                className="w-full mt-4 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-500 hover:text-white transition disabled:opacity-50"
              >
                {isLoading ? "Removing..." : "Remove from Wishlist"}
              </button>

            </div>
          </div>
        );
      })}

    </div>
  );
}
