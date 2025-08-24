export interface SiteConfig {
  site: {
    title: string;
    tagline: string;
    description: string;
  };
  contact: {
    phone: string;
    email: string;
    notification_email: string;
  };
  stats: {
    success_rate: string;
    cases_handled: string;
    support_availability: string;
    legal_experts: string;
  };
  services: Array<{
    title: string;
    description: string;
    link: string;
  }>;
  detailed_services: Array<{
    id: string;
    title: string;
    subtitle: string;
    features: string[];
    how_it_works: Array<{
      step: number;
      title: string;
      description: string;
    }>;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  about: {
    mission: {
      title: string;
      description: string;
      vision: string;
      goal: string;
    };
    values: Array<{
      title: string;
      description: string;
    }>;
    team: Array<{
      name: string;
      role: string;
      avatar: string;
      bio: string;
    }>;
    partnerships: Array<{
      title: string;
      description: string;
    }>;
    client_testimonials: Array<{
      name: string;
      role: string;
      avatar: string;
      quote: string;
    }>;
  };
  how_we_help: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  testimonials: Array<{
    name: string;
    role: string;
    avatar: string;
    quote: string;
  }>;
  resources: Array<{
    title: string;
    description: string;
    link: string;
  }>;
  resources_page: {
    hero: {
      title: string;
      subtitle: string;
    };
    educational_materials: {
      title: string;
      subtitle: string;
      resources: Array<{
        title: string;
        description: string;
        link: string;
      }>;
    };
    cyber_threats: {
      title: string;
      subtitle: string;
      alerts: Array<{
        title: string;
        date: string;
        description: string;
        type: string;
        link: string;
      }>;
    };
    reporting_channels: {
      title: string;
      subtitle: string;
      channels: Array<{
        title: string;
        description: string;
        url: string;
      }>;
    };
    security_tips: {
      title: string;
      subtitle: string;
      categories: Array<{
        title: string;
        tips: string[];
      }>;
    };
    cta: {
      title: string;
      subtitle: string;
      buttons: Array<{
        text: string;
        link: string;
        variant: string;
      }>;
    };
  };
  navigation: Array<{
    name: string;
    href: string;
  }>;
  footer: {
    quick_links: Array<{
      name: string;
      href: string;
    }>;
    service_links: Array<{
      name: string;
      href: string;
    }>;
    legal_links: Array<{
      name: string;
      href: string;
    }>;
  };
}

/**
 * ===============================================
 *                  REPORT FORM
 * ===============================================
 */

export interface ReportFormFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  incidentType: string;
  incidentDate: string;
  description: string;
  documents: File[] | null;
}

export interface ReportFormRequestBodyDocument {
  filename: string,
  content: string,
}

export interface ReportFormRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  incidentType: string;
  incidentDate: string;
  description: string;
  documents: ReportFormRequestBodyDocument[] | null;
}
