"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import img2 from "../../../asstes/images/imageye___-_imgi_2_2e5810ff3e-e750761ebcd4ae5907db.png";

import {
  forgotPassword,
  verifyResetCode,
  resetPassword,
} from "../../../services/auth/forgetpass.service";

interface ForgotPasswordFormValues {
  email: string;
  resetCode: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ForgotPassword() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: "",
      resetCode: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const email = watch("email");
  const newPassword = watch("newPassword");

  // STEP 1
  const handleSendCode = async (
    data: ForgotPasswordFormValues
  ) => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await forgotPassword(data.email);


      setSuccessMessage(
        "Reset code has been sent to your email."
      );

      setStep(2);
    } catch (error) {

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  };

  // STEP 2
  const handleVerifyCode = async (
    data: ForgotPasswordFormValues
  ) => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await verifyResetCode(
        data.resetCode
      );


      setSuccessMessage(
        "Code verified successfully."
      );

      setStep(3);
    } catch (error) {

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Invalid reset code."
      );
    }
  };

  // STEP 3
  const handleResetPassword = async (
    data: ForgotPasswordFormValues
  ) => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await resetPassword(
        data.email,
        data.newPassword
      );

     

      setSuccessMessage(
        "Password changed successfully."
      );

      setTimeout(() => {
        router.push("/Login");
      }, 1500);
    } catch (error) {
    

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-800">

      <div className="container mx-auto flex min-h-[85vh] items-center justify-center px-5 py-10">

        <div className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">

          {/* LEFT SIDE */}

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
              Reset your password and get back to your
              fresh shopping experience.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <span>🛒 Free Delivery</span>
              <span>🛡️ Secure Payment</span>
              <span>🕒 24/7 Support</span>
            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="mx-auto w-full max-w-132.5 rounded-2xl bg-white p-6 sm:p-10">

            {/* LOGO */}

            <div className="mb-8 text-center">

              <Link
                href="/"
                className="text-3xl font-bold"
              >
                <span className="text-green-600">
                  Fresh
                </span>

                <span className="text-slate-800">
                  Cart
                </span>
              </Link>

              {/* STEP TITLE */}

              {step === 1 && (
                <>
                  <h2 className="mt-5 text-2xl font-bold">
                    Forgot Password?
                  </h2>

                  <p className="mt-3 text-gray-600">
                    Enter your email to receive a reset code.
                  </p>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="mt-5 text-2xl font-bold">
                    Verify Reset Code
                  </h2>

                  <p className="mt-3 text-gray-600">
                    Enter the code sent to your email.
                  </p>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="mt-5 text-2xl font-bold">
                    Create New Password
                  </h2>

                  <p className="mt-3 text-gray-600">
                    Enter your new password below.
                  </p>
                </>
              )}

            </div>

            {/* ================= STEP 1 ================= */}

            {step === 1 && (

              <form
                className="space-y-5"
                onSubmit={handleSubmit(handleSendCode)}
              >

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
                        value:
                          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message:
                          "Please enter a valid email",
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-green-600 py-3.5 font-semibold text-white shadow-md transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting
                    ? "Sending..."
                    : "Send Reset Code"}
                </button>

              </form>

            )}

            {/* ================= STEP 2 ================= */}

            {step === 2 && (

              <form
                className="space-y-5"
                onSubmit={handleSubmit(handleVerifyCode)}
              >

                <div>

                  <label
                    htmlFor="resetCode"
                    className="mb-2 block text-sm font-medium"
                  >
                    Reset Code*
                  </label>

                  <Controller
                    name="resetCode"
                    control={control}
                    rules={{
                      required:
                        "Reset code is required",

                      minLength: {
                        value: 6,
                        message:
                          "Reset code must be 6 digits",
                      },

                      maxLength: {
                        value: 6,
                        message:
                          "Reset code must be 6 digits",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        id="resetCode"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="Enter 6 digit code"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-center text-lg tracking-[8px] outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                      />
                    )}
                  />

                  {errors.resetCode && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.resetCode.message}
                    </p>
                  )}

                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-green-600 py-3.5 font-semibold text-white shadow-md transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting
                    ? "Verifying..."
                    : "Verify Code"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                  className="w-full text-sm font-medium text-green-600 hover:text-green-700"
                >
                  Change Email
                </button>

              </form>

            )}

            {/* ================= STEP 3 ================= */}

            {step === 3 && (

              <form
                className="space-y-5"
                onSubmit={handleSubmit(
                  handleResetPassword
                )}
              >

                {/* EMAIL */}

                <div>

                  <label
                    htmlFor="resetEmail"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email
                  </label>

                  <input
                    id="resetEmail"
                    type="email"
                    value={email}
                    disabled
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500 outline-none"
                  />

                </div>

                {/* NEW PASSWORD */}

                <div>

                  <label
                    htmlFor="newPassword"
                    className="mb-2 block text-sm font-medium"
                  >
                    New Password*
                  </label>

                  <div className="flex items-center rounded-md border border-gray-300 pr-3 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100">

                    <Controller
                      name="newPassword"
                      control={control}
                      rules={{
                        required:
                          "New password is required",

                        minLength: {
                          value: 8,
                          message:
                            "Password must be at least 8 characters",
                        },
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          id="newPassword"
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          placeholder="Enter new password"
                          autoComplete="new-password"
                          className="w-full rounded-md bg-transparent px-3 py-2 text-sm outline-none"
                        />
                      )}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="text-xs text-gray-500 hover:text-green-600"
                    >
                      {showPassword
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>

                  {errors.newPassword && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.newPassword.message}
                    </p>
                  )}

                </div>

                {/* CONFIRM PASSWORD */}

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
                        required:
                          "Please confirm your password",

                        validate: (value) =>
                          value === newPassword ||
                          "Passwords do not match",
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          id="confirmPassword"
                          type={
                            showConfirmPassword
                              ? "text"
                              : "password"
                          }
                          placeholder="Confirm new password"
                          autoComplete="new-password"
                          className="w-full rounded-md bg-transparent px-3 py-2 text-sm outline-none"
                        />
                      )}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="text-xs text-gray-500 hover:text-green-600"
                    >
                      {showConfirmPassword
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>

                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}

                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-green-600 py-3.5 font-semibold text-white shadow-md transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting
                    ? "Changing Password..."
                    : "Change Password"}
                </button>

              </form>

            )}

            {/* MESSAGES */}

            {successMessage && (
              <div className="mt-5 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="mt-5 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
                {errorMessage}
              </div>
            )}

            {/* BACK TO LOGIN */}

            <div className="mt-7 border-t border-gray-100 pt-6 text-center text-sm">

              <Link
                href="/Login"
                className="font-semibold text-green-600 hover:text-green-700"
              >
                ← Back to Sign In
              </Link>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}