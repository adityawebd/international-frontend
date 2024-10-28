"use client";
import React, { useEffect, useRef } from 'react';

const WoodStatue = () => {
  const iframeRef = useRef(null);
  
  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const player = iframeRef.current;
        if (entry.isIntersecting) {
          // Play the video when it enters the viewport
          if (player) {
            player.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
          }
        } else {
          // Pause the video when it leaves the viewport
          if (player) {
            player.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // Adjust this value based on when you want the video to start playing
    });

    const target = document.querySelector('.wood_statue');
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <div className="wood_statue" style={{ height: '500px', backgroundColor: '#f0f0f0', position: 'relative' }}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/nuELiX3A8xg?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=nuELiX3A8xg&quality=hd1080" // Added loop and playlist parameters
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            display: 'block' // Keep it visible, as we control play/pause via API
          }}
        />
      </div>
    </div>
  );
};

export default WoodStatue;
