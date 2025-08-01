"use client";
import React, { useState, useEffect } from 'react';

// Use lucide-react for modern SVG icons
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';

// This is the reusable ImageSlider component.
// It is designed to be in a separate file (e.g., components/ImageSlider.jsx).
// It takes an array of slide data as a prop.
const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [touchStartX, setTouchStartX] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    /**
     * Handles advancing to the next slide.
     */
    const handleNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    /**
     * Handles returning to the previous slide.
     */
    const handlePrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    /**
     * Handles direct navigation to a specific slide using indicators.
     * @param {number} slideIndex - The index of the slide to navigate to.
     */
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    /**
     * Handles the start of a touch event for swiping.
     */
    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
        setIsDragging(false);
    };

    /**
     * Handles a touch move event, checking if a swipe is in progress.
     */
    const handleTouchMove = (e) => {
        if (touchStartX === null) return;
        const touchEndX = e.touches[0].clientX;
        const deltaX = touchStartX - touchEndX;
        const swipeThreshold = 50;
        if (Math.abs(deltaX) > swipeThreshold) {
            setIsDragging(true);
        }
    };

    /**
     * Handles the end of a touch event, triggering a slide change if a swipe occurred.
     */
    const handleTouchEnd = (e) => {
        if (touchStartX === null || !isDragging) {
            setTouchStartX(null);
            return;
        }

        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchStartX - touchEndX;
        const swipeThreshold = 50;
        if (deltaX > swipeThreshold) {
            handleNext();
        } else if (deltaX < -swipeThreshold) {
            handlePrevious();
        }

        setTouchStartX(null);
        setIsDragging(false);
    };

    /**
     * Adds keyboard event listeners for arrow key navigation.
     */
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                handleNext();
            } else if (e.key === 'ArrowLeft') {
                handlePrevious();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentIndex]);

    return (
        <div className="relative w-full max-w-4xl p-4 md:p-8">
            {/* Main slider container with touch and mouse event handlers */}
            <div
                className="relative w-full overflow-hidden rounded-xl shadow-2xl"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={(e) => {
                    e.preventDefault();
                    setTouchStartX(e.clientX);
                    setIsDragging(false);
                }}
                onMouseMove={(e) => {
                    if (touchStartX === null) return;
                    const touchEndX = e.clientX;
                    const deltaX = touchStartX - touchEndX;
                    const swipeThreshold = 50;
                    if (Math.abs(deltaX) > swipeThreshold) {
                        setIsDragging(true);
                    }
                }}
                onMouseUp={(e) => {
                    if (touchStartX === null || !isDragging) {
                        setTouchStartX(null);
                        return;
                    }
                    const touchEndX = e.clientX;
                    const deltaX = touchStartX - touchEndX;
                    const swipeThreshold = 50;
                    if (deltaX > swipeThreshold) {
                        handleNext();
                    } else if (deltaX < -swipeThreshold) {
                        handlePrevious();
                    }
                    setTouchStartX(null);
                    setIsDragging(false);
                }}
                onMouseLeave={() => {
                    setTouchStartX(null);
                    setIsDragging(false);
                }}
            >
                {/* The main image, with a smooth transition effect */}
                <div className="w-full h-80 md:h-96 lg:h-[600px]">
                    <img
                        src={slides[currentIndex].url}
                        alt={slides[currentIndex].title}
                        className="object-cover w-full h-full transition-opacity duration-500 ease-in-out rounded-xl"
                    />
                </div>
                {/* Navigation Buttons */}
                <button
                    onClick={handlePrevious}
                    aria-label="Previous Slide"
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-white/70 hover:bg-white transition duration-200 rounded-full shadow-lg backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                >
                    <ChevronLeft size={24} className="text-gray-800" />
                </button>
                <button
                    onClick={handleNext}
                    aria-label="Next Slide"
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-white/70 hover:bg-white transition duration-200 rounded-full shadow-lg backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                >
                    <ChevronRight size={24} className="text-gray-800" />
                </button>
            </div>

            {/* Indicators/Dots at the bottom */}
            <div className="flex justify-center mt-4 space-x-2">
                {slides.map((_, slideIndex) => (
                    <button
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        aria-label={`Go to slide ${slideIndex + 1}`}
                        className={`p-1 rounded-full transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${
                            currentIndex === slideIndex
                                ? 'bg-[#F43F5E] shadow-md transform scale-110'
                                : 'bg-gray-400 hover:bg-gray-500'
                        }`}
                    >
                        <Circle size={10} className="text-white fill-current" />
                    </button>
                ))}
            </div>
        </div>
    );
};
export default ImageSlider;