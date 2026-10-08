import { Category } from "./Category.interface";
import { LestResponse } from "./LestResponse.interface";
import { Product } from "./Product.interface";



export type CategoryResponce = LestResponse<Category>
export type ProductResponce = LestResponse<Product>