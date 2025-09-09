import { BookingFormData, StylistType, AppointmentType } from './types';
import { JOTFORM_CONFIG, FORM_FIELDS } from './config';

export const submitBookingForm = async (
  formData: BookingFormData,
  selectedStylist: StylistType,
  selectedAppointmentType: AppointmentType
): Promise<boolean> => {
  try {
    const config = JOTFORM_CONFIG[selectedStylist][selectedAppointmentType];
    
    // Prepare form data for submission
    const submissionData = new FormData();
    
    // Add basic contact information
    submissionData.append(FORM_FIELDS.firstName, formData.firstName);
    submissionData.append(FORM_FIELDS.lastName, formData.lastName);
    submissionData.append(FORM_FIELDS.phone, formData.phone);
    submissionData.append(FORM_FIELDS.email, formData.email);
    
    // Add stylist-specific fields based on selection
    if (selectedStylist === 'owner') {
      if (selectedAppointmentType === 'new-client') {
        // Add Taylor's new client fields
        submissionData.append(FORM_FIELDS.ownerNewClient.hairLength, formData.hairLength);
        submissionData.append(FORM_FIELDS.ownerNewClient.hairStrands, formData.hairStrands);
        submissionData.append(FORM_FIELDS.ownerNewClient.hairColor, formData.hairColor);
        submissionData.append(FORM_FIELDS.ownerNewClient.greyPercentage, formData.greyPercentage);
        submissionData.append(FORM_FIELDS.ownerNewClient.boxDye, formData.boxDye);
        submissionData.append(FORM_FIELDS.ownerNewClient.lightened, formData.lightened);
        submissionData.append(FORM_FIELDS.ownerNewClient.colorChangeFrequency, formData.colorChangeFrequency);
        submissionData.append(FORM_FIELDS.ownerNewClient.idealMaintenance, formData.idealMaintenance);
        submissionData.append(FORM_FIELDS.ownerNewClient.age, formData.age);
        
        // Add preferred days (multiple values)
        if (Array.isArray(formData.preferredDays)) {
          formData.preferredDays.forEach(day => {
            submissionData.append(FORM_FIELDS.ownerNewClient.preferredDays, day);
          });
        }
        
        // Add how heard (multiple values)
        if (Array.isArray(formData.howHeard)) {
          formData.howHeard.forEach(source => {
            submissionData.append(FORM_FIELDS.ownerNewClient.howHeard, source);
          });
        }
        
        // Add file uploads if present
        if (formData.currentHairPhoto) {
          submissionData.append(FORM_FIELDS.ownerNewClient.currentHairPhoto, formData.currentHairPhoto);
        }
        
        if (formData.inspirationPhotos) {
          submissionData.append(FORM_FIELDS.ownerNewClient.inspirationPhotos, formData.inspirationPhotos);
        }
      } else if (selectedAppointmentType === 'color-consultation') {
        // Add Taylor's extension consultation fields
        submissionData.append(FORM_FIELDS.ownerColorConsultation.everWornExtensions, formData.everWornExtensions);
        submissionData.append(FORM_FIELDS.ownerColorConsultation.extensionMethod, formData.extensionMethod);
        submissionData.append(FORM_FIELDS.ownerColorConsultation.currentlyHaveExtensions, formData.currentlyHaveExtensions);
        submissionData.append(FORM_FIELDS.ownerColorConsultation.currentExtensionType, formData.currentExtensionType);
        submissionData.append(FORM_FIELDS.ownerColorConsultation.naturalHairLength, formData.naturalHairLength);
        submissionData.append(FORM_FIELDS.ownerColorConsultation.hairDescription, formData.hairDescription);
        submissionData.append(FORM_FIELDS.ownerColorConsultation.currentHairColor, formData.currentHairColor);
        
        // Add extension goals (multiple values)
        if (Array.isArray(formData.extensionGoals)) {
          formData.extensionGoals.forEach(goal => {
            submissionData.append(FORM_FIELDS.ownerColorConsultation.extensionGoals, goal);
          });
        }
        
        submissionData.append(FORM_FIELDS.ownerColorConsultation.wantColorChange, formData.wantColorChange);
        
        // Add file uploads if present
        if (formData.currentHairPhoto) {
          submissionData.append(FORM_FIELDS.ownerColorConsultation.currentHairPhoto, formData.currentHairPhoto);
        }
        
        if (formData.inspirationPhotos) {
          submissionData.append(FORM_FIELDS.ownerColorConsultation.inspirationPhotos, formData.inspirationPhotos);
        }
      }
    } else if (selectedStylist === 'coworker') {
      if (selectedAppointmentType === 'new-client') {
        // Add Shantel's new client fields
        submissionData.append(FORM_FIELDS.coworkerNewClient.hairLength, Array.isArray(formData.s_hairLength) ? formData.s_hairLength.join(', ') : '');
        submissionData.append(FORM_FIELDS.coworkerNewClient.hairStrands, Array.isArray(formData.s_hairStrands) ? formData.s_hairStrands.join(', ') : '');
        submissionData.append(FORM_FIELDS.coworkerNewClient.hairColor, Array.isArray(formData.s_hairColor) ? formData.s_hairColor.join(', ') : '');
        submissionData.append(FORM_FIELDS.coworkerNewClient.greyPercentage, Array.isArray(formData.s_greyPercentage) ? formData.s_greyPercentage.join(', ') : '');
        submissionData.append(FORM_FIELDS.coworkerNewClient.boxDye, Array.isArray(formData.s_boxDye) ? formData.s_boxDye.join(', ') : '');
        submissionData.append(FORM_FIELDS.coworkerNewClient.lightened, Array.isArray(formData.s_lightened) ? formData.s_lightened.join(', ') : '');
        submissionData.append(FORM_FIELDS.coworkerNewClient.colorChangeFrequency, Array.isArray(formData.s_colorChangeFrequency) ? formData.s_colorChangeFrequency.join(', ') : '');
        submissionData.append(FORM_FIELDS.coworkerNewClient.idealMaintenance, Array.isArray(formData.s_idealMaintenance) ? formData.s_idealMaintenance.join(', ') : '');
        submissionData.append(FORM_FIELDS.coworkerNewClient.age, Array.isArray(formData.s_age) ? formData.s_age.join(', ') : '');
        
        // Add preferred days (multiple values)
        if (Array.isArray(formData.s_preferredDays)) {
          formData.s_preferredDays.forEach(day => {
            submissionData.append(FORM_FIELDS.coworkerNewClient.preferredDays, day);
          });
        }
        
        // Add how heard (multiple values)
        if (Array.isArray(formData.s_howHeard)) {
          formData.s_howHeard.forEach(source => {
            submissionData.append(FORM_FIELDS.coworkerNewClient.howHeard, source);
          });
        }
        
        // Add file uploads if present
        if (formData.s_currentHairPhoto) {
          submissionData.append(FORM_FIELDS.coworkerNewClient.currentHairPhoto, formData.s_currentHairPhoto);
        }
        
        if (formData.s_inspirationPhotos) {
          submissionData.append(FORM_FIELDS.coworkerNewClient.inspirationPhotos, formData.s_inspirationPhotos);
        }
      } else if (selectedAppointmentType === 'color-consultation') {
        // Add Shantel's extension consultation fields
        if (Array.isArray(formData.s_everWornExtensions)) {
          formData.s_everWornExtensions.forEach(val => {
            submissionData.append(FORM_FIELDS.coworkerColorConsultation.everWornExtensions, val);
          });
        }
        
        if (Array.isArray(formData.s_extensionMethod)) {
          formData.s_extensionMethod.forEach(val => {
            submissionData.append(FORM_FIELDS.coworkerColorConsultation.extensionMethod, val);
          });
        }
        
        if (Array.isArray(formData.s_currentlyHaveExtensions)) {
          formData.s_currentlyHaveExtensions.forEach(val => {
            submissionData.append(FORM_FIELDS.coworkerColorConsultation.currentlyHaveExtensions, val);
          });
        }
        
        if (Array.isArray(formData.s_currentExtensionType)) {
          formData.s_currentExtensionType.forEach(val => {
            submissionData.append(FORM_FIELDS.coworkerColorConsultation.currentExtensionType, val);
          });
        }
        
        if (Array.isArray(formData.s_naturalHairLength)) {
          formData.s_naturalHairLength.forEach(val => {
            submissionData.append(FORM_FIELDS.coworkerColorConsultation.naturalHairLength, val);
          });
        }
        
        if (Array.isArray(formData.s_hairDescription)) {
          formData.s_hairDescription.forEach(val => {
            submissionData.append(FORM_FIELDS.coworkerColorConsultation.hairDescription, val);
          });
        }
        
        if (Array.isArray(formData.s_currentHairColor)) {
          formData.s_currentHairColor.forEach(val => {
            submissionData.append(FORM_FIELDS.coworkerColorConsultation.currentHairColor, val);
          });
        }
        
        if (Array.isArray(formData.s_extensionGoals)) {
          formData.s_extensionGoals.forEach(val => {
            submissionData.append(FORM_FIELDS.coworkerColorConsultation.extensionGoals, val);
          });
        }
        
        if (Array.isArray(formData.s_wantColorChange)) {
          formData.s_wantColorChange.forEach(val => {
            submissionData.append(FORM_FIELDS.coworkerColorConsultation.wantColorChange, val);
          });
        }
        
        // Add file uploads if present
        if (formData.s_currentHairPhoto) {
          submissionData.append(FORM_FIELDS.coworkerColorConsultation.currentHairPhoto, formData.s_currentHairPhoto);
        }
        
        if (formData.s_inspirationPhotos) {
          submissionData.append(FORM_FIELDS.coworkerColorConsultation.inspirationPhotos, formData.s_inspirationPhotos);
        }
      }
    }
    
    // Submit form data to JotForm using the public submission endpoint
    // IMPORTANT: Using the public submit endpoint instead of the API endpoint
    // to avoid CORS issues with Authorization headers when deployed to GitHub Pages
    const response = await fetch(`https://submit.jotform.com/submit/${config.formId}`, {
      method: 'POST',
      body: submissionData,
    });
    
    if (response.ok) {
      // Check if response is actually JSON before trying to parse it
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        console.log('[DEBUG] Form submitted successfully:', result);
        return true;
      } else {
        // If not JSON, it's likely a successful redirect or HTML response
        console.log('[DEBUG] Form submitted successfully (non-JSON response)');
        return true;
      }
    } else {
      let errorMessage = `Failed to submit form. Status: ${response.status}`;
      if (response.statusText) {
        errorMessage += ` - ${response.statusText}`;
      }
      
      // Try to get more detailed error information from the response
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage += ` - Details: ${errorData.message}`;
          }
        } else {
          // If it's not JSON, just read as text
          const errorText = await response.text();
          if (errorText) {
            errorMessage += ` - Details: ${errorText.substring(0, 200)}...`; // Limit length
          }
        }
      } catch (parseError) {
        // If we can't read the error details, that's okay
        errorMessage += ' - Could not parse error details';
      }
      
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Form submission error:', error);
    throw error;
  }
};