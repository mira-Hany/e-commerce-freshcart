export default async function getProductsByBrand(brandId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`,
      {
        cache: "no-store",
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {

    return null;
  }
}