"use server";

import { getMyToken } from "@/Utilities/getMyToken";

type Checkout = {
  city: string;
  details: string;
  phone: string;
  postalCode: string;
};

export default async function cashOrder(
  cartId: string,
  formdata: Checkout
) {
  const token = await getMyToken();
  const authToken = typeof token === "string" ? token : "";

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
    {
      method: "POST",

      headers: {
        token: authToken,
        "content-type": "application/json",
      },

      body: JSON.stringify({
        shippingAddress: formdata,
      }),
    }
  );

  const payload = await response.json();


  return payload;
}