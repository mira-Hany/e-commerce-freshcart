import { getMyToken } from "@/Utilities/getMyToken";
import getProductCart from "@/services/CartAtions/getproductcart.action";
import Link from "next/link";
import CartItems from "./CartItems";


const UserIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v2h16v-2c0-2.76-3.58-5-8-5Z" />
  </svg>
);

const LockIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-5 h-5"
  >
    <rect
      x="4"
      y="10"
      width="16"
      height="11"
      rx="2"
    />

    <path
      d="M8 10V7a4 4 0 0 1 8 0v3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default async function CartPage() {



  // =========================
  // Check Login
  // =========================

  
  const token = await getMyToken();


  // =========================
  // Get Cart
  // =========================

  const cartData = await getProductCart();

  const cart = cartData?.data;


  // =========================
  // Empty Cart
  // =========================

  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Your cart is empty
        </h2>

        <Link
          href="/"
          className="text-green-600 hover:underline"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // =========================
  // Cart Page
  // =========================

  return (
    <div className="container mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">

          <span className="bg-green-600 text-white p-2 rounded-lg text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 0 0 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 0 0 1.5 0Z"
              />
            </svg>
          </span>

          Shopping Cart
        </h1>

        <p className="text-gray-500 mt-2">
          You have{" "}
          <span className="text-green-600 font-bold">
            {cart.products.length} items
          </span>{" "}
          in your cart
        </p>
      </div>

      {/* Main */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Products */}
        <div className="lg:col-span-2">
          <CartItems products={cart.products} />
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">

            {/* Summary Header */}
            <div className="bg-slate-900 text-white p-4">
              <h2 className="font-bold text-lg">
                Order Summary
              </h2>
            </div>

            <div className="p-6 space-y-4">

              {/* Subtotal */}
              <div className="flex justify-between text-gray-600">
                <span>
                  Subtotal ({cart.products.length} items)
                </span>

                <span className="font-bold text-gray-900">
                  {cart.totalCartPrice} EGP
                </span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between text-gray-600">
                <span>
                  Shipping
                </span>

                <span className="text-green-600 font-medium">
                  Calculated at checkout
                </span>
              </div>

              {/* Total */}
              <div className="border-t pt-4 flex justify-between items-center">

                <span className="font-bold text-lg">
                  Estimated Total
                </span>

                <span className="font-bold text-xl text-green-600">
                  {cart.totalCartPrice} EGP
                </span>

              </div>

              {/* ========================= */}
              {/* Checkout */}
              {/* ========================= */}

              
                <Link
                  href={`/checkout/${cart._id}`}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition mt-4"
                >
                  <LockIcon />

                  Secure Checkout
                </Link>
             
               

              {/* Register */}
              {!token && (
                <div className="text-center text-sm text-gray-500 mt-4">
                  Don't have an account?{" "}

                  <Link
                    href="/Register"
                    className="text-green-600 font-bold hover:underline"
                  >
                    Sign up
                  </Link>
                </div>
              )}

              {/* Benefits */}
              <div className="mt-6 space-y-2 text-sm text-gray-500">

                <p>
                  ✓ Your cart items will be saved
                </p>

                <p>
                  ✓ Track your orders easily
                </p>

                <p>
                  ✓ Access exclusive member deals
                </p>

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}