export async function getCategorySubCategories(categoryId: string) {
  try {

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
      {
        cache: "no-store",
      }
    );

    const data = await response.json();


    if (!response.ok) {
      throw new Error("There is an error while fetching subcategories");
    }

    return data;
  } catch (error) {
    return null;
  }
}