/**
 * Centralized domain configuration for all company sections
 * This file manages all domain-based conditional logic and settings
 */

export type CompanySection = 'equal' | 'moneyone' | 'onemoney' | 'default';

export interface DomainConfig {
  domains: string[];
  pathPrefixes: string[];
  cloudfront?: string[];
}

export interface FormPurposeOption {
  value: string;
  label: string;
}

export interface CompanySectionConfig {
  name: CompanySection;
  domains: DomainConfig;
  formPurposeOptions: FormPurposeOption[];
  metadata?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

// Domain configurations for each company section
export const DOMAIN_CONFIGS: Record<CompanySection, CompanySectionConfig> = {
  equal: {
    name: 'equal',
    domains: {
      domains: ['equal.in'],
      pathPrefixes: ['/employment', '/solutions', '/equal'],
    },
    formPurposeOptions: [
      { value: "Employment", label: "Employment" },
      { value: "BFSI", label: "BFSI" },
      { value: "AI Assistant", label: "AI Assistant" },
      { value: "General", label: "General" }
    ],
    metadata: {
      title: "Equal - Employment & Solutions",
      description: "Equal provides comprehensive employment and business solutions",
    }
  },

  moneyone: {
    name: 'moneyone',
    domains: {
      domains: ['moneyone.in'],
      pathPrefixes: ['/moneyone'],
    },
    formPurposeOptions: [
      { value: "General", label: "General" },
      { value: "Business Enquiry", label: "Business Enquiry" },
      { value: "Customer Query", label: "Customer Query" }
    ],
    metadata: {
      title: "MoneyOne - Financial Services",
      description: "MoneyOne provides innovative financial services and solutions",
    }
  },

  onemoney: {
    name: 'onemoney',
    domains: {
      domains: ['onemoney.in', 'd2bd7hfw4pwyvv.cloudfront.net'],
      pathPrefixes: ['/onemoney'],
      cloudfront: ['d2bd7hfw4pwyvv.cloudfront.net'],
    },
    formPurposeOptions: [
      { value: "General", label: "General" },
      { value: "Business Enquiry", label: "Business Enquiry" },
      { value: "Customer Query", label: "Customer Query" }
    ],
    metadata: {
      title: "OneMoney - India's First RBI-Licensed Account Aggregator",
      description: "Powering India's consent-driven financial ecosystem",
    }
  },

  default: {
    name: 'default',
    domains: {
      domains: [],
      pathPrefixes: [],
    },
    formPurposeOptions: [
      { value: "General", label: "General" }
    ],
    metadata: {
      title: "Welcome",
      description: "Welcome to our platform",
    }
  }
};

/**
 * Determines the current company section based on pathname and host
 * @param pathname - The current URL pathname
 * @param host - The current host (optional, will use window.location.host if not provided)
 * @returns The detected company section
 */
export function getCompanySection(pathname: string, host?: string): CompanySection {
  const currentHost = host || (typeof window !== 'undefined' ? window.location.host : '');

  // Check each company section's configuration
  for (const [section, config] of Object.entries(DOMAIN_CONFIGS)) {
    if (section === 'default') continue; // Skip default section

    // Check if pathname matches
    const pathMatches = config.domains.pathPrefixes.some(prefix =>
      pathname.startsWith(prefix)
    );

    // Check if domain matches
    const domainMatches = config.domains.domains.some(domain =>
      currentHost.includes(domain)
    );

    // Check cloudfront domains if present
    const cloudfrontMatches = config.domains.cloudfront?.some(cloudfront =>
      currentHost.includes(cloudfront)
    ) || false;

    if (pathMatches || domainMatches || cloudfrontMatches) {
      return section as CompanySection;
    }
  }

  return 'default';
}

/**
 * Get form purpose options for the current company section
 * @param pathname - The current URL pathname
 * @param host - The current host (optional)
 * @returns Array of purpose options for forms
 */
export function getFormPurposeOptions(pathname: string, host?: string): FormPurposeOption[] {
  const section = getCompanySection(pathname, host);
  return DOMAIN_CONFIGS[section].formPurposeOptions;
}

/**
 * Check if the current page is for a specific company section
 * @param section - The company section to check
 * @param pathname - The current URL pathname
 * @param host - The current host (optional)
 * @returns Boolean indicating if current page belongs to the specified section
 */
export function isCompanySection(
  section: CompanySection,
  pathname: string,
  host?: string
): boolean {
  return getCompanySection(pathname, host) === section;
}

/**
 * Get metadata for the current company section
 * @param pathname - The current URL pathname
 * @param host - The current host (optional)
 * @returns Metadata object for the current section
 */
export function getSectionMetadata(pathname: string, host?: string) {
  const section = getCompanySection(pathname, host);
  return DOMAIN_CONFIGS[section].metadata;
}

/**
 * Transform href based on domain configuration
 * Handles URL transformations for domain-specific routing
 * @param href - The original href
 * @returns The transformed href
 */
export function transformHref(href: string): string {
  if (typeof window === 'undefined') return href;

  const host = window.location.host;

  // Check for moneyone.in domain
  const isMoneyOneDomain = DOMAIN_CONFIGS.moneyone.domains.domains.some(domain =>
    host.includes(domain)
  );
  if (isMoneyOneDomain && href.startsWith('/moneyone/')) {
    const pathWithoutDomain = href.replace('/moneyone/', '');
    return `/${pathWithoutDomain}`;
  }

  // Check for onemoney.in domain
  const isOneMoneyDomain = DOMAIN_CONFIGS.onemoney.domains.domains.some(domain =>
    host.includes(domain)
  ) || DOMAIN_CONFIGS.onemoney.domains.cloudfront?.some(cloudfront =>
    host.includes(cloudfront)
  );
  if (isOneMoneyDomain && href.startsWith('/onemoney/')) {
    const pathWithoutDomain = href.replace('/onemoney/', '');
    return `/${pathWithoutDomain}`;
  }

  return href;
}