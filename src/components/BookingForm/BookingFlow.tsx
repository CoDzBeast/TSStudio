import React, { useState, useEffect } from 'react';
import DynamicBookingForm from './DynamicBookingForm';
import cover1 from '../../assets/images/about/cover1.png';
import cover2 from '../../assets/images/about/cover2.jpg';

const BookingFlow: React.FC = () => {
  const [stylist, setStylist] = useState<'owner' | 'coworker' | null>(null);
  const [formType, setFormType] = useState<'new-client' | 'color-consultation' | null>(null);

  // Handler for when booking is successful
  const handleBookingSuccess = () => {
    // Reset selection to go back to the main booking flow
    resetSelection();
  };

  // Add event listener for booking success
  useEffect(() => {
    window.addEventListener('booking-success', handleBookingSuccess);
    return () => {
      window.removeEventListener('booking-success', handleBookingSuccess);
    };
  }, []);

  const resetSelection = () => {
    setStylist(null);
    setFormType(null);
  };

  // If both stylist and formType are selected, show the dynamic booking form fullscreen
  if (stylist && formType) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        <div className="min-h-full flex flex-col">
          {/* Header with back button */}
          <div className="sticky top-0 bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between z-10">
            <button 
              onClick={resetSelection}
              className="text-gray-600 hover:text-gray-800 flex items-center"
            >
              ← Back to selection
            </button>
            <h3 className="text-xl font-semibold text-gray-800">
              {stylist === 'owner' ? 'Taylor Winarski' : 'Shantel Bernal'} - 
              {formType === 'new-client' ? ' New Client Consultation' : ' Extension Consultation'}
            </h3>
            <div></div> {/* Spacer for flex alignment */}
          </div>
          
          {/* Fullscreen form container with better spacing */}
          <div className="flex-grow p-4 md:p-8">
            <div className="max-w-4xl mx-auto w-full">
              <DynamicBookingForm stylist={stylist} formType={formType} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, show the selection interface
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6 text-center">
        Book Your Appointment
      </h3>
      
      <div className="space-y-8">
        {/* Stylist Selection - Only show if no stylist selected */}
        {!stylist && (
          <div className="animate-fadeIn">
            <h4 className="text-lg font-semibold text-gray-800 mb-6 text-center">Select Your Stylist</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setStylist('owner')}
                className="p-6 rounded-xl border-2 border-gray-200 hover:border-rose-300 transition-all duration-300 text-left hover:shadow-md transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-rose-200 to-rose-300 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                    <img
                      src={cover1}
                      alt="Taylor Winarski"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h5 className="font-semibold text-xl text-gray-800">Taylor Winarski</h5>
                  <p className="text-rose-400 font-medium mt-1">Co-Owner & Color Specialist</p>
                  <p className="text-gray-600 mt-3">Specializing in color transformations and extensions</p>
                  <p className="text-gray-500 text-sm mt-2">2x extension certified</p>
                </div>
              </button>
              
              <button
                onClick={() => setStylist('coworker')}
                className="p-6 rounded-xl border-2 border-gray-200 hover:border-rose-300 transition-all duration-300 text-left hover:shadow-md transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-rose-200 to-rose-300 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                    <img
                      src={cover2}
                      alt="Shantel Bernal"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h5 className="font-semibold text-xl text-gray-800">Shantel Bernal</h5>
                  <p className="text-rose-400 font-medium mt-1">Co-Owner & Extension Specialist</p>
                  <p className="text-gray-600 mt-3">Expert in color correction and hair extensions</p>
                  <p className="text-gray-500 text-sm mt-2">3+ years experience</p>
                </div>
              </button>
            </div>
          </div>
        )}
        
        {/* Appointment Type Selection - Only show if stylist is selected */}
        {stylist && !formType && (
          <div className="animate-slideIn">
            <div className="flex items-center mb-6">
              <button 
                onClick={() => setStylist(null)}
                className="text-gray-500 hover:text-gray-700 mr-4"
              >
                ← Back
              </button>
              <h4 className="text-lg font-semibold text-gray-800">
                Select Appointment Type for {stylist === 'owner' ? 'Taylor Winarski' : 'Shantel Bernal'}
              </h4>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <button
                onClick={() => setFormType('new-client')}
                className="p-8 rounded-xl border-2 border-gray-200 hover:border-rose-300 transition-all duration-300 text-left hover:shadow-md transform hover:-translate-y-1"
              >
                <h5 className="font-semibold text-xl text-gray-800">New Client Consultation</h5>
                <p className="text-gray-600 mt-2">For first-time clients</p>
                <div className="mt-4 bg-rose-50 p-4 rounded-lg">
                  <p className="text-gray-700 text-sm">
                    Includes in-depth consultation and service planning. Please allow extra time for this comprehensive appointment.
                  </p>
                </div>
              </button>
              
              <button
                onClick={() => setFormType('color-consultation')}
                className="p-8 rounded-xl border-2 border-gray-200 hover:border-rose-300 transition-all duration-300 text-left hover:shadow-md transform hover:-translate-y-1"
              >
                <h5 className="font-semibold text-xl text-gray-800">Extension Consultation</h5>
                <p className="text-gray-600 mt-2">For existing clients</p>
                <div className="mt-4 bg-rose-50 p-4 rounded-lg">
                  <p className="text-gray-700 text-sm">
                    Discuss extension changes, maintenance, or new installations. Perfect for planning your next extension service.
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Instructions */}
      <div className="mt-8 p-6 bg-rose-50 rounded-xl">
        <p className="text-gray-700">
          <span className="font-semibold">Note:</span> After selecting your stylist and appointment type, 
          you'll be presented with a customized questionnaire to help us prepare for your visit.
        </p>
      </div>
    </div>
  );
};

export default BookingFlow;