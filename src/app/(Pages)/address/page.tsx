"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import AddAddressModal from "../address/addadress";
import AddressCard from "../address/AddressCard";

import getAddressesAction from "../address/getAddressesAction";
import deleteAddressAction from "./deleteAddressAction";
import toast from "react-hot-toast";

interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export default function MyAddressesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [addresses, setAddresses] = useState<Address[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchAddresses = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getAddressesAction();


      if (!response.success) {
        throw new Error(
          response.message || "Failed to load addresses"
        );
      }

      setAddresses(response.data);

    } catch (error: any) {

      setError(
        error?.message || "Failed to load addresses"
      );

      setAddresses([]);

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddSuccess = async () => {
    await fetchAddresses();
  };

  const handleEdit = (address: Address) => {
  };

 const handleDelete = async (id: string) => {
  try {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmed) return;

    const response = await deleteAddressAction(id);


    if (!response.success) {
      throw new Error(
        response.message || "Failed to delete address"
      );
    }

    toast.success("Address deleted successfully!");

    await fetchAddresses();

  } catch (error: any) {

    toast.error(
      error?.message || "Failed to delete address"
    );
  }
};

  return (
    <div className="mx-auto max-w-5xl p-6">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            My Addresses
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your saved delivery addresses
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-green-700"
        >
          <Plus size={20} />
          Add Address
        </button>

      </div>

      {/* Addresses Container */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">

        {/* Loading */}
        {isLoading && (
          <div className="flex min-h-75 items-center justify-center">
            <p className="text-gray-500">
              Loading addresses...
            </p>
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="flex min-h-75 items-center justify-center">
            <p className="text-red-500">
              {error}
            </p>
          </div>
        )}

        {/* Empty */}
        {!isLoading &&
          !error &&
          addresses.length === 0 && (
            <div className="flex min-h-75 flex-col items-center justify-center">

              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                <Plus
                  size={28}
                  className="text-green-600"
                />
              </div>

              <p className="text-gray-400">
                No addresses yet.
              </p>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="mt-4 text-sm font-medium text-green-600 hover:text-green-700"
              >
                Add your first address
              </button>

            </div>
          )}

        {/* Addresses */}
        {!isLoading &&
          !error &&
          addresses.length > 0 && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {addresses.map((address) => (
                <AddressCard
                  key={address._id}
                  address={address}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}

            </div>
          )}

      </div>

      {/* Add Address Modal */}
      <AddAddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAddSuccess}
      />

    </div>
  );
}