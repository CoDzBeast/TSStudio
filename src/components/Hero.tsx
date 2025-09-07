import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import homepageImage from '../assets/images/hero/homepage.jpg';

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gray-800 mb-6 leading-tight">
              Welcome to
              <span className="block text-rose-400">T & S Studio</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed">
              Where our team of artists empowers you with the charm and confidence you deserve
            </p>
            <p className="text-base text-gray-600 mb-10 italic">
              "Where Artistry Meets Beauty"
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-gray-800 text-cream px-8 py-4 rounded-full hover:bg-gray-700 transition-all duration-300 font-medium flex items-center justify-center space-x-2 group"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Your Transformation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="border-2 border-gray-800 text-gray-800 px-8 py-4 rounded-full hover:bg-gray-800 hover:text-cream transition-all duration-300 font-medium"
              >
                Explore Our Services
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-rose-200 to-rose-300 rounded-2xl shadow-2xl flex items-center justify-center">
              <img
                src={homepageImage}
                alt="Elegant hair styling at T & S Studio"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            {/* Floating elements - Removed as requested */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;