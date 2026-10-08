export default function NewsletterSection() {
  return (
    <section className="w-full px-6 md:px-10 lg:px-16 py-12">

      <div className="rounded-[30px] bg-linear-to-r from-green-50 to-emerald-50 border border-green-100 p-8 md:p-10 lg:p-14">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Newsletter */}
          <div>

            <div className="flex items-center gap-4 mb-6">

              <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-2xl shadow-lg">
                ✉
              </div>

              <div>
                <p className="text-emerald-600 font-semibold uppercase text-sm">
                  Newsletter
                </p>

                <p className="text-gray-500 text-sm">
                  50,000+ subscribers
                </p>
              </div>

            </div>


            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
              Get the Freshest Updates{" "}
              <span className="text-emerald-600">
                Delivered Free
              </span>
            </h2>


            <p className="text-gray-500 text-lg mb-6">
              Weekly recipes, seasonal offers & exclusive member perks.
            </p>


            {/* Features */}
            <div className="flex flex-wrap gap-3 mb-7">

              <div className="bg-white border border-green-100 rounded-full px-4 py-2 text-sm text-gray-600 shadow-sm">
                🌿 Fresh Picks Weekly
              </div>

              <div className="bg-white border border-green-100 rounded-full px-4 py-2 text-sm text-gray-600 shadow-sm">
                🚚 Free Delivery Codes
              </div>

              <div className="bg-white border border-green-100 rounded-full px-4 py-2 text-sm text-gray-600 shadow-sm">
                🏷️ Members-Only Deals
              </div>

            </div>


            {/* Email */}
            <div className="flex flex-col sm:flex-row gap-3">

              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 h-14 rounded-xl border border-gray-200 bg-white px-5 outline-none focus:border-emerald-500"
              />

              <button className="h-14 px-7 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition">
                Subscribe
                <span className="ml-3">→</span>
              </button>

            </div>


            <p className="text-gray-400 text-sm mt-4">
              ✨ Unsubscribe anytime. No spam, ever.
            </p>

          </div>


          {/* Mobile App */}
          <div className="rounded-3xl bg-linear-to-brrom-slate-900 to-slate-800 p-8 md:p-10 text-white">

            <div className="inline-block rounded-full bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 text-sm text-emerald-400 mb-5">
              📱 MOBILE APP
            </div>


            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Shop Faster on Our App
            </h3>


            <p className="text-gray-400 mb-7">
              Get app-exclusive deals & 15% off your first order.
            </p>


            {/* App Store */}
            <button className="w-full h-16 rounded-xl bg-slate-700/80 border border-slate-600 flex items-center gap-4 px-5 mb-3 text-left hover:bg-slate-700 transition">

              <span className="text-3xl">
                
              </span>

              <div>
                <p className="text-xs text-gray-400">
                  DOWNLOAD ON
                </p>

                <p className="font-semibold">
                  App Store
                </p>
              </div>

            </button>


            {/* Google Play */}
            <button className="w-full h-16 rounded-xl bg-slate-700/80 border border-slate-600 flex items-center gap-4 px-5 text-left hover:bg-slate-700 transition">

              <span className="text-2xl">
                ▶
              </span>

              <div>
                <p className="text-xs text-gray-400">
                  GET IT ON
                </p>

                <p className="font-semibold">
                  Google Play
                </p>
              </div>

            </button>


            {/* Rating */}
            <div className="flex items-center gap-2 mt-7 text-sm">

              <span className="text-yellow-400">
                ★★★★★
              </span>

              <span className="text-gray-400">
                4.9 · 100K+ downloads
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}