const Login = () => {
    return (
        <div className="max-w-full  p-6 bg-white transition-all duration-300 flex flex-col items-center">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Hey there!</h2>
                <p className="text-gray-500">Log in for an awesome experience!</p>
            </div>

            {/* Main Login Button */}
            <button className="w-full max-w-xs bg-[#fe3031] hover:bg-[#e02829] text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] mb-6">
                Login
            </button>

            {/* Divider */}
            <div className="relative w-full max-w-xs mb-6">
                <div className="absolute inset-0 flex items-center"></div>
            </div>
        </div>
    );
};
export default Login;
