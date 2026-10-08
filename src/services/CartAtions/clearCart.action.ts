import { getMyToken } from "@/Utilities/getMyToken";

export default async function clearProductCart() {
  const token = await getMyToken();
  const authToken = typeof token === "string" ? token : "";

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/`,
    {
      method: "DELETE",
      headers: {
        token: authToken,
      },
    }
  );

  const payload = await response.json();

  return payload;
}