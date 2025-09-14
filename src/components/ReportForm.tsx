'use client';

import { useState } from 'react';
import {
  validateForm,
  getInputClasses,
} from '@/lib/validation';

import type { ReportFormRequestBody as RequestBody, ReportFormRequestBodyDocument as Attachment } from "@/lib/types";


/**
 * ==================================================
 *                TYPES                  
 * ==================================================
 */

interface FormErrors {
  [key: string]: string;
}

/**
 * ==================================================
 *                UTILITY FUNCTIONS                  
 * ==================================================
 */

/**
 * Get label classes based on whether it is supposed to be in its normal state or in its error state
 * @param hasError Is this label supposed to show an error state?
 * @returns The Tailwind className for the label
 */
const getLabelClasses = (hasError: boolean = false): string => {
  const baseClasses = 'block text-sm font-medium mb-2';
  const normalClasses = 'text-gray-700';
  const errorClasses = 'text-red-700';

  return `${baseClasses} ${hasError ? errorClasses : normalClasses}`;
};

/**
 * Convert an array of File objects to an array of objects with two keys: filename and the file's base-64 representation
 * @param files Array of File objects
 * @returns Promise that resolves to an array of objects with two keys: filename and the file's base-64 representation
 */
const filesToBase64 = async (files: File[]): Promise<Attachment[]> => {
  const readFileAsBase64 = (file: File): Promise<Attachment> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data URL prefix if you only want the base64 string
        const base64 = result.split(',')[1];
        resolve({
          filename: file.name,
          content: base64
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  return Promise.all(files.map(readFileAsBase64));
};


/**
 * ==================================================
 *                    COMPONENT                  
 * ==================================================
 */


export default function ReportForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    incidentType: '',
    incidentDate: '',
    description: '',
    documents: null as File[] | null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const steps = ['Personal Info', 'Incident Details', 'Documentation'];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      // Validate file size (max 10MB per file)
      const maxSize = 10 * 1024 * 1024; // 10MB
      const invalidFiles = files.filter(file => file.size > maxSize);

      if (invalidFiles.length > 0) {
        setErrors((prev) => ({
          ...prev,
          documents: `Files must be smaller than 10MB. Please remove: ${invalidFiles.map(f => f.name).join(', ')}`
        }));
        return;
      }

      // Validate file types
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const invalidTypes = files.filter(file => !allowedTypes.includes(file.type));

      if (invalidTypes.length > 0) {
        setErrors((prev) => ({
          ...prev,
          documents: `Invalid file types. Please use PDF, JPG, PNG, DOC, or DOCX files only.`
        }));
        return;
      }

      setFormData((prev) => ({ ...prev, documents: files }));
      if (errors.documents) {
        setErrors((prev) => ({ ...prev, documents: '' }));
      }
    }
  };

  const validateCurrentStep = (): boolean => {
    let fieldsToValidate: string[] = [];

    switch (currentStep) {
      case 0:
        fieldsToValidate = ['firstName', 'lastName', 'email', 'phone'];
        break;
      case 1:
        fieldsToValidate = ['incidentType', 'incidentDate', 'description'];
        break;
      case 2:
        // Documents are optional, no validation needed
        return true;
    }

    // Create a string-only version of formData for validation
    const stringFormData: Record<string, string> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      incidentType: formData.incidentType,
      incidentDate: formData.incidentDate,
      description: formData.description,
    };

    const validationErrors = validateForm(stringFormData, fieldsToValidate);

    if (validationErrors.length > 0) {
      const errorMap: FormErrors = {};
      validationErrors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      return false;
    }

    return true;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      const newStep = Math.min(currentStep + 1, steps.length - 1);
      setCurrentStep(newStep);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    // Only submit if we're on the final step
    if (currentStep !== steps.length - 1) {
      console.log('Not on final step, preventing submission');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      let requestBody: RequestBody = {
        ...formData,
        documents: null
      };
      if (formData.documents && formData.documents.length > 0) {
        const base64Docs = await filesToBase64(formData.documents);
        requestBody.documents = base64Docs;
      }

      const response = await fetch('/api/submit-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setSubmitMessage('Your report has been submitted successfully. We will contact you soon.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          incidentType: '',
          incidentDate: '',
          description: '',
          documents: null,
        });
        setErrors({});
        setCurrentStep(0);
      } else {
        setSubmitMessage('There was an error submitting your report. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('There was an error submitting your report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">File Your Cyber Crime Report</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Report cyber crimes securely and confidentially. Our expert team will guide you through
            the process and help you take necessary actions.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto pb-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center whitespace-nowrap">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold ${index <= currentStep ? 'bg-blue-700 text-white' : 'bg-gray-300 text-gray-600'
                    }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`ml-2 text-xs sm:text-sm ${index <= currentStep ? 'text-blue-700' : 'text-gray-500'}`}
                >
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-4 sm:w-8 h-0.5 mx-2 sm:mx-4 ${index < currentStep ? 'bg-blue-700' : 'bg-gray-300'}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 0 && (
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className={getLabelClasses(!!errors.firstName)}
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={getInputClasses(!!errors.firstName)}
                      placeholder="Enter your first name"
                      aria-describedby={errors.firstName ? "firstName-error" : undefined}
                    />
                    {errors.firstName && (
                      <p id="firstName-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className={getLabelClasses(!!errors.lastName)}
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={getInputClasses(!!errors.lastName)}
                      placeholder="Enter your last name"
                      aria-describedby={errors.lastName ? "lastName-error" : undefined}
                    />
                    {errors.lastName && (
                      <p id="lastName-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className={getLabelClasses(!!errors.email)}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={getInputClasses(!!errors.email)}
                      placeholder="your.email@example.com"
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className={getLabelClasses(!!errors.phone)}
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={getInputClasses(!!errors.phone)}
                      placeholder="+91 XXXXX XXXXX"
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Incident Details */}
            {currentStep === 1 && (
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Incident Details</h3>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label
                      htmlFor="incidentType"
                      className={getLabelClasses(!!errors.incidentType)}
                    >
                      Type of Incident *
                    </label>
                    <select
                      id="incidentType"
                      name="incidentType"
                      required
                      value={formData.incidentType}
                      onChange={handleInputChange}
                      className={getInputClasses(!!errors.incidentType)}
                      aria-describedby={errors.incidentType ? "incidentType-error" : undefined}
                    >
                      <option value="">Select incident type</option>
                      <option value="online-fraud">Online Fraud</option>
                      <option value="banking-fraud">Banking Fraud</option>
                      <option value="identity-theft">Identity Theft</option>
                      <option value="phishing">Phishing</option>
                      <option value="ransomware">Ransomware</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.incidentType && (
                      <p id="incidentType-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.incidentType}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="incidentDate"
                      className={getLabelClasses(!!errors.incidentDate)}
                    >
                      Date of Incident *
                    </label>
                    <input
                      type="date"
                      id="incidentDate"
                      name="incidentDate"
                      required
                      value={formData.incidentDate}
                      onChange={handleInputChange}
                      className={getInputClasses(!!errors.incidentDate)}
                      aria-describedby={errors.incidentDate ? "incidentDate-error" : undefined}
                    />
                    {errors.incidentDate && (
                      <p id="incidentDate-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.incidentDate}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className={getLabelClasses(!!errors.description)}
                    >
                      Detailed Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={6}
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Please provide a detailed description of the incident, including what happened, when it occurred, and any relevant details..."
                      className={getInputClasses(!!errors.description)}
                      aria-describedby={errors.description ? "description-error" : undefined}
                    />
                    {errors.description && (
                      <p id="description-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.description}
                      </p>
                    )}
                    <p className="mt-1 text-xs sm:text-sm text-gray-500">
                      {formData.description.length}/2000 characters
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Documentation */}
            {currentStep === 2 && (
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Documentation</h3>
                <div>
                  <label
                    htmlFor="documents"
                    className={getLabelClasses(!!errors.documents)}
                  >
                    Upload Supporting Documents
                  </label>
                  <input
                    type="file"
                    id="documents"
                    name="documents"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileChange}
                    className={getInputClasses(!!errors.documents)}
                    aria-describedby={errors.documents ? "documents-error" : "documents-help"}
                  />
                  {errors.documents && (
                    <p id="documents-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.documents}
                    </p>
                  )}
                  <p id="documents-help" className="text-xs sm:text-sm text-gray-500 mt-2">
                    Upload any relevant documents such as screenshots, emails, transaction records,
                    etc. (PDF, JPG, PNG, DOC, DOCX - Max 10MB per file)
                  </p>
                  {formData.documents && formData.documents.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Selected files:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {formData.documents.map((file, index) => (
                          <li key={index} className="flex items-center">
                            <span className="truncate">
                              {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 sm:mt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base transition-colors ${currentStep === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                  }`}
              >
                Previous
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 text-sm sm:text-base transition-colors"
                >
                  Continue to {steps[currentStep + 1]}
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleSubmit()}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-700 text-white rounded-md hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 text-sm sm:text-base transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Report'
                  )}
                </button>
              )}
            </div>

            {/* Submit Message */}
            {submitMessage && (
              <div
                className={`mt-4 p-3 sm:p-4 rounded-md text-center text-sm sm:text-base ${submitMessage.includes('successfully')
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-red-100 text-red-700 border border-red-200'
                  }`}
                role="alert"
              >
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
