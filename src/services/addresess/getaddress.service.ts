import { getMyToken } from "@/Utilities/getMyToken";

export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export default async function GetAddresses(): Promise<Address[]> {
  const token = await getMyToken();

  if (!token || typeof token !== "string") {
    throw new Error("You must be logged in.");
  }

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/addresses",
    {
      method: "GET",
      headers: {
        token,
      },
      cache: "no-store",
    }
  );

  const result = await response.json();


  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to get addresses"
    );
  }

  return result?.data || [];
}