"use client";

import Checkoutservice from "@/services/Checkout.service";
import cashOrder from "@/services/cashOrder.service";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

const LocationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z"
    />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.08 5.18 2 2 0 0 1 5.06 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.63a2 2 0 0 1-.45 2.11L9 10.73a16 16 0 0 0 4.27 4.27l1.27-1.24a2 2 0 0 1 2.11-.45c.85.3 1.73.51 2.63.63A2 2 0 0 1 22 16.92Z"
    />
  </svg>
);

const CardIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-5 h-5"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

const CashIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-5 h-5"
  >
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const InfoIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <circle cx="12" cy="12" r="10" />
    <path
      d="M12 10v6M12 7h.01"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

interface CheckoutFormValues {
  city: string;
  details: string;
  phone: string;
  paymentMethod: "cash" | "online";
}

export default function CheckoutForm() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    defaultValues: {
      city: "",
      details: "",
      phone: "",
      paymentMethod: "cash",
    },
  });

  async function handlePayment(data: CheckoutFormValues) {
    try {
      const shippingData = {
        city: data.city,
        details: data.details,
        phone: data.phone,
        postalCode: "",
      };

      /* =========================
         CASH ON DELIVERY
      ========================= */

      if (data.paymentMethod === "cash") {
        const response = await cashOrder(id, shippingData);


        if (response?.status === "success") {
          router.push("/allorders");
          return;
        }

      }

      /* =========================
         PAY ONLINE
      ========================= */

      if (data.paymentMethod === "online") {
        const response = await Checkoutservice(id, {
          city: data.city,
          details: data.details,
          phone: data.phone,
        });


        if (response?.status === "success") {
          window.location.href = response.session.url;
        }
      }
    } catch (error) {
    }
  }

  return (
    <form
      id="checkout-form"
      onSubmit={handleSubmit(handlePayment)}
    >
      <div className="min-w-0">

        {/* ================= SHIPPING ADDRESS ================= */}

        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-4">

          <div className="bg-green-600 text-white px-4 py-3">
            <div className="flex items-center gap-2">
              <LocationIcon />

              <div>
                <h2 className="text-2xl font-bold">
                  Shipping Address
                </h2>

                <p className="text-lg text-green-50 mt-0.5">
                  Where should we deliver your order?
                </p>
              </div>
            </div>
          </div>

          <div className="p-4">

            {/* Information */}

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex gap-3 mb-4">

              <div className="text-blue-600 mt-0.5">
                <InfoIcon />
              </div>

              <div>
                <p className="text-lg text-blue-700 font-medium">
                  Delivery Information
                </p>

                <p className="text-lg text-blue-500 mt-0.5">
                  Please ensure your address is accurate for smooth
                  delivery
                </p>
              </div>

            </div>

            {/* City */}

            <div className="mb-3">

              <label className="block text-lg font-semibold text-gray-700 mb-1.5">
                City <span className="text-red-500">*</span>
              </label>

              <div className="relative">

                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4"
                  >
                    <path d="M4 20h16" />
                    <path d="M6 20V8l6-4 6 4v12" />
                    <path d="M9 20v-4h6v4" />
                  </svg>

                </div>

                <Controller
                  name="city"
                  control={control}
                  rules={{
                    required: "City is required",
                    minLength: {
                      value: 2,
                      message: "City must be at least 2 characters",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="e.g. Cairo, Alexandria, Giza"
                      className="w-full h-9 border border-gray-200 rounded-lg pl-9 pr-3 text-[11px] outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100"
                    />
                  )}
                />

              </div>

              {errors.city && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.city.message}
                </p>
              )}

            </div>

            {/* Street */}

            <div className="mb-3">

              <label className="block text-lg font-semibold text-gray-700 mb-1.5">
                Street Address <span className="text-red-500">*</span>
              </label>

              <div className="relative">

                <div className="absolute left-3 top-3 text-gray-400">
                  <LocationIcon />
                </div>

                <Controller
                  name="details"
                  control={control}
                  rules={{
                    required: "Street address is required",
                    minLength: {
                      value: 5,
                      message: "Please enter a complete address",
                    },
                  }}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      placeholder="Street name, building number, floor, apartment..."
                      className="w-full h-16 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-[11px] resize-none outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100"
                    />
                  )}
                />

              </div>

              {errors.details && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.details.message}
                </p>
              )}

            </div>

            {/* Phone */}

            <div>

              <label className="block text-lg font-semibold text-gray-700 mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>

              <div className="relative">

                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <PhoneIcon />
                </div>

                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Phone number is required",
                    pattern: {
                      value: /^01[0125][0-9]{8}$/,
                      message:
                        "Please enter a valid Egyptian phone number",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="tel"
                      placeholder="01xxxxxxxxx"
                      maxLength={11}
                      className="w-full h-9 border border-gray-200 rounded-lg pl-9 pr-32 text-[11px] outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100"
                    />
                  )}
                />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-gray-400">
                  Egyptian numbers only
                </span>

              </div>

              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.phone.message}
                </p>
              )}

            </div>

          </div>
        </section>

        {/* ================= PAYMENT METHOD ================= */}

        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">

          <div className="bg-green-600 text-white px-4 py-3">

            <div className="flex items-center gap-2">

              <CardIcon />

              <div>

                <h2 className="text-2xl font-bold">
                  Payment Method
                </h2>

                <p className="text-[10px] text-green-50 mt-0.5">
                  Choose how you'd like to pay
                </p>

              </div>

            </div>

          </div>

          <div className="p-4">

            {/* ================= CASH ================= */}

            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <>
                  <label className="block cursor-pointer mb-3">

                    <input
                      type="radio"
                      value="cash"
                      checked={field.value === "cash"}
                      onChange={() => field.onChange("cash")}
                      className="sr-only"
                    />

                    <div
                      className={`border rounded-lg p-3 flex items-center justify-between transition ${
                        field.value === "cash"
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 bg-white"
                      }`}
                    >

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg bg-green-600 text-white flex items-center justify-center">
                          <CashIcon />
                        </div>

                        <div>

                          <h3 className="text-xl font-bold text-gray-800">
                            Cash on Delivery
                          </h3>

                          <p className="text-[9px] text-gray-500 mt-0.5">
                            Pay when your order arrives at your doorstep
                          </p>

                        </div>

                      </div>

                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          field.value === "cash"
                            ? "bg-green-600 text-white"
                            : "border border-gray-300"
                        }`}
                      >
                        {field.value === "cash" && (
                          <span className="text-xs font-bold">
                            ✓
                          </span>
                        )}
                      </div>

                    </div>

                  </label>

                  {/* ================= ONLINE ================= */}

                  <label className="block cursor-pointer">

                    <input
                      type="radio"
                      value="online"
                      checked={field.value === "online"}
                      onChange={() => field.onChange("online")}
                      className="sr-only"
                    />

                    <div
                      className={`border rounded-lg p-3 flex items-center justify-between transition ${
                        field.value === "online"
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 bg-white"
                      }`}
                    >

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg bg-gray-100 text-gray-400 flex items-center justify-center">
                          <CardIcon />
                        </div>

                        <div>

                          <h3 className="text-xl font-bold text-gray-800">
                            Pay Online
                          </h3>

                          <p className="text-[9px] text-gray-500 mt-0.5">
                            Secure payment with Credit/Debit Card via Stripe
                          </p>

                          <div className="flex gap-1 mt-1">

                            <span className="text-[7px] bg-blue-600 text-white px-1 rounded">
                              VISA
                            </span>

                            <span className="text-[7px] bg-red-500 text-white px-1 rounded">
                              MC
                            </span>

                            <span className="text-[7px] bg-blue-400 text-white px-1 rounded">
                              AMEX
                            </span>

                          </div>

                        </div>

                      </div>

                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          field.value === "online"
                            ? "bg-green-600 text-white"
                            : "border border-gray-300"
                        }`}
                      >
                        {field.value === "online" && (
                          <span className="text-xs font-bold">
                            ✓
                          </span>
                        )}
                      </div>

                    </div>

                  </label>
                </>
              )}
            />

          </div>
        </section>

      </div>
    </form>
  );
}