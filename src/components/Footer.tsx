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
    <footer className="bg-gray-800 text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-serif font-bold mb-4">T & S Studio</h3>
            <p className="text-rose-200 mb-4 italic">Where Artistry Meets Beauty</p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Experience the perfect blend of artistic vision and technical expertise. 
              Our talented team of women artists is dedicated to empowering you with 
              confidence through exceptional hair styling.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-rose-400 hover:bg-rose-300 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="bg-rose-400 hover:bg-rose-300 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="bg-rose-400 hover:bg-rose-300 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-gray-300 hover:text-rose-200 transition-colors duration-300"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-rose-200 transition-colors duration-300"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-rose-200 transition-colors duration-300"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('team')}
                  className="text-gray-300 hover:text-rose-200 transition-colors duration-300"
                >
                  Our Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="text-gray-300 hover:text-rose-200 transition-colors duration-300"
                >
                  Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  123 Beauty Lane<br />
                  Elegance District, ED 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <span className="text-gray-300">(555) 123-HAIR</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <span className="text-gray-300">hello@tsstudio.com</span>
              </li>
            </ul>

            <div className="mt-6">
              <h5 className="text-sm font-semibold text-rose-200 mb-2">Hours</h5>
              <div className="text-gray-300 text-sm space-y-1">
                <p>Mon-Fri: 9:00 AM - 7:00 PM</p>
                <p>Saturday: 8:00 AM - 6:00 PM</p>
                <p>Sunday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 T & S Studio. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-rose-200 text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-200 text-sm transition-colors duration-300">
                Terms of Service
              </a>
              <button className="bg-rose-400 hover:bg-rose-300 text-white px-4 py-2 rounded-full text-sm transition-colors duration-300">
                Book Online
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;