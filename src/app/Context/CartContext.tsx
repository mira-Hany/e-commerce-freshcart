
"use client"

import getProductCart from "@/services/CartAtions/getproductcart.action";
import { createContext, ReactNode, SetStateAction, useEffect, useState } from "react";

type contextType={
    cartNumber:number,
     setcartNumber:React.Dispatch<SetStateAction<number>>
}

export const cartconext=createContext<contextType>({
    cartNumber:0,
    setcartNumber:()=>undefined
});


export function CartContextProvider({children}:{children:ReactNode}){

    const[cartNumber,setcartNumber]=useState<number>(0)

   async function getCartNumber(){
     const response = await getProductCart()

     if (response.status=='succses'){
        setcartNumber(response.numOfCartItems)
     }
     


    }

    useEffect(()=>{
        getCartNumber()
    },[])


    return <cartconext.Provider value={{cartNumber,setcartNumber}}>
        {children}
    </cartconext.Provider>
    
}