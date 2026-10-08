import { getAllProduct } from "../../../services/Product.service";
import getProductsByBrand from "../../../services/brands/getspceficbrand.service";
import { getProductsByCategory } from "../../../services/Product.service";
import AddBtn from "@/app/_SharedComponent/AddBtn/AddBtn";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    brand?: string;
    category?: string;
  }>;
}) {
  const params = await searchParams;

  const brandId = params.brand;
  const categoryId = params.category;

  let response;

  if (categoryId) {
    response = await getProductsByCategory(categoryId);
  } else if (brandId) {
    response = await getProductsByBrand(brandId);
  } else {
    response = await getAllProduct();
  }

  const products = response?.data || [];

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="container mx-auto px-4 py-10">

        <h1 className="mb-8 text-3xl font-bold text-gray-800">
          {categoryId
            ? "Category Products"
            : brandId
            ? "Brand Products"
            : "All Products"}
        </h1>

        {products.length === 0 ? (
          <p className="text-gray-500">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product: any) => (
              <div
                key={product._id}
                className="rounded-2xl bg-white p-4 shadow-sm"
              >
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="h-64 w-full object-contain"
                />

                <p className="mt-4 text-sm text-gray-500">
                  {product.category?.name}
                </p>

                <h2 className="mt-2 line-clamp-2 font-semibold text-gray-800">
                  {product.title}
                </h2>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-green-600">
                    {product.price} EGP
                  </span>

                    <AddBtn productId={product._id} />

                    
                </div>
              </div>
            ))}
          </div>
        )}

      </section>
    </main>
  );
}
