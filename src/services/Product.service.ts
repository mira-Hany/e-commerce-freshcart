export async function getAllProduct() {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Products API Error: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {

    return {
      data: [],
    };
  }
}

export async function getProductsByCategory(categoryId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Category Products API Error: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {

    return {
      data: [],
    };
  }
}
