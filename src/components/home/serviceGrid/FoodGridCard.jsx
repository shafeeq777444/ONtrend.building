import { ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const images = ["/gird/food1.jpg", "/gird/food2.jpg", "/gird/food3.jpg", "/gird/food4.jpg"];

const FoodGridCard = () => {
    return (
        <div className="w-full  h-full rounded-md p-6 relative text-white flex flex-col justify-between group overflow-hidden">
            {/* Background Swiper Images with dark overlay */}
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <Swiper
                    direction="vertical"
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="h-full w-full"
                >
                    {images.map((img, i) => (
                        <SwiperSlide key={i}>
                            <img src={img} alt={`food-${i}`} className="object-cover w-full h-full" />
                            <div className="absolute inset-0 bg-black/30 bg-opacity-60" /> {/* Dark shadow overlay */}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Top badge and arrow */}
            <div className="flex justify-between items-start z-10 relative">
                <div className="bg-white/20 border border-white/40 px-3 py-1 text-xs rounded-full  group-hover:opacity-90 hover:opacity-100 duration-300 ease-in transition-all">
                    BEST FOOD FOREVER
                </div>
                <div className="bg-white text-black rounded-full p-2 opacity-0 group-hover:opacity-90 hover:opacity-100 duration-300 ease-in transition-all">
                    <ArrowUpRight size={20} />
                </div>
            </div>

            {/* Main Heading */}
            <div className="text-2xl md:text-4xl font-bold leading-tight z-10 relative mt-6 ">
                HUNGRY? <br />
                TAP TO EXPLORE <br />
                DELICIOUS FOOD SPOTS
            </div>

            {/* CTA Button */}
            <div className="mt-6 z-10 relative">
                <button className="bg-black text-white text-sm px-5 py-2 rounded-full font-semibold opacity-0 group-hover:opacity-90 hover:opacity-100 duration-300 ease-in transition-all">
                    ORDER NOW
                </button>
            </div>
        </div>
    );
};

export default FoodGridCard;
