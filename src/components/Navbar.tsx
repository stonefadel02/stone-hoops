
// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import Link from "next/link";
// import ThemeToggle from "./ThemeToggle";

// const Navbar = () => {
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const navLinks = [
//     { href: "/teams", label: "Équipes" },
//     { href: "/schedule", label: "Calendrier" },
   
//     { href: "/standings", label: "Classement" },
//   ];

//   return (
//     <div>
      
//       <nav className="bg-gradient-to-t dark:from-[#BD343B]/60 dark:to-black from-[#8B2429] to-gray-900 dark:text-gray-300 text-white shadow-md">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
//           <div className="hidden md:flex justify-between items-center h-48 lg:h-72">
            
//             <div className="flex-shrink-0">
//               <Link href="/" className="flex items-center">
//                 <Image
//                   src="/images/stone.png"
//                   alt="Stone Hoops Logo"
//                   width={80}
//                   height={80}
//                   className="lg:w-[100px] lg:h-[100px] rounded-full hover:scale-105 transition-transform"
//                 />
//               </Link>
//             </div>

            
//             <div className="text-center flex-1 px-4">
//               <p className="text-xl lg:text-3xl">
//                 Suivez tous les scores, classements et actualités <br className="hidden lg:block" /> 
//                 <span className="lg:hidden"> </span>
//                 de la ligue de basketball{" "}
//                 <span className="text-white dark:text-gray-100 font-bold">Stone</span>{" "}
//                 <span className="text-[#BD343B] dark:text-[#FF4C54] font-extrabold">Hoops</span>
//               </p>
//             </div>

            
//             <div className="flex-shrink-0">
//               <ThemeToggle />
//             </div>
//           </div>

          
//           <div className="md:hidden flex justify-between items-center py-4">
            
//             <Link href="/" className="flex items-center">
//               <Image
//                 src="/images/stone.png"
//                 alt="Stone Hoops Logo"
//                 width={50}
//                 height={50}
//                 className="rounded-full"
//               />
//             </Link>

            
//             <div className="flex-1 text-center px-2">
//               <p className="text-sm font-bold">
//                 <span className="text-white dark:text-gray-100">Stone</span>{" "}
//                 <span className="text-[#BD343B] dark:text-[#FF4C54]">Hoops</span>
//               </p>
//             </div>

            
//             <ThemeToggle />
//           </div>
//         </div>
//       </nav>

      
//       <nav className="bg-gradient-to-b from-black to-[#BD343B] dark:from-black dark:to-[#8B2429]/70 text-white dark:text-white shadow-md">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16 md:h-20">
            
//             <div className="hidden md:flex md:items-center md:justify-center md:space-x-4 lg:space-x-6 w-full">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className="hover:text-white dark:hover:text-gray-100 transition-colors duration-200 text-sm lg:text-md font-bold px-2 py-1 rounded hover:bg-black/20 dark:hover:bg-white/10"
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </div>

            
//             <div className="md:hidden w-full flex justify-center">
//               <button
//                 onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
//                 className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white focus:outline-none p-2 rounded-md hover:bg-black/30 dark:hover:bg-white/10 transition-colors"
//                 aria-label="Toggle menu"
//               >
//                 <svg
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   {isMobileMenuOpen ? (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   ) : (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M4 6h16M4 12h16M4 18h16"
//                     />
//                   )}
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>

        
//         <div 
//           className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
//             isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//           }`}
//         >
//           <div className="px-4 py-3 space-y-2 bg-gradient-to-b from-black to-[#BD343B] dark:from-gray-900 dark:to-[#8B2429] text-gray-300 dark:text-gray-400 shadow-md">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="text-white dark:text-white hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white dark:hover:text-gray-100 block px-4 py-3 rounded-md text-base font-medium transition-colors"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar; 

"use client";

import Image from "next/image";
import { useState, useEffect } from "react"; // Ajout de useEffect
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "next-themes"; // Import pour lire le thème actuel
import "../app/css/Navbar.css"; // Assurez-vous que le chemin est correct

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, systemTheme } = useTheme(); // Hook pour obtenir le thème
  const [mounted, setMounted] = useState(false); // État pour gérer l'hydratation

  // Assure que le code ne s'exécute que côté client après le montage
  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/teams", label: "Équipes" },
    { href: "/schedule", label: "Calendrier" },
    { href: "/standings", label: "Classement" },
  ];

  // Détermine le thème actuel (prend en compte le thème système)
  const currentTheme = theme === "system" ? systemTheme : theme;

  // --- Styles pour l'arrière-plan superposé ---
  const navTopStyleLight = {
    backgroundImage: `url('/images/bask2.jpg'), linear-gradient(to top, #8B2429, #1f2937)`,
    backgroundSize: 'cover, auto',
    backgroundPosition: 'center, center',
    backgroundBlendMode: 'overlay',
    backgroundRepeat: 'no-repeat',
  };
   const navTopStyleDark = {
    backgroundImage: `url('/images/bask2.jpg'), linear-gradient(to top, rgba(189, 52, 59, 0.6), black)`,
     backgroundSize: 'cover, auto',
     backgroundPosition: 'center, center',
     backgroundBlendMode: 'overlay',
     backgroundRepeat: 'no-repeat',
   };

   const navBottomStyleLight = {
     backgroundImage: `url('/images/bask2.jpg'), linear-gradient(to bottom, black, #BD343B)`,
     backgroundSize: 'cover, auto',
     backgroundPosition: 'center, center',
     backgroundBlendMode: 'overlay',
     backgroundRepeat: 'no-repeat',
   };
    const navBottomStyleDark = {
     backgroundImage: `url('/images/bask2.jpg'), linear-gradient(to bottom, black, rgba(139, 36, 41, 0.7))`,
     backgroundSize: 'cover, auto',
     backgroundPosition: 'center, center',
     backgroundBlendMode: 'overlay',
     backgroundRepeat: 'no-repeat',
   };
  // ---------------------------------------------

  // Empêche le rendu côté serveur avant que le thème ne soit connu côté client
  if (!mounted) {
    // Vous pouvez retourner un placeholder ou null pour éviter les FOUC/erreurs d'hydratation
    // Retourner un placeholder avec la hauteur attendue est mieux
     return (
        <div className="h-[calc(11rem+4rem)] md:h-[calc(12rem+5rem)] lg:h-[calc(18rem+5rem)]">
          {/* Placeholder simple */}
        </div>
     )
  }

  return (
    <div>
      {/* --- Section supérieure - Header --- */}
      <nav
        className="text-white shadow-md relative" // Classes de base
        // Applique le style dynamiquement selon le thème
        style={currentTheme === 'dark' ? navTopStyleDark : navTopStyleLight}
      >
        {/* Surcouche d'overlay */}
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50 z-0"></div>

        {/* Contenu de la nav supérieure (avec z-10) */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Version Desktop et Tablette */}
          <div className="hidden md:flex justify-between items-center h-48 lg:h-72">
             {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/images/stone.png"
                    alt="Stone Hoops Logo"
                    width={80}
                    height={80}
                    className="lg:w-[100px] lg:h-[100px] rounded-full hover:scale-105 transition-transform"
                    priority // Bonne idée pour le logo principal
                  />
                </Link>
              </div>
             {/* Slogan */}
              <div className="text-center flex-1 px-4">
                <p className="text-xl lg:text-3xl">
                  {/* Effet Typing */}
                  <span className="typing-text">
                    Suivez tous les scores, classements et actualités
                    <br className="hidden lg:block" />
                    de la ligue de basketball
                  </span>
                  <br />
                  {/* Effet Melting */}
                  <span className="melting-text-container">
                    <span className="melting-text" data-text="Stone Hoops">
                      <span className="text-white dark:text-gray-100 font-bold">Stone</span>{" "}
                      <span className="text-[#BD343B] dark:text-[#FF4C54] font-extrabold">Hoops</span>
                    </span>
                  </span>
                </p>
              </div>
             {/* ThemeToggle */}
              <div className="flex-shrink-0">
                <ThemeToggle />
              </div>
          </div>
          {/* Version Mobile */}
          <div className="md:hidden flex justify-between items-center py-4">
             {/* Logo Mobile */}
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/stone.png"
                  alt="Stone Hoops Logo"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </Link>
             {/* Titre Mobile Melting */}
              <div className="flex-1 text-center px-2">
                 <span className="melting-text-container text-sm">
                    <span className="melting-text" data-text="Stone Hoops">
                       <span className="text-white dark:text-gray-100 font-bold">Stone</span>{" "}
                       <span className="text-[#BD343B] dark:text-[#FF4C54] font-extrabold">Hoops</span>
                    </span>
                  </span>
              </div>
             {/* ThemeToggle Mobile */}
              <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* --- Section inférieure - Navigation --- */}
      <nav
        className="sticky top-0 z-20 text-white shadow-md relative" // dark:text-white est redondant si la couleur est héritée
        // Applique le style dynamiquement
        style={currentTheme === 'dark' ? navBottomStyleDark : navBottomStyleLight}
      >
        {/* Surcouche */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-0"></div>

         {/* Contenu de la nav inférieure (avec z-10) */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-16 md:h-20">
             {/* Menu Desktop */}
             <div className="hidden md:flex md:items-center md:justify-center md:space-x-4 lg:space-x-6 w-full">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  // Simplification des couleurs, héritage devrait suffire
                  className="transition-colors duration-200 text-sm lg:text-md font-bold px-3 py-2 rounded hover:bg-black/30 dark:hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
            </div>
             {/* Bouton Hamburger */}
             <div className="md:hidden w-full flex justify-center">
              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                // Simplification couleurs
                className="text-gray-200 hover:text-white focus:outline-none p-2 rounded-md hover:bg-black/40 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                 <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                 >
                  {isMobileMenuOpen ? ( <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/> ) : ( <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>)}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Menu Mobile */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {/* Applique le style de fond dynamiquement au menu mobile aussi */}
          <div
            className="px-4 py-3 space-y-2 text-white shadow-md border-t border-gray-700/50 relative z-10"
            style={currentTheme === 'dark' ? navBottomStyleDark : navBottomStyleLight}
           >
           <div className="absolute inset-0 bg-black/60 dark:bg-black/80 z-0"></div> {/* Surcouche */}
           <div className="relative z-10 space-y-2"> {/* Contenu au-dessus */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  // Simplification couleurs
                  className="hover:bg-gray-700/50 dark:hover:bg-gray-800/50 block px-4 py-3 rounded-md text-base font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
           </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;