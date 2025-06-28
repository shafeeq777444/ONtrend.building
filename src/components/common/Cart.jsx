
import {  FiShoppingCart } from "react-icons/fi";

const Cart = ({cartCount=1}) => {
  return (
    <div className="relative flex flex-col items-center text-white cursor-pointer hover:text-yellow-300 transition-colors transform ">
                <FiShoppingCart size={24} />
                {/* {cartCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center leading-none font-medium shadow-lg animate-bounce">
                        {cartCount}
                    </span>
                )} */}
                <span className="text-xs mt-1 font-medium">Cart</span>
            </div>
  )
}

export default Cart
