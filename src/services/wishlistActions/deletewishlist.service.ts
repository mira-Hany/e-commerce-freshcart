import { getMyToken } from "@/Utilities/getMyToken";

export default async function deleteWishlistItem(productId: string) {
  const token = await getMyToken();

  if (!token || typeof token !== "string") {
    throw new Error("Missing auth token");
  }

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        token,
      },
    }
  );

  const payload = await response.json();

  return payload;
}