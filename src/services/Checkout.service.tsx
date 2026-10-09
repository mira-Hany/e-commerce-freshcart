"use server";


import { getMyToken } from "@/Utilities/getMyToken";

type checkout={
    city:string,
    details:string,
    phone:string
}

export default async  function Checkoutservice( cartId:string, formdata:checkout){

    const token = await getMyToken();

    if (typeof token !== "string" || !token) {
      throw new Error("Authentication token is missing");
    }

  const response= await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.DOMAIN}`,{

    method:'POST', 
    
    headers:{
            token,
            "content-type":'application/json'
        },

    body:JSON.stringify({
      shippingAddress:formdata
    })    
  })

  const payload = await response.json();

  return payload
}