import RatingIcon from "../Common/RatingsIcon";

import { Sparkles, CheckCircle, LogIn, MessageCircle, MapPin } from "lucide-react";

import RoomReviewCustomerCard from "../Review/RoomReviewCustomerCard";
import RoomRatingIndividual from "../Review/RoomRatingIndividual";

export default function BuildingRoomReviews() {
    const reviews = [
        {
            name: "Anubhav",
            time: "7 months on Airbnb",
            posted: "3 days ago",
            content:
                "Wanted to stay more but the room was booked earlier. The place was really clean and peaceful, would definitely recommend for solo travelers.",
            rating: 4.5,
        },
        {
            name: "Areyen",
            time: "6 months on Airbnb",
            posted: "1 week ago",
            content:
                "Loved the experience! The host was very welcoming, the location was perfect, and everything was just as shown in the photos.",
            rating: 5,
        },
        {
            name: "Praveen",
            time: "4 months on Airbnb",
            posted: "1 week ago",
            content:
                "Good place to stay. The room was neat and tidy. Only downside was that the Wi-Fi was a bit slow during the evening hours.",
            rating: 4,
        },
        {
            name: "Arun",
            time: "7 years on Airbnb",
            posted: "3 weeks ago",
            content:
                "Nice and comfortable room. The neighborhood is quiet, and the bed was super comfy. Check-in was smooth too.",
            rating: 4.5,
        },
        {
            name: "Anubhav",
            time: "7 months on Airbnb",
            posted: "3 days ago",
            content:
                "Wanted to stay more but the room was booked earlier. The host was understanding and helped me find another place nearby.",
            rating: 4.5,
        },
        {
            name: "Areyen",
            time: "6 months on Airbnb",
            posted: "1 week ago",
            content: "Love the experience! The room had all basic amenities and a beautiful balcony view. Felt like home.",
            rating: 5,
        },
        {
            name: "Praveen",
            time: "4 months on Airbnb",
            posted: "1 week ago",
            content:
                "Good place. Clean sheets, good air conditioning, and within walking distance from local cafes and bus stop.",
            rating: 4,
        },
        {
            name: "Arun",
            time: "7 years on Airbnb",
            posted: "3 weeks ago",
            content:
                "The room was well-maintained. Appreciated the attention to detail by the host. Would consider staying again.",
            rating: 4.5,
        },
        {
            name: "Anubhav",
            time: "7 months on Airbnb",
            posted: "3 days ago",
            content:
                "Great overall. The bed was super comfy, and I slept like a baby. Just wished there was a bit more natural light.",
            rating: 4.5,
        },
        {
            name: "Areyen",
            time: "6 months on Airbnb",
            posted: "1 week ago",
            content: "Amazing place. Very peaceful and had a great vibe. The host even offered me free tea in the morning.",
            rating: 5,
        },
        {
            name: "Praveen",
            time: "4 months on Airbnb",
            posted: "1 week ago",
            content:
                "The stay was pleasant. Slight noise from outside during the day but quiet at night. Great value for money.",
            rating: 4,
        },
        {
            name: "Arun",
            time: "7 years on Airbnb",
            posted: "3 weeks ago",
            content: "Really enjoyed my stay. Everything was clean and well-organized. Host communicated well throughout.",
            rating: 4.5,
        },
    ];
    const ratings = [
        { label: "Cleanliness", value: 5.0, icon: "/reviews/cleaning.png" },
        { label: "Accuracy", value: 4.9, icon: "/reviews/accurancy.png" },
        { label: "Check-in", value: 4.9, icon: "/reviews/checkin.png" },
        { label: "Communication", value: 5.0, icon: "/reviews/communication.png" },
        { label: "Location", value: 4.9, icon: "/reviews/location.png" },
    ];

    return (
        <div className="flex h-screen overflow-hidden mt-18">
            {/* Left Sticky Panel */}
            <div className="w-1/3 p-6 bg-white sticky h-fit self-start">
                <RatingIcon />
                <p className="text-gray-600 font-medium mb-4 mt-10">Guest favourite</p>
                <div className="space-y-3 text-sm">
                    {ratings.map((r, i) => (
                        <RoomRatingIndividual key={i} label={r.label} value={r.value} icon={r.icon} />
                    ))}
                </div>
            </div>

            {/* Right Scrollable Panel */}
            <div className="w-2/3 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                <h2 className="text-2xl font-semibold mb-4">Guest Reviews</h2>
                {reviews.map((r, i) => (
                    <RoomReviewCustomerCard r={r} i={i} />
                ))}
                <div className="flex justify-center pt-4">
                    <button className="px-5 py-2 text-sm font-medium cursor-pointer text-white bg-black rounded-full hover:bg-gray-800 transition">
                        See more reviews
                    </button>
                </div>
            </div>
        </div>
    );
}
