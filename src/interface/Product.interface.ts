export interface Product {
  priceAfterDiscount: boolean;
  results: number;
  metadata: Metadata;
  data: Product[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
  prevPage?: number;
}

export interface Product {
  sold: number;
  ratingsQuantity: number;
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  quantity: number;
  imageCover: string;
  images: string[];
  ratingsAverage: number;
  brand: Brand;
  category: Category;
  subcategory: Subcategory[];
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
}