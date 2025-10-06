"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getCompanySection, transformHref, type CompanySection } from "@/config/domain-config";

interface FooterSection {
  title: string;
  links: Array<{
    title: string;
    href: string;
    isSubheading?: boolean;
    openInNewTab?: boolean;
  }>;
}

// Dynamic footer sections based on company section
const getFooterSections = (section: CompanySection): FooterSection[] => [
  {
    title: "ABOUT US",
    links: [
      { title: "Vision", href: "/common/vision-mission" },
      { title: "Team & Leadership", href: "/common/team" },
      { title: "Board", href: "/common/leadership" },
      { title: "Values", href: "/common/values" }
    ]
  },
  {
    title: "PRODUCTS",
    links: section === 'moneyone' ? [
      // BFSI Section only for MoneyOne - no new tab for internal links
      { title: "BFSI", href: "#", isSubheading: true },
      { title: "OneMoney AA", href: "/onemoney" },
      { title: "FinPro FIU TSP", href: "/moneyone/products/finpro" },
      { title: "FinShare FIP TSP", href: "/moneyone/products/finshare" },
      { title: "Financial Analytics", href: "/moneyone/financial-services#moneyone-section" }
    ] : [
      // BFSI Section - open in new tab when viewing from Equal/OneMoney pages
      { title: "BFSI", href: "#", isSubheading: true },
      { title: "OneMoney AA", href: "/onemoney" },
      { title: "FinPro FIU TSP", href: "/moneyone/products/finpro", openInNewTab: true },
      { title: "FinShare FIP TSP", href: "/moneyone/products/finshare", openInNewTab: true },
      { title: "Financial Analytics", href: "/moneyone/financial-services#moneyone-section", openInNewTab: true },
      // Employment Section
      { title: "Employment", href: "#", isSubheading: true },
      { title: "Enterprise Verification", href: "/employment/products/enterprise-hiring" },
      { title: "Gig Verification", href: "/employment/products/gig-hiring" },
      { title: "Custom Workflows", href: "/employment/Industries" },
      // Consumer Section
      { title: "Consumer", href: "#", isSubheading: true },
      { title: "Equal AI", href: "/employment" }
    ]
  },
  {
    title: "USE CASES",
    links: section === 'moneyone' ? [
      // MoneyOne specific solutions
      { title: "Wealth Management", href: "/moneyone/financial-services#wealth-management" },
      { title: "Lending", href: "/moneyone/financial-services#lending" },
      { title: "Advisory", href: "/moneyone/financial-services#advisory" },
      { title: "Brokerage", href: "/moneyone/financial-services#brokerage" }
    ] : [
      // Original solutions for other sections - matching solutions-dropdown-content.tsx
      { title: "BFSI Services", href: "/#bfsi-section" },
      { title: "Employee Verification", href: "/#employment-verification" },
      { title: "Identity Verification", href: "/employment/products/identity-gateway" },
      { title: "Financial TSPs", href: "/moneyone", openInNewTab: true }
    ]
  },
  {
    title: "RESOURCES",
    links: [
      { title: "Our Newsletter", href: "https://equalidentity.substack.com/" },
      { title: "Trust & Security", href: "/employment/trust-security" },
      { title: "Terms and Conditions", href: "/common/terms-conditions" },
      { title: "Privacy Policy", href: "/common/policies" }
    ]
  }
];

export function MainFooter() {
  const pathname = usePathname();
  
  // Get dynamic footer sections based on current section
  const currentSection = getCompanySection(pathname);
  const footerSections = getFooterSections(currentSection);

  return (
    <footer className="bg-linear-b from-white to-[#00b140]/10 border-t-2 border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
            <div className="mb-4 flexjustify-start">
            <Link href="/" className="flex items-center">
                <Image
                src="/equal-logo.svg"
                alt="Equal Logo"
                width={71}
                height={21}
                className="h-8 md:h-12 w-auto hover:scale-105 transition-all duration-300"
                priority
                />
            </Link>
            </div>
            <h1 className="text-sm ml-1 font-light text-left mb-8 text-slate-500">Made with 💚 in Hyderabad, India</h1>

        {/* Links Grid - Desktop: horizontal, Mobile: 2 columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold text-[#00b140] tracking-widest uppercase">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={`${section.title}-${link.title}-${index}`}>
                    {link.isSubheading ? (
                      <div className="text-xs font-semibold text-[#00b140] tracking-widest uppercase mt-4 mb-2">
                        {link.title}
                      </div>
                    ) : (
                      <Link
                        href={transformHref(link.href)}
                        className={`text-sm transition-colors duration-200 ${
                          pathname === link.href
                            ? "text-[#00b140] font-medium"
                            : "text-gray-600 hover:text-[#00b140]"
                        }`}
                        target={link.openInNewTab ? "_blank" : undefined}
                        rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                      >
                        {link.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} {currentSection === 'moneyone' ? 'Fintech Products and Solutions (India) Private Limited' : 'Equal Identity Private Limited'}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 