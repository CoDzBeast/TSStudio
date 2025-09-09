import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<{src: string, alt: string, id: string}[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lastShownId, setLastShownId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const preloadRef = useRef<HTMLDivElement>(null);
  
  // Constants for grid layout
  const imagesPerPage = 9;
  const autoplayInterval = 5000; // 5 seconds

  // Dynamically import all images from the gallery folder and sort by filename
  useEffect(() => {
    const importImages = async () => {
      setIsLoading(true);
      try {
        // @ts-ignore
        const imageModules = import.meta.glob('../assets/images/gallery/*.{jpg,jpeg,png,webp}', { eager: true });
        const imageList = Object.entries(imageModules).map(([path, module]) => {
          const fileName = path.split('/').pop() || '';
          return {
            // @ts-ignore
            src: module.default,
            alt: `Gallery image ${fileName.split('.')[0]} - T & S Studio hair salon in Rocklin, CA`,
            id: fileName // Unique identifier for each image
          };
        }).sort((a, b) => {
          // Sort by filename
          return a.id.localeCompare(b.id);
        });
        
        setImages(imageList);
        setIsLoading(false);
        
        // Set random starting index
        if (imageList.length > 0) {
          const randomIndex = Math.floor(Math.random() * imageList.length);
          setCurrentIndex(randomIndex);
        }
      } catch (error) {
        console.error('Error loading gallery images:', error);
        setIsLoading(false);
      }
    };

    importImages();
  }, []);

  // Preload next page of images for better performance
  const preloadNextPage = useCallback(() => {
    if (images.length === 0) return;
    
    const nextPageIndex = (currentIndex + imagesPerPage) % images.length;
    const nextPageImages = [];
    for (let i = 0; i < imagesPerPage; i++) {
      const index = (nextPageIndex + i) % images.length;
      nextPageImages.push(images[index]);
    }
    
    // Create invisible image elements to trigger preload
    nextPageImages.forEach(image => {
      const img = new Image();
      img.src = image.src;
    });
  }, [images, currentIndex]);

  // Preload images when current index changes
  useEffect(() => {
    preloadNextPage();
  }, [preloadNextPage]);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = useCallback((array: any[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }, []);

  // Get current page of images (3x3 grid)
  const getCurrentPageImages = useCallback(() => {
    if (images.length === 0) return [];
    
    const pageImages = [];
    for (let i = 0; i < imagesPerPage; i++) {
      const index = (currentIndex + i) % images.length;
      pageImages.push(images[index]);
    }
    
    return pageImages;
  }, [images, currentIndex]);

  // Advance to next page
  const goToNextPage = useCallback(() => {
    if (images.length === 0) return;
    
    // Update last shown ID to prevent repeats
    const currentPageImages = getCurrentPageImages();
    if (currentPageImages.length > 0) {
      setLastShownId(currentPageImages[0].id);
    }
    
    // Move to next page (next 9 images)
    setCurrentIndex(prev => (prev + imagesPerPage) % images.length);
  }, [images, currentIndex, getCurrentPageImages]);

  // Advance to previous page
  const goToPrevPage = useCallback(() => {
    if (images.length === 0) return;
    
    // Move to previous page
    setCurrentIndex(prev => {
      const newIndex = prev - imagesPerPage;
      return newIndex < 0 ? images.length + newIndex : newIndex;
    });
  }, [images]);

  // Handle autoplay
  useEffect(() => {
    if (isPaused || images.length === 0 || isLoading) {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
      return;
    }

    // Clear any existing interval
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }

    // Set up new autoplay interval
    autoplayRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        const nextIndex = (prev + imagesPerPage) % images.length;
        
        // When we complete a full cycle, reshuffle
        if (nextIndex < prev) {
          // Reshuffle images to create new order
          const shuffledImages = shuffleArray(images);
          setImages(shuffledImages);
          
          // Ensure first tile of next cycle ≠ last shown tile
          let newStartIndex = 0;
          if (lastShownId) {
            const lastShownIndex = shuffledImages.findIndex(img => img.id === lastShownId);
            if (lastShownIndex !== -1) {
              // Find a new starting position that doesn't start with the last shown image
              newStartIndex = (lastShownIndex + 1) % shuffledImages.length;
            }
          }
          
          return newStartIndex;
        }
        
        return nextIndex;
      });
    }, autoplayInterval);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [isPaused, images, lastShownId, shuffleArray, isLoading]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevPage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNextPage();
          break;
        case ' ': // Spacebar
          e.preventDefault();
          setIsPaused(prev => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextPage, goToPrevPage]);

  // Pause autoplay on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Touch handlers for mobile
  const handleTouchEnd = () => {
    setIsPaused(false);
  };

  if (isLoading) {
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
          <div className="text-center py-10">
            <p>Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  if (images.length === 0) {
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
          <div className="text-center py-10">
            <p>No images found in gallery.</p>
          </div>
        </div>
      </section>
    );
  }

  const currentPageImages = getCurrentPageImages();

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

        {/* Gallery Grid with navigation controls */}
        <div 
          ref={galleryRef}
          className="relative group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchEnd={handleTouchEnd}
        >
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentPageImages.map((image, index) => {
              return (
                <div
                  key={`${currentIndex}-${index}`}
                  className="aspect-square overflow-hidden rounded-2xl shadow-lg cursor-pointer group focus:outline-none focus:ring-2 focus:ring-rose-400"
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${image.alt}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      // Handle image selection if needed
                    }
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots */}
        {images.length > imagesPerPage && (
          <div className="flex justify-center items-center space-x-2 mt-4">
            <button
              onClick={goToPrevPage}
              className="bg-rose-400 hover:bg-rose-500 text-white p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="flex space-x-2">
              {Array.from({ length: Math.min(10, Math.ceil(images.length / imagesPerPage)) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const targetIndex = index * imagesPerPage;
                    setCurrentIndex(targetIndex);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-400 ${
                    Math.floor(currentIndex / imagesPerPage) === index 
                      ? 'bg-rose-400 w-6 animate-dot-pulse' 
                      : 'bg-gray-300'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
              {Math.ceil(images.length / imagesPerPage) > 10 && (
                <span className="text-gray-500">...</span>
              )}
            </div>
            
            <button
              onClick={goToNextPage}
              className="bg-rose-400 hover:bg-rose-500 text-white p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Autoplay Status Indicator - Removed the text but kept the functionality */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="text-sm text-gray-600 hover:text-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-400 rounded px-2 py-1"
            aria-label={isPaused ? "Resume autoplay" : "Pause autoplay"}
          >
            {/* Text removed as requested */}
          </button>
        </div>
        
        {/* Accessibility announcement for page changes */}
        <div 
          aria-live="polite" 
          className="sr-only"
        >
          Showing gallery page with images starting from {currentPageImages[0]?.alt || 'unknown'}.
        </div>
        
        {/* Hidden preload container */}
        <div ref={preloadRef} className="hidden"></div>
      </div>
    </section>
  );
};

export default Gallery;