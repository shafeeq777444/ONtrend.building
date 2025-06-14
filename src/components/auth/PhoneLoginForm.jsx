"use client";
import { useState } from "react";
import { signInWithPhone, verifyOtpCode } from "../../firebase/auth";

export default function PhoneLoginForm({ onBack,  }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtpClick = async (e) => {
    e.preventDefault();
    await signInWithPhone(phone);
    setOtpSent(true);
  };

  const handleVerifyClick = async (e) => {
    e.preventDefault();
    await verifyOtpCode(otp);
  };

  return (
    <form className="space-y-3">
      {!otpSent ? (
        <>
          <input
            type="tel"
            placeholder="Enter mobile number"
            className="w-full p-3 rounded-xl bg-white text-black"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button
            onClick={handleSendOtpClick}
            className="w-full py-3 rounded-xl bg-white text-black font-semibold"
          >
            Send OTP
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full p-3 rounded-xl bg-white text-black"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button
            onClick={handleVerifyClick}
            className="w-full py-3 rounded-xl bg-white text-black font-semibold"
          >
            Verify OTP
          </button>
        </>
      )}

      <button
        type="button"
        onClick={onBack}
        className="w-full text-sm underline text-center text-gray-400"
      >
        Back
      </button>

      <div id="recaptcha-container" />
    </form>
  );
}
