"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";

import { RegisterFormValues } from "@/interface/Register.interface";
import { Register } from "@/services/auth/Register.service";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [registerError, setRegisterError] = useState("");
const [registerSuccess, setRegisterSuccess] = useState("");

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      terms: false,
    },
  });

  const password = watch("password");

 const onSubmit = async (data: RegisterFormValues) => {
  setRegisterError("");
  setRegisterSuccess("");

  try {
    const response = await Register({
      name: data.name,
      email: data.email,
      password: data.password,
      rePassword: data.confirmPassword,
      phone: data.phone,
    });


    setRegisterSuccess("Account created successfully!");

  } catch (error: any) {

    if (error?.message === "Account Already Exists") {
      setRegisterError(
        "This email or phone number is already registered."
      );
    } else {
      setRegisterError(
        "Something went wrong. Please try again."
      );
    }
  }
};

  const onInvalid = (errors: any) => {
  };

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <div className="mx-auto px-5 py-10 lg:py-12">
        <div className="mx-auto grid w-full max-w-5xl items-start gap-8 lg:grid-cols-2 lg:gap-10">

          {/* Left Side */}
          <section className="pt-2">
            <h1 className="text-3xl font-bold">
              Welcome to{" "}
              <span className="text-green-600">FreshCart</span>
            </h1>

            <p className="mt-3 leading-6 text-gray-600">
              Join thousands of happy customers who enjoy fresh groceries
              delivered right to their doorstep.
            </p>

            {/* Benefits */}
            <div className="mt-7 space-y-6">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                  ★
                </div>

                <div>
                  <h3 className="font-semibold">Premium Quality</h3>
                  <p className="text-sm text-gray-600">
                    Premium quality products sourced from trusted suppliers.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                  🚚
                </div>

                <div>
                  <h3 className="font-semibold">Fast Delivery</h3>
                  <p className="text-sm text-gray-600">
                    Same-day delivery available in most areas.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                  🛡
                </div>

                <div>
                  <h3 className="font-semibold">Secure Shopping</h3>
                  <p className="text-sm text-gray-600">
                    Your data and payments are completely secure.
                  </p>
                </div>
              </div>

            </div>

            {/* Testimonial */}
            <div className="mt-7 rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-xl">
                  👩🏻
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    Sarah Johnson
                  </h3>

                  <div className="text-yellow-400">
                    ★★★★★
                  </div>
                </div>

              </div>

              <p className="mt-3 text-sm italic leading-5 text-gray-600">
                "FreshCart has transformed my shopping experience.
                The quality of the products is outstanding, and
                the delivery is always on time. Highly recommend!"
              </p>
            </div>
          </section>

          {/* Right Side - Register Form */}
          <section className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">

            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold">
                Create Your Account
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Start your fresh journey with us today
              </p>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-2">

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-md border border-gray-300 py-2 text-sm transition hover:bg-gray-50"
              >
                <span className="font-bold text-red-500">G</span>
                Google
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-md border border-gray-300 py-2 text-sm transition hover:bg-gray-50"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  f
                </span>
                Facebook
              </button>

            </div>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-sm text-gray-500">
                or
              </span>

              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* REGISTER FORM */}
            <form
              className="space-y-4"
              onSubmit={handleSubmit(onSubmit, onInvalid)}
            >

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Name*
                </label>

                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="name"
                      type="text"
                      placeholder="Ali"
                      autoComplete="name"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />
                  )}
                />

                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

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
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                        message:
                          "Password must contain letters, numbers and symbols",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        autoComplete="new-password"
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

                <div className="mt-2 h-1 rounded-full bg-gray-200" />

                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 8 characters with numbers and symbols
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium"
                >
                  Confirm Password*
                </label>

                <div className="flex items-center rounded-md border border-gray-300 pr-3 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100">

                  <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        id="confirmPassword"
                        type={
                          showConfirmPassword ? "text" : "password"
                        }
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        className="w-full rounded-md bg-transparent px-3 py-2 text-sm outline-none"
                      />
                    )}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="text-xs text-gray-500 hover:text-green-600"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>

                </div>

                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium"
                >
                  Phone Number*
                </label>

                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Phone number is required",
                    pattern: {
                      value: /^\+?[0-9\s()-]{10,20}$/,
                      message: "Please enter a valid phone number",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="phone"
                      type="tel"
                      placeholder="+20 100 000 0000"
                      autoComplete="tel"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />
                  )}
                />

                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Terms */}
              <div>
                <label className="flex cursor-pointer items-start gap-2 text-sm">

                  <Controller
                    name="terms"
                    control={control}
                    rules={{
                      validate: (value) =>
                        value ||
                        "You must accept the Terms and Privacy Policy",
                    }}
                    render={({ field }) => (
                      <input
                        ref={field.ref}
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={(e) =>
                          field.onChange(e.target.checked)
                        }
                        checked={field.value}
                        type="checkbox"
                        className="mt-1 accent-green-600"
                      />
                    )}
                  />

                  <span>
                    I agree to the{" "}

                    <Link
                      href="/terms"
                      className="text-green-600 hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}

                    and{" "}

                    <Link
                      href="/privacy"
                      className="text-green-600 hover:underline"
                    >
                      Privacy Policy
                    </Link>

                    *
                  </span>

                </label>

                {errors.terms && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.terms.message}
                  </p>
                )}
              </div>

              {registerError && (
  <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
    {registerError}
  </div>
)}

{registerSuccess && (
  <div className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-600">
    {registerSuccess}
  </div>
)}

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-md bg-green-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
              >
                Create My Account
              </button>

            </form>

            {/* Login Link */}
            <div className="mt-5 border-t border-gray-100 pt-6 text-center text-sm">
              <span className="text-gray-600">
                Already have an account?
              </span>{" "}

              <Link
                href="/Login"
                className="font-medium text-green-600 hover:underline"
              >
                Sign In
              </Link>
            </div>

          </section>
        </div>
      </div>
    </main>
  );
}