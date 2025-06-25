"use client";
import React, { useState, useEffect, useRef } from "react";

const images = [
  "/static/img/content/content-1.jpg",
  "/static/img/content/content-2.jpg",
  "/static/img/content/content-3.jpg",
  "/static/img/content/content-4.jpg",
];

const SLIDE_DURATION = 4000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef(null);
  const progressRef = useRef(null);

  // Auto-play logic with progress bar
  useEffect(() => {
    setProgress(0);
    let start;
    function animateProgress(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      setProgress(Math.min(elapsed / SLIDE_DURATION, 1));
      if (elapsed < SLIDE_DURATION) {
        progressRef.current = requestAnimationFrame(animateProgress);
      } else {
        setCurrent((prev) => (prev + 1) % images.length);
      }
    }
    progressRef.current = requestAnimationFrame(animateProgress);
    return () => {
      cancelAnimationFrame(progressRef.current);
    };
  }, [current]);

  const goToSlide = (idx) => {
    setCurrent(idx);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-[320px] md:h-[480px] lg:h-[600px] overflow-hidden">
      {/* Slides */}
      {images.map((img, idx) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={img}
            alt={`Slide ${idx + 1}`}
            className="w-full h-full object-cover object-center"
            draggable={false}
          />
        </div>
      ))}
      {/* Overlay bottom for contrast */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent z-20 pointer-events-none" />
      {/* Progress bar at top */}
      <div className="absolute top-0 left-0 w-full h-2 z-30">
        <div className="bg-white/30 h-full w-full absolute top-0 left-0 rounded-full" />
        <div
          className="bg-yellow-400 h-full absolute top-0 left-0 rounded-full transition-all duration-100"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      {/* Glassmorphism controls bottom left */}
      <div className="absolute bottom-6 left-6 z-30 flex items-center gap-4 bg-white/20 backdrop-blur-md rounded-2xl px-6 py-3 shadow-lg">
        <button
          className="bg-black/60 hover:bg-yellow-400 hover:text-black text-white rounded-full p-3 shadow-lg transition"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span className="text-white text-lg font-bold drop-shadow">
          <span className="text-yellow-400">{current + 1}</span>/{images.length}
        </span>
        <button
          className="bg-black/60 hover:bg-yellow-400 hover:text-black text-white rounded-full p-3 shadow-lg transition"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      {/* Mini dots for manual navigation, bottom center */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border-2 border-white bg-white transition-all duration-200 ${
              idx === current ? "bg-yellow-400 border-yellow-400" : "opacity-50"
            }`}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
