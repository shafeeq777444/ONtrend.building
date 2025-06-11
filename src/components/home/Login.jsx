import { FaGoogle, FaApple, FaFacebookF, FaPhone, FaEnvelope } from "react-icons/fa";

const Login = () => {
  const loginOptions = [
    { icon: <FaGoogle />, label: "Google" },
    { icon: <FaApple />, label: "Apple" },
    { icon: <FaFacebookF />, label: "Facebook" },
    { icon: <FaPhone />, label: "Phone" },
    { icon: <FaEnvelope />, label: "Email" },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl   m-4 hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] transition-all duration-200 ease-in-out border-2 border-gray-300">
      {/* Flex Wrapper */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 ">
        
        {/* Header */}
        <div className="text-center md:text-left max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-1 ">Hey there!</h2>
          <p className="text-gray-500 text-sm">
            Log in to unlock a personalized and seamless experience tailored just for you.
          </p>
        </div>

        {/* Login Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {loginOptions.map((option, index) => (
            <button
              key={index}
              className="flex flex-col items-center justify-center px-3 py-2 w-12 h-12 md:w-16 md:h-16 rounded-lg bg-[#fe3031] hover:bg-[#e02829] text-white transition-all duration-200"
            >
              <div className=" text-sm md:text-lg">{option.icon}</div>
              <span className="hidden md:text-[10px] mt-1 text-center">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
