export default async function getProductDetails(productId:String){

    try{
const response = await  fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)

  const data = await response.json()
   return data 


    }catch (err){
       return err
    }

}