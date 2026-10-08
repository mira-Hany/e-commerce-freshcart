import Link from "next/link";
import { CategoryResponce } from "@/interface/response.type";
import { getAllCategory } from "@/services/category/category.service";

export default async function CategoryCards() {
  const data: CategoryResponce = await getAllCategory();

  return (
    <section className="container mx-auto px-4 py-10">

      <h2
        className="
          relative
          text-4xl
          font-bold
          p-10
          mb-5
          before:content-['']
          before:absolute
          before:h-12
          before:w-3
          before:inset-s-4
          before:bg-green-700
          before:rounded-2xl
        "
      >
        Shop by <span className="text-green-700">Category</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">

        {data?.data?.map((category: any) => (
          <Link href={`/Categories/${category._id}`} key={category._id}>
            <div
              className="
                bg-white
                rounded-2xl
                p-5
                text-center
                border
                border-gray-100
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                transition-all
                duration-300
                cursor-pointer
              "
            >

              <div className="flex justify-center mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="
                    w-28
                    h-28
                    rounded-full
                    object-cover
                    border-4
                    border-gray-50
                    shadow-md
                    hover:scale-105
                    transition-transform
                    duration-300
                  "
                />
              </div>

              <h3 className="text-gray-800 font-semibold text-base">
                {category.name}
              </h3>

            </div>
          </Link>
        ))}

      </div>
    </section>
  );
}