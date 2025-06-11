import FavoriteButton from "../common/FavouriteButton";

const PharmacyCard = ({ name, images, isOnline }) => {
  return (
    <div className={`relative w-full h-44 rounded-2xl overflow-hidden shadow-lg ${isOnline ? "group" : ""}`}>
      {/* First Image */}
      <img
        src={images[0]}
        alt={name}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out ${
          isOnline ? "group-hover:translate-x-[-100%]" : ""
        }`}
      />
      <FavoriteButton/>

      {/* Second Image */}
      <img
        src={images[1]}
        alt={name}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out ${
          isOnline ? "translate-x-full group-hover:translate-x-0" : "hidden"
        }`}
      />

      {/* Busy Overlay */}
      {!isOnline && (
        <div className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center">
          <span className="text-white text-sm font-semibold">Busy</span>
        </div>
      )}

      {/* Name - placed at bottom, always on top */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white px-4 py-3 z-30">
        <h3 className="font-semibold text-base truncate">{name}</h3>
      </div>
    </div>
  );
};

export default PharmacyCard;
