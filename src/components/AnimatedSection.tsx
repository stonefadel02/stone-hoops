// src/components/AnimatedSection.tsx
"use client";

import { motion, Variants } from 'framer-motion';
import React from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  fullWidth?: boolean; // <-- Nouvelle prop
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const AnimatedSection = ({ children, className = "", delay = 0, fullWidth = false }: AnimatedSectionProps) => {
  return (
    <motion.section
      // Garde le padding vertical par défaut, sauf si surchargé par className
      className={`py-16 md:py-24 ${className}`}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
    >
      {/* --- MODIFICATION ICI --- */}
      {/* Si fullWidth est false (par défaut), on garde le conteneur centré */}
      {!fullWidth ? (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      ) : (
        // Si fullWidth est true, on affiche directement les enfants (pas de marge)
        children
      )}
      {/* --- FIN MODIFICATION --- */}
    </motion.section>
  );
};

export default AnimatedSection;