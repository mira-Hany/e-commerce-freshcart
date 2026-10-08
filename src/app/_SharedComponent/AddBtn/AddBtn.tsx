"use client"

import { cartconext } from "@/app/Context/CartContext";
import addProductCart from "@/services/CartAtions/addproductcart.action";
import { useContext } from "react";

export default function addbtn({productId}:{productId:string}) {

   const {setcartNumber} = useContext(cartconext);
  

  async function addTocart(){
    const response = await addProductCart(productId)
  if (response.status === "success") {
        setcartNumber(response.numOfCartItems);
      }
  
  }
  return (
    <>
    
    <button onClick={addTocart} aria-label="Add to cart" className="shrink-0 w-11 h-11 rounded-full bg-green-600 text-white text-3xl flex items-center justify-center hover:bg-green-700 hover:scale-105 transition">
                    +
     </button>
    
    </>
  )
}
