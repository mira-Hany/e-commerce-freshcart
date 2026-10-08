"use server"


import { getMyToken } from "@/Utilities/getMyToken";

export default async  function getProductCart(){

    const token = await getMyToken();

    if (typeof token !== "string" || !token) {
        throw new Error("Missing auth token");
    }

  const response= await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
    
    headers:{
            token
        }
  })

  const payload = await response.json();

  return payload
}