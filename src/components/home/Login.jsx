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
    <div className="  p-6 bg-white rounded-2xl flex justify-around items-center space-y-6  border-[rgba(156,163,175,0.3)]   m-4 hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] duration-200 transition-all ease-in-out ">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Hey there!</h2>
        <p className="text-gray-500 text-sm">
          Log in to unlock a personalized and seamless experience tailored just for you.
        </p>
      </div>

      {/* Horizontal Login Buttons */}
      <div className="flex justify-center gap-4">
        {loginOptions.map((option, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center px-3 py-2 w-16 h-16 rounded-lg bg-[#fe3031] hover:bg-[#e02829] text-white transition-all duration-200"
          >
            <div className="text-lg">{option.icon}</div>
            <span className="text-[10px] mt-1 text-center">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Login;
