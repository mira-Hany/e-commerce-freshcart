
import Link from "next/link";
import getProductCart from "@/services/CartAtions/getproductcart.action";
import { getMyToken } from "@/Utilities/getMyToken";
import CheckoutForm from "../[id]/CheckoutForm";

const CartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 0 0 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 0 0 1.5 0Z"
    />
  </svg>
);

export default async function Checkout() {


  
  const token = await getMyToken();

  if (!token) {
    return (
      <div className="min-h-[70vh] w-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Please Login First
          </h1>

          <Link
            href="/Login"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  const cartData = await getProductCart();
  const cart = cartData?.data;

  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div className="min-h-[70vh] w-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Your Cart Is Empty
          </h1>

          <Link
            href="/"
            className="text-green-600 font-semibold hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#f8fafb] py-7">
      <div className="w-full px-5 lg:px-8">

        {/* Breadcrumb */}
        <div className="text-[12px] text-gray-500 mb-5">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link href="/Cart" className="hover:text-green-600">
            Cart
          </Link>

          <span className="mx-2">/</span>

          <span className="text-gray-700 font-medium">
            Checkout
          </span>
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-lg bg-green-600 text-white flex items-center justify-center">
                <CartIcon />
              </div>

              <h1 className="text-2xl font-bold text-gray-900">
                Complete Your Order
              </h1>

            </div>

            <p className="text-lg text-gray-500 mt-2">
              Review your items and complete your purchase
            </p>
          </div>

          <Link
            href="/Cart"
            className="text-green-600 text-lg font-medium hover:underline"
          >
            ← Back to Cart
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_310px] gap-5 items-start">

          {/* LEFT SIDE */}
          <CheckoutForm />

          {/* RIGHT SIDE */}
          <aside>

            <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm sticky top-5">

              {/* Order Summary Header */}
              <div className="bg-green-600 text-white px-4 py-3">

                <div className="flex items-center gap-2">

                  <CartIcon />

                  <div>

                    <h2 className="text-2xl font-bold">
                      Order Summary
                    </h2>

                    <p className="text-lg text-green-50 mt-0.5">
                      {cart.products.length} items
                    </p>

                  </div>

                </div>

              </div>

              {/* Products */}
              <div className="p-3">

                {cart.products.map((item: any) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 mb-2"
                  >

                    <div className="w-10.5 h-10.5 rounded-lg bg-white border border-gray-100 overflow-hidden shrink-0">

                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-full h-full object-contain"
                      />

                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="text-lg font-medium text-gray-800 truncate">
                        {item.product.title}
                      </p>

                      <p className="text-s text-gray-400 mt-1">
                        {item.count} × {item.price} EGP
                      </p>

                    </div>

                    <p className="text-s font-bold text-gray-800">
                      {(item.count * item.price).toLocaleString()}
                    </p>

                  </div>
                ))}

                {/* Divider */}
                <div className="border-t border-gray-100 my-3" />

                {/* Subtotal */}
                <div className="flex justify-between text-s text-gray-600 mb-3">

                  <span>
                    Subtotal
                  </span>

                  <span>
                    {cart.totalCartPrice.toLocaleString()} EGP
                  </span>

                </div>

                {/* Shipping */}
                <div className="flex justify-between text-s text-gray-600 mb-3">

                  <span className="flex items-center gap-1">
                    🚚 Shipping
                  </span>

                  <span className="text-green-600 font-bold">
                    FREE
                  </span>

                </div>

                {/* Total */}
                <div className="border-t border-gray-100 pt-3 flex justify-between items-center">

                  <span className="text-s font-bold text-gray-900">
                    Total
                  </span>

                  <span className="text-s font-bold text-green-600">

                    {cart.totalCartPrice.toLocaleString()}

                    <span className="text-[9px] text-gray-500 ml-1">
                      EGP
                    </span>

                  </span>

                </div>

                {/* Place Order */}
                 <button
  type="submit"
  form="checkout-form"
  className="w-full h-9.5 mt-4 rounded-lg bg-green-600 hover:bg-green-700 text-white text-s font-bold transition"
>
  🔒 Place Order
</button>

                {/* Benefits */}
                <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between text-xs text-gray-500">

                  <span>
                    🛡 Secure
                  </span>

                  <span>
                    🚚 Fast Delivery
                  </span>

                  <span>
                    ↩ Easy Returns
                  </span>

                </div>

              </div>
            </section>

          </aside>

        </div>
      </div>
    </main>
  );
}

