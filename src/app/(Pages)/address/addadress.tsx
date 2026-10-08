"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import AddAddress from "../../../services/addresess/addaddress.service";

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddAddressModal({
  isOpen,
  onClose,
  onSuccess,
}: AddAddressModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    details: "",
    phone: "",
    city: "",
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await AddAddress(formData);


      toast.success("Address added successfully!");

      onSuccess();
      onClose();

      setFormData({
        name: "",
        details: "",
        phone: "",
        city: "",
      });
    } catch (error: any) {

      toast.error(
        error?.message || "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="mb-6 text-xl font-bold text-gray-800">
          Add New Address
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Address Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Address Name
            </label>

            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Home, Office"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Full Address */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Full Address
            </label>

            <textarea
              name="details"
              required
              rows={3}
              placeholder="Street, building, apartment..."
              value={formData.details}
              onChange={handleChange}
              className="w-full resize-none rounded-lg border border-gray-300 p-3 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Phone + City */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* Phone */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                required
                placeholder="01xxxxxxxxx"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* City */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                City
              </label>

              <input
                type="text"
                name="city"
                required
                placeholder="Cairo"
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg bg-gray-100 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
            >

              {isLoading ? (
                <>
                  <Loader2
                    className="animate-spin"
                    size={20}
                  />
                  Adding...
                </>
              ) : (
                "Add Address"
              )}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}