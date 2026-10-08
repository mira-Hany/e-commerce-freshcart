import { getMyToken } from "@/Utilities/getMyToken";

export default async function updateProductCart(
  count: number,
  productId: string
) {
  const token = await getMyToken();
  const authToken = typeof token === "string" ? token : "";

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      method: "PUT",
      headers: {
        token: authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        count: count,
      }),
    }
  );

  const payload = await response.json();

  return payload;
}