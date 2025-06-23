const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center space-x-0.5">
      {[...Array(5)].map((_, i) => {
        const isFull = i < fullStars;
        const isHalf = i === fullStars && halfStar;

        return (
          <Star
            key={i}
            size={12}
            stroke="#facc15"
            fill={isFull || isHalf ? "#facc15" : "none"}
            style={isHalf ? { clipPath: "inset(0 50% 0 0)" } : {}}
          />
        );
      })}
    </div>
  );
};

export default RatingStars