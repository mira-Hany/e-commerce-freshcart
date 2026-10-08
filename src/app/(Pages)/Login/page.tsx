"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import img2 from "../../../asstes/images/imageye___-_imgi_2_2e5810ff3e-e750761ebcd4ae5907db.png";



 import { LoginFormValues } from "@/interface/Login.interface";
import { signIn } from "next-auth/react";

export default function Login() {

  
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

 const onSubmit = async (data: LoginFormValues) => {
  try {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
       callbackUrl: "/",
    });

    if (result?.error) {
      return;
    }

    if (result?.ok) {
      router.push("/");
      router.refresh();
    }
  } catch (error) {
  }
};

  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* Login Content */}
      <div className="container mx-auto flex min-h-[85vh] items-center justify-center px-5 py-10">
        <div className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">

          {/* Left Side */}
          <div className="hidden flex-col items-center text-center lg:flex">
            <div className="w-full max-w-132.5 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
              <Image
                src={img2}
                alt="FreshCart"
                className="h-82.5 w-full object-contain p-5"
              />
            </div>

            <h1 className="mt-5 text-3xl font-bold">
              FreshCart - Your One-Stop Shop for Fresh Products
            </h1>

            <p className="mt-4 max-w-xl text-lg leading-8 text-gray-600">
              Join thousands of happy customers who trust FreshCart
              for their daily grocery needs.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <span>🛒 Free Delivery</span>
              <span>🛡️ Secure Payment</span>
              <span>🕒 24/7 Support</span>
            </div>
          </div>

          {/* Right Side */}
          <div className="mx-auto w-full max-w-132.5 rounded-2xl bg-white p-6 sm:p-10">

            {/* Logo */}
            <div className="mb-8 text-center">
              <Link href="/" className="text-3xl font-bold">
                <span className="text-green-600">Fresh</span>
                <span className="text-slate-800">Cart</span>
              </Link>

              <h2 className="mt-5 text-2xl font-bold">
                Welcome Back!
              </h2>

              <p className="mt-3 text-gray-600">
                Sign in to continue your fresh shopping experience
              </p>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 py-3 transition hover:bg-gray-50"
              >
                <span className="text-xl font-bold text-red-500">
                  G
                </span>

                Continue with Google
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-green-300 bg-green-50 py-3 transition hover:bg-green-100"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  f
                </span>

                Continue with Facebook
              </button>
            </div>

            {/* Divider */}
            <div className="my-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-xs text-gray-500">
                OR CONTINUE WITH EMAIL
              </span>

              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Form */}
            <form
              className="space-y-5"
              onSubmit={handleSubmit(onSubmit)}
            >

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email*
                </label>

                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="ali@example.com"
                      autoComplete="email"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />
                  )}
                />

                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium"
                >
                  Password*
                </label>

                <div className="flex items-center rounded-md border border-gray-300 pr-3 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100">

                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        className="w-full rounded-md bg-transparent px-3 py-2 text-sm outline-none"
                      />
                    )}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-gray-500 hover:text-green-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">

  <label className="flex cursor-pointer items-center gap-3 text-sm">
    <input
      type="checkbox"
      className="h-4 w-4 accent-green-600"
    />

    Keep me signed in
  </label>

  <Link
    href={'/ForgotPassword'}
    className="text-sm font-medium text-green-600 hover:text-green-700"
  >
    Forgot Password?
  </Link>

</div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-green-600 py-3.5 font-semibold text-white shadow-md transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Sign Up */}
            <div className="mt-7 border-t border-gray-100 pt-6 text-center text-sm">
              <span className="text-gray-600">
                Don't have an account?
              </span>{" "}

              <Link
                href="/Register"
                className="font-semibold text-green-600 hover:text-green-700"
              >
                Sign Up
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}