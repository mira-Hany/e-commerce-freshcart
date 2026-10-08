"use client";

import { cartconext } from "../../Context/CartContext";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState ,useEffect } from "react";
import { getAllCategory } from "../../../services/category/category.service";

export default function Navbar() {

  const [categories, setCategories] = useState<any[]>([]);

useEffect(() => {
  async function getCategories() {
    const response = await getAllCategory();

    if (response?.data) {
      setCategories(response.data);
    }
  }

  getCategories();
}, []);

  const { data: session, status } = useSession();

  const { cartNumber } = useContext(cartconext);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  function logout() {
    signOut({
      callbackUrl: "/Login",
    });
  }

  return (
    <>
      <header className="w-full bg-white border-b border-slate-200">
        <nav
          className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>

            <span className="text-xl font-bold tracking-tight text-slate-900">
              FreshCart
            </span>
          </Link>

          {/* Search Bar */}
          <div className="mx-8 hidden max-w-xl flex-1 lg:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-5 pr-12 text-sm text-slate-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />

              <button className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white transition-colors hover:bg-green-700">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="hidden items-center gap-1 lg:flex">
            <li>
              <Link
                href="/"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-green-600"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/Product"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-green-600"
              >
                Shop
              </Link>
            </li>

            <li className="group relative">
              <Link
                href="/Categories"
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-green-600"
              >
                Categories

                <svg
                  className="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Link>

              {/* Categories Dropdown */}
               
<div className="invisible absolute left-0 top-full z-20 w-56 translate-y-2 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-1 group-hover:opacity-100">

  <Link
    href="/Categories"
    className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-green-50 hover:text-green-700"
  >
    All Categories
  </Link>

  {categories
    .filter((category) =>
      [
        "Women's Fashion",
        "Men's Fashion",
        "Electronics",
      ].includes(category.name)
    )
    .map((category) => (
      <Link
        key={category._id}
        href={`/Product?category=${category._id}`}
        className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-green-50 hover:text-green-700"
      >
        {category.name}
      </Link>
    ))}
</div>


             
            </li>

            <li>
              <Link
                href="/Brands"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-green-600"
              >
                Brands
              </Link>
            </li>
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* Support */}
            <a
              href="#"
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-green-600 sm:flex"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-xs text-slate-500">Support</span>
                <span className="text-sm font-semibold">24/7 Help</span>
              </div>
            </a>

            {/* Wishlist */}
            <Link
              href="/Wishlist"
              className="relative rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-green-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-green-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>

              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white">
                {cartNumber}
              </span>
            </Link>

            {/* ================= PROFILE ================= */}
            <div className="relative">

              {/* Profile Button */}
              <button
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-green-600"
                aria-label="Open profile menu"
                aria-expanded={isProfileOpen}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full z-9999 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

                  {/* User Header */}
                  <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 20a8 8 0 0116 0"
                        />
                      </svg>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Welcome
                      </p>

                      <p className="font-semibold text-slate-800">
                        {status === "loading"
                          ? "Loading..."
                          : session?.user?.name || "Mira"}
                      </p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">

                    {/* My Profile */}
                    <Link
                      href={'/Myprofile'}
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-green-50 hover:text-green-700"
                    >
                      <svg
                        className="h-5 w-5 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 20a8 8 0 0116 0"
                        />
                      </svg>

                      My Profile
                    </Link>

                    {/* My Orders */}
                    <Link
                      href="/allorders"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-green-50 hover:text-green-700"
                    >
                      <svg
                        className="h-5 w-5 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 3h12v18H6z"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 7h6M9 11h6M9 15h4"
                        />
                      </svg>

                      My Orders
                    </Link>

                    {/* My Wishlist */}
                    <Link
                      href="/Wishlist"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-green-50 hover:text-green-700"
                    >
                      <svg
                        className="h-5 w-5 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"
                        />
                      </svg>

                      My Wishlist
                    </Link>

                    {/* Addresses */}
                    <Link
                      href={'/address'}
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-green-50 hover:text-green-700"
                    >
                      <svg
                        className="h-5 w-5 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z"
                        />

                        <circle cx="12" cy="10" r="2" />
                      </svg>

                      Addresses
                    </Link>

                    {/* Settings */}
                    <Link
                      href={'/settings'}
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-green-50 hover:text-green-700"
                    >
                      <svg
                        className="h-5 w-5 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.4 15a1.7 1.7 0 00.34 1.88l.06.06-1.7 1.7-.06-.06a1.7 1.7 0 00-1.88-.34 1.7 1.7 0 00-1.03 1.56V20h-2.4v-.2a1.7 1.7 0 00-1.03-1.56 1.7 1.7 0 00-1.88.34l-.06.06-1.7-1.7.06-.06A1.7 1.7 0 008.46 15a1.7 1.7 0 00-1.56-1.03H6v-2.4h.9A1.7 1.7 0 008.46 10a1.7 1.7 0 00-.34-1.88l-.06-.06 1.7-1.7.06.06a1.7 1.7 0 001.88.34A1.7 1.7 0 0012.73 5.2V5h2.4v.2a1.7 1.7 0 001.03 1.56 1.7 1.7 0 001.88-.34l.06-.06 1.7 1.7-.06.06a1.7 1.7 0 00-.34 1.88A1.7 1.7 0 0020.96 11H21v2.4h-.2A1.7 1.7 0 0019.4 15z"
                        />
                      </svg>

                      Settings
                    </Link>
                  </div>

                  {/* Sign Out */}
                  <div className="border-t border-slate-200 p-2">
                    <button
                      type="button"
                      onClick={logout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-500 hover:bg-red-50"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 17l5-5-5-5M21 12H9"
                        />
                      </svg>

                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Login / Register */}
            {/* {!session && status !== "loading" && (
              <>
                <Link
                  href="/Login"
                  className="hidden items-center justify-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700 sm:inline-flex"
                >
                  Login
                </Link>

                <Link
                  href="/Register"
                  className="hidden items-center justify-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700 sm:inline-flex"
                >
                  Register
                </Link>
              </>
            )} */}

            {/* Mobile Menu */}
            <input
              type="checkbox"
              id="fresh-nav-toggle"
              className="peer hidden"
            />

            <label
              htmlFor="fresh-nav-toggle"
              className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-50 focus-within:ring-2 focus-within:ring-green-600 lg:hidden"
              aria-label="Toggle menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>

            {/* Mobile Overlay */}
            <label
              htmlFor="fresh-nav-toggle"
              className="fixed inset-0 z-40 hidden bg-slate-900/40 backdrop-blur-sm peer-checked:block lg:hidden"
            />

            {/* Mobile Sidebar */}
            <div className="pointer-events-none fixed inset-y-0 right-0 z-50 w-full max-w-xs translate-x-full transform border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out peer-checked:pointer-events-auto peer-checked:translate-x-0 lg:hidden">
              <div className="flex h-18 items-center justify-between border-b border-slate-200 px-5">
                <span className="text-base font-bold text-slate-900">
                  FreshCart
                </span>

                <label
                  htmlFor="fresh-nav-toggle"
                  className="cursor-pointer rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
                  aria-label="Close menu"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </label>
              </div>

              <nav
                className="flex flex-col gap-1 p-4"
                aria-label="Mobile navigation"
              >
                <Link
                  href="/"
                  className="rounded-xl bg-green-50 px-4 py-3.5 text-base font-semibold text-green-700"
                >
                  Home
                </Link>

                <Link
                  href="/Product"
                  className="rounded-xl px-4 py-3.5 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Shop
                </Link>

                <Link
                  href="/Categories"
                  className="rounded-xl px-4 py-3.5 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Categories
                </Link>

                <Link
                  href="/Brands"
                  className="rounded-xl px-4 py-3.5 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Brands
                </Link>

                {session && (
                  <button
                    type="button"
                    onClick={logout}
                    className="mt-2 rounded-xl px-4 py-3.5 text-left text-base font-medium text-red-500 transition-colors hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                )}
              </nav>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
