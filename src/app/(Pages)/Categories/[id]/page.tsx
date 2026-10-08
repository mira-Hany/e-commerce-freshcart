import Link from "next/link";
import { getSpecificCategory } from "../../../../services/category/getSpecificCategory.service";
import { getCategorySubCategories } from "../../../../services/category/getallsubcategory.service";

export default async function CategoryDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;


  const category = await getSpecificCategory(id);
  const subCategories = await getCategorySubCategories(id);

  if (!category || !category.data) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-red-500">
          Category not found
        </h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Green Header */}
      <section className="bg-linear-to-r from-green-500 to-green-400 py-10">
        <div className="container mx-auto px-4">

          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {category.data.name}
          </h1>

          <p className="text-white mt-2 text-lg">
            Choose a subcategory to browse products
          </p>

        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-10">

        {/* Back */}
        <Link
          href="/Categories"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 mb-8"
        >
          <span className="text-xl">←</span>
          Back to Categories
        </Link>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {subCategories?.data?.length || 0} Subcategories in{" "}
          {category.data.name}
        </h2>

        {/* Subcategories */}
        {subCategories?.data?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {subCategories.data.map(
              (subCategory: {
                _id: string;
                name: string;
              }) => (
                <Link
                  key={subCategory._id}
                  href={`/products?subcategory=${subCategory._id}`}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition p-6 min-h-42.5"
                >
                  {/* Folder Icon */}
                  <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center mb-5">
                    <i className="fa-solid fa-folder text-green-600 text-2xl"></i>
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-bold text-gray-900">
                    {subCategory.name}
                  </h3>
                </Link>
              )
            )}

          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <p className="text-gray-500 text-lg">
              No subcategories found.
            </p>
          </div>
        )}

      </section>

    </main>
  );
}
