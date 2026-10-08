import { ProductResponce } from "@/interface/response.type";
import { getAllProduct } from "@/services/Product.service";
import Link from "next/link";
import AddBtn from "@/app/_SharedComponent/AddBtn/AddBtn";

import AddWishlist from "../../addwishlist/addwishlist";


export default async function ProductHome() {
  const response: ProductResponce = await getAllProduct();

  return (
    <section className="container mx-auto px-4 py-8">
      <h2
        className="
          relative
          text-3xl md:text-4xl
          font-bold
          ps-10
          mb-8
          before:content-['']
          before:absolute
          before:h-10
          before:w-3
          before:inset-s-0
          before:bg-green-700
          before:rounded-2xl
        "
      >
        Featured <span className="text-green-700">Products</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {response?.data?.map((product) => {
          const productPrice = Number(product.price);
          const hasDiscount =
            typeof product.priceAfterDiscount === "number" &&
            product.priceAfterDiscount < productPrice;

          const discountedPrice = hasDiscount
            ? Number(product.priceAfterDiscount)
            : productPrice;

          const discount = hasDiscount
            ? Math.round(
                ((productPrice - discountedPrice) / productPrice) * 100
              )
            : 0;

          return (
            <div
              key={product._id}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* كل حاجة بتفتح Product */}
              <Link href={`/Product/${product._id}`}>
                {/* Product Image */}
                <div className="relative bg-gray-100 overflow-hidden">
                  {discount > 0 && (
                    <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-md">
                      -{discount}%
                    </span>
                  )}

                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Favorite Buttons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">

              <AddWishlist productId={product._id} />

              
                    <button
                      aria-label="Compare product"
                      className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-green-700 hover:text-white transition"
                    >
                      <span className="text-xl">⟳</span>
                    </button>

                    <button
                      aria-label="View product"
                      className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-green-700 hover:text-white transition"
                    >
                      <span className="text-xl">◎</span>
                    </button>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">
                    {product.category.name}
                  </p>

                  <h3 className="text-lg font-medium text-gray-800 line-clamp-2 min-h-14">
                    {product.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-2 mb-4">
                    <div className="flex text-yellow-400 text-xl">
                      {"★".repeat(Math.round(product.ratingsAverage))}
                      {"☆".repeat(
                        5 - Math.round(product.ratingsAverage)
                      )}
                    </div>

                    <span className="text-sm text-gray-500">
                      {product.ratingsAverage} ({product.ratingsQuantity})
                    </span>
                  </div>
                </div>
              </Link>

              {/* الجزء ده بره الـ Link */}
              <div className="flex items-center justify-between gap-2 px-4 pb-4">
                {/* Price */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xl font-bold text-green-700">
                    {typeof product.priceAfterDiscount === "number" &&
                    product.priceAfterDiscount < Number(product.price)
                      ? product.priceAfterDiscount
                      : product.price}{" "}
                    EGP
                  </span>

                  {discount > 0 && (
                    <span className="text-sm text-gray-400 line-through">
                      {product.price} EGP
                    </span>
                  )}
                </div>

                {/* Add To Cart - بره الـ Link */}
                <AddBtn productId={product._id} />

                
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}