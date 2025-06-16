import React from 'react'
import { FaApple, FaGooglePlay } from "react-icons/fa";


const DownloadGridCard = () => {

  return (

        <a target='_blank' href='https://ontrend.live/socials'
         className="bg-red-700 rounded-xl text-white flex items-center justify-evenly p-4 w-full md:col-span-3 lg:col-span-2 shadow-md cursor-pointer">
          <div className="flex justify-center items-center flex-col text-center">
        
            <img
              src="/ONtrend-logo.png"
              alt="ONtrend Logo"
              className="object-contain w-24 h-24 mb-3"
              loading="lazy"
            />
            <h3 className="text-lg font-semibold mb-1">Download the App</h3>
        
          </div>
          <div className="flex flex-col gap-4">
        
              <div className='flex gap-4'>
                  <FaApple size={18} />
                  <span>App Store</span>
                  <FaGooglePlay size={18} />
                  <span>Google Play</span>
              </div>
            <p className="text-sm text-white/90 w-70">
              Stay connected with us and follow our latest updates on social media.
            </p>
          </div>
        </a>

  );
};

export default DownloadGridCard;
