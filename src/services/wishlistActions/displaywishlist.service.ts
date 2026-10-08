"use server";

import { getMyToken } from "@/Utilities/getMyToken";

export default async function getWishlistItems() {
  const tokenValue = await getMyToken();
  const token =
    typeof tokenValue === "string"
      ? tokenValue
      : tokenValue &&
          typeof tokenValue === "object" &&
          "value" in tokenValue &&
          typeof tokenValue.value === "string"
        ? tokenValue.value
        : undefined;

  if (!token || typeof token !== "string") {
    throw new Error("User token is missing");
  }

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    headers: {
      token,
    },
  });

  const payload = await response.json();

  return payload;
}