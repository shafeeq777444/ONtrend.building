// 1️⃣ Building Carousel Skeleton
export const BuildingCarouselSkeleton = () => {
    return (
      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
        <div className="w-full h-full bg-gray-200 animate-pulse" />
        <div className="absolute bottom-6 left-6 space-y-2">
          <div className="h-6 w-48 bg-gray-300 rounded-md animate-pulse" />
          <div className="h-4 w-24 bg-gray-300 rounded-md animate-pulse" />
          <div className="h-6 w-32 bg-gray-300 rounded-full animate-pulse" />
        </div>
      </div>
    );
  };
  
  // 2️⃣ Building Room Card Skeleton
  export const BuildingRoomCardSkeleton = () => {
    return (
      <div className="w-full bg-white rounded-xl shadow-md overflow-hidden h-[280px]">
        <div className="w-full h-[140px] bg-gray-200 animate-pulse" />
        <div className="p-4 space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded mt-1" />
          <div className="flex gap-2 mt-4">
            <div className="h-8 w-full bg-gray-200 rounded-md animate-pulse" />
            <div className="h-8 w-full bg-gray-200 rounded-md animate-pulse" />
          </div>
        </div>
      </div>
    );
  };
  
  // 3️⃣ Building Details Card Skeleton
  export const BuildingDetailsCardSkeleton = () => {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-4 max-w-sm w-full space-y-4">
        <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-full bg-gray-300 rounded-xl animate-pulse" />
      </div>
    );
  };
  
  // 4️⃣ Building Room Type Card Skeleton
  export const BuildingRoomTypeCardSkeleton = () => {
    return (
      <div className="w-[340px] rounded-2xl overflow-hidden shadow-md">
        <div className="aspect-[4/3] w-full bg-gray-200 animate-pulse" />
        <div className="bg-black/70 px-4 py-3 text-white space-y-2">
          <div className="h-4 w-32 bg-gray-400 rounded animate-pulse" />
          <div className="h-3 w-28 bg-gray-400 rounded animate-pulse" />
        </div>
      </div>
    );
  };
  
  // 5️⃣ Combined Skeleton
  export const BuildingDetailsSkeleton = () => {
    return (
      <div className="mt-2 px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Right Column */}
          <div className="w-full lg:w-[72%] flex flex-col gap-6 order-1 lg:order-2 h-auto overflow-y-auto pr-1 scrollbar-hide">
            <BuildingCarouselSkeleton />
  
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <BuildingRoomCardSkeleton key={i} />
              ))}
            </div>
          </div>
  
          {/* Left Column */}
          <div className="w-full lg:w-[28%] flex flex-col items-center gap-6 order-2 lg:order-1 mt-2">
            <BuildingDetailsCardSkeleton />
  
            <div className="w-full h-[300px] sm:h-[400px] lg:h-[69vh] overflow-y-auto pr-1 scrollbar-hide flex flex-col items-center gap-4">
              <div className="h-10 w-48 bg-gray-300 rounded-md animate-pulse" />
              {[...Array(3)].map((_, i) => (
                <BuildingRoomTypeCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default BuildingDetailsSkeleton