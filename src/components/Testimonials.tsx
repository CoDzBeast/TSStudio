import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Williams',
      text: 'T & S Studio transformed not just my hair, but my confidence. The attention to detail is incredible and the artists truly understand what works for each individual.',
      rating: 5,
      service: 'Balayage & Cut'
    },
    {
      name: 'Jessica Martinez',
      text: 'The artists here truly understand what works for each individual. I always leave feeling amazing and receive so many compliments on my hair.',
      rating: 5,
      service: 'Color Correction'
    },
    {
      name: 'Emily Chen',
      text: 'Professional, welcoming, and incredibly talented. My go-to studio for all my hair needs. The consultation process ensures I always get exactly what I want.',
      rating: 5,
      service: 'Precision Cut'
    },
    {
      name: 'Ashley Davis',
      text: 'From my wedding day to regular maintenance, T & S Studio has never disappointed. The team is skilled, friendly, and creates such a relaxing atmosphere.',
      rating: 5,
      service: 'Bridal Styling'
    },
    {
      name: 'Rachel Thompson',
      text: 'I have never felt more beautiful after leaving a salon. The transformation was beyond my expectations, and the entire experience was luxurious.',
      rating: 5,
      service: 'Full Transformation'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-rose-100 to-rose-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">Client Love</h2>
          <div className="w-24 h-1 bg-rose-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it – hear what our valued clients have to say about 
            their transformative experiences at T & S Studio.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>
              
              <blockquote className="text-xl md:text-2xl text-gray-700 font-light leading-relaxed mb-8 italic">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              
              <div className="flex flex-col items-center">
                <h4 className="text-lg font-serif font-bold text-gray-800 mb-1">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-rose-400 font-medium">
                  {testimonials[currentTestimonial].service}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-rose-400' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;