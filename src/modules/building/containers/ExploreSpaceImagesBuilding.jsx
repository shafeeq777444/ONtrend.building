import React, { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const ExploreSpaceImagesBuilding = ({ images, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!isOpen) return null

  const cleanImages = images.map(img => img.replace(/[`"]/g, '').trim())

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % cleanImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + cleanImages.length) % cleanImages.length)
  }

  const goToImage = (index) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
      >
        <X size={32} />
      </button>

      {/* Navigation arrows */}
      {cleanImages.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
          >
            <ChevronLeft size={48} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
          >
            <ChevronRight size={48} />
          </button>
        </>
      )}

      {/* Main image */}
      <div className="max-w-4xl max-h-[80vh] mx-4">
        <img
          src={cleanImages[currentImageIndex]}
          alt={`Space image ${currentImageIndex + 1}`}
          className="w-full h-full object-contain rounded-lg"
        />
      </div>

      {/* Image counter and thumbnails */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="text-white text-center mb-4">
          {currentImageIndex + 1} / {cleanImages.length}
        </div>
        
        {/* Thumbnail navigation */}
        <div className="flex space-x-2 justify-center">
          {cleanImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                index === currentImageIndex ? 'border-white' : 'border-gray-500'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExploreSpaceImagesBuilding
