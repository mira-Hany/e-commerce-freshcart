import Link from "next/link";

export default function OffersSection() {
  return (
    <section className="w-full px-6 md:px-10 lg:px-16 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Green Offer */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-green-500 to-emerald-600 p-8 md:p-10 text-white min-h-72.5">

          {/* Background Circle */}
          <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-black/5"></div>

          <div className="relative z-10">

            <div className="inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-medium mb-5">
              🔥 Deal of the Day
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Fresh Organic Fruits
            </h2>

            <p className="text-base md:text-lg mb-5 text-white/90">
              Get up to 40% off on selected organic fruits
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold">
                40% OFF
              </span>

              <span className="text-sm">
                Use code:{" "}
                <span className="font-bold">
                  ORGANIC40
                </span>
              </span>
            </div>

            <Link href="/Product">
            <button className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
              Shop Now
              <span className="ml-3 text-lg">→</span>
            </button>
            </Link>

          </div>
        </div>


        {/* Orange Offer */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-orange-400 to-rose-500 p-8 md:p-10 text-white min-h-72.5">

          {/* Background Circle */}
          <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-black/5"></div>

          <div className="relative z-10">

            <div className="inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-medium mb-5">
              ✨ New Arrivals
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Exotic Vegetables
            </h2>

            <p className="text-base md:text-lg mb-5 text-white/90">
              Discover our latest collection of premium vegetables
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold">
                25% OFF
              </span>

              <span className="text-sm">
                Use code:{" "}
                <span className="font-bold">
                  FRESH25
                </span>
              </span>
            </div>

            <button className="bg-white text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
              Explore Now
              <span className="ml-3 text-lg">→</span>
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}