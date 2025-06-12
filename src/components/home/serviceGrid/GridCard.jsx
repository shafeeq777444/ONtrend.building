import React from "react";

const GridCard = ({ title, description, image }) => {
    return (
        <div className="relative group w-full h-full cursor-pointer overflow-hidden rounded-lg shadow-md">
            {/* Image */}
            <img className="w-full h-full object-cover" src={image} alt={title} />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 bg-opacity-30 group-hover:bg-opacity-50 transition duration-300" />

            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
                {/* Title fades out on hover */}
                <h3
                    className="text-2xl font-semibold mb-2 absolute transition-all duration-700 ease-in-out 
               opacity-100 translate-y-0 group-hover:opacity-0 group-hover:-translate-y-2"
                >
                    {title}
                </h3>

                {/* Description fades in on hover */}
                <p
                    className="text-sm absolute opacity-0 translate-y-2 transition-all duration-700 ease-in-out 
               group-hover:opacity-100 group-hover:translate-y-0 delay-100 px-2"
                >
                    {description}
                </p>
            </div>
        </div>
    );
};

export default GridCard;
