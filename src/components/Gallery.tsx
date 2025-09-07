import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Import all gallery images
import image1 from '../assets/images/gallery/image1.png';
import image2 from '../assets/images/gallery/image2.png';
import image3 from '../assets/images/gallery/image3.png';
import image4 from '../assets/images/gallery/image4.png';
import image5 from '../assets/images/gallery/image5.png';
import image6 from '../assets/images/gallery/image6.jpg';
import image7 from '../assets/images/gallery/image7.jpg';
import image8 from '../assets/images/gallery/image8.jpg';
import image9 from '../assets/images/gallery/image9.jpg';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      src: image1,
      alt: 'Elegant updo styling at T & S Studio - Premier women-owned salon in Rocklin, CA',
    },
    {
      src: image2,
      alt: 'Beautiful balayage color work by expert stylists in Rocklin, CA',
    },
    {
      src: image3,
      alt: 'Modern precision cut for women at T & S Studio hair salon',
    },
    {
      src: image4,
      alt: 'Before and after hair transformation at Rocklin salon',
    },
    {
      src: image5,
      alt: 'Stunning highlight work by professional colorists in Rocklin',
    },
    {
      src: image6,
      alt: 'Stylish layered cut for modern women at T & S Studio',
    },
    {
      src: image7,
      alt: 'Wedding hair styling for brides in Rocklin, CA',
    },
    {
      src: image8,
      alt: 'Complete color transformation at premier Rocklin hair salon',
    },
    {
      src: image9,
      alt: 'Textured bob cut by expert stylists at T & S Studio',
    },
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const newIndex = direction === 'prev' 
      ? (selectedImage - 1 + galleryImages.length) % galleryImages.length
      : (selectedImage + 1) % galleryImages.length;
    
    setSelectedImage(newIndex);
  };

  return (
    <section id="gallery" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">Our Work Speaks</h2>
          <div className="w-24 h-1 bg-rose-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Explore our portfolio showcasing the artistry and transformations that define T & S Studio, 
            the premier women-owned hair salon in Rocklin, CA.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-2xl shadow-lg cursor-pointer group"
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  openLightbox(index);
                }
              }}
              aria-label={`View ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <img
                src={galleryImages[selectedImage].src}
                alt={`${galleryImages[selectedImage].alt} - Full size view`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all duration-300"
                aria-label="Close image viewer"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation */}
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all duration-300"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all duration-300"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;