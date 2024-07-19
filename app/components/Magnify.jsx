import React, { useRef, useState, useEffect } from 'react';

const Magnify = ({ imageSrc, alt }) => {
  const picBoxRef = useRef(null);
  const zoomRef = useRef(null);
  const mouseZoomRef = useRef(null);
  const [deviceType, setDeviceType] = useState('mouse');

  const isTouchDevice = () => {
    try {
      document.createEvent('TouchEvent');
      setDeviceType('touch');
      return true;
    } catch (e) {
      setDeviceType('mouse');
      return false;
    }
  };

  useEffect(() => {
    isTouchDevice();

    const events = {
      mouse: {
        move: 'mousemove',
      },
      touch: {
        move: 'touchmove',
      },
    };

    const hideElements = () => {
      zoomRef.current.style.display = 'none';
      mouseZoomRef.current.style.display = 'none';
    };

    const handleMove = (e) => {
      try {
        const x = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
        const y = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
        const imageWidth = picBoxRef.current.offsetWidth;
        const imageHeight = picBoxRef.current.offsetHeight;

        if (
          imageWidth - (x - picBoxRef.current.getBoundingClientRect().left) < 15 ||
          x - picBoxRef.current.getBoundingClientRect().left < 15 ||
          imageHeight - (y - picBoxRef.current.getBoundingClientRect().top) < 15 ||
          y - picBoxRef.current.getBoundingClientRect().top < 15
        ) {
          hideElements();
        } else {
          zoomRef.current.style.display = 'block';
          mouseZoomRef.current.style.display = 'block';
        }

        const posX = ((x - picBoxRef.current.getBoundingClientRect().left) / imageWidth).toFixed(4) * 100;
        const posY = ((y - picBoxRef.current.getBoundingClientRect().top) / imageHeight).toFixed(4) * 100;

        zoomRef.current.style.backgroundPosition = `${posX}% ${posY}%`;

        mouseZoomRef.current.style.top = `${y}px`;
        mouseZoomRef.current.style.left = `${x}px`;
      } catch (e) {}
    };

    const picBoxElement = picBoxRef.current;
    const moveEvent = events[deviceType].move;

    picBoxElement.addEventListener(moveEvent, handleMove);

    return () => {
      picBoxElement.removeEventListener(moveEvent, handleMove);
    };
  }, [deviceType]);

  return (
    <div className="card">
      <div id="picbox" ref={picBoxRef} className="picbox">
        <img id="product_img" src={imageSrc} alt={alt} />
      </div>
      <div id="mouse_zoom" ref={mouseZoomRef} className="imgZoomLens"></div>
      <div id="zoom" ref={zoomRef} className="imgZoomResult" style={{ backgroundImage: `url(${imageSrc})` }}></div>
    </div>
  );
};

export default Magnify;
