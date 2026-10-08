"use server";


import { getMyToken } from "@/Utilities/getMyToken";

export default async  function addwishlist( productId:string){

    const token = await getMyToken();

    if (typeof token !== "string" || !token) {
      throw new Error("Authentication token is missing");
    }

  const response= await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{

    method:'POST', 
    
    headers:{
            token,
            "content-type":'application/json'
        },

    body:JSON.stringify({
    productId:productId
    })    
  })

  const payload = await response.json();

  return payload
}