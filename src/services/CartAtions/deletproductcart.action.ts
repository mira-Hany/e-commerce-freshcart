import { getMyToken } from "@/Utilities/getMyToken";

export default async function deleteProductCart(productId: string) {
  const token = (await getMyToken()) as string | null | undefined;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: token ?? "",
      },
    }
  );

  const payload = await response.json();

  return payload;
}