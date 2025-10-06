"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { MainFooter } from "./MainFooter";
import { isCompanySection } from "@/config/domain-config";

export function ConditionalFooter() {
  const pathname = usePathname();
  
  // Don't show MainFooter on OneMoney pages (they have their own SimpleFooter in layout)
  // Use centralized domain configuration logic
  const isOneMoneyPage = isCompanySection('onemoney', pathname);
  
  if (isOneMoneyPage) {
    return null;
  }
  
  return <MainFooter />;
} 