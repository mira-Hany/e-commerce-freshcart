"use server";


import { getMyToken } from "@/Utilities/getMyToken";

export default async  function addProductCart( productId:string){

    const token = await getMyToken();
    const authToken = typeof token === "string" ? token : "";

  const response= await fetch(`https://ecommerce.routemisr.com/api/v1/cart/`,{

    method:'POST', 
    
    headers:{
            token: authToken,
            "content-type":'application/json'
        },

    body:JSON.stringify({
    productId:productId
    })    
  })

  const payload = await response.json();

  return payload
}