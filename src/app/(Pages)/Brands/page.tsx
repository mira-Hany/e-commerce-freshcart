import Image from "next/image";
import Link from "next/link";
import { getAllBrands } from "@/services/brands/get all brands.sevice";

export default async function Brands() {
  const response = await getAllBrands();

  const brands = response.data;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-linear-to-r from-violet-600 to-purple-400 py-16 text-white">
        <div className="container mx-auto px-4">
          <p className="mb-6 text-sm text-purple-100">
            Home / Brands
          </p>

          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl">
              <i className="fa-solid fa-tags"></i>
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                Top Brands
              </h1>

              <p className="mt-2 text-lg text-purple-100">
                Shop from your favorite brands
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {brands.map((brand: any) => (
            <Link
  href={`/Product?brand=${brand._id}`}
  key={brand._id}
  className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl"
>
              {/* Brand Image */}
              <div className="flex h-48 items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-4">
                <Image
                  src={brand.image}
                  alt='..'
                  width={200}
                  height={200}
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Brand Name */}
              <div className="mt-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800 transition-colors group-hover:text-purple-600">
                  {brand.name}
                </h2>

                <p className="mt-2 text-sm font-medium text-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  View Products →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}