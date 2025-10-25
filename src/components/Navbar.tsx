
"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/teams", label: "Équipes" },
    { href: "/schedule", label: "Calendrier" },
   
    { href: "/standings", label: "Classement" },
  ];

  return (
    <div>
      
      <nav className="bg-gradient-to-t dark:from-[#BD343B] dark:to-black from-[#8B2429] to-gray-900 dark:text-gray-300 text-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="hidden md:flex justify-between items-center h-48 lg:h-72">
            
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/stone.png"
                  alt="Stone Hoops Logo"
                  width={80}
                  height={80}
                  className="lg:w-[100px] lg:h-[100px] rounded-full hover:scale-105 transition-transform"
                />
              </Link>
            </div>

            
            <div className="text-center flex-1 px-4">
              <p className="text-xl lg:text-3xl">
                Suivez tous les scores, classements et actualités <br className="hidden lg:block" /> 
                <span className="lg:hidden"> </span>
                de la ligue de basketball{" "}
                <span className="text-white dark:text-gray-100 font-bold">Stone</span>{" "}
                <span className="text-[#BD343B] dark:text-[#FF4C54] font-extrabold">Hoops</span>
              </p>
            </div>

            
            <div className="flex-shrink-0">
              <ThemeToggle />
            </div>
          </div>

          
          <div className="md:hidden flex justify-between items-center py-4">
            
            <Link href="/" className="flex items-center">
              <Image
                src="/images/stone.png"
                alt="Stone Hoops Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
            </Link>

            
            <div className="flex-1 text-center px-2">
              <p className="text-sm font-bold">
                <span className="text-white dark:text-gray-100">Stone</span>{" "}
                <span className="text-[#BD343B] dark:text-[#FF4C54]">Hoops</span>
              </p>
            </div>

            
            <ThemeToggle />
          </div>
        </div>
      </nav>

      
      <nav className="bg-gradient-to-b from-black to-[#BD343B] dark:from-gray-900 dark:to-[#8B2429] text-gray-300 dark:text-gray-400 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            
            <div className="hidden md:flex md:items-center md:justify-center md:space-x-4 lg:space-x-6 w-full">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-white dark:hover:text-gray-100 transition-colors duration-200 text-sm lg:text-md font-bold px-2 py-1 rounded hover:bg-black/20 dark:hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            
            <div className="md:hidden w-full flex justify-center">
              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white focus:outline-none p-2 rounded-md hover:bg-black/30 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-3 space-y-2 bg-gradient-to-b from-black to-[#BD343B] dark:from-gray-900 dark:to-[#8B2429] text-gray-300 dark:text-gray-400 shadow-md border-t border-gray-800 dark:border-gray-700">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white dark:hover:text-gray-100 block px-4 py-3 rounded-md text-base font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;