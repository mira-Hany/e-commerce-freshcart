import { getMyToken } from "@/Utilities/getMyToken";

export default async function deleteaddress(addressId: string) {
  const token = await getMyToken();

  if (!token || typeof token !== "string") {
    throw new Error("You must be logged in.");
  }


  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
    {
      method: "DELETE",
      headers: {
        token,
      },
    }
  );

  const payload = await response.json();


  if (!response.ok) {
    throw new Error(
      payload?.message || "Failed to delete address"
    );
  }

  return payload;
}