// review star
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
export function RoomReviewStar({ rating }) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex text-black text-xs my-2">
            {Array(fullStars)
                .fill()
                .map((_, i) => (
                    <FaStar key={"full" + i} />
                ))}
            {halfStar && <FaStarHalfAlt />}
            {Array(emptyStars)
                .fill()
                .map((_, i) => (
                    <FaRegStar key={"empty" + i} />
                ))}
        </div>
    );
}
