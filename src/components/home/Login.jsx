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
    <div className="w-full max-w-full mx-auto p-6 bg-white rounded-2xl ">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Hey there!</h2>
        <p className="text-gray-500 text-base">
          Log in to unlock a personalized and seamless experience tailored just for you.
        </p>
      </div>

      {/* Horizontal Login Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        {loginOptions.map((option, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center p-3 w-20 h-20 rounded-xl bg-[#fe3031] hover:bg-[#e02829] text-white transition-all duration-200"
          >
            <div className="text-xl">{option.icon}</div>
            <span className="text-xs mt-1 text-center">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Login;
