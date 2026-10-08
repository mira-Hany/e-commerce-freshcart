import { getServerSession } from "next-auth";
import { authOption } from "@/Next-auth/authOption";
import { allordersservice } from "../../../services/allordersservice.service";
import Link from "next/link";

export default async function AllOrders() {
  const session = await getServerSession(authOption);

  const userId = session?.user?.id;

  if (!userId) {
    return (
      <main className="min-h-screen bg-[#f8fafb] py-10">
        <div className="max-w-6xl mx-auto px-5">
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              Please Login
            </h1>

            <Link
              href="/Login"
              className="text-green-600 hover:underline"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const response = await allordersservice(userId);

  if (response?.statusMsg === "fail") {
    return (
      <main className="min-h-screen bg-[#f8fafb] py-10">
        <div className="max-w-6xl mx-auto px-5">
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              Unable to Load Orders
            </h1>

            <p className="text-gray-500">
              {response.message}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const orders = Array.isArray(response) ? response : [];

  return (
    <main className="min-h-screen bg-white py-8 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-green-600">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48-.08-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.89-2-2-2z" />
              </svg>
            </div>

            <span className="text-2xl font-bold text-gray-800">
              FreshCart
            </span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-xl w-full relative">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 px-5 pr-12 text-sm focus:outline-none focus:border-green-500"
            />

            <button className="absolute right-2 top-1.5 bg-green-600 text-white p-1.5 rounded-full hover:bg-green-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Orders */}
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              No Orders Yet
            </h2>

            <Link
              href="/"
              className="text-green-600 hover:underline"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order: any) => (
              <div
                key={order._id}
                className="bg-white border border-green-100 rounded-lg shadow-sm"
              >

                {/* Order Header */}
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100">

                  <div className="flex items-center gap-4">

                    {/* Product Image + Payment Icon */}
                    <div className="relative w-16 h-16">

                      {/* Product Image */}
                      <div className="w-16 h-16 bg-gray-50 rounded border border-gray-100 flex items-center justify-center overflow-hidden">

                        {order.cartItems?.[0]?.product?.imageCover ? (
                          <img
                            src={order.cartItems[0].product.imageCover}
                            alt="Order Thumbnail"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="text-xs text-gray-400">
                            No Img
                          </span>
                        )}

                      </div>

                      {/* Cash Icon */}
                      {order.paymentMethodType === "cash" && (
                        <div
                          className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center shadow-md border-2 border-white"
                          title="Cash Payment"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-4 h-4"
                          >
                            <rect
                              x="3"
                              y="5"
                              width="18"
                              height="14"
                              rx="2"
                            />

                            <circle
                              cx="12"
                              cy="12"
                              r="3"
                            />

                            <path d="M7 8h.01" />
                            <path d="M17 16h.01" />
                          </svg>
                        </div>
                      )}

                      {/* Online Icon */}
                      {order.paymentMethodType !== "cash" && (
                        <div
                          className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md border-2 border-white"
                          title="Online Payment"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-4 h-4"
                          >
                            <rect
                              x="2"
                              y="5"
                              width="20"
                              height="14"
                              rx="2"
                            />

                            <path d="M2 10h20" />

                            <path d="M6 15h3" />
                          </svg>
                        </div>
                      )}

                    </div>

                    {/* Order Info */}
                    <div>

                      {/* Status + Date */}
                      <div className="flex items-center gap-2 mb-1">

                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded ${
                            order.isDelivered
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.isDelivered
                            ? "Delivered"
                            : "Processing"}
                        </span>

                        <span className="text-gray-400 text-xs">
                          |
                        </span>

                        <span className="text-gray-500 text-xs">
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>

                      </div>

                      {/* Order ID */}
                      <h2 className="text-lg font-bold text-gray-800">
                        #{order.id || order._id?.slice(-4)}
                      </h2>

                      {/* Items + City */}
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">

                        <span>
                          {order.cartItems?.length || 0} items
                        </span>

                        <span>
                          {order.shippingAddress?.city || "Cairo"}
                        </span>

                      </div>

                      {/* Payment Type */}
                      <div className="mt-2">

                        {order.paymentMethodType === "cash" ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600">
                            <span>💵</span>
                            Cash Payment
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
                            <span>💳</span>
                            Online Payment
                          </span>
                        )}

                      </div>

                    </div>

                  </div>

                  {/* Price + Hide */}
                  <div className="flex flex-col items-end gap-2 w-full sm:w-auto">

                    <div className="text-xl font-bold text-gray-800">
                      {order.totalOrderPrice?.toLocaleString()}{" "}
                      <span className="text-sm font-normal text-gray-500">
                        EGP
                      </span>
                    </div>

                    <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-6 py-1.5 rounded-md font-medium transition-colors">
                      Hide
                    </button>

                  </div>

                </div>

                {/* Order Items */}
                <div className="p-4 sm:p-6 bg-white">

                  <h3 className="text-sm font-bold text-gray-800 mb-4">
                    Order Items
                  </h3>

                  <div className="space-y-3">

                    {order.cartItems?.map((item: any) => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50/50"
                      >

                        {/* Product */}
                        <div className="flex items-center gap-4">

                          <div className="w-14 h-14 bg-white rounded border border-gray-200 p-1">

                            {item.product?.imageCover ? (
                              <img
                                src={item.product.imageCover}
                                alt={item.product?.title}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <span className="text-xs text-gray-400">
                                No Img
                              </span>
                            )}

                          </div>

                          <div>

                            <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">
                              {item.product?.title}
                            </h4>

                            <p className="text-xs text-gray-500 mt-0.5">
                              {item.count} ×{" "}
                              {item.price?.toLocaleString()} EGP
                            </p>

                          </div>

                        </div>

                        {/* Item Total */}
                        <div className="text-right">

                          <p className="text-sm font-bold text-gray-800">
                            {(
                              (item.price || 0) *
                              (item.count || 0)
                            ).toLocaleString()}
                          </p>

                          <p className="text-[10px] text-gray-400">
                            EGP
                          </p>

                        </div>

                      </div>
                    ))}

                  </div>

                </div>

                {/* Bottom / Order Summary */}
                <div className="p-4 sm:p-6 bg-gray-50/30 border-t border-gray-100">

                  <div className="bg-[#FFF9E6] rounded-lg p-4 border border-[#FFEBB8]">

                    <h3 className="text-sm font-bold text-gray-800 mb-3">
                      Order Summary
                    </h3>

                    <div className="space-y-2 text-sm">

                      {/* Subtotal */}
                      <div className="flex justify-between text-gray-600">

                        <span>
                          Subtotal
                        </span>

                        <span className="font-semibold">
                          {order.totalOrderPrice?.toLocaleString()} EGP
                        </span>

                      </div>

                      {/* Shipping */}
                      <div className="flex justify-between text-gray-600">

                        <span>
                          Shipping
                        </span>

                        <span className="text-green-600 font-semibold">
                          Free
                        </span>

                      </div>

                      {/* Total */}
                      <div className="border-t border-[#FFEBB8] my-2 pt-2 flex justify-between items-center">

                        <span className="font-bold text-gray-800">
                          Total
                        </span>

                        <span className="font-bold text-lg text-gray-900">
                          {order.totalOrderPrice?.toLocaleString()} EGP
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}