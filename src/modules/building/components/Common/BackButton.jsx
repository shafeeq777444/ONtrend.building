import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const BackButton = ({handleBack,indicateText}) => {

    // ---------------- hooks ------------------
    const navigate = useNavigate();
    const location = useLocation();

    // ---------------- functions ------------------
    const fallBackhandleBack = () => {
    const currentPath = location.pathname; // e.g., /c/689d6337-200c-832c-9a7c-1b618ef1f974
    const segments = currentPath.split("/").filter(Boolean); // split into ["c", "689d6337-200c-832c-9a7c-1b618ef1f974"]
    // remove last segment
    segments.pop();
    const newPath = "/" + segments.join("/") + "/"; // reconstruct path with trailing slash
    navigate(newPath);
  };

//   ------------------ ui ------------------
  return (

       <button 
                    onClick={handleBack || fallBackhandleBack}
                    className="flex items-center justify-center px-4 py-2 h-8 min-w-20 rounded-lg bg-white shadow-md hover:bg-gray-100 text-gray-700 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 z-50"
                    aria-label="Go back"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    {indicateText && <span className='text-sm'>{indicateText}</span>}
                </button>

  )
}

export default BackButton
