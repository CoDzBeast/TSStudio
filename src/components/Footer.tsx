import React from 'react';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-cream text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Brand */}
          <div className="md:flex-1">
            <h3 className="text-3xl font-serif font-bold mb-4 text-gray-800">T & S Studio</h3>
            <p className="text-rose-400 mb-4 italic">Where Artistry Meets Beauty</p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Experience the perfect blend of artistic vision and technical expertise at our 
              premier women-owned hair salon in Rocklin, CA. Our talented team of artists is 
              dedicated to empowering you with confidence through exceptional hair styling, 
              balayage, precision cuts, and color services.
            </p>
            <div className="flex items-center space-x-4 mb-6">
              <MapPin className="w-5 h-5 text-rose-400" />
              <span className="text-gray-600 text-sm">6810 Five Star Blvd, Rocklin, CA 95677</span>
            </div>
          </div>

          {/* Quick Links - Aligned to the right with some spacing */}
          <div className="md:flex-1 md:ml-auto md:pl-20">
            <h4 className="text-lg font-semibold mb-6 text-gray-800">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-gray-600 hover:text-rose-400 transition-colors duration-300"
                >
                  Home - Premier Hair Salon Rocklin
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-600 hover:text-rose-400 transition-colors duration-300"
                >
                  About Our Rocklin Salon
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-600 hover:text-rose-400 transition-colors duration-300"
                >
                  Hair Services - Cuts & Color
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="text-gray-600 hover:text-rose-400 transition-colors duration-300"
                >
                  Hair Gallery - Before & After
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-600 hover:text-rose-400 transition-colors duration-300"
                >
                  Contact - Book Appointment
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 T & S Studio - Premier Women-Owned Hair Salon in Rocklin, CA. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/TSStudio/#" className="text-gray-500 hover:text-rose-400 text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/TSStudio/#" className="text-gray-500 hover:text-rose-400 text-sm transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;