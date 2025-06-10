
import { FiTag } from "react-icons/fi";

const Rewards = () => {
    return (
        <div className="flex flex-col items-center text-white cursor-pointer hover:text-yellow-300 transition-colors transform ">
            <FiTag size={24} />
            <span className="text-xs mt-1 font-medium">Rewards</span>
        </div>
    );
};

export default Rewards;
