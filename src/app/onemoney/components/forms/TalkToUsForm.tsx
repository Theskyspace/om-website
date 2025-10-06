"use client";
import React, { useState, FormEvent, useEffect, useRef } from "react";
import { Label } from "./../ui/label"; // Aceternity Label
import { Input } from "./../ui/input"; // Aceternity Input
import { Textarea } from "./../ui/textarea"; // Shadcn Textarea
import { Button } from "./../ui/button"; // Shadcn Button
import { GlowingButton } from "../ui/glowing-button";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
// @ts-ignore
import emailjs from 'emailjs-com';
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { getFormPurposeOptions } from "@/config/domain-config";

export function TalkToUsForm({ source }: { source?: string }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    purpose: "",
    comments: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [textareaVisible, setTextareaVisible] = useState(false);
  const [purposeDropdownOpen, setPurposeDropdownOpen] = useState(false);
  const [host, setHost] = useState<string>('');
  const purposeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      setHost(window.location.host);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (purposeDropdownRef.current && !purposeDropdownRef.current.contains(event.target as Node)) {
        setPurposeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePurposeSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, purpose: value }));
    setPurposeDropdownOpen(false);
  };

  // Get purpose options from centralized config
  const getPurposeOptions = () => {
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
    return getFormPurposeOptions(pathname, host);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const SERVICE_ID = 'service_ejm3gum';
    const TEMPLATE_ID = 'template_03xanma';
    const USER_ID = 'SIm8_MGgfQgEGjXhu'; // <-- Replace with your EmailJS public key

    // Determine the source site
    const siteName = source || (typeof window !== 'undefined' ? window.location.pathname.split('/')[1] || 'unknown' : 'unknown');
    const siteUrl = typeof window !== 'undefined' ? window.location.href : 'unknown';

    emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        purpose: formData.purpose,
        comments: formData.comments,
        source_site: siteName,
        source_url: siteUrl,
      },
      USER_ID
    )
      .then((result: any) => {
        setSubmitted(true);
        setLoading(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          purpose: "",
          comments: "",
        });
      }, (error: any) => {
        setLoading(false);
        alert("There was an error sending your message. Please try again.");
        console.error(error.text);
      });
  };

  // Motion values for textarea hover effect
  const textareaMouseX = useMotionValue(0);
  const textareaMouseY = useMotionValue(0);

  // Create motion template unconditionally
  const motionTemplate = useMotionTemplate`
    radial-gradient(
      ${textareaVisible ? "100px" : "0px"} circle at ${textareaMouseX}px ${textareaMouseY}px,
      var(--blue-500),
      transparent 80%
    )
  `;

  const handleTextareaMouseMove = ({ currentTarget, clientX, clientY }: any) => {
    if (!isMounted) return;
    let { left, top } = currentTarget.getBoundingClientRect();
    textareaMouseX.set(clientX - left);
    textareaMouseY.set(clientY - top);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First name <span className="text-red-500">*</span>
          </Label>
          <Input id="firstName" placeholder="Rakhesh" type="text" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" placeholder="Sharma" type="text" value={formData.lastName} onChange={handleChange} />
        </div>
      </div>
      <div className="mb-6">
        <Label htmlFor="email">
          Work Email <span className="text-red-500">*</span>
        </Label>
        <Input id="email" placeholder="rakhesh@work.in" type="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" placeholder="+91 90100 98899" type="tel" value={formData.phone} onChange={handleChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="purpose">
          Purpose <span className="text-red-500">*</span>
        </Label>
        <div className="relative" ref={purposeDropdownRef}>
          <button
            type="button"
            onClick={() => setPurposeDropdownOpen(!purposeDropdownOpen)}
            className="flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400 items-center justify-between"
          >
            <span className={formData.purpose ? "text-black dark:text-white" : "text-neutral-400 dark:text-neutral-600 placeholder:text-neutral-400 dark:placeholder-text-neutral-600"}>
              {formData.purpose || "Select a purpose"}
            </span>
            <svg
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                purposeDropdownOpen ? "rotate-180" : ""
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {purposeDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-neutral-700 rounded-md shadow-lg">
              {getPurposeOptions().map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handlePurposeSelect(option.value)}
                  className="w-full px-3 py-2 text-left text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700 first:rounded-t-md last:rounded-b-md transition-colors"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="comments">
          Additional Comments <span className="text-red-500">*</span>
        </Label>
        <motion.div
          style={isMounted ? {
            background: motionTemplate,
          } : {}}
          onMouseMove={isMounted ? handleTextareaMouseMove : undefined}
          onMouseEnter={isMounted ? () => setTextareaVisible(true) : undefined}
          onMouseLeave={isMounted ? () => setTextareaVisible(false) : undefined}
          className="group/input rounded-lg p-[2px] transition duration-300 shadow-input bg-gray-50 dark:bg-zinc-800 border border-transparent dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]"
        >
          <Textarea
            id="comments"
            placeholder="Let us know how we can help you..."
            value={formData.comments}
            onChange={handleChange}
            required
            className="min-h-[100px] flex w-full border-none bg-gray-50 text-black dark:text-white rounded-md px-3 py-2 text-sm placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 shadow-none group-hover/input:shadow-none transition duration-400"
          />
        </motion.div>
      </div>
      {/* Submit Button */}
      {!submitted ? (
        !loading ? (
          <ShimmerButton type="submit" className="w-full h-14 text-lg uppercase">
            Submit Request
          </ShimmerButton>
        ) : (
          <button
            type="button"
            className="w-full h-12 flex items-center justify-center bg-gray-200 text-gray-700 rounded-md font-semibold text-lg transition cursor-not-allowed"
            disabled
          >
            <svg className="animate-spin h-6 w-6 mr-2 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            Sending...
          </button>
        )
      ) : (
        <button
          type="button"
          className="w-full h-12 flex items-center justify-center bg-green-500/10 text-green-900 rounded-md font-semibold text-lg transition"
          disabled
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="darkgreen" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Details Submitted Successfully!
        </button>
      )}
    </form>
  );
}

// Helper component for bottom gradient (optional, can be added later)
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};