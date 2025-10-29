// src/components/HeroCarousel.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideData {
  imageUrl: string;
  category: string;
  date: string;
  title: string;
  link: string;
}

const slides: SlideData[] = [
  {
    imageUrl: '/images/bask1.jpg',
    category: 'ÉQUIPE NATIONALE FÉMININE',
    date: 'il y a 5 jours',
    title: '"JE SUIS VENUE POUR GAGNER LE PLUS DE TITRES POSSIBLES"',
    link: '#',
  },
  {
    imageUrl: '/images/bask4.jpg',
    category: 'STONE HOOPS LEAGUE',
    date: 'Hier',
    title: 'LES MOMENTS FORTS DE LA DERNIÈRE JOURNÉE',
    link: '#',
  },
  {
    imageUrl: '/images/bask6.jpg',
    category: 'INTERVIEW EXCLUSIVE',
    date: 'Aujourd\'hui',
    title: 'JOHN DOE SE CONFIE SUR SES AMBITIONS',
    link: '#',
  },
];

const HeroCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  // Autoplay
  useEffect(() => {
    if (!emblaApi) return;
    const timer = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 7000);
    return () => window.clearInterval(timer);
  }, [emblaApi]);

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden bg-neutral-900 text-white">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full flex">
          {slides.map((slide, index) => (
            <div
              className="embla__slide relative h-full flex-grow-0 flex-shrink-0 w-full"
              key={index}
            >
              <Image
                src={slide.imageUrl}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
              <div className="absolute top-0 right-0 bottom-0 w-1/4 md:w-1/5 bg-gradient-to-l from-[#BD343B]/80 via-[#BD343B]/30 to-transparent opacity-70 dark:from-[#FF4C54]/70 dark:via-[#FF4C54]/20"></div>

              <div className="absolute bottom-0 left-0 p-6 md:p-10 lg:p-16 max-w-xl xl:max-w-2xl z-10">
                <AnimatePresence mode="wait">
                  {index === selectedIndex && (
                    <motion.div
                      key={selectedIndex}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.5, ease: "circOut" }}
                    >
                      <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-red-300 dark:text-red-400 mb-2">
                        {slide.category}{' '}
                        <span className="text-gray-400 ml-3">{slide.date}</span>
                      </p>
                      <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold uppercase leading-tight mb-4">
                        <a href={slide.link} className="hover:underline">
                          {slide.title}
                        </a>
                      </h1>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 md:bottom-6 right-4 md:right-10 z-20 flex space-x-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 w-2 md:h-2.5 md:w-2.5 rounded-full transition-colors duration-200 ${
              index === selectedIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Aller à la diapositive ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;