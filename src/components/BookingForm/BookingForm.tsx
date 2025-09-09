import { useState } from 'react';
import { BookingFormData, StylistType, AppointmentType } from './types';
import { submitBookingForm } from './formSubmission';

const BookingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStylist, setSelectedStylist] = useState<StylistType | null>(null);
  const [selectedAppointmentType, setSelectedAppointmentType] = useState<AppointmentType | null>(null);
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    // Taylor's new client fields
    hairLength: '',
    hairStrands: '',
    hairColor: '',
    greyPercentage: '',
    boxDye: '',
    lightened: '',
    colorChangeFrequency: '',
    idealMaintenance: '',
    age: '',
    preferredDays: [],
    howHeard: '',
    currentHairPhoto: null,
    inspirationPhotos: null,
    // Taylor's extension consultation fields
    everWornExtensions: '',
    extensionMethod: '',
    currentlyHaveExtensions: '',
    currentExtensionType: '',
    naturalHairLength: '',
    hairDescription: '',
    currentHairColor: '',
    extensionGoals: [],
    wantColorChange: '',
    // Shantel's fields (many are arrays)
    s_hairLength: [],
    s_hairStrands: [],
    s_hairColor: [],
    s_greyPercentage: [],
    s_boxDye: [],
    s_lightened: [],
    s_colorChangeFrequency: [],
    s_idealMaintenance: [],
    s_age: [],
    s_preferredDays: [],
    s_howHeard: [],
    s_currentHairPhoto: null,
    s_inspirationPhotos: null,
    // Shantel's additional fields
    silentAppointment: '',
    // Shantel's extension consultation fields
    s_everWornExtensions: [],
    s_extensionMethod: [],
    s_currentlyHaveExtensions: [],
    s_currentExtensionType: [],
    s_naturalHairLength: [],
    s_hairDescription: [],
    s_currentHairColor: [],
    s_extensionGoals: [],
    s_wantColorChange: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle selection card clicks
  const handleStylistSelect = (stylist: StylistType) => {
    setSelectedStylist(stylist);
    setCurrentStep(2);
  };

  const handleAppointmentTypeSelect = (type: AppointmentType) => {
    setSelectedAppointmentType(type);
    setCurrentStep(3);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => {
        const currentValues = Array.isArray(prev[name as keyof BookingFormData]) ? [...prev[name as keyof BookingFormData] as string[]] : [];
        if (checkbox.checked) {
          return { ...prev, [name]: [...currentValues, value] };
        } else {
          return { ...prev, [name]: currentValues.filter(item => item !== value) };
        }
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, [fieldName]: files[0] }));
    }
  };

  // Update summary text
  const getSummaryText = () => {
    if (!selectedStylist || !selectedAppointmentType) return '';
    
    const stylistName = selectedStylist === 'owner' ? 'Taylor Winarski' : 'Shantel Bernal';
    const appointmentTypeName = selectedAppointmentType === 'new-client' ? 'New Client' : 'Extension Consultation';
    
    return `${stylistName} - ${appointmentTypeName}`;
  };

  // Move to specific step
  const moveToStep = (step: number) => {
    setCurrentStep(step);
  };

  // Show success message
  const showSuccessMessage = () => {
    setShowSuccess(true);
    setShowError(false);
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  // Show error message
  const showErrorMessage = (message: string) => {
    setErrorMessage(message);
    setShowError(true);
    setShowSuccess(false);
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStylist) {
      showErrorMessage('Please select a stylist');
      moveToStep(1);
      return;
    }
    
    if (!selectedAppointmentType) {
      showErrorMessage('Please select an appointment type');
      moveToStep(2);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await submitBookingForm(formData, selectedStylist, selectedAppointmentType);
      if (success) {
        showSuccessMessage();
        // Reset form after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          // Taylor's new client fields
          hairLength: '',
          hairStrands: '',
          hairColor: '',
          greyPercentage: '',
          boxDye: '',
          lightened: '',
          colorChangeFrequency: '',
          idealMaintenance: '',
          age: '',
          preferredDays: [],
          howHeard: '',
          currentHairPhoto: null,
          inspirationPhotos: null,
          // Taylor's extension consultation fields
          everWornExtensions: '',
          extensionMethod: '',
          currentlyHaveExtensions: '',
          currentExtensionType: '',
          naturalHairLength: '',
          hairDescription: '',
          currentHairColor: '',
          extensionGoals: [],
          wantColorChange: '',
          // Shantel's fields (many are arrays)
          s_hairLength: [],
          s_hairStrands: [],
          s_hairColor: [],
          s_greyPercentage: [],
          s_boxDye: [],
          s_lightened: [],
          s_colorChangeFrequency: [],
          s_idealMaintenance: [],
          s_age: [],
          s_preferredDays: [],
          s_howHeard: [],
          s_currentHairPhoto: null,
          s_inspirationPhotos: null,
          // Shantel's additional fields
          silentAppointment: '',
          // Shantel's extension consultation fields
          s_everWornExtensions: [],
          s_extensionMethod: [],
          s_currentlyHaveExtensions: [],
          s_currentExtensionType: [],
          s_naturalHairLength: [],
          s_hairDescription: [],
          s_currentHairColor: [],
          s_extensionGoals: [],
          s_wantColorChange: []
        });
        moveToStep(1);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      if (error instanceof Error) {
        showErrorMessage(error.message || 'Failed to submit form. Please try again.');
      } else {
        showErrorMessage('Failed to submit form. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-form-container">
      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Success! </strong>
          <span className="block sm:inline">Your appointment request has been submitted successfully.</span>
        </div>
      )}
      
      {showError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      
      {currentStep === 1 && (
        <div className="stylist-selection-step">
          <h2 className="text-2xl font-bold mb-6">Select Your Stylist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`border-2 rounded-xl p-5 text-center cursor-pointer transition-all duration-300 flex flex-col justify-center ${
                selectedStylist === 'owner'
                  ? 'border-rose-400 bg-gradient-to-br from-rose-100 to-rose-200'
                  : 'border-gray-200 hover:border-rose-300 hover:shadow-md'
              }`}
              onClick={() => handleStylistSelect('owner')}
            >
              <input type="radio" name="stylist" value="owner" className="hidden" />
              <div className="font-bold text-lg mb-1">Taylor Winarski</div>
              <div className="text-gray-600 text-sm mb-2">Co-Founder</div>
              <div className="text-xs text-gray-500">
                With over 2 years of experience in high-end salons, Taylor specializes in precision cuts
                and innovative color techniques that enhance natural beauty.
              </div>
            </div>
            <div
              className={`border-2 rounded-xl p-5 text-center cursor-pointer transition-all duration-300 flex flex-col justify-center ${
                selectedStylist === 'coworker'
                  ? 'border-rose-400 bg-gradient-to-br from-rose-100 to-rose-200'
                  : 'border-gray-200 hover:border-rose-300 hover:shadow-md'
              }`}
              onClick={() => handleStylistSelect('coworker')}
            >
              <input type="radio" name="stylist" value="coworker" className="hidden" />
              <div className="font-bold text-lg mb-1">Shantel Bernal</div>
              <div className="text-gray-600 text-sm mb-2">Color Specialist</div>
              <div className="text-xs text-gray-500">
                A skilled colorist with a passion for creating vibrant, personalized looks that complement
                each client's unique features and lifestyle.
              </div>
            </div>
          </div>
        </div>
      )}
      
      {currentStep === 2 && (
        <div className="appointment-type-step">
          <button 
            onClick={() => moveToStep(1)}
            className="mb-4 text-rose-400 hover:text-rose-600"
          >
            ← Back to stylist selection
          </button>
          <h2 className="text-2xl font-bold mb-6">Select Appointment Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`border-2 rounded-xl p-5 text-center cursor-pointer transition-all duration-300 flex flex-col justify-center ${
                selectedAppointmentType === 'new-client'
                  ? 'border-rose-400 bg-gradient-to-br from-rose-100 to-rose-200'
                  : 'border-gray-200 hover:border-rose-300 hover:shadow-md'
              }`}
              onClick={() => handleAppointmentTypeSelect('new-client')}
            >
              <input type="radio" name="appointmentType" value="new-client" className="hidden" />
              <div className="font-bold text-lg mb-1">New Client Consultation</div>
              <div className="text-gray-600 text-sm mb-2">For first-time clients</div>
              <div className="text-xs text-gray-500">
                Begin your journey with a comprehensive consultation to discuss your hair goals,
                assess your hair's condition, and create a personalized transformation plan.
              </div>
            </div>
            <div
              className={`border-2 rounded-xl p-5 text-center cursor-pointer transition-all duration-300 flex flex-col justify-center ${
                selectedAppointmentType === 'color-consultation'
                  ? 'border-rose-400 bg-gradient-to-br from-rose-100 to-rose-200'
                  : 'border-gray-200 hover:border-rose-300 hover:shadow-md'
              }`}
              onClick={() => handleAppointmentTypeSelect('color-consultation')}
            >
              <input type="radio" name="appointmentType" value="color-consultation" className="hidden" />
              <div className="font-bold text-lg mb-1">Extension Consultation</div>
              <div className="text-gray-600 text-sm mb-2">For extension services</div>
              <div className="text-xs text-gray-500">
                Expert guidance on hair extensions, including selection, application techniques,
                and maintenance for a seamless, beautiful result.
              </div>
            </div>
          </div>
        </div>
      )}
      
      {currentStep === 3 && (
        <div className="fixed inset-0 bg-cream z-50 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-gray-800">Book Your Appointment</h2>
              <button 
                onClick={() => moveToStep(2)}
                className="text-gray-600 hover:text-rose-400 transition-colors duration-300"
              >
                ← Back to selection
              </button>
            </div>
            
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 mb-8 text-center">
              <strong>Selected:</strong> {getSummaryText()}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name: *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name: *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email: *
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

                <div className="form-group">
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number: *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Taylor's New Client Questions */}
              {selectedStylist === 'owner' && selectedAppointmentType === 'new-client' && (
                <>
                  {/* Hair Length */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      what is the length of your natural hair?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="hairLength"
                          value="chin length"
                          checked={formData.hairLength === 'chin length'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">chin length</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="hairLength"
                          value="resting on shoulders"
                          checked={formData.hairLength === 'resting on shoulders'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">resting on shoulders</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="hairLength"
                          value="below collar bone"
                          checked={formData.hairLength === 'below collar bone'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">below collar bone</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="hairLength"
                          value="past elbow length"
                          checked={formData.hairLength === 'past elbow length'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">past elbow length</span>
                      </label>
                    </div>
                  </div>

                  {/* Hair Strands */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      what best describes your hair strands?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="hairStrands"
                          value="fine"
                          checked={formData.hairStrands === 'fine'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">fine</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="hairStrands"
                          value="medium"
                          checked={formData.hairStrands === 'medium'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">medium</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="hairStrands"
                          value="coarse"
                          checked={formData.hairStrands === 'coarse'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">coarse</span>
                      </label>
                    </div>
                  </div>

                  {/* Hair Color */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      how would you best describe your natural hair color? (the color of your roots)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="hairColor"
                          value="darkest black (levels 1-3)"
                          checked={formData.hairColor === 'darkest black (levels 1-3)'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">darkest black (levels 1-3)</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="hairColor"
                          value="dark brunette (levels 4-5)"
                          checked={formData.hairColor === 'dark brunette (levels 4-5)'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">dark brunette (levels 4-5)</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="hairColor"
                          value="medium brown (levels 6-7)"
                          checked={formData.hairColor === 'medium brown (levels 6-7)'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">medium brown (levels 6-7)</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="hairColor"
                          value="light brown/blonde (levels 8-9)"
                          checked={formData.hairColor === 'light brown/blonde (levels 8-9)'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">light brown/blonde (levels 8-9)</span>
                      </label>
                    </div>
                  </div>

                  {/* Grey Percentage */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      what percentage of grey hair do you have?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="greyPercentage"
                          value="0% no greys"
                          checked={formData.greyPercentage === '0% no greys'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">0% no greys</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="greyPercentage"
                          value="5%-25% a few greys here and there"
                          checked={formData.greyPercentage === '5%-25% a few greys here and there'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">5%-25% a few greys here and there</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="greyPercentage"
                          value="50%-75% will need a root touch up every 4-6 weeks"
                          checked={formData.greyPercentage === '50%-75% will need a root touch up every 4-6 weeks'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">50%-75% will need a root touch up every 4-6 weeks</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="greyPercentage"
                          value="80%-100% will need full coverage or grey blending"
                          checked={formData.greyPercentage === '80%-100% will need full coverage or grey blending'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">80%-100% will need full coverage or grey blending</span>
                      </label>
                    </div>
                  </div>

                  {/* Box Dye */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      have you EVER used box dye?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="boxDye"
                          value="yes 1 time"
                          checked={formData.boxDye === 'yes 1 time'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">yes 1 time</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="boxDye"
                          value="no never"
                          checked={formData.boxDye === 'no never'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">no never</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="boxDye"
                          value="many times"
                          checked={formData.boxDye === 'many times'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">many times</span>
                      </label>
                    </div>
                  </div>

                  {/* Lightened */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      have you lightened your hair in the last 6 months?
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="lightened"
                          value="yes"
                          checked={formData.lightened === 'yes'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="lightened"
                          value="no"
                          checked={formData.lightened === 'no'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">no</span>
                      </label>
                    </div>
                  </div>

                  {/* Color Change Frequency */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      how often do you change your hair color/style?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="colorChangeFrequency"
                          value="once a month"
                          checked={formData.colorChangeFrequency === 'once a month'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">once a month</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="colorChangeFrequency"
                          value="2-3 months"
                          checked={formData.colorChangeFrequency === '2-3 months'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">2-3 months</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="colorChangeFrequency"
                          value="twice a year"
                          checked={formData.colorChangeFrequency === 'twice a year'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">twice a year</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="colorChangeFrequency"
                          value="never"
                          checked={formData.colorChangeFrequency === 'never'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">never</span>
                      </label>
                    </div>
                  </div>

                  {/* Ideal Maintenance */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      what is your ideal color maintenance?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="idealMaintenance"
                          value="every 5-6 weeks"
                          checked={formData.idealMaintenance === 'every 5-6 weeks'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">every 5-6 weeks</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="idealMaintenance"
                          value="every 6-7 weeks"
                          checked={formData.idealMaintenance === 'every 6-7 weeks'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">every 6-7 weeks</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="idealMaintenance"
                          value="every 3-4 months"
                          checked={formData.idealMaintenance === 'every 3-4 months'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">every 3-4 months</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="idealMaintenance"
                          value="about twice a year"
                          checked={formData.idealMaintenance === 'about twice a year'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">about twice a year</span>
                      </label>
                    </div>
                  </div>

                  {/* Age */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      how old are you?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="age"
                          value="15-24"
                          checked={formData.age === '15-24'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">15-24</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="age"
                          value="25-35"
                          checked={formData.age === '25-35'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">25-35</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="age"
                          value="36-45"
                          checked={formData.age === '36-45'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">36-45</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="age"
                          value="46-55"
                          checked={formData.age === '46-55'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">46-55</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="age"
                          value="56-65"
                          checked={formData.age === '56-65'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">56-65</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="age"
                          value="65+"
                          checked={formData.age === '65+'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">65+</span>
                      </label>
                    </div>
                  </div>

                  {/* Preferred Days */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      what days of the week works best for you?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="preferredDays"
                          value="wednesday"
                          checked={formData.preferredDays.includes('wednesday')}
                          onChange={handleInputChange}
                          className="text-rose-400 rounded"
                        />
                        <span className="ml-2">wednesday</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="preferredDays"
                          value="thursday"
                          checked={formData.preferredDays.includes('thursday')}
                          onChange={handleInputChange}
                          className="text-rose-400 rounded"
                        />
                        <span className="ml-2">thursday</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="preferredDays"
                          value="friday"
                          checked={formData.preferredDays.includes('friday')}
                          onChange={handleInputChange}
                          className="text-rose-400 rounded"
                        />
                        <span className="ml-2">friday</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="preferredDays"
                          value="saturday"
                          checked={formData.preferredDays.includes('saturday')}
                          onChange={handleInputChange}
                          className="text-rose-400 rounded"
                        />
                        <span className="ml-2">saturday</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="preferredDays"
                          value="tuesday (morning)"
                          checked={formData.preferredDays.includes('tuesday (morning)')}
                          onChange={handleInputChange}
                          className="text-rose-400 rounded"
                        />
                        <span className="ml-2">tuesday (morning)</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="preferredDays"
                          value="monday (night)"
                          checked={formData.preferredDays.includes('monday (night)')}
                          onChange={handleInputChange}
                          className="text-rose-400 rounded"
                        />
                        <span className="ml-2">monday (night)</span>
                      </label>
                    </div>
                  </div>

                  {/* How Heard */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      how did you hear about me?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="howHeard"
                          value="instagram"
                          checked={formData.howHeard === 'instagram'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">instagram</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="howHeard"
                          value="facebook"
                          checked={formData.howHeard === 'facebook'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">facebook</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="howHeard"
                          value="tiktok"
                          checked={formData.howHeard === 'tiktok'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">tiktok</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="howHeard"
                          value="referral"
                          checked={formData.howHeard === 'referral'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">referral</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="howHeard"
                          value="other"
                          checked={formData.howHeard === 'other'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">other</span>
                      </label>
                    </div>
                  </div>

                  {/* Current Hair Photo */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      please upload a photo of your current hair!
                    </label>
                    <input
                      type="file"
                      name="currentHairPhoto"
                      onChange={(e) => handleFileChange(e, 'currentHairPhoto')}
                      accept="image/*"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  {/* Inspiration Photos */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      finally, upload your inspo photos for your dream hair :)
                    </label>
                    <input
                      type="file"
                      name="inspirationPhotos"
                      onChange={(e) => handleFileChange(e, 'inspirationPhotos')}
                      accept="image/*"
                      multiple
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </>
              )}

              {/* Taylor's Extension Consultation Questions */}
              {selectedStylist === 'owner' && selectedAppointmentType === 'color-consultation' && (
                <>
                  {/* Ever Worn Extensions */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Have you ever worn hair extensions?
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="everWornExtensions"
                          value="Yes"
                          checked={formData.everWornExtensions === 'Yes'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="everWornExtensions"
                          value="No"
                          checked={formData.everWornExtensions === 'No'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Extension Method */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What extension method are you interested in?
                    </label>
                    <select
                      name="extensionMethod"
                      value={formData.extensionMethod}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select extension method</option>
                      <option value="Tape-in">Tape-in</option>
                      <option value="Clip-in">Clip-in</option>
                      <option value="Sew-in">Sew-in</option>
                      <option value="Micro-link">Micro-link</option>
                      <option value="Nano-ring">Nano-ring</option>
                      <option value="Fusion">Fusion</option>
                    </select>
                  </div>

                  {/* Currently Have Extensions */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Do you currently have extensions in your hair?
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="currentlyHaveExtensions"
                          value="Yes"
                          checked={formData.currentlyHaveExtensions === 'Yes'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="currentlyHaveExtensions"
                          value="No"
                          checked={formData.currentlyHaveExtensions === 'No'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Current Extension Type */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What type of extensions do you currently have?
                    </label>
                    <input
                      type="text"
                      name="currentExtensionType"
                      value={formData.currentExtensionType}
                      onChange={handleInputChange}
                      placeholder="e.g., Tape-in, Clip-in, etc."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  {/* Natural Hair Length */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What is your natural hair length?
                    </label>
                    <select
                      name="naturalHairLength"
                      value={formData.naturalHairLength}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select your natural hair length</option>
                      <option value="Shoulder Length">Shoulder Length</option>
                      <option value="Armpit Length">Armpit Length</option>
                      <option value="Bra Length">Bra Length</option>
                      <option value="Waist Length">Waist Length</option>
                      <option value="Hip Length">Hip Length</option>
                      <option value="Knee Length">Knee Length</option>
                      <option value="Ankle Length">Ankle Length</option>
                    </select>
                  </div>

                  {/* Hair Description */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Please describe your hair condition and texture
                    </label>
                    <textarea
                      name="hairDescription"
                      value={formData.hairDescription}
                      onChange={handleInputChange}
                      placeholder="e.g., Fine/thin, Curly, Straight, Damaged, etc."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                      rows={3}
                    />
                  </div>

                  {/* Current Hair Color */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What is your current hair color?
                    </label>
                    <input
                      type="text"
                      name="currentHairColor"
                      value={formData.currentHairColor}
                      onChange={handleInputChange}
                      placeholder="e.g., Natural Black, Dyed Blonde, etc."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  {/* Extension Goals */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What are your goals with extensions? (Check all that apply)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        'Add Length',
                        'Add Volume',
                        'Change Color',
                        'Protect Natural Hair',
                        'Try New Styles',
                        'Other'
                      ].map((goal) => (
                        <label key={goal} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="extensionGoals"
                            value={goal}
                            checked={formData.extensionGoals.includes(goal)}
                            onChange={handleInputChange}
                            className="text-rose-400 rounded"
                          />
                          <span className="ml-2">{goal}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Want Color Change */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Do you want to change your hair color with extensions?
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="wantColorChange"
                          value="Yes"
                          checked={formData.wantColorChange === 'Yes'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="wantColorChange"
                          value="No"
                          checked={formData.wantColorChange === 'No'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">No</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="wantColorChange"
                          value="Unsure"
                          checked={formData.wantColorChange === 'Unsure'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">Unsure</span>
                      </label>
                    </div>
                  </div>

                  {/* Current Hair Photo */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Please upload a photo of your current hair
                    </label>
                    <input
                      type="file"
                      name="currentHairPhoto"
                      onChange={(e) => handleFileChange(e, 'currentHairPhoto')}
                      accept="image/*"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  {/* Inspiration Photos */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Upload any inspiration photos
                    </label>
                    <input
                      type="file"
                      name="inspirationPhotos"
                      onChange={(e) => handleFileChange(e, 'inspirationPhotos')}
                      accept="image/*"
                      multiple
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </>
              )}

              {/* Shantel's New Client Questions */}
              {selectedStylist === 'coworker' && selectedAppointmentType === 'new-client' && (
                <>
                  {/* Hair Length */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What is your current hair length? (Check all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {['Shoulder Length', 'Armpit Length', 'Bra Length', 'Waist Length', 'Hip Length', 'Knee Length', 'Ankle Length'].map((length) => (
                        <label key={length} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="s_hairLength"
                            value={length}
                            checked={formData.s_hairLength.includes(length)}
                            onChange={handleInputChange}
                            className="text-rose-400 rounded"
                          />
                          <span className="ml-2">{length}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Hair Strands */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      How would you describe your hair strands? (Check all that apply)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Thin', 'Medium', 'Thick'].map((strand) => (
                        <label key={strand} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="s_hairStrands"
                            value={strand}
                            checked={formData.s_hairStrands.includes(strand)}
                            onChange={handleInputChange}
                            className="text-rose-400 rounded"
                          />
                          <span className="ml-2">{strand}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Hair Color */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What is your current hair color? (Check all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {[
                        'Natural Black',
                        'Dyed Black',
                        'Natural Brown',
                        'Dyed Brown',
                        'Blonde',
                        'Red',
                        'Purple',
                        'Blue',
                        'Green',
                        'Other'
                      ].map((color) => (
                        <label key={color} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="s_hairColor"
                            value={color}
                            checked={formData.s_hairColor.includes(color)}
                            onChange={handleInputChange}
                            className="text-rose-400 rounded"
                          />
                          <span className="ml-2">{color}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Grey Percentage */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What percentage of your hair is grey? (Check all that apply)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['0%', '1-25%', '26-50%', '51-75%', '76-100%'].map((percentage) => (
                        <label key={percentage} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="s_greyPercentage"
                            value={percentage}
                            checked={formData.s_greyPercentage.includes(percentage)}
                            onChange={handleInputChange}
                            className="text-rose-400 rounded"
                          />
                          <span className="ml-2">{percentage}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Box Dye */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Have you ever used box dye on your hair? (Check all that apply)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Yes', 'No', 'Unsure'].map((option) => (
                        <label key={option} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="s_boxDye"
                            value={option}
                            checked={formData.s_boxDye.includes(option)}
                            onChange={handleInputChange}
                            className="text-rose-400 rounded"
                          />
                          <span className="ml-2">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Lightened */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Has your hair ever been lightened or bleached? (Check all that apply)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Yes', 'No', 'Unsure'].map((option) => (
                        <label key={option} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="s_lightened"
                            value={option}
                            checked={formData.s_lightened.includes(option)}
                            onChange={handleInputChange}
                            className="text-rose-400 rounded"
                          />
                          <span className="ml-2">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Color Change Frequency */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      How often do you typically change your hair color? (Check all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {[
                        'Never',
                        'Every 6+ months',
                        'Every 3-6 months',
                        'Every 1-3 months',
                        'Every few weeks'
                      ].map((frequency) => (
                        <label key={frequency} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="s_colorChangeFrequency"
                            value={frequency}
                            checked={formData.s_colorChangeFrequency.includes(frequency)}
                            onChange={handleInputChange}
                            className="text-rose-400 rounded"
                          />
                          <span className="ml-2">{frequency}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Ideal Maintenance */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What is your ideal maintenance schedule? (Check all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {[
                        'Every 6+ months',
                        'Every 3-6 months',
                        'Every 1-3 months',
                        'Every few weeks'
                      ].map((schedule) => (
                        <label key={schedule} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="s_idealMaintenance"
                            value={schedule}
                            checked={formData.s_idealMaintenance.includes(schedule)}
                            onChange={handleInputChange}
                            className="text-rose-400 rounded"
                          />
                          <span className="ml-2">{schedule}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Age */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What is your age range? (Check all that apply)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['18-25', '26-35', '36-45', '46-55', '56+'].map((age) => (
                        <label key={age} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="s_age"
                            value={age}
                            checked={formData.s_age.includes(age)}
                            onChange={handleInputChange}
                            className="text-rose-400 rounded"
                          />
                          <span className="ml-2">{age}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Days */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What days work best for appointments? (Check all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <label key={day} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="s_preferredDays"
                            value={day}
                            checked={formData.s_preferredDays.includes(day)}
                            onChange={handleInputChange}
                            className="text-rose-400 rounded"
                          />
                          <span className="ml-2">{day}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* How Heard */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      How did you hear about us? (Check all that apply)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        'Social Media',
                        'Google Search',
                        'Friend/Family Referral',
                        'Walk-in',
                        'Local Advertisement',
                        'Other'
                      ].map((source) => (
                        <label key={source} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="s_howHeard"
                            value={source}
                            checked={formData.s_howHeard.includes(source)}
                            onChange={handleInputChange}
                            className="text-rose-400 rounded"
                          />
                          <span className="ml-2">{source}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Silent Appointment */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Would you prefer a silent appointment?
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="silentAppointment"
                          value="Yes"
                          checked={formData.silentAppointment === 'Yes'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="silentAppointment"
                          value="No"
                          checked={formData.silentAppointment === 'No'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Silent appointments are conducted with minimal conversation.</p>
                  </div>

                  {/* Current Hair Photo */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Please upload a photo of your current hair
                    </label>
                    <input
                      type="file"
                      name="s_currentHairPhoto"
                      onChange={(e) => handleFileChange(e, 's_currentHairPhoto')}
                      accept="image/*"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  {/* Inspiration Photos */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Upload any inspiration photos
                    </label>
                    <input
                      type="file"
                      name="s_inspirationPhotos"
                      onChange={(e) => handleFileChange(e, 's_inspirationPhotos')}
                      accept="image/*"
                      multiple
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </>
              )}

              {/* Shantel's Extension Consultation Questions */}
              {selectedStylist === 'coworker' && selectedAppointmentType === 'color-consultation' && (
                <>
                  {/* Ever Worn Extensions */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Have you ever worn hair extensions? (Check all that apply)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Yes', 'No', 'Unsure'].map((option) => (
                        <label key={option} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="s_everWornExtensions"
                            value={option}
                            checked={formData.s_everWornExtensions.includes(option)}
                            onChange={handleInputChange}
                            className="text-rose-400 rounded"
                          />
                          <span className="ml-2">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Extension Method */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What extension method are you interested in? (Check all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {[
                        'Tape-in',
                        'Clip-in',
                        'Sew-in',
                        'Micro-link',
                        'Nano-ring',
                        'Fusion'
                      ].map((method) => (
                        <label key={method} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="s_extensionMethod"
                            value={method}
                            checked={formData.s_extensionMethod.includes(method)}
                            onChange={handleInputChange}
                            className="text-rose-400 rounded"
                          />
                          <span className="ml-2">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Currently Have Extensions */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Do you currently have extensions in your hair? (Check all that apply)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Yes', 'No', 'Unsure'].map((option) => (
                        <label key={option} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="s_currentlyHaveExtensions"
                            value={option}
                            checked={formData.s_currentlyHaveExtensions.includes(option)}
                            onChange={handleInputChange}
                            className="text-rose-400 rounded"
                          />
                          <span className="ml-2">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Current Extension Type */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What type of extensions do you currently have? (Check all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {[
                        'Tape-in',
                        'Clip-in',
                        'Sew-in',
                        'Micro-link',
                        'Nano-ring',
                        'Fusion',
                        'Other'
                      ].map((type) => (
                        <label key={type} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="s_currentExtensionType"
                            value={type}
                            checked={formData.s_currentExtensionType.includes(type)}
                            onChange={handleInputChange}
                            className="text-rose-400 rounded"
                          />
                          <span className="ml-2">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Natural Hair Length */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What is your natural hair length? (Check all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {['Shoulder Length', 'Armpit Length', 'Bra Length', 'Waist Length', 'Hip Length', 'Knee Length', 'Ankle Length'].map((length) => (
                        <label key={length} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="s_naturalHairLength"
                            value={length}
                            checked={formData.s_naturalHairLength.includes(length)}
                            onChange={handleInputChange}
                            className="text-rose-400 rounded"
                          />
                          <span className="ml-2">{length}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Hair Description */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Please describe your hair condition and texture (Check all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {[
                        'Fine/Thin',
                        'Medium',
                        'Thick',
                        'Curly',
                        'Straight',
                        'Wavy',
                        'Damaged',
                        'Healthy',
                        'Other'
                      ].map((description) => (
                        <label key={description} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="s_hairDescription"
                            value={description}
                            checked={formData.s_hairDescription.includes(description)}
                            onChange={handleInputChange}
                            className="text-rose-400 rounded"
                          />
                          <span className="ml-2">{description}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Current Hair Color */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What is your current hair color? (Check all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {[
                        'Natural Black',
                        'Dyed Black',
                        'Natural Brown',
                        'Dyed Brown',
                        'Blonde',
                        'Red',
                        'Purple',
                        'Blue',
                        'Green',
                        'Other'
                      ].map((color) => (
                        <label key={color} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="s_currentHairColor"
                            value={color}
                            checked={formData.s_currentHairColor.includes(color)}
                            onChange={handleInputChange}
                            className="text-rose-400 rounded"
                          />
                          <span className="ml-2">{color}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Extension Goals */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What are your goals with extensions? (Check all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {[
                        'Add Length',
                        'Add Volume',
                        'Change Color',
                        'Protect Natural Hair',
                        'Try New Styles',
                        'Other'
                      ].map((goal) => (
                        <label key={goal} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="s_extensionGoals"
                            value={goal}
                            checked={formData.s_extensionGoals.includes(goal)}
                            onChange={handleInputChange}
                            className="text-rose-400 rounded"
                          />
                          <span className="ml-2">{goal}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Want Color Change */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Do you want to change your hair color with extensions? (Check all that apply)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Yes', 'No', 'Unsure'].map((option) => (
                        <label key={option} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="s_wantColorChange"
                            value={option}
                            checked={formData.s_wantColorChange.includes(option)}
                            onChange={handleInputChange}
                            className="text-rose-400 rounded"
                          />
                          <span className="ml-2">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Silent Appointment */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Would you prefer a silent appointment?
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="silentAppointment"
                          value="Yes"
                          checked={formData.silentAppointment === 'Yes'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="silentAppointment"
                          value="No"
                          checked={formData.silentAppointment === 'No'}
                          onChange={handleInputChange}
                          className="text-rose-400"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Silent appointments are conducted with minimal conversation.</p>
                  </div>

                  {/* Current Hair Photo */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Please upload a photo of your current hair
                    </label>
                    <input
                      type="file"
                      name="s_currentHairPhoto"
                      onChange={(e) => handleFileChange(e, 's_currentHairPhoto')}
                      accept="image/*"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  {/* Inspiration Photos */}
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Upload any inspiration photos
                    </label>
                    <input
                      type="file"
                      name="s_inspirationPhotos"
                      onChange={(e) => handleFileChange(e, 's_inspirationPhotos')}
                      accept="image/*"
                      multiple
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </>
              )}

              {/* Submit Button */}
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-rose-400 hover:bg-rose-500 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Appointment Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;