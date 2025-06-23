import React from "react";

const SkeltonTopRated = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        {/* Heading */}
        <div className="mb-6 text-center lg:text-left">
          <h2 className="text-2xl font-bold text-gray-800">Top Rated</h2>
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-md bg-white shadow-sm relative w-full overflow-hidden"
            >
              {/* Banner skeleton */}
              <div className="bg-gray-200 aspect-[4/3]" />

              {/* Overlay skeleton */}
              <div className="absolute bottom-0 left-0 w-full px-4 py-3 flex justify-between items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-b-md">
                {/* Left section */}
                <div className="flex items-start space-x-3">
                  {/* Logo placeholder */}
                  <div className="bg-white w-12 h-12 rounded-lg shadow-md">
                    <div className="bg-gray-300 w-full h-full rounded-lg" />
                  </div>

                  {/* Text placeholders */}
                  <div className="space-y-1 text-white">
                    <div className="bg-gray-300 h-4 w-32 rounded" />
                    <div className="bg-gray-300 h-3 w-20 rounded" />
                    <div className="flex space-x-2">
                      <div className="bg-gray-300 h-3 w-12 rounded" />
                      <div className="bg-gray-300 h-3 w-14 rounded" />
                    </div>
                  </div>
                </div>

                {/* Wishlist icon skeleton */}
                <div className="bg-gray-300 rounded-full w-8 h-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkeltonTopRated;
