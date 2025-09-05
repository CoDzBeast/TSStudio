import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-rose-100 to-rose-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">Visit Our Studio</h2>
          <div className="w-24 h-1 bg-rose-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Ready to experience the T & S Studio difference? Contact us to schedule your 
            consultation and transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Address</h4>
                    <p className="text-gray-600">123 Beauty Lane<br />Elegance District, ED 12345</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Phone</h4>
                    <p className="text-gray-600">(555) 123-HAIR</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">hello@tsstudio.com</p>
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

              {/* Social Media */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-rose-100 hover:bg-rose-200 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <Instagram className="w-5 h-5 text-rose-400" />
                  </a>
                  <a
                    href="#"
                    className="bg-rose-100 hover:bg-rose-200 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <Facebook className="w-5 h-5 text-rose-400" />
                  </a>
                  <a
                    href="#"
                    className="bg-rose-100 hover:bg-rose-200 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <Twitter className="w-5 h-5 text-rose-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">Find Us</h3>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Interactive Map Coming Soon</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">Book a Consultation</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                  Service Interest
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select a service</option>
                  <option value="cut">Precision Cut</option>
                  <option value="color">Color Services</option>
                  <option value="balayage">Balayage & Highlights</option>
                  <option value="events">Special Event Styling</option>
                  <option value="treatments">Hair Treatments</option>
                  <option value="consultation">Consultation Only</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                  placeholder="Tell us about your hair goals or any specific requests..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 text-cream py-4 rounded-lg hover:bg-gray-700 transition-all duration-300 font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;