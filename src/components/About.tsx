import React from 'react';
import { Heart, Award, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">Our Story</h2>
          <div className="w-24 h-1 bg-rose-400 mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              T & S Studio is a full-service salon founded by talented women artists who believe in 
              liberating your body and mind through expert styling. We welcome you to experience our 
              artistry and the confidence that comes with it.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our passion lies in understanding each client's unique beauty and enhancing it through 
              personalized treatments. Every visit to our studio is crafted to be a transformative 
              experience that goes beyond just hair styling.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-rose-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">500+</h3>
                <p className="text-gray-600 text-sm">Happy Clients</p>
              </div>
              <div className="text-center">
                <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-rose-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">5+</h3>
                <p className="text-gray-600 text-sm">Years Experience</p>
              </div>
              <div className="text-center">
                <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-rose-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">6</h3>
                <p className="text-gray-600 text-sm">Expert Artists</p>
              </div>
            </div>
          </div>

          {/* Founders */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-200 to-rose-300 rounded-full flex items-center justify-center">
                  <img
                    src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Founder T"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-gray-800">Taylor Martinez</h3>
                  <p className="text-rose-400 font-medium">Co-Founder & Master Stylist</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                With over 8 years of experience in high-end salons, Taylor specializes in precision cuts 
                and innovative color techniques that enhance natural beauty.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-200 to-rose-300 rounded-full flex items-center justify-center">
                  <img
                    src="https://images.pexels.com/photos/3992649/pexels-photo-3992649.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Founder S"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-gray-800">Sophia Chen</h3>
                  <p className="text-rose-400 font-medium">Co-Founder & Color Specialist</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Sophia brings artistic vision and technical expertise to every transformation, 
                specializing in balayage and creating stunning dimensional color.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;