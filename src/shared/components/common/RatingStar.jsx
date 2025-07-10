import { Star } from "lucide-react";

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center space-x-0.5">
      {[...Array(5)].map((_, i) => {
        const isFull = i < fullStars;
        const isHalf = i === fullStars && hasHalfStar;

        return (
          <div key={i} className="relative w-4 h-4">
            {/* Base star outline */}
            <Star size={14} stroke="#facc15" fill="none" className="absolute top-0 left-0" />
            
            {/* Full star */}
            {isFull && (
              <Star size={14} stroke="#facc15" fill="#facc15" className="absolute top-0 left-0" />
            )}

            {/* Half star */}
            {isHalf && (
              <Star
                size={14}
                stroke="#facc15"
                fill="#facc15"
                className="absolute top-0 left-0"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RatingStars;
