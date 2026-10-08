import getWishlistItems from "../../../services/wishlistActions/displaywishlist.service";
import WishlistItems from "../Wishlist/wishlistItems";

export default async function WishlistPage() {
  const response = await getWishlistItems();


  const products = response?.data || [];

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            My Wishlist
          </h1>

          <p className="text-gray-500 mt-2">
            Products you saved for later
          </p>
        </div>

        {/* Empty Wishlist */}
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <div className="text-5xl mb-4">
              ♡
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Your wishlist is empty
            </h2>

            <p className="text-gray-500">
              You haven't added any products to your wishlist yet.
            </p>
          </div>
        ) : (
          <WishlistItems products={products} />
        )}

      </div>
    </main>
  );
}
