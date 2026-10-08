import Link from 'next/link';

// أيقونات SVG بسيطة عشان منحتاجش نثبت مكتبات خارجية
const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
    <circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle>
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
    <rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle>
  </svg>
);

export default function Footer() {
  return (
   <>
    <section className="border-t border-green-100 bg-green-50">
        <div className="container mx-auto grid grid-cols-1 gap-6 px-4 py-7 sm:grid-cols-2 lg:grid-cols-4">

          {/* Free Shipping */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <i className="fa-solid fa-truck text-lg"></i>
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Free Shipping
              </h3>

              <p className="text-xs text-slate-500">
                On orders over 500 EGP
              </p>
            </div>
          </div>

          {/* Easy Returns */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <i className="fa-solid fa-rotate-left text-lg"></i>
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Easy Returns
              </h3>

              <p className="text-xs text-slate-500">
                14-day return policy
              </p>
            </div>
          </div>

          {/* Secure Payment */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <i className="fa-solid fa-shield-halved text-lg"></i>
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Secure Payment
              </h3>

              <p className="text-xs text-slate-500">
                100% secure checkout
              </p>
            </div>
          </div>

          {/* Support */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <i className="fa-solid fa-headset text-lg"></i>
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                24/7 Support
              </h3>

              <p className="text-xs text-slate-500">
                Contact us anytime
              </p>
            </div>
          </div>

        </div>
      </section>
    <footer className="bg-[#111827] text-gray-400 font-sans pt-16 text-sm">

      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        
        <div className="lg:col-span-1 xl:col-span-1">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg mb-6">
            <CartIcon />
            <span className="text-gray-900 font-bold text-xl">FreshCart</span>
          </div>
          <p className="leading-relaxed mb-6">
            FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
          </p>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-3">
              <PhoneIcon />
              <span>+1 (800) 123-4567</span>
            </li>
            <li className="flex items-center gap-3">
              <MailIcon />
              <span>support@freshcart.com</span>
            </li>
            <li className="flex items-center gap-3">
              <LocationIcon />
              <span>123 Commerce Street, New York, NY 10001</span>
            </li>
          </ul>

          <div className="flex gap-3">
            {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
              <a key={social} href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-green-500 transition-colors">
                <span className="sr-only">{social}</span>
                {/* هنا ممكن تحط أيقونات react-icons */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-base mb-6">Shop</h4>
          <ul className="space-y-3.5">
            {['All Products', 'Categories', 'Brands', 'Electronics', "Men's Fashion", "Women's Fashion"].map((item) => (
              <li key={item}><Link href="#" className="hover:text-green-500 transition-colors">{item}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-base mb-6">Account</h4>
          <ul className="space-y-3.5">
            {['My Account', 'Order History', 'Wishlist', 'Shopping Cart', 'Sign In', 'Create Account'].map((item) => (
              <li key={item}><Link href="#" className="hover:text-green-500 transition-colors">{item}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-base mb-6">Support</h4>
          <ul className="space-y-3.5">
            {['Contact Us', 'Help Center', 'Shipping Info', 'Returns & Refunds', 'Track Order'].map((item) => (
              <li key={item}><Link href="#" className="hover:text-green-500 transition-colors">{item}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-base mb-6">Legal</h4>
          <ul className="space-y-3.5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <li key={item}><Link href="#" className="hover:text-green-500 transition-colors">{item}</Link></li>
            ))}
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 FreshCart. All rights reserved.</p>
          <div className="flex gap-4 items-center">
             <span className="text-2xl font-bold text-gray-500">VISA</span>
             <span className="text-2xl font-bold text-gray-500">MC</span>
             <span className="text-2xl font-bold text-gray-500">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
   
   </>
  )
}