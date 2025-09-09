import React, { useState, useEffect } from 'react';

// Define types
interface JotFormField {
  qid: string;
  type: string;
  label: string;
  required: boolean;
  name: string;
  options?: string[];
}

interface JotFormConfig {
  formId: string;
  apiKey: string;
}

interface FormErrors {
  [key: string]: string;
}

// JotForm configuration
const JOTFORM_CONFIG: Record<string, Record<string, JotFormConfig>> = {
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
      apiKey: '148ba1b274230fae1439ba7fbe14db9f' 
    },
    'color-consultation': { 
      formId: '243017852134047', 
      apiKey: '148ba1b274230fae1439ba7fbe14db9f' 
    }
  }
};

// Helper function to load form schema
async function loadSchema(formId: string, apiKey: string): Promise<JotFormField[]> {
  try {
    console.log(`[DEBUG] Loading schema for form ${formId}`);
    const response = await fetch(
      `https://api.jotform.com/form/${formId}/questions?apiKey=${apiKey}`
    );
    
    console.log(`[DEBUG] Schema load response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[ERROR] Failed to fetch schema: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`Failed to fetch schema: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`[DEBUG] Schema loaded successfully:`, data);
    
    const fields: JotFormField[] = [];
    
    // Define supported field types
    const supported = new Set([
      'control_fullname',
      'control_email',
      'control_textbox',
      'control_textarea',
      'control_dropdown',
      'control_radio',
      'control_phone',
      'control_checkbox',
      'control_fileupload'
    ]);
    
    // Normalize fields
    Object.values(data.content).forEach((field: any) => {
      // Skip unsupported field types
      if (!supported.has(field.type)) {
        console.log(`[DEBUG] Skipping unsupported field type: ${field.type}`);
        return;
      }
      
      // Skip fields without text
      if (!field.text || field.text.length === 0) {
        console.log(`[DEBUG] Skipping field without text:`, field);
        return;
      }
      
      const normalizedField: JotFormField = {
        qid: field.qid,
        type: field.type,
        label: field.text,
        required: field.required === 'Yes',
        name: field.name
      };
      
      // Parse options for dropdown/radio fields
      if (field.options && typeof field.options === 'string') {
        normalizedField.options = field.options.split('|');
      } else if (field.options && typeof field.options === 'object') {
        normalizedField.options = Object.values(field.options);
      }
      
      fields.push(normalizedField);
    });
    
    console.log(`[DEBUG] Normalized fields:`, fields);
    return fields;
  } catch (error) {
    console.error('[ERROR] Error loading schema:', error);
    throw error;
  }
}

// Helper function to submit form data to Jotform
async function submitToJotform({
  formId,
  apiKey,
  fields,
  answers
}: {
  formId: string;
  apiKey: string;
  fields: JotFormField[];
  answers: Record<string, any>;
}) {
  try {
    console.log(`[DEBUG] Submitting form ${formId} with answers:`, answers);
    const formData = new FormData();
    
    // Build FormData with correct keys
    Object.keys(answers).forEach(key => {
      const field = fields.find(f => f.qid === key);
      const answer = answers[key];
      
      if (field && answer !== undefined && answer !== null && answer !== '') {
        if (field.type === 'control_fullname') {
          // Handle fullname fields with first/last parts
          if (typeof answer === 'object' && answer.first && answer.last) {
            formData.append(`submission[${field.qid}_first]`, answer.first);
            formData.append(`submission[${field.qid}_last]`, answer.last);
            console.log(`[DEBUG] Adding fullname field: ${field.qid}`, { first: answer.first, last: answer.last });
          }
        } else if (field.type === 'control_fileupload') {
          // Handle file uploads
          if (Array.isArray(answer)) {
            // Multiple files
            answer.forEach((file, index) => {
              formData.append(`submission[${field.qid}]`, file);
              console.log(`[DEBUG] Adding file (multiple): ${field.qid}`, file);
            });
          } else {
            // Single file
            formData.append(`submission[${field.qid}]`, answer);
            console.log(`[DEBUG] Adding file: ${field.qid}`, answer);
          }
        } else if (Array.isArray(answer)) {
          // Handle array values (checkboxes)
          answer.forEach(val => {
            formData.append(`submission[${field.qid}]`, val);
            console.log(`[DEBUG] Adding checkbox value: ${field.qid}`, val);
          });
        } else {
          // Handle simple values
          formData.append(`submission[${field.qid}]`, answer.toString());
          console.log(`[DEBUG] Adding field: ${field.qid}`, answer.toString());
        }
      }
    });
    
    console.log(`[DEBUG] Form data prepared for submission`);
    
    // Use the public submit endpoint instead of the API endpoint
    // to avoid CORS issues with Authorization headers when deployed to GitHub Pages
    const response = await fetch(`https://submit.jotform.com/submit/${formId}`, {
      method: 'POST',
      body: formData,
    });
    
    console.log(`[DEBUG] Submission response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[ERROR] Submission failed: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`Submission failed: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log(`[DEBUG] Form submitted successfully:`, result);
    return result;
  } catch (error) {
    console.error('[ERROR] Error submitting form:', error);
    throw error;
  }
}

// Field renderer component
function FieldRenderer({
  field,
  value,
  onChange,
  error
}: {
  field: JotFormField;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}) {
  const renderField = () => {
    switch (field.type) {
      case 'control_fullname':
        // Ensure we have a proper default value for fullname
        let fullName;
        if (value && typeof value === 'object' && value !== null && 'first' in value && 'last' in value) {
          fullName = value;
        } else {
          fullName = { first: '', last: '' };
        }
        return (
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label} First {field.required && '*'}
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
                value={fullName.first || ''}
                onChange={(e) => {
                  onChange({ ...fullName, first: e.target.value });
                }}
                required={field.required}
                placeholder="First Name"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label} Last {field.required && '*'}
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
                value={fullName.last || ''}
                onChange={(e) => {
                  onChange({ ...fullName, last: e.target.value });
                }}
                required={field.required}
                placeholder="Last Name"
              />
            </div>
          </div>
        );
        
      case 'control_email':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label} {field.required && '*'}
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              required={field.required}
              placeholder="email@example.com"
            />
          </div>
        );
        
      case 'control_textbox':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label} {field.required && '*'}
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              required={field.required}
            />
          </div>
        );
        
      case 'control_textarea':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label} {field.required && '*'}
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              required={field.required}
              rows={4}
            />
          </div>
        );
        
      case 'control_dropdown':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label} {field.required && '*'}
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              required={field.required}
            >
              <option value="">Select an option</option>
              {field.options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
        
      case 'control_radio':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label} {field.required && '*'}
            </label>
            <div className="space-y-2">
              {field.options?.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={`${field.qid}_option_${index}`}
                    name={field.qid}
                    className="h-4 w-4 text-rose-400 border-gray-300 focus:ring-rose-300"
                    checked={value === option}
                    onChange={() => onChange(option)}
                  />
                  <label 
                    htmlFor={`${field.qid}_option_${index}`} 
                    className="ml-3 block text-sm text-gray-700"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'control_checkbox':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label} {field.required && '*'}
            </label>
            <div className="space-y-2">
              {field.options?.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${field.qid}_option_${index}`}
                    className="h-4 w-4 text-rose-400 border-gray-300 rounded focus:ring-rose-300"
                    checked={Array.isArray(value) ? value.includes(option) : false}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      if (isChecked) {
                        onChange([...(Array.isArray(value) ? value : []), option]);
                      } else {
                        onChange((Array.isArray(value) ? value : []).filter(v => v !== option));
                      }
                    }}
                  />
                  <label 
                    htmlFor={`${field.qid}_option_${index}`} 
                    className="ml-3 block text-sm text-gray-700"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'control_phone':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label} {field.required && '*'}
            </label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              required={field.required}
              placeholder="(123) 456-7890"
            />
          </div>
        );
        
      case 'control_fileupload':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label} {field.required && '*'}
            </label>
            <input
              type="file"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  // For single file uploads
                  if (files.length === 1) {
                    onChange(files[0]);
                  } else {
                    // For multiple file uploads
                    onChange(Array.from(files));
                  }
                } else {
                  onChange(null);
                }
              }}
              required={field.required}
              multiple={field.name.includes('[]')} // Check if it's a multiple file upload
            />
            <p className="mt-1 text-sm text-gray-500">Choose file(s) to upload</p>
          </div>
        );
        
      default:
        // Return null for unsupported field types
        return null;
    }
  };
  
  const fieldContent = renderField();
  // Don't render anything if the field type is not supported
  if (fieldContent === null) {
    return null;
  }
  
  return (
    <div className="mb-6">
      {fieldContent}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

// Main BookingForm component
const BookingForm: React.FC<{
  stylist: 'owner' | 'coworker';
  formType: 'new-client' | 'color-consultation';
}> = ({ stylist, formType }) => {
  const [fields, setFields] = useState<JotFormField[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Get form configuration based on props
  const getConfig = (): JotFormConfig => {
    return JOTFORM_CONFIG[stylist][formType];
  };
  
  // Load schema on component mount
  useEffect(() => {
    const loadFormSchema = async () => {
      try {
        setLoading(true);
        setError(null);
        const config = getConfig();
        console.log(`[DEBUG] Loading form schema for stylist: ${stylist}, formType: ${formType}`);
        console.log(`[DEBUG] Using config:`, config);
        const schema = await loadSchema(config.formId, config.apiKey);
        setFields(schema);
        
        // Initialize form data
        const initialData: Record<string, any> = {};
        schema.forEach(field => {
          if (field.type === 'control_fullname') {
            initialData[field.qid] = { first: '', last: '' };
          } else if (field.type === 'control_checkbox' || field.type === 'control_fileupload') {
            initialData[field.qid] = []; // Initialize checkboxes and file uploads as empty arrays
          } else {
            initialData[field.qid] = ''; // Initialize other fields as empty strings
          }
        });
        setFormData(initialData);
        console.log(`[DEBUG] Form initialized with fields:`, schema);
      } catch (err) {
        setError('Failed to load form. Please try again.');
        console.error('[ERROR] Error loading form schema:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadFormSchema();
  }, [stylist, formType]);
  
  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    fields.forEach(field => {
      const value = formData[field.qid];
      
      if (field.required) {
        if (field.type === 'control_fullname') {
          if (!value.first.trim() || !value.last.trim()) {
            newErrors[field.qid] = 'This field is required';
          }
        } else if (!value || (Array.isArray(value) && value.length === 0)) {
          newErrors[field.qid] = 'This field is required';
        }
      }
      
      // Additional validation for specific field types
      if (field.type === 'control_email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.qid] = 'Please enter a valid email address';
        }
      }
      
      if (field.type === 'control_phone' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value)) {
          newErrors[field.qid] = 'Please enter a valid phone number';
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      console.log(`[DEBUG] Form validation failed`);
      return;
    }
    
    console.log(`[DEBUG] Form validation passed, submitting...`);
    
    try {
      setSubmitting(true);
      const config = getConfig();
      await submitToJotform({
        formId: config.formId,
        apiKey: '', // Not used in public submission endpoint
        fields,
        answers: formData
      });
      
      setSuccess(true);
      console.log(`[DEBUG] Form submission successful`);
    } catch (err) {
      setError('Failed to submit form. Please try again.');
      console.error('[ERROR] Error submitting form:', err);
    } finally {
      setSubmitting(false);
    }
  };
  
  // Handle field value changes
  const handleFieldChange = (qid: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [qid]: value
    }));
    
    // Clear error for this field when it's updated
    if (errors[qid]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[qid];
        return newErrors;
      });
    }
  };
  
  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8 bg-white rounded-lg shadow-md">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-400"></div>
        <span className="ml-3 text-rose-600">Loading form...</span>
      </div>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-red-800">Error</h3>
        <p className="mt-2 text-red-700">{error}</p>
        <button
          className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }
  
  // Render success state
  if (success) {
    return (
      <div className="p-6 bg-rose-50 rounded-lg shadow-md text-center">
        <h3 className="text-lg font-medium text-rose-800">Form Submitted Successfully!</h3>
        <p className="mt-2 text-rose-700">
          Thank you for your submission. We'll get back to you soon.
        </p>
        <button
          onClick={() => {
            // Close the fullscreen form and reset to selection
            // This will be handled by the parent component
            window.dispatchEvent(new CustomEvent('booking-success'));
          }}
          className="mt-4 inline-block px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
        >
          Close
        </button>
      </div>
    );
  }
  
  // Render form
  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {fields.map(field => (
        <FieldRenderer
          key={field.qid}
          field={field}
          value={formData[field.qid]}
          onChange={(value) => handleFieldChange(field.qid, value)}
          error={errors[field.qid]}
        />
      ))}
      
      {Object.keys(errors).length > 0 && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">
          Please fix the errors above before submitting.
        </div>
      )}
      
      <button
        type="submit"
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors duration-300"
        disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default BookingForm;