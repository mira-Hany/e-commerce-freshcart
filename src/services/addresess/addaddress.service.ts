import { getMyToken } from "@/Utilities/getMyToken";

interface AddAddressData {
  name: string;
  details: string;
  phone: string;
  city: string;
}

export default async function AddAddress(data: AddAddressData) {
  try {
    const token = await getMyToken();
    const authToken = typeof token === "string" ? token : "";

    if (!authToken) {
      throw new Error("You must be logged in to add an address.");
    }

    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/addresses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: authToken,
        } as Record<string, string>,
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.message || "Failed to add address"
      );
    }

    return result;
  } catch (error) {
    throw error;
  }
}