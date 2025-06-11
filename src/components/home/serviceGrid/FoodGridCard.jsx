import { ArrowUpRight } from "lucide-react"; // or use any icon library

const FoodGridCard = () => {
    return (
        <div className=" w-full bg-[#FF4D30] rounded-2xl p-6 relative text-white flex flex-col justify-between">
            {/* Top badge and arrow */}
            <div className="flex justify-between items-start">
                {/* Badge */}
                <div className="bg-white/20 border border-white/40 px-3 py-1 text-xs rounded-full">BEST FOOD FOREVER</div>
                {/* Arrow icon */}
                <div className="bg-white text-black rounded-full p-2">
                    <ArrowUpRight size={20} />
                </div>
            </div>

            {/* Center Heading */}
            <div className="mt-6 text-3xl md:text-4xl font-bold leading-tight">
                THE <br />
                CRAVING <br />
                SPOT FOR EVERY FOODIE OUT THERE
            </div>

            {/* CTA Button */}
            <div className="mt-6">
                <button className="bg-black text-white text-sm px-5 py-2 rounded-full font-semibold hover:opacity-90">
                    ORDER NOW
                </button>
            </div>
        </div>
    );
};

export default FoodGridCard;
