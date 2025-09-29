'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { getDomainSpecificHref } from '@/lib/utils'

interface SolutionItem {
  id: string
  title: string
  description: string
  image: {
    src: string
    alt: string
    width: number
    height: number
  }
  href: string
}

interface SolutionSection {
  title: string
  description: string
  items: SolutionItem[]
}

// Original solution sections for non-MoneyOne pages
const originalSolutionSections: SolutionSection[] = [
  {
    title: "USE CASES",
    description: "Specialised solutions tailored for specific industry verticals and their unique requirements",
    items: [
      {
        id: "bfsi-services",
        title: "BFSI Services",
        description: "Digital transformation for banks and NBFCs",
        image: {
          src: "/Hosted Page.png",
          alt: "Financial Services",
          width: 56,
          height: 56
        },
        href: "/#bfsi-section"
      },
      {
        id: "Employee Verification",
        title: "Employee Verification",
        description: "Verify candidates across multiple platforms",
        image: {
          src: "/HR OPS.png",
          alt: "Employement Verification",
          width: 56,
          height: 56
        },
        href: "/#employment-verification"
      },
      {
        id: "identity",
        title: "Identity Verification",
        description: "Verify candidates across multiple platforms",
        image: {
          src: "/Candidate Communication.png",
          alt: "Identity Verification",
          width: 56,
          height: 56
        },
        href: "/employment/products/identity-gateway"
      },
      {
        id: "technology-provider",
        title: "BFSI TSPs",
        description: "Explore our BFSI technology service providers",
        image: {
          src: "/Financial Analytics.png",
          alt: "Financial Analytics",
          width: 56,
          height: 56
        },
        href: "/moneyone"

      },
    ]
  }
]

// MoneyOne specific solution sections based on Solutions.tsx
const moneyOneSolutionSections: SolutionSection[] = [
  {
    title: "USECASES",
    description: "Comprehensive solutions tailored for wealth management, lending, advisory, and brokerage operations",
    items: [
      {
        id: "wealth-management",
        title: "Wealth Management",
        description: "Portfolio management and investment insights for MFDs, brokerages and AMCs",
        image: {
          src: "/Smart Document parsing.png",
          alt: "Wealth Management",
          width: 56,
          height: 56
        },
        href: "https://moneyone.in/solutions/wealth-management"
      },
      {
        id: "lending",
        title: "Lending",
        description: "Optimize lending processes from application to collection with data-driven insights",
        image: {
          src: "/Field-level Config.png",
          alt: "Lending",
          width: 56,
          height: 56
        },
        href: "https://moneyone.in/solutions/lending"
      },
      {
        id: "advisory",
        title: "Advisory",
        description: "Data-driven financial advisory with consolidated data and advanced analytics",
        image: {
          src: "/Staffing & Contract Roles.png",
          alt: "Advisory",
          width: 56,
          height: 56
        },
        href: "https://moneyone.in/solutions/advisory"
      },
      {
        id: "brokerage",
        title: "Brokerage",
        description: "Enhanced brokerage operations with streamlined trade lifecycle and compliance",
        image: {
          src: "/Collect Now, Verify Later.png",
          alt: "Brokerage",
          width: 56,
          height: 56
        },
        href: "https://moneyone.in/solutions/brokerage"
      },
    ]
  }
]

const SolutionItem: React.FC<{ item: SolutionItem; index: number }> = ({ item, index }) => {
  // Check if this is the Financial Services item that should open in new tab
  const shouldOpenInNewTab = item.id === "technology-provider" && item.href === "/moneyone";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }}
    >
      <Link
        href={getDomainSpecificHref(item.href)}
        target={shouldOpenInNewTab ? "_blank" : undefined}
        rel={shouldOpenInNewTab ? "noopener noreferrer" : undefined}
        role="menuitem"
        className="flex items-start gap-4 p-3 rounded-lg border-b-3 border-transparent hover:border-[#00b140] hover:bg-[#00b140]/10 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-[#00b140] focus:ring-offset-2"
      >
        <div className="flex-shrink-0 relative">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            loading="eager"
            priority={index < 2}
            className="transition-all duration-300 filter grayscale group-hover:grayscale-0 rounded will-change-[filter] group-hover:scale-110"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-neutral-900 group-hover:text-[#00b140] transition-colors duration-200">
              {item.title}
            </h3>
            <div className={`${item.id === "bfsi-services" || item.id === "technology-provider"
              ? "opacity-0 rotate-0 group-hover:opacity-100 group-hover:-rotate-45"
              : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              } transition-all duration-200 ease-out`}>
              <ArrowRight className="w-4 h-4 text-[#00b140]" />
            </div>
          </div>
          <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

const SolutionSection: React.FC<{ section: SolutionSection; sectionIndex: number }> = ({
  section,
  sectionIndex
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: sectionIndex * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }}
      className="space-y-4 p-3 bg-white border border-slate-200/50 rounded-lg"
    >
      <div className="mb-4">
        <h2 className="text-md font-semibold tracking-widest text-slate-800 uppercase">
          {section.title}
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          {section.description}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {section.items.map((item, index) => (
          <SolutionItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </motion.div>
  )
}

export const SolutionsDropdownContent: React.FC = () => {
  const pathname = usePathname()
  const host = typeof window !== 'undefined' ? window.location.host : ''
  const isMoneyOnePage = pathname.startsWith('/moneyone') || host.includes("moneyone.in")

  // Use MoneyOne specific sections when on MoneyOne pages, otherwise use original
  const solutionSections = isMoneyOnePage ? moneyOneSolutionSections : originalSolutionSections

  return (
    <div className="space-y-2 min-w-[300px] md:min-w-[600px]">
      {solutionSections.map((section, index) => (
        <SolutionSection
          key={section.title}
          section={section}
          sectionIndex={index}
        />
      ))}
    </div>
  )
} 