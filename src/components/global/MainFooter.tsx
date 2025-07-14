"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface FooterSection {
  title: string;
  links: Array<{
    title: string;
    href: string;
  }>;
}

// Footer data mirroring the header dropdown structure
const footerSections: FooterSection[] = [
  {
    title: "ABOUT US",
    links: [
      { title: "Team", href: "/common/team" },
      { title: "Vision & Mission", href: "/common/vision-mission" },
      { title: "Leadership", href: "/onemoney/leadership" },
      { title: "Values", href: "/equal/values" }
    ]
  },
  {
    title: "PRODUCTS",
    links: [
      { title: "OneMoney AA", href: "/onemoney" },
      { title: "FinPro FIU TSP", href: "/moneyone/products/finpro" },
      { title: "FinShare FIP TSP", href: "/finshare" },
      { title: "OneApp", href: "/oneapp" },
      { title: "Enterprise Hiring", href: "/equal/solutions/enterprise-hiring" },
      { title: "Gig Hiring", href: "/equal/solutions/gig-hiring" },
      { title: "Financial Services", href: "/equal/solutions/financial-services" },
      { title: "Staffing & Contract", href: "/equal/solutions/staffing" }
    ]
  },
  {
    title: "SOLUTIONS",
    links: [
      { title: "Financial Services", href: "/equal/solutions/financial-services" },
      { title: "HRMS BGV Integration", href: "/equal/solutions/enterprise-hiring" },
      { title: "Multi-Platform Verification", href: "/equal/products/identity-gateway" },
      { title: "Custom Workflow for Businesses", href: "/equal/industries/" }
    ]
  },
  {
    title: "RESOURCES",
    links: [
      { title: "Case Studies", href: "/news/latest-press-releases" },
      { title: "Media Coverage", href: "/news/media-coverage" },
      { title: "Blog", href: "/blog" },
      { title: "In The News", href: "/blog/in-the-news" },
      { title: "Terms and Conditions", href: "/newsletter/subscribe" },
      { title: "Privacy Policy", href: "/newsletter/archive" }
    ]
  }
];

export function MainFooter() {
  const pathname = usePathname();

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
                className="h-8 md:h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                priority
                />
            </Link>
            </div>
            <h1 className="text-sm ml-1 font-light text-left mb-8 text-slate-500">made with 💚 in Hyderabad, India</h1>

        {/* Links Grid - Desktop: horizontal, Mobile: 2 columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold text-[#00b140] tracking-widest uppercase">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-sm transition-colors duration-200 ${
                        pathname === link.href
                          ? "text-[#00b140] font-medium"
                          : "text-gray-600 hover:text-[#00b140]"
                      }`}
                    >
                      {link.title}
                    </Link>
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
              © {new Date().getFullYear()} Equal. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link 
                href="/privacy" 
                className="text-sm text-gray-600 hover:text-[#00b140] transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-gray-600 hover:text-[#00b140] transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 