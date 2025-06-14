/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Select from "react-select";
import countries from "country-flag-emoji-json";
import localforage from "localforage";
import CryptoJS from "crypto-js";
import PhoneNumberInput from "../components/signup/PhoneNumberInput";
import NamesInput from "../components/signup/NamesInput";
import ReferralCommunityForm from "../components/signup/ReferralCommunityForm";

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

export default function NationalInput() {
  const [step, setStep] = useState(1);

  const countryOptions = countries.map((country) => ({
    value: country.name,
    label: `${country.emoji} ${country.name}`,
  }));

  const defaultOman = countryOptions.find(
    (country) => country.value.toLowerCase() === "oman"
  );

  const [nationality, setNationality] = useState(defaultOman);

  useEffect(() => {
    localforage.getItem("userNationality").then((encrypted) => {
      if (encrypted) {
        try {
          const bytes = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY);
          const decrypted = bytes.toString(CryptoJS.enc.Utf8);
          const found = countryOptions.find(
            (c) => c.value.toLowerCase() === decrypted.toLowerCase()
          );
          if (found) setNationality(found);
        } catch (err) {
          console.error("Decryption failed", err);
        }
      }
    });
  }, []);

  const handleNationalityChange = (selectedOption) => {
    setNationality(selectedOption);
    const encrypted = CryptoJS.AES.encrypt(selectedOption.value, ENCRYPTION_KEY).toString();
    localforage.setItem("userNationality", encrypted);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-400 to-red-600 p-4">
      <div className="w-full max-w-md md:w-1/2 h-full md:h-[90vh] bg-white rounded-none md:rounded-2xl shadow-lg p-6 md:p-10">
        <h2 className="text-2xl font-bold mb-4">Complete Your Signup</h2>

        {/* STEP 1: Nationality + Phone */}
        {step === 1 && (
          <>
            <label className="block text-sm font-medium mb-1">Nationality</label>
            <Select
              options={countryOptions}
              value={nationality}
              onChange={handleNationalityChange}
              className="mb-4"
            />
            {nationality && (
              <p className="text-sm text-gray-600 mb-4">Selected: {nationality.label}</p>
            )}

            <PhoneNumberInput />

            <button
              onClick={() => setStep(2)}
              className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Next
            </button>
          </>
        )}

        {/* STEP 2: Name Inputs */}
        {step === 2 && (
          <>
            <NamesInput />
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* STEP 3: Referral & Community Codes */}
        {step === 3 && (
          <>
            <ReferralCommunityForm />
            <button
              onClick={() => setStep(2)}
              className="mt-4 w-full bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition"
            >
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}
