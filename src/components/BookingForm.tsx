import React, { useState } from 'react';

const BookingForm: React.FC = () => {
  // Configuration - Using actual JotForm IDs
  const JOTFORM_CONFIG = {
    owner: {
      'new-client': {
        formId: '252445285616057',
        apiKey: 'b4e8860fbb4274019d25438a0e8da8a8'
      },
      'color-consultation': {
        formId: '252445322843051',
        apiKey: 'b4e8860fbb4274019d25438a0e8da8a8'
      }
    },
    coworker: {
      'new-client': {
        formId: '240910497358059',
        apiKey: import.meta.env.VITE_JOTFORM_COWORKER_API_KEY || 'YOUR_COWORKER_API_KEY'
      },
      'color-consultation': {
        formId: '243017852134047',
        apiKey: import.meta.env.VITE_JOTFORM_COWORKER_API_KEY || 'YOUR_COWORKER_API_KEY'
      }
    }
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStylist, setSelectedStylist] = useState<string | null>(null);
  const [selectedAppointmentType, setSelectedAppointmentType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
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
    preferredDays: [] as string[],
    howHeard: '',
    currentHairPhoto: null as File | null,
    inspirationPhotos: null as File | null,
    // Taylor's extension consultation fields
    everWornExtensions: '',
    extensionMethod: '',
    currentlyHaveExtensions: '',
    currentExtensionType: '',
    naturalHairLength: '',
    hairDescription: '',
    currentHairColor: '',
    extensionGoals: [] as string[],
    wantColorChange: '',
    // Shantel's fields (many are arrays)
    s_hairLength: [] as string[],
    s_hairStrands: [] as string[],
    s_hairColor: [] as string[],
    s_greyPercentage: [] as string[],
    s_boxDye: [] as string[],
    s_lightened: [] as string[],
    s_colorChangeFrequency: [] as string[],
    s_idealMaintenance: [] as string[],
    s_age: [] as string[],
    s_preferredDays: [] as string[],
    s_howHeard: [] as string[],
    s_currentHairPhoto: null as File | null,
    s_inspirationPhotos: null as File | null,
    // Shantel's additional fields
    silentAppointment: '',
    // Shantel's extension consultation fields
    s_everWornExtensions: [] as string[],
    s_extensionMethod: [] as string[],
    s_currentlyHaveExtensions: [] as string[],
    s_currentExtensionType: [] as string[],
    s_naturalHairLength: [] as string[],
    s_hairDescription: [] as string[],
    s_currentHairColor: [] as string[],
    s_extensionGoals: [] as string[],
    s_wantColorChange: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle selection card clicks
  const handleStylistSelect = (stylist: string) => {
    setSelectedStylist(stylist);
    setCurrentStep(2);
  };

  const handleAppointmentTypeSelect = (type: string) => {
    setSelectedAppointmentType(type);
    setCurrentStep(3);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => {
        const currentValues = Array.isArray(prev[name as keyof typeof prev]) ? [...prev[name as keyof typeof prev] as string[]] : [];
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
      const config = JOTFORM_CONFIG[selectedStylist as keyof typeof JOTFORM_CONFIG][selectedAppointmentType as keyof (typeof JOTFORM_CONFIG)['owner']];
      
      // Check if API key is properly configured
      if (!config.apiKey || config.apiKey === `YOUR_${selectedStylist === 'owner' ? 'OWNER' : 'COWORKER'}_API_KEY`) {
        throw new Error(`Missing API key for ${selectedStylist === 'owner' ? 'Owner' : 'Coworker'}. Please configure your .env file.`);
      }
      
      // Prepare form data for submission
      const submissionData = new FormData();
      
      // Add basic contact information
      submissionData.append(`q3_name[first]`, formData.firstName);
      submissionData.append(`q3_name[last]`, formData.lastName);
      submissionData.append(`q5_phoneNumber[full]`, formData.phone);
      submissionData.append(`q6_email`, formData.email);
      
      // Add stylist-specific fields based on selection
      if (selectedStylist === 'owner') {
        if (selectedAppointmentType === 'new-client') {
          // Add Taylor's new client fields
          submissionData.append(`q7_hairLength`, formData.hairLength);
          submissionData.append(`q8_hairStrands`, formData.hairStrands);
          submissionData.append(`q9_hairColor`, formData.hairColor);
          submissionData.append(`q10_greyPercentage`, formData.greyPercentage);
          submissionData.append(`q11_boxDye`, formData.boxDye);
          submissionData.append(`q12_lightened`, formData.lightened);
          submissionData.append(`q13_colorChangeFrequency`, formData.colorChangeFrequency);
          submissionData.append(`q14_idealMaintenance`, formData.idealMaintenance);
          submissionData.append(`q15_age`, formData.age);
          
          // Add preferred days (multiple values)
          if (Array.isArray(formData.preferredDays)) {
            formData.preferredDays.forEach(day => {
              submissionData.append(`q16_preferredDays[]`, day);
            });
          }
          
          // Add how heard (multiple values)
          if (Array.isArray(formData.howHeard)) {
            formData.howHeard.forEach(source => {
              submissionData.append(`q17_howHeard[]`, source);
            });
          }
          
          // Add file uploads if present
          if (formData.currentHairPhoto) {
            submissionData.append(`q18_currentHairPhoto[]`, formData.currentHairPhoto);
          }
          
          if (formData.inspirationPhotos) {
            submissionData.append(`q19_inspirationPhotos[]`, formData.inspirationPhotos);
          }
        } else if (selectedAppointmentType === 'color-consultation') {
          // Add Taylor's extension consultation fields
          submissionData.append(`q7_everWornExtensions`, formData.everWornExtensions);
          submissionData.append(`q8_extensionMethod`, formData.extensionMethod);
          submissionData.append(`q9_currentlyHaveExtensions`, formData.currentlyHaveExtensions);
          submissionData.append(`q10_currentExtensionType`, formData.currentExtensionType);
          submissionData.append(`q11_naturalHairLength`, formData.naturalHairLength);
          submissionData.append(`q12_hairDescription`, formData.hairDescription);
          submissionData.append(`q13_currentHairColor`, formData.currentHairColor);
          
          // Add extension goals (multiple values)
          if (Array.isArray(formData.extensionGoals)) {
            formData.extensionGoals.forEach(goal => {
              submissionData.append(`q14_extensionGoals[]`, goal);
            });
          }
          
          submissionData.append(`q15_wantColorChange`, formData.wantColorChange);
          
          // Add file uploads if present
          if (formData.currentHairPhoto) {
            submissionData.append(`q16_currentHairPhoto[]`, formData.currentHairPhoto);
          }
          
          if (formData.inspirationPhotos) {
            submissionData.append(`q17_inspirationPhotos[]`, formData.inspirationPhotos);
          }
        }
      } else if (selectedStylist === 'coworker') {
        if (selectedAppointmentType === 'new-client') {
          // Add Shantel's new client fields
          // Note: These would need to be mapped to Shantel's actual form field names
          // This is a placeholder implementation
          submissionData.append(`q7_hairLength`, Array.isArray(formData.s_hairLength) ? formData.s_hairLength.join(', ') : '');
          submissionData.append(`q8_hairStrands`, Array.isArray(formData.s_hairStrands) ? formData.s_hairStrands.join(', ') : '');
          submissionData.append(`q9_hairColor`, Array.isArray(formData.s_hairColor) ? formData.s_hairColor.join(', ') : '');
          submissionData.append(`q10_greyPercentage`, Array.isArray(formData.s_greyPercentage) ? formData.s_greyPercentage.join(', ') : '');
          submissionData.append(`q11_boxDye`, Array.isArray(formData.s_boxDye) ? formData.s_boxDye.join(', ') : '');
          submissionData.append(`q12_lightened`, Array.isArray(formData.s_lightened) ? formData.s_lightened.join(', ') : '');
          submissionData.append(`q13_colorChangeFrequency`, Array.isArray(formData.s_colorChangeFrequency) ? formData.s_colorChangeFrequency.join(', ') : '');
          submissionData.append(`q14_idealMaintenance`, Array.isArray(formData.s_idealMaintenance) ? formData.s_idealMaintenance.join(', ') : '');
          submissionData.append(`q15_age`, Array.isArray(formData.s_age) ? formData.s_age.join(', ') : '');
          
          // Add preferred days (multiple values)
          if (Array.isArray(formData.s_preferredDays)) {
            formData.s_preferredDays.forEach(day => {
              submissionData.append(`q16_preferredDays[]`, day);
            });
          }
          
          // Add how heard (multiple values)
          if (Array.isArray(formData.s_howHeard)) {
            formData.s_howHeard.forEach(source => {
              submissionData.append(`q17_howHeard[]`, source);
            });
          }
          
          // Add file uploads if present
          if (formData.s_currentHairPhoto) {
            submissionData.append(`q18_currentHairPhoto[]`, formData.s_currentHairPhoto);
          }
          
          if (formData.s_inspirationPhotos) {
            submissionData.append(`q19_inspirationPhotos[]`, formData.s_inspirationPhotos);
          }
        } else if (selectedAppointmentType === 'color-consultation') {
          // Add Shantel's extension consultation fields
          if (Array.isArray(formData.s_everWornExtensions)) {
            formData.s_everWornExtensions.forEach(val => {
              submissionData.append(`q7_haveYou[]`, val);
            });
          }
          
          if (Array.isArray(formData.s_extensionMethod)) {
            formData.s_extensionMethod.forEach(val => {
              submissionData.append(`q8_ifSo[]`, val);
            });
          }
          
          if (Array.isArray(formData.s_currentlyHaveExtensions)) {
            formData.s_currentlyHaveExtensions.forEach(val => {
              submissionData.append(`q9_doYou[]`, val);
            });
          }
          
          if (Array.isArray(formData.s_currentExtensionType)) {
            formData.s_currentExtensionType.forEach(val => {
              submissionData.append(`q10_ifSo10[]`, val);
            });
          }
          
          if (Array.isArray(formData.s_naturalHairLength)) {
            formData.s_naturalHairLength.forEach(val => {
              submissionData.append(`q11_whatsThe[]`, val);
            });
          }
          
          if (Array.isArray(formData.s_hairDescription)) {
            formData.s_hairDescription.forEach(val => {
              submissionData.append(`q12_whatBest[]`, val);
            });
          }
          
          if (Array.isArray(formData.s_currentHairColor)) {
            formData.s_currentHairColor.forEach(val => {
              submissionData.append(`q13_whatDescribes[]`, val);
            });
          }
          
          if (Array.isArray(formData.s_extensionGoals)) {
            formData.s_extensionGoals.forEach(val => {
              submissionData.append(`q14_whatAre[]`, val);
            });
          }
          
          if (Array.isArray(formData.s_wantColorChange)) {
            formData.s_wantColorChange.forEach(val => {
              submissionData.append(`q15_doYou15[]`, val);
            });
          }
          
          // Add file uploads if present
          if (formData.s_currentHairPhoto) {
            submissionData.append(`q16_pleaseSubmit[]`, formData.s_currentHairPhoto);
          }
          
          if (formData.s_inspirationPhotos) {
            submissionData.append(`q17_pleaseSubmit17[]`, formData.s_inspirationPhotos);
          }
        }
      }
      
      // Submit form data to JotForm API
      const response = await fetch(`https://api.jotform.com/form/${config.formId}/submissions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: submissionData,
      });
      
      if (response.ok) {
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
          preferredDays: [] as string[],
          howHeard: '',
          currentHairPhoto: null as File | null,
          inspirationPhotos: null as File | null,
          // Taylor's extension consultation fields
          everWornExtensions: '',
          extensionMethod: '',
          currentlyHaveExtensions: '',
          currentExtensionType: '',
          naturalHairLength: '',
          hairDescription: '',
          currentHairColor: '',
          extensionGoals: [] as string[],
          wantColorChange: '',
          // Shantel's fields (many are arrays)
          s_hairLength: [] as string[],
          s_hairStrands: [] as string[],
          s_hairColor: [] as string[],
          s_greyPercentage: [] as string[],
          s_boxDye: [] as string[],
          s_lightened: [] as string[],
          s_colorChangeFrequency: [] as string[],
          s_idealMaintenance: [] as string[],
          s_age: [] as string[],
          s_preferredDays: [] as string[],
          s_howHeard: [] as string[],
          s_currentHairPhoto: null as File | null,
          s_inspirationPhotos: null as File | null,
          // Shantel's additional fields
          silentAppointment: '',
          // Shantel's extension consultation fields
          s_everWornExtensions: [] as string[],
          s_extensionMethod: [] as string[],
          s_currentlyHaveExtensions: [] as string[],
          s_currentExtensionType: [] as string[],
          s_naturalHairLength: [] as string[],
          s_hairDescription: [] as string[],
          s_currentHairColor: [] as string[],
          s_extensionGoals: [] as string[],
          s_wantColorChange: [] as string[]
        });
        moveToStep(1);
      } else {
        // Handle specific error cases
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your .env configuration.');
        } else if (response.status === 404) {
          throw new Error('Form not found. Please check the form ID configuration.');
        } else {
          throw new Error(`Failed to submit form. Status: ${response.status} - ${response.statusText}`);
        }
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

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  // Render the full-screen form for step 3
  if (currentStep === 3) {
    return (
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

          <div className="space-y-6">
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

            {/* Hair Information - Only for new client forms */}
            {(selectedAppointmentType === 'new-client' || selectedAppointmentType === 'color-consultation') && (
              <>
                {/* Fields for Taylor */}
                {selectedStylist === 'owner' && (
                  <>
                    {/* Show new client fields only for new client appointment type */}
                    {selectedAppointmentType === 'new-client' && (
                      <>
                        {/* Hair Length */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            What is the length of your natural hair? *
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {['Chin length', 'Resting on shoulders', 'Below collar bone', 'Past elbow length'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="radio"
                                  name="hairLength"
                                  value={option}
                                  checked={formData.hairLength === option}
                                  onChange={handleInputChange}
                                  className="form-radio text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Hair Strands */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            What best describes your hair strands? *
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {['fine', 'medium', 'coarse'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="radio"
                                  name="hairStrands"
                                  value={option}
                                  checked={formData.hairStrands === option}
                                  onChange={handleInputChange}
                                  className="form-radio text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Natural Hair Color */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            How would you best describe your natural hair color? (the color of your roots) *
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {['darkest black (levels 1-3)', 'dark brunette (levels 4-5)', 'medium brown (levels 6-7)', 'light brown/blonde (levels 8-9)'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="radio"
                                  name="hairColor"
                                  value={option}
                                  checked={formData.hairColor === option}
                                  onChange={handleInputChange}
                                  className="form-radio text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Grey Percentage */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            What percentage of grey hair do you have? *
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {['0% no greys', '5%-25% a few greys here and there', '50%-75% will need a root touch up every 4-6 weeks', '80%-100% will need full coverage or grey blending'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="radio"
                                  name="greyPercentage"
                                  value={option}
                                  checked={formData.greyPercentage === option}
                                  onChange={handleInputChange}
                                  className="form-radio text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Box Dye */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Have you EVER used box dye? *
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {['yes 1 time', 'no never', 'many times'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="radio"
                                  name="boxDye"
                                  value={option}
                                  checked={formData.boxDye === option}
                                  onChange={handleInputChange}
                                  className="form-radio text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Lightened */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Have you lightened your hair in the last 6 months? *
                          </label>
                          <div className="flex space-x-4">
                            {['yes', 'no'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="radio"
                                  name="lightened"
                                  value={option}
                                  checked={formData.lightened === option}
                                  onChange={handleInputChange}
                                  className="form-radio text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Color Change Frequency */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            How often do you change your hair color/style? *
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {['once a month', '2-3 months', 'twice a year', 'never'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="radio"
                                  name="colorChangeFrequency"
                                  value={option}
                                  checked={formData.colorChangeFrequency === option}
                                  onChange={handleInputChange}
                                  className="form-radio text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Ideal Maintenance */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            What is your ideal color maintenance? *
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {['every 5-6 weeks', 'every 6-7 weeks', 'every 3-4 months', 'about twice a year'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="radio"
                                  name="idealMaintenance"
                                  value={option}
                                  checked={formData.idealMaintenance === option}
                                  onChange={handleInputChange}
                                  className="form-radio text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Age */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            How old are you? *
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {['15-24', '25-35', '36-45', '46-55', '56-65', '65+'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="radio"
                                  name="age"
                                  value={option}
                                  checked={formData.age === option}
                                  onChange={handleInputChange}
                                  className="form-radio text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Show extension consultation fields only for extension consultation appointment type */}
                    {selectedAppointmentType === 'color-consultation' && (
                      <>
                        {/* Have you ever worn extensions? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Have you ever worn extensions? *
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {['yes', 'no'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="radio"
                                  name="everWornExtensions"
                                  value={option}
                                  checked={formData.everWornExtensions === option}
                                  onChange={handleInputChange}
                                  className="form-radio text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* If so, what method? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            If so, what method? *
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {['wefts', 'ktips', 'itips', 'taps ins', 'only clip ins'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="radio"
                                  name="extensionMethod"
                                  value={option}
                                  checked={formData.extensionMethod === option}
                                  onChange={handleInputChange}
                                  className="form-radio text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Do you currently have extensions? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Do you currently have extensions? *
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {['yes', 'no'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="radio"
                                  name="currentlyHaveExtensions"
                                  value={option}
                                  checked={formData.currentlyHaveExtensions === option}
                                  onChange={handleInputChange}
                                  className="form-radio text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* If so what type? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            If so what type? *
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {['wefts', 'ktip/itip', 'tape ins'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="radio"
                                  name="currentExtensionType"
                                  value={option}
                                  checked={formData.currentExtensionType === option}
                                  onChange={handleInputChange}
                                  className="form-radio text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* What is the length of your natural hair? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            What is the length of your natural hair? *
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {['Chin length', 'Resting on shoulders', 'Below collar bone', 'At or below elbows'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="radio"
                                  name="naturalHairLength"
                                  value={option}
                                  checked={formData.naturalHairLength === option}
                                  onChange={handleInputChange}
                                  className="form-radio text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* What best describes your hair? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            What best describes your hair? *
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {['fine', 'medium', 'coarse'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="radio"
                                  name="hairDescription"
                                  value={option}
                                  checked={formData.hairDescription === option}
                                  onChange={handleInputChange}
                                  className="form-radio text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* What best describes your current hair color? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            What best describes your current hair color? *
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {['lightened/highlighted', 'colored darker, one solid color', 'natural no color'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="radio"
                                  name="currentHairColor"
                                  value={option}
                                  checked={formData.currentHairColor === option}
                                  onChange={handleInputChange}
                                  className="form-radio text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* What are you looking to achieve with extensions? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            (Mark any that apply) What are you looking to achieve with extensions? *
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {['length', 'density', 'about 1-2 inches longer', 'about 3-4 inches longer'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="extensionGoals"
                                  value={option}
                                  checked={formData.extensionGoals.includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Do you want to change your hair color before installing? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Do you want to change your hair color before installing? *
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {['yes', 'no'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="radio"
                                  name="wantColorChange"
                                  value={option}
                                  checked={formData.wantColorChange === option}
                                  onChange={handleInputChange}
                                  className="form-radio text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* Fields for Shantel */}
                {selectedStylist === 'coworker' && (
                  <>
                    {/* Show new client fields only for new client appointment type */}
                    {selectedAppointmentType === 'new-client' && (
                      <>
                        {/* Hair Length */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            What is the length of your natural hair? *
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {['Chin length', 'Shoulder length', 'Below collar bone', 'Past elbow length'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_hairLength"
                                  value={option}
                                  checked={Array.isArray(formData.s_hairLength) && (formData.s_hairLength as string[]).includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Hair Strands */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            What best describes your hair strands? *
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {['Fine', 'Medium', 'Coarse'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_hairStrands"
                                  value={option}
                                  checked={Array.isArray(formData.s_hairStrands) && (formData.s_hairStrands as string[]).includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Natural Hair Color */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            How would you best describe your natural hair color (color of your roots?) *
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {['Darkest black (Level 1-3)', 'Dark brunette (Level 4-6)', 'Medium brown (Level 6-7)', 'Light brown (Level 8-9)'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_hairColor"
                                  value={option}
                                  checked={Array.isArray(formData.s_hairColor) && (formData.s_hairColor as string[]).includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Grey Percentage */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            What percentage of gray do you have? *
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {['0% No gray', '5%-25% Few here and there', '50%-75% Will need touch up every 4-6 weeks', '100% Will need full coverage or blending'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_greyPercentage"
                                  value={option}
                                  checked={Array.isArray(formData.s_greyPercentage) && (formData.s_greyPercentage as string[]).includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Box Dye */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Have you EVER used box dye? *
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {['Yes', 'No', 'Multiple times'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_boxDye"
                                  value={option}
                                  checked={Array.isArray(formData.s_boxDye) && (formData.s_boxDye as string[]).includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Lightened */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Have you lightened your hair in the past 6 months? *
                          </label>
                          <div className="flex space-x-4">
                            {['Yes', 'No'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_lightened"
                                  value={option}
                                  checked={Array.isArray(formData.s_lightened) && (formData.s_lightened as string[]).includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Color Change Frequency */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            How often do you change your hair color/style? *
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {['Once a month', '2-3 months', 'Twice a year', 'Never'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_colorChangeFrequency"
                                  value={option}
                                  checked={Array.isArray(formData.s_colorChangeFrequency) && (formData.s_colorChangeFrequency as string[]).includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Ideal Maintenance */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            What is your ideal color maintenance? *
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {['Every 5-6 weeks', 'Every 6-7 weeks', 'Every 3-4 months', 'About twice a year'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_idealMaintenance"
                                  value={option}
                                  checked={Array.isArray(formData.s_idealMaintenance) && (formData.s_idealMaintenance as string[]).includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Age */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            How old are you? *
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {['15-24', '25-35', '36-45', '46-55', '56-65', '65+'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_age"
                                  value={option}
                                  checked={Array.isArray(formData.s_age) && (formData.s_age as string[]).includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Show extension consultation fields only for extension consultation appointment type */}
                    {selectedAppointmentType === 'color-consultation' && (
                      <>
                        {/* Have you ever worn extensions? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Have you ever worn extensions? *
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {['Yes', 'No'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_everWornExtensions"
                                  value={option}
                                  checked={Array.isArray(formData.s_everWornExtensions) && formData.s_everWornExtensions.includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* If so, what method? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            If so, what method? *
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {['Wefts', 'KTips', 'ITips', 'Tape ins', 'Clip ins'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_extensionMethod"
                                  value={option}
                                  checked={Array.isArray(formData.s_extensionMethod) && formData.s_extensionMethod.includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Do you currently have extensions? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Do you currently have extensions? *
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {['Yes', 'No'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_currentlyHaveExtensions"
                                  value={option}
                                  checked={Array.isArray(formData.s_currentlyHaveExtensions) && formData.s_currentlyHaveExtensions.includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* If so what type? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            If so what type? *
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {['Wefts', 'KTips/ITips', 'Tape ins'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_currentExtensionType"
                                  value={option}
                                  checked={Array.isArray(formData.s_currentExtensionType) && formData.s_currentExtensionType.includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* What's the length of your natural hair? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            What's the length of your natural hair? *
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {['Chin length', 'Shoulder length', 'Below collar bone length', 'At or below elbows length'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_naturalHairLength"
                                  value={option}
                                  checked={Array.isArray(formData.s_naturalHairLength) && formData.s_naturalHairLength.includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* What best describes your hair? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            What best describes your hair? *
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {['Fine', 'Medium', 'Coarse'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_hairDescription"
                                  value={option}
                                  checked={Array.isArray(formData.s_hairDescription) && formData.s_hairDescription.includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* What best describes your current hair color? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            What best describes your current hair color? *
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {['Lightened/Highlighted', 'Colored darker, one solid color', 'Natural no color'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_currentHairColor"
                                  value={option}
                                  checked={Array.isArray(formData.s_currentHairColor) && formData.s_currentHairColor.includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* What are you looking to achieve with extensions? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            (Mark any that apply) What are you looking to achieve with extensions? *
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {['Length', 'Density', 'About 1-2 inches longer', 'About 3-4 inches longer'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_extensionGoals"
                                  value={option}
                                  checked={Array.isArray(formData.s_extensionGoals) && formData.s_extensionGoals.includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Do you want to change your hair color before installing? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Do you want to change your hair color before installing? *
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {['Yes', 'No'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_wantColorChange"
                                  value={option}
                                  checked={Array.isArray(formData.s_wantColorChange) && formData.s_wantColorChange.includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Show extension consultation fields only for extension consultation appointment type */}
                    {selectedAppointmentType === 'color-consultation' && (
                      <>
                        {/* Have you ever worn extensions? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Have you ever worn extensions? *
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {['Yes', 'No'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_everWornExtensions"
                                  value={option}
                                  checked={Array.isArray(formData.s_everWornExtensions) && formData.s_everWornExtensions.includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* If so, which method? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            If so, which method? *
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {['Tape Ins', 'K-Tips', 'I-Tips', 'Wefts', 'Only clip ins'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_extensionMethod"
                                  value={option}
                                  checked={Array.isArray(formData.s_extensionMethod) && formData.s_extensionMethod.includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Do you currently have extensions? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Do you currently have extensions? *
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {['Yes', 'No'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_currentlyHaveExtensions"
                                  value={option}
                                  checked={Array.isArray(formData.s_currentlyHaveExtensions) && formData.s_currentlyHaveExtensions.includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* If so, which method? (second question) */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            If so, which method? *
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {['Tape Ins', 'K-Tips / I-Tips', 'Wefts'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_currentExtensionType"
                                  value={option}
                                  checked={Array.isArray(formData.s_currentExtensionType) && formData.s_currentExtensionType.includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* What's the length of your natural hair? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            What's the length of your natural hair? *
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {['Chin length', 'Shoulder length', 'Below collar bone length', 'At or below elbows length'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_naturalHairLength"
                                  value={option}
                                  checked={Array.isArray(formData.s_naturalHairLength) && formData.s_naturalHairLength.includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* What best describes your hair? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            What best describes your hair? *
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {['Fine', 'Medium', 'Coarse'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_hairDescription"
                                  value={option}
                                  checked={Array.isArray(formData.s_hairDescription) && formData.s_hairDescription.includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* What describes your hair color? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            What describes your hair color? *
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {['Lightened / highlighted', 'Colored dark, one solid color', 'Natural, no color', 'Type option 4'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_currentHairColor"
                                  value={option}
                                  checked={Array.isArray(formData.s_currentHairColor) && formData.s_currentHairColor.includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* What are you trying to achieve with extensions? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            What are you trying to achieve with extensions? *
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {['Length', 'Density', 'Both'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_extensionGoals"
                                  value={option}
                                  checked={Array.isArray(formData.s_extensionGoals) && formData.s_extensionGoals.includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Do you want to change your hair color before installing the extensions? */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Do you want to change your hair color before installing the extensions? *
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {['Yes', 'No'].map((option) => (
                              <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="s_wantColorChange"
                                  value={option}
                                  checked={Array.isArray(formData.s_wantColorChange) && formData.s_wantColorChange.includes(option)}
                                  onChange={handleInputChange}
                                  className="form-checkbox text-rose-400"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Photo Upload Section */}
                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Please submit a current photo of your hair *
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <input
                              type="file"
                              id="s_currentHairPhoto"
                              name="s_currentHairPhoto"
                              onChange={(e) => handleFileChange(e, 's_currentHairPhoto')}
                              className="hidden"
                              multiple
                            />
                            <label htmlFor="s_currentHairPhoto" className="cursor-pointer">
                              <div className="text-gray-500 mb-2">Click to upload or drag and drop</div>
                              <div className="text-gray-400 text-sm">PNG, JPG, GIF up to 10MB</div>
                            </label>
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Please submit an inspiration photo of what you want your hair to look like *
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <input
                              type="file"
                              id="s_inspirationPhotos"
                              name="s_inspirationPhotos"
                              onChange={(e) => handleFileChange(e, 's_inspirationPhotos')}
                              className="hidden"
                              multiple
                            />
                            <label htmlFor="s_inspirationPhotos" className="cursor-pointer">
                              <div className="text-gray-500 mb-2">Click to upload or drag and drop</div>
                              <div className="text-gray-400 text-sm">PNG, JPG, GIF up to 10MB</div>
                            </label>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* Common fields for both stylists */}
                {/* Preferred Days */}
                <div className="form-group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {selectedStylist === 'owner' ? 'What days of the week works best for you?' : 'What days work best for you?'} *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(selectedStylist === 'owner' 
                      ? ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Tuesday (morning)', 'Monday (night)']
                      : ['Wednesday', 'Thursday', 'Saturday']
                    ).map((day) => (
                      <label key={day} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                        <input
                          type="checkbox"
                          name="preferredDays"
                          value={day}
                          checked={formData.preferredDays.includes(day)}
                          onChange={handleInputChange}
                          className="form-checkbox text-rose-400"
                        />
                        <span className="text-sm">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* How Heard */}
                <div className="form-group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    How did you hear about me? *
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {(selectedStylist === 'owner' 
                      ? ['Instagram', 'Facebook', 'TikTok', 'Referral', 'Other']
                      : ['Instagram', 'Facebook', 'Referral', 'Other']
                    ).map((option) => (
                      <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-rose-300 cursor-pointer">
                        <input
                          type="checkbox"
                          name="howHeard"
                          value={option}
                          checked={formData.howHeard.includes(option)}
                          onChange={handleInputChange}
                          className="form-checkbox text-rose-400"
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Photo Uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {selectedStylist === 'owner' 
                        ? selectedAppointmentType === 'new-client' 
                          ? 'Please upload a photo of your current hair!' 
                          : 'Please upload a picture of your current hair!'
                        : 'Upload a photo of your current hair & your inspiration photo!✨'} *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        id="currentHairPhoto"
                        name="currentHairPhoto"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'currentHairPhoto')}
                        className="hidden"
                      />
                      <label htmlFor="currentHairPhoto" className="cursor-pointer">
                        <div className="text-rose-400 font-medium">Click to upload</div>
                        <div className="text-gray-500 text-sm mt-1">PNG, JPG up to 10MB</div>
                      </label>
                    </div>
                  </div>

                  {selectedStylist === 'owner' && selectedAppointmentType === 'new-client' && (
                    <div className="form-group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Finally, upload your inspo photos for your dream hair :) *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          id="inspirationPhotos"
                          name="inspirationPhotos"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'inspirationPhotos')}
                          className="hidden"
                          multiple
                        />
                        <label htmlFor="inspirationPhotos" className="cursor-pointer">
                          <div className="text-rose-400 font-medium">Click to upload</div>
                          <div className="text-gray-500 text-sm mt-1">Multiple files allowed</div>
                        </label>
                      </div>
                    </div>
                  )}

                  {selectedStylist === 'owner' && selectedAppointmentType === 'color-consultation' && (
                    <div className="form-group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Upload that inspo pic :) *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          id="inspirationPhotos"
                          name="inspirationPhotos"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'inspirationPhotos')}
                          className="hidden"
                          multiple
                        />
                        <label htmlFor="inspirationPhotos" className="cursor-pointer">
                          <div className="text-rose-400 font-medium">Click to upload</div>
                          <div className="text-gray-500 text-sm mt-1">Multiple files allowed</div>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="flex justify-between pt-4">
              <button 
                type="button" 
                className="bg-white text-gray-800 px-6 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300 border border-gray-200"
                onClick={() => moveToStep(2)}
              >
                Back
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gray-800 text-cream px-8 py-3 rounded-full hover:bg-gray-700 transition-all duration-300 font-semibold disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Booking'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render the regular steps for steps 1 and 2
  return (
    // Filled the space with more content and better use of the area
    <div className="bg-white rounded-2xl p-8 shadow-lg h-full flex flex-col">
      <div className="form-header text-center mb-6">
        <h2 className="text-3xl font-serif font-bold text-gray-800 mb-2">Book Your Appointment</h2>
        <p className="text-gray-600 mb-6">Choose your stylist and appointment type</p>
        
        {/* Added a brief description to fill space */}
        <div className="bg-rose-50 rounded-lg p-4 mb-6">
          <p className="text-gray-700 text-sm">
            Booking with T & S Studio is simple! First, select your preferred stylist. 
            Then choose the type of appointment you need. Finally, fill in your details 
            and we'll get back to you to confirm your appointment.
          </p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
            currentStep >= 1 ? 'bg-rose-400 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            1
          </div>
          <div className={`w-12 h-1 ${currentStep > 1 ? 'bg-rose-400' : 'bg-gray-200'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
            currentStep >= 2 ? 'bg-rose-400 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            2
          </div>
          <div className={`w-12 h-1 ${currentStep > 2 ? 'bg-rose-400' : 'bg-gray-200'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
            currentStep >= 3 ? 'bg-rose-400 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            3
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {(showSuccess || showError) && (
        <div className={`px-4 py-3 rounded mb-6 text-center ${
          showSuccess ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {showSuccess ? '✅ Your appointment request has been submitted successfully!' : `❌ ${errorMessage}`}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
        {/* Step 1: Choose Stylist */}
        {currentStep === 1 && (
          <div className="form-step active flex-grow flex flex-col">
            <div className="form-group mb-6 flex-grow">
              <label className="block text-lg font-semibold text-gray-800 mb-4 text-center">Step 1: Choose Your Stylist</label>
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
                  <div className="text-gray-600 text-sm mb-2"> Co-Founder</div>
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
                  <div className="text-gray-600 text-sm mb-2">Co-Founder</div>
                  <div className="text-xs text-gray-500">
                    Shantel brings artistic vision and technical expertise to every transformation, specializing in balayage 
                    and creating stunning dimensional color.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Choose Appointment Type */}
        {currentStep === 2 && (
          <div className="form-step flex-grow flex flex-col">
            <div className="form-group mb-6 flex-grow">
              <label className="block text-lg font-semibold text-gray-800 mb-4 text-center">Step 2: Choose Appointment Type</label>
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
                  <div className="font-bold text-lg mb-1">New Client</div>
                  <div className="text-gray-600 text-sm mb-2">First time visit or returning after 6+ months</div>
                  <div className="text-xs text-gray-500">
                    Comprehensive consultation to understand your hair goals and create a personalized 
                    transformation plan tailored to your unique style.
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
                  <div className="text-gray-600 text-sm mb-2">Discuss extension options and get expert advice</div>
                  <div className="text-xs text-gray-500">
                    In-depth discussion about extension options, techniques, and personalized recommendations 
                    to achieve your desired look with our expert extension services.
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-auto pt-4">
              <button 
                type="button" 
                className="bg-white text-gray-800 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors duration-300 border border-gray-200"
                onClick={() => moveToStep(1)}
              >
                Back
              </button>
            </div>
          </div>
        )}
      </form>
      

    </div>
  );
};

export default BookingForm;
