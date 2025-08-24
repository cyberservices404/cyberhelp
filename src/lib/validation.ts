// Form validation utilities

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
}

interface ValidationError {
  field: string;
  message: string;
}

export const validationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
  },
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 25,
    pattern: /^[a-zA-Z]+$/,
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 25,
    pattern: /^[a-zA-Z]+$/,
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    required: true,
    pattern: /^\d{10}$/,
  },
  subject: {
    required: true,
  },
  incidentType: {
    required: true,
  },
  incidentDate: {
    required: true,
    custom: (value: string) => {
      const date = new Date(value);
      const today = new Date();
      return date <= today;
    },
  },
  description: {
    required: true,
    minLength: 10,
    maxLength: 2000,
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000,
  },
};

export const validateField = (
  fieldName: string,
  value: string,
  rules: ValidationRule
): string | null => {
  // Required field validation
  if (rules.required && (!value || value.trim() === '')) {
    return `${getFieldDisplayName(fieldName)} is required`;
  }

  // Skip other validations if field is empty and not required
  if (!value || value.trim() === '') {
    return null;
  }

  // Min length validation
  if (rules.minLength && value.length < rules.minLength) {
    return `${getFieldDisplayName(fieldName)} must be at least ${rules.minLength} characters`;
  }

  // Max length validation
  if (rules.maxLength && value.length > rules.maxLength) {
    return `${getFieldDisplayName(fieldName)} must not exceed ${rules.maxLength} characters`;
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(value)) {
    return getPatternErrorMessage(fieldName);
  }

  // Custom validation
  if (rules.custom && !rules.custom(value)) {
    return getCustomErrorMessage(fieldName);
  }

  return null;
};

export const validateForm = (
  formData: Record<string, string>,
  fieldsToValidate: string[]
): ValidationError[] => {
  const errors: ValidationError[] = [];

  fieldsToValidate.forEach((fieldName) => {
    const rules = validationRules[fieldName as keyof typeof validationRules];
    if (rules) {
      const error = validateField(fieldName, formData[fieldName] || '', rules);
      if (error) {
        errors.push({ field: fieldName, message: error });
      }
    }
  });

  return errors;
};

const getFieldDisplayName = (fieldName: string): string => {
  const displayNames: Record<string, string> = {
    name: 'Name',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email Address',
    phone: 'Phone Number',
    subject: 'Subject',
    incidentType: 'Incident Type',
    incidentDate: 'Incident Date',
    description: 'Description',
    message: 'Message',
  };
  return displayNames[fieldName] || fieldName;
};

const getPatternErrorMessage = (fieldName: string): string => {
  const messages: Record<string, string> = {
    name: 'Name should only contain letters and spaces',
    firstName: 'First name should only contain letters',
    lastName: 'Last name should only contain letters',
    email: 'Please enter a valid email address',
    phone: 'Please enter a valid 10-digit phone number',
    indianPhone: 'Please enter a valid Indian phone number (e.g., +91 98765 43210)',
  };
  return messages[fieldName] || 'Invalid format';
};

const getCustomErrorMessage = (fieldName: string): string => {
  const messages: Record<string, string> = {
    incidentDate: 'Incident date cannot be in the future',
  };
  return messages[fieldName] || 'Invalid value';
};

// Utility function to get input field CSS classes
export const getInputClasses = (hasError: boolean = false): string => {
  const baseClasses = 'w-full px-4 py-4 sm:py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base';
  const normalClasses = 'border-gray-300 focus:ring-blue-700 focus:border-blue-700';
  const errorClasses = 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50';
  
  return `${baseClasses} ${hasError ? errorClasses : normalClasses}`;
};