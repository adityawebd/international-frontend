'use client'
import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      const scrollPercentage = (scrollY / scrollTotal) * 100;

      setScrollProgress(scrollPercentage);

      if (scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="z-100 fixed bottom-8 right-8 p-2 rounded-full shadow-lg hover:bg_green transition duration-300"
          style={{
            width: '50px',
            height: '50px',
            background: 'transparent',
          }}
        >
          <svg
            className="absolute top-0 left-0"
            width="50"
            height="50"
            viewBox="0 0 50 50"
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              stroke="#088178"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray="126"
              strokeDashoffset={126 - (126 * scrollProgress) / 100}
              transform="rotate(-90 25 25)"
            />
          </svg>
          <div
            className="flex items-center justify-center bg-transparent green_font rounded-full"
            style={{ width: '35px', height: '20px', zIndex: 10 }}
          >
            <FaArrowUp size={20} />
          </div>
        </button>
      )}
    </>
  );
};

export default BackToTopButton;

