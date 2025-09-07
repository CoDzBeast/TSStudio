import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:opacity-80 transition-opacity duration-300"
            >
              <img 
                src="../assets/images/logo.png" 
                alt="T & S Studio Logo" 
                className="h-12 md:h-16 object-contain"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-gray-700 hover:text-rose-400 transition-colors duration-300 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-rose-400 transition-colors duration-300 font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-rose-400 transition-colors duration-300 font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-gray-700 hover:text-rose-400 transition-colors duration-300 font-medium"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-rose-400 transition-colors duration-300 font-medium"
            >
              Contact
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-gray-800 text-cream px-6 py-2 rounded-full hover:bg-gray-700 transition-all duration-300 font-medium flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Book Now</span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-rose-400 transition-colors duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => scrollToSection('hero')}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-rose-400 transition-colors duration-300 w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-rose-400 transition-colors duration-300 w-full text-left"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-rose-400 transition-colors duration-300 w-full text-left"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-rose-400 transition-colors duration-300 w-full text-left"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-rose-400 transition-colors duration-300 w-full text-left"
            >
              Contact
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="mx-3 mt-4 bg-gray-800 text-cream px-6 py-2 rounded-full hover:bg-gray-700 transition-all duration-300 font-medium flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Book Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;