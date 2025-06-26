import React, { useEffect, useState } from "react";
import { FiX, FiCopy } from "react-icons/fi";
import { fetchCurrentUserData } from "@/firebase/auth";
import toast from "react-hot-toast";

const UserProfileModal = ({ onClose }) => {
  const [userData, setUserData] = useState(null);
console.log(userData)
  useEffect(() => {

    fetchCurrentUserData({setUserData,toast} );
  }, []);

  if (!userData) return null; // or a loading indicator

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-xl p-6 shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <FiX size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={userData.profileImageUrl}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">
              {userData.firstName} {userData.lastName}
            </h2>
            <p className="text-sm text-gray-500">{userData.email}</p>
          </div>
          <div className="ml-auto">
            <button className="border text-sm px-3 py-1 rounded-md hover:bg-gray-100">
              <FiCopy className="inline mr-1" />
              Copy link
            </button>
            <button className="ml-2 border text-sm px-3 py-1 rounded-md hover:bg-gray-100">
              View profile
            </button>
          </div>
        </div>

        {/* Info Fields */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                value={userData.firstName}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-100"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                value={userData.lastName}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Email address</label>
            <input
              type="email"
              value={userData.email}
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="text"
              value={userData.number}
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Nationality</label>
            <input
              type="text"
              value={userData.nationality}
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Profile photo</label>
            <div className="flex items-center gap-3">
              <img
                src={userData.profileImageUrl}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="text-sm text-gray-500">Displayed from Google</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
