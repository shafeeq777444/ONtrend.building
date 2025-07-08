import React from "react";
import { RoomReviewStar } from "../Review/RoomReviewStar";
const RoomReviewCustomerCard = ({r,i}) => {
    return (
        <div key={i} className="bg-white p-4 rounded-xl shadow-md flex gap-4 transition">
            {/* Avatar */}
            <img
                src={`https://i.pravatar.cc/150?u=${r.name}`}
                alt={r.name}
                className="w-12 h-12 rounded-full object-cover"
            />

            {/* Text content */}
            <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-base font-semibold text-gray-900">{r.name}</div>
                        <div className="text-sm text-gray-500">{r.time}</div>
                    </div>
                    <div className="text-xs text-gray-400">{r.posted}</div>
                </div>

                <RoomReviewStar rating={r.rating} />
                <p className="text-sm mt-1 text-gray-800">{r.content}</p>
            </div>
        </div>
    );
};

export default RoomReviewCustomerCard;
