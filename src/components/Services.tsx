import React, { useState } from 'react';
import { Scissors, Palette, Sparkles, Calendar, Droplets, MessageCircle } from 'lucide-react';

const Services: React.FC = () => {
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const services = [
    {
      icon: Scissors,
      title: 'Precision Cuts',
      description: 'Tailored to your unique style and lifestyle. Our expert stylists provide precision haircuts that complement your face shape and hair type.',
      price: 'Starting at $65',
      details: 'Our precision cuts are customized to enhance your natural features. We use premium cutting techniques including point cutting, slide cutting, and texturizing to create dimension and movement. Each cut includes a consultation to understand your lifestyle, hair type, and styling preferences. Our stylists are trained in the latest cutting methods and use professional-grade tools for the cleanest results.',
      duration: '45-60 minutes',
      recommendedFor: 'All hair types and face shapes'
    },
    {
      icon: Palette,
      title: 'Color Mastery',
      description: 'From subtle highlights to bold transformations. Our professional color services include full color, root touch-ups, and creative color combinations.',
      price: 'Starting at $95',
      details: 'Our color services use premium brands like L\'Oréal, Wella, and Pravana to ensure vibrant, long-lasting results. We offer full color services including single-process color, root touch-ups, balayage, ombre, and creative color combinations. Our colorists are certified in advanced techniques and will consult with you to create a customized color plan that enhances your complexion and lifestyle.',
      duration: '2-3 hours',
      recommendedFor: 'Clients looking for a complete color transformation'
    },
    {
      icon: Sparkles,
      title: 'Balayage & Highlights',
      description: 'Hand-painted dimension and depth. Experience our expert balayage services for natural-looking, sun-kissed highlights that grow out beautifully.',
      price: 'Starting at $125',
      details: 'Our signature balayage technique creates a natural, sun-kissed effect that grows out beautifully without harsh lines of demarcation. We use a freehand painting method to strategically place highlights throughout your hair for a multidimensional look. This service includes a deep conditioning treatment to maintain hair health and shine.',
      duration: '2.5-3 hours',
      recommendedFor: 'Clients wanting low-maintenance, natural-looking highlights'
    },
    {
      icon: Calendar,
      title: 'Special Event Styling',
      description: 'Wedding, prom, and special occasion hair. Let our salon artists create the perfect hairstyle for your important event.',
      price: 'Starting at $85',
      details: 'Our special event styling service ensures you look flawless for your important occasion. We specialize in elegant updos, romantic curls, sleek styles, and trendy looks. We recommend booking a consultation at least 2 weeks before your event to discuss your vision and do a trial run. We also provide touch-up services on the day of your event.',
      duration: '1-2 hours',
      recommendedFor: 'Brides, prom goers, and special occasion attendees'
    },
    {
      icon: Droplets,
      title: 'Hair Treatments',
      description: 'Restore, strengthen, and revitalize. Our professional hair treatments include deep conditioning, keratin treatments, and damage repair.',
      price: 'Starting at $45',
      details: 'Revitalize your hair with our professional treatment services. Our deep conditioning treatments use premium products to restore moisture and shine. Keratin treatments smooth and reduce frizz for up to 12 weeks. Damage repair treatments rebuild hair strength and prevent breakage. Each treatment is customized to your hair\'s specific needs.',
      duration: '45-90 minutes',
      recommendedFor: 'All hair types, especially chemically treated or damaged hair'
    },
    {
      icon: MessageCircle,
      title: 'Consultations',
      description: 'Personalized styling recommendations. Book a complimentary consultation with our expert stylists to discuss your hair goals.',
      price: 'Complimentary',
      details: 'Our complimentary consultation is the first step to achieving your dream hair. During this session, we\'ll discuss your lifestyle, styling habits, and hair goals. We\'ll analyze your hair type, face shape, and skin tone to recommend the best services for you. This is also an opportunity to ask questions and get to know your stylist before booking services.',
      duration: '30 minutes',
      recommendedFor: 'New clients and those wanting to try new services'
    },
    // Placeholder services
    {
      icon: Sparkles,
      title: 'Styling Services',
      description: 'Professional blowouts and styling for any occasion.',
      price: 'Starting at $45',
      details: 'Placeholder for styling services details.',
      duration: '30-45 minutes',
      recommendedFor: 'Placeholder for recommendations.'
    },
    {
      icon: Droplets,
      title: 'Extensions',
      description: 'Premium hair extensions for added length, volume, or color.',
      price: 'Starting at $200',
      details: 'Placeholder for extensions services details.',
      duration: '2-3 hours',
      recommendedFor: 'Placeholder for recommendations.'
    },
    {
      icon: Calendar,
      title: 'Makeup Services',
      description: 'Professional makeup application for special events.',
      price: 'Starting at $75',
      details: 'Placeholder for makeup services details.',
      duration: '1 hour',
      recommendedFor: 'Placeholder for recommendations.'
    }
  ];

  const openModal = (service: any) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-rose-100 to-rose-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">Our Premium Hair Services</h2>
          <div className="w-24 h-1 bg-rose-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Discover our comprehensive range of premium hair services. 
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
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(service);
                    }}
                    className="text-gray-800 hover:text-rose-400 transition-colors duration-300 font-medium"
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal implementation */}
        {showModal && selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                      {selectedService.icon && React.createElement(selectedService.icon, { className: "w-8 h-8 text-rose-400" })}
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-gray-800">
                        {selectedService.title}
                      </h3>
                      <p className="text-rose-400 font-semibold">
                        {selectedService.price}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-800 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <p className="text-gray-700 mb-6">
                  {selectedService.description}
                </p>
                
                <p className="text-gray-700 mb-6">
                  {selectedService.details}
                </p>
                
                <div className="bg-rose-50 p-6 rounded-lg mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-800">
                        <span className="font-semibold">Duration:</span> {selectedService.duration}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">
                        <span className="font-semibold">Recommended for:</span> {selectedService.recommendedFor}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={closeModal}
                    className="bg-gray-800 text-cream px-6 py-3 rounded-full hover:bg-gray-700 transition-all duration-300 font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-16 hidden">
          <button className="bg-gray-800 text-cream px-8 py-4 rounded-full hover:bg-gray-700 transition-all duration-300 font-medium">
            View Full Service Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;