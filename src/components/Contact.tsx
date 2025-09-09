import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import BookingFlow from './BookingForm/BookingFlow';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">Visit Our Salon</h2>
          <div className="w-24 h-1 bg-rose-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Ready to experience the T & S Studio difference? Contact our premier women-owned 
            hair salon in Rocklin, CA to schedule your consultation and transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Booking Flow Component */}
          <BookingFlow />
          
          {/* Map and Contact Information */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-3xl font-serif font-bold text-gray-800 mb-4">Find Our Rocklin Salon</h3>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.242412788155!2d-121.2645122235697!3d38.77981887666999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809b21153b16c463%3A0xad3834778ccf93fe!2sMY%20SALON%20Suite!5e0!3m2!1sen!2sus!4v1725585000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="T & S Studio - Premier Hair Salon in Rocklin, CA"
              ></iframe>
            </div>
            
            {/* Contact Information */}
            <div className="mt-8 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-rose-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Address</h4>
                  <p className="text-gray-600">6810 Five Star Blvd<br />Rocklin, CA 95677</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-rose-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Phone</h4>
                  <p className="text-gray-600">(916) 945-6098</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-rose-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Email</h4>
                  <p className="text-gray-600">tstudio2025@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-rose-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Hours</h4>
                  <div className="text-gray-600 text-sm">
                    <p>Mon-Fri: 9:00 AM - 7:00 PM</p>
                    <p>Saturday: 8:00 AM - 6:00 PM</p>
                    <p>Sunday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Removed Social Media section since Instagram is already linked above */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;