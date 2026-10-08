"use server";

import { cookies } from "next/headers";



export async function Loginservice (values: {
  email: string;
  password: string;
}) 

{
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/signin",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );

  const data = await response.json();
  const cookie = await cookies();
  cookie.set('userToken',data.token,{
    httpOnly:true
  })

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}