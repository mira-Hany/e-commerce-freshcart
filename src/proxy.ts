import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

 export default async function proxy(request:NextRequest){ 

   const token = await getToken({
         req:request,
         secret:process.env.NEXTAUTH_SECRET,
         secureCookie:process.env.NODE_ENV=='production'
    })

    if(token){
        if(request.nextUrl.pathname=='/Login' || request.nextUrl.pathname=='/Register'){
                return NextResponse.redirect(new URL('/',request.url))

        }else{
        return NextResponse.next()

        }
    }
   else{
    if(request.nextUrl.pathname=='/cart' || request.nextUrl.pathname=='/Wishlist'){
    return NextResponse.redirect(new URL('/Login',request.url))

    }else{
      return NextResponse.next()
 
    }
   }

}

export const config={
    matcher:['/cart']
}