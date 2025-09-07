import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      src: '../assets/images/gallery/image1.png',
      alt: 'Elegant updo styling',
    },
    {
      src: '../assets/images/gallery/image2.png',
      alt: 'Beautiful balayage color work',
    },
    {
      src: '../assets/images/gallery/image3.png',
      alt: 'Modern precision cut',
    },
    {
      src: '../assets/images/gallery/image4.png',
      alt: 'Before and after transformation',
    },
    {
      src: '../assets/images/gallery/image5.png',
      alt: 'Stunning highlight work',
    },
    {
      src: '../assets/images/gallery/image6.jpg',
      alt: 'Stylish layered cut',
    },
    {
      src: '../assets/images/gallery/image7.jpg',
      alt: 'Wedding hair styling',
    },
    {
      src: '../assets/images/gallery/image8.jpg',
      alt: 'Color transformation',
    },
    {
      src: '../assets/images/gallery/image9.jpg',
      alt: 'Textured bob cut',
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
            Explore our portfolio showcasing the artistry and transformations that define T & S Studio.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-2xl shadow-lg cursor-pointer group"
              onClick={() => openLightbox(index)}
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
                alt={galleryImages[selectedImage].alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all duration-300"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation */}
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all duration-300"
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