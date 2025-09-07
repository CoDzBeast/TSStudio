import React from 'react';
import { Scissors, Palette, Sparkles, Calendar, Droplets, MessageCircle } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Scissors,
      title: 'Precision Cuts',
      description: 'Tailored to your unique style and lifestyle. Our expert stylists in Rocklin, CA provide precision haircuts that complement your face shape and hair type.',
      price: 'Starting at $65'
    },
    {
      icon: Palette,
      title: 'Color Mastery',
      description: 'From subtle highlights to bold transformations. Our professional color services in Rocklin include full color, root touch-ups, and creative color combinations.',
      price: 'Starting at $95'
    },
    {
      icon: Sparkles,
      title: 'Balayage & Highlights',
      description: 'Hand-painted dimension and depth. Experience the best balayage services in Rocklin, CA for natural-looking, sun-kissed highlights that grow out beautifully.',
      price: 'Starting at $125'
    },
    {
      icon: Calendar,
      title: 'Special Event Styling',
      description: 'Wedding, prom, and special occasion hair. Let our Rocklin salon artists create the perfect hairstyle for your important event.',
      price: 'Starting at $85'
    },
    {
      icon: Droplets,
      title: 'Hair Treatments',
      description: 'Restore, strengthen, and revitalize. Our professional hair treatments in Rocklin include deep conditioning, keratin treatments, and damage repair.',
      price: 'Starting at $45'
    },
    {
      icon: MessageCircle,
      title: 'Consultations',
      description: 'Personalized styling recommendations. Book a complimentary consultation with our expert stylists in Rocklin to discuss your hair goals.',
      price: 'Complimentary'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-rose-100 to-rose-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">Our Premium Hair Services</h2>
          <div className="w-24 h-1 bg-rose-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Discover our comprehensive range of premium hair services in Rocklin, CA. 
            Each service is expertly crafted with artistic precision and personalized attention 
            by our talented women-owned salon team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-2"
              >
                <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-rose-200 transition-colors duration-300">
                  <IconComponent className="w-8 h-8 text-rose-400" />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-rose-400 font-semibold">
                    {service.price}
                  </span>
                  <button className="text-gray-800 hover:text-rose-400 transition-colors duration-300 font-medium">
                    Learn More →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <button className="bg-gray-800 text-cream px-8 py-4 rounded-full hover:bg-gray-700 transition-all duration-300 font-medium">
            View Full Service Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;