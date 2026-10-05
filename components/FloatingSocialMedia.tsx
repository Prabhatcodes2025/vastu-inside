"use client";

import { useState, useEffect, useRef } from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { usePathname } from "next/navigation";

export default function FloatingSocialMedia() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-collapse after 10 seconds
  useEffect(() => {
    if (isExpanded) {
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set new timer to auto-collapse after 10 seconds
      timerRef.current = setTimeout(() => {
        setIsExpanded(false);
      }, 10000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isExpanded]);

  // Click outside to collapse
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    }

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  // Reset timer on any interaction
  const handleInteraction = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 10000);
  };

  if (pathname === "/") return null;

  return (
    <div className="fixed bottom-8 right-8 z-40 hidden sm:block" ref={containerRef}>
      <div 
        className={`flex flex-row-reverse items-center bg-white/90 backdrop-blur-sm rounded-full shadow-2xl border-2 border-primary-500 transition-all duration-500 ease-in-out ${
          isExpanded ? "gap-2 p-2" : "gap-0 p-1"
        }`}
        onMouseEnter={handleInteraction}
        onMouseMove={handleInteraction}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group relative w-12 h-12 flex-shrink-0 rounded-full bg-primary-500 hover:bg-primary-600 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
          aria-label={isExpanded ? "Collapse social media" : "Expand social media"}
        >
          <HiUserGroup className={`w-6 h-6 transition-all duration-500 ${isExpanded ? 'scale-110 rotate-12' : 'rotate-0'}`} />
        </button>
        
        <div
          className={`flex flex-row-reverse items-center gap-2 overflow-visible transition-[width,opacity] duration-500 ease-in-out ${
            isExpanded ? "w-[320px] opacity-100" : "w-0 opacity-0 pointer-events-none"
          }`}
        >
          <a 
            href="https://wa.me/917858992627" 
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative w-10 h-10 flex-shrink-0 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl ${
              isExpanded ? 'scale-100 translate-x-0' : 'scale-0 translate-x-4'
            }`}
            style={{ transitionDelay: '100ms' }}
            aria-label="WhatsApp"
            onClick={handleInteraction}
          >
            <FaWhatsapp className="w-4 h-4" />
            <span className="absolute bottom-full mb-2 px-3 py-1 bg-green-500 text-white text-sm font-medium rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50">
              WhatsApp
            </span>
          </a>

          <a 
            href="https://www.youtube.com/@Acharayavikashkumar" 
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative w-10 h-10 flex-shrink-0 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl ${
              isExpanded ? 'scale-100 translate-x-0' : 'scale-0 translate-x-4'
            }`}
            style={{ transitionDelay: '150ms' }}
            aria-label="YouTube"
            onClick={handleInteraction}
          >
            <FaYoutube className="w-4 h-4" />
            <span className="absolute bottom-full mb-2 px-3 py-1 bg-red-600 text-white text-sm font-medium rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50">
              YouTube
            </span>
          </a>
          
          <a 
            href="https://www.instagram.com/acharya.vikash_27/" 
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl ${
              isExpanded ? 'scale-100 translate-x-0' : 'scale-0 translate-x-4'
            }`}
            style={{ transitionDelay: '200ms' }}
            aria-label="Instagram"
            onClick={handleInteraction}
          >
            <FaInstagram className="w-4 h-4" />
            <span className="absolute bottom-full mb-2 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50">
              Instagram
            </span>
          </a>

          <a 
            href="https://www.facebook.com/profile.php?id=61581478106818" 
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative w-10 h-10 flex-shrink-0 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl ${
              isExpanded ? 'scale-100 translate-x-0' : 'scale-0 translate-x-4'
            }`}
            style={{ transitionDelay: '250ms' }}
            aria-label="Facebook"
            onClick={handleInteraction}
          >
            <FaFacebookF className="w-4 h-4" />
            <span className="absolute bottom-full mb-2 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50">
              Facebook
            </span>
          </a>

          <span
            className={`text-sm font-semibold text-primary-700 whitespace-nowrap transition-all duration-500 ${
              isExpanded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            Connect with us!
          </span>
        </div>
      </div>
    </div>
  );
}
