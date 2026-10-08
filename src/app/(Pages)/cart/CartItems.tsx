"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import updateProductCart from "@/services/CartAtions/updateproductcart.action";
import deleteProductCart from "@/services/CartAtions/deletproductcart.action";
import clearProductCart from "@/services/CartAtions/clearCart.action";
import { cartconext } from "@/app/Context/CartContext";

const TrashIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path d="M9 3h6l1 2h4v2h-1v13H5V7H4V5h4l1-2Zm-2 4v11h10V7H7Zm2 2h2v7H9V9Zm4 0h2v7h-2V9Z" />
  </svg>
);

export default function CartItems({products}: { products: any[]}) {
 const {setcartNumber} = useContext(cartconext);


  const router = useRouter();

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [clearLoading, setClearLoading] = useState(false);

  

  // =========================
  // Update Quantity
  // =========================

  async function handleUpdate(
    productId: string,
    count: number
  ) {
    try {
      setLoadingId(productId);


      const response = await updateProductCart(count, productId);

      if (response.status === "success") {
        setcartNumber(response.numOfCartItems);
      }


      router.refresh();
      
    } catch (error) {
    } finally {
      setLoadingId(null);
    }
  }

  // =========================
  // Delete Product
  // =========================

  async function handleDelete(productId: string) {
    try {
      setLoadingId(productId);

      const response = await deleteProductCart(productId);

      if (response.status === "success") {
        setcartNumber(response.numOfCartItems);
      }


      router.refresh();
    } catch (error) {
    } finally {
      setLoadingId(null);
    }
  }

  // =========================
  // Clear Cart
  // =========================

  async function handleClearCart() {
    try {
      setClearLoading(true);

 const response = await clearProductCart();

      if (response.status === "success") {
        setcartNumber(0);
      }
      router.refresh();
    } catch (error) {
    } finally {
      setClearLoading(false);
    }
  }

  return (
    <>
      {/* Products */}
      <div className="space-y-4">

        {products.map((item: any) => {

          const productId = item.product._id;

          const isLoading = loadingId === productId;

          return (
            <div
              key={productId}
              className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
            >

              {/* Product Info */}
              <div className="flex items-center gap-4 w-full sm:w-auto">

                <img
                  src={item.product.imageCover}
                  alt={item.product.title}
                  className="w-20 h-20 object-contain rounded-lg bg-gray-50"
                />

                <div>

                  <h3 className="font-semibold text-gray-800 line-clamp-1">
                    {item.product.title}
                  </h3>

                  <p className="text-sm text-gray-500 mb-1">
                    {item.product.category?.name}
                  </p>

                  <p className="text-green-600 font-bold">
                    {item.price} EGP
                  </p>

                </div>

              </div>

              {/* Actions */}
              <div className="flex items-center gap-6 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">

                {/* Quantity */}
                <div className="flex items-center border rounded-lg overflow-hidden">

                  {/* Minus */}
                  <button
                    disabled={isLoading || item.count === 1}
                    onClick={() =>
                      handleUpdate(
                        productId,
                        item.count - 1
                      )
                    }
                    className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 disabled:opacity-50"
                  >
                    -
                  </button>

                  {/* Count */}
                  <span className="px-4 py-1 font-medium min-w-12 text-center">
                    {isLoading ? "..." : item.count}
                  </span>

                  {/* Plus */}
                  <button
                    disabled={isLoading}
                    onClick={() =>
                      handleUpdate(
                        productId,
                        item.count + 1
                      )
                    }
                    className="px-3 py-1 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                  >
                    +
                  </button>

                </div>

                {/* Total */}
                <div className="text-right">

                  <p className="text-xs text-gray-400">
                    Total
                  </p>

                  <p className="font-bold text-gray-800">
                    {item.price * item.count} EGP
                  </p>

                </div>

                {/* Delete */}
                <button
                  disabled={isLoading}
                  onClick={() => handleDelete(productId)}
                  aria-label="Delete product"
                  className="text-red-400 hover:text-red-600 p-2 disabled:opacity-50"
                >
                  <TrashIcon />
                </button>

              </div>

            </div>
          );
        })}

      </div>

      {/* Bottom Actions */}
      <div className="flex justify-between items-center mt-6">

        <Link
          href="/"
          className="text-green-600 font-medium flex items-center gap-2 hover:underline"
        >
          ← Continue Shopping
        </Link>

        <button
          onClick={handleClearCart}
          disabled={clearLoading}
          className="text-gray-400 hover:text-red-500 text-sm flex items-center gap-1 disabled:opacity-50"
        >
          <TrashIcon />

          {clearLoading
            ? "Clearing..."
            : "Clear all items"}
        </button>

      </div>
    </>
  );
}