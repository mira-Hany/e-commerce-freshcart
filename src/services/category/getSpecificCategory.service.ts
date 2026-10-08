export async function getSpecificCategory(id: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }

  const data = await response.json();

  return data;
}