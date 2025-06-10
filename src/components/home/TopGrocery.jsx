import React, { useState } from "react";
import { Heart, HeartOff } from "lucide-react";

const stores = [
  {
    id: 1,
    name: "GROCERY",
    category: "Grocery",
    imageUrl:
      "https://via.placeholder.com/150/000022/00ffff?text=Silver+Captain",
    businessName: "SILVER CAPTAIN TRADING ESTABLISHMENT",
  },
  {
    id: 2,
    name: "AL MASHHOOR ENTERPRISES",
    category: "Grocery",
    imageUrl:
      "https://via.placeholder.com/150/550022/ffcccc?text=Al+Mashhoor",
  },
];

export default function TopGroceryStores() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Top Grocery Stores</h2>
      <div className="flex gap-4 overflow-x-auto">
        {stores.map((store) => (
          <div
            key={store.id}
            className="flex-shrink-0 bg-white rounded-2xl shadow-md p-4 w-80 flex items-center gap-4 relative"
          >
            <img
              src={store.imageUrl}
              alt={store.name}
              className="w-24 h-24 object-cover rounded-xl"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{store.name}</h3>
              <p className="text-gray-500 text-sm">{store.category}</p>
              <button className="mt-3 bg-red-500 text-white px-4 py-1.5 text-sm rounded-lg">
                Explore
              </button>
            </div>
            <button
              className="absolute top-4 right-4"
              onClick={() => toggleFavorite(store.id)}
            >
              {favorites.includes(store.id) ? (
                <Heart className="text-red-500 fill-red-500" />
              ) : (
                <Heart className="text-gray-400" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
