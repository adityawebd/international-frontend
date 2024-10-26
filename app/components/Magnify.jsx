import React, { useRef, useState, useEffect } from 'react';
import { IoIosCloseCircle } from "react-icons/io";


const Magnify = ({ imageSrc, alt }) => {
  const picBoxRef = useRef(null);
  const zoomRef = useRef(null);
  const mouseZoomRef = useRef(null);
  const [deviceType, setDeviceType] = useState('mouse');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

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
        enter: 'mouseenter',
        leave: 'mouseleave',
        move: 'mousemove',
      },
      touch: {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend',
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

        const posX = ((x - picBoxRef.current.getBoundingClientRect().left) / imageWidth) * 100;
        const posY = ((y - picBoxRef.current.getBoundingClientRect().top) / imageHeight) * 100;

        zoomRef.current.style.backgroundPosition = `${posX}% ${posY}%`;
        mouseZoomRef.current.style.top = `${y}px`;
        mouseZoomRef.current.style.left = `${x}px`;
      } catch (e) { }
    };

    const handleEnter = () => {
      zoomRef.current.style.display = 'block';
      mouseZoomRef.current.style.display = 'block';
    };

    const handleLeave = () => {
      hideElements();
    };

    const picBoxElement = picBoxRef.current;
    const enterEvent = events[deviceType].enter;
    const moveEvent = events[deviceType].move;
    const leaveEvent = events[deviceType].leave;

    picBoxElement.addEventListener(enterEvent, handleEnter);
    picBoxElement.addEventListener(moveEvent, handleMove);
    picBoxElement.addEventListener(leaveEvent, handleLeave);

    return () => {
      picBoxElement.removeEventListener(enterEvent, handleEnter);
      picBoxElement.removeEventListener(moveEvent, handleMove);
      picBoxElement.removeEventListener(leaveEvent, handleLeave);
    };
  }, [deviceType]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const zoomIn = () => {
    setZoomLevel(prevZoom => Math.min(prevZoom + 0.2, 3)); // Max zoom level of 3
  };

  const zoomOut = () => {
    setZoomLevel(prevZoom => Math.max(prevZoom - 0.2, 1)); // Min zoom level of 1
  };

  const resetZoom = () => setZoomLevel(1); // Reset zoom to original size


  return (
    <div className="card">
      <div
        id="picbox"
        ref={picBoxRef}
        className="picbox"
        onClick={openModal}
      >
        <img loading='lazy' id="product_img" src={imageSrc} alt={alt} />
      </div>
      <div
        id="mouse_zoom"
        ref={mouseZoomRef}
        className="imgZoomLens"
      ></div>
      <div
        id="zoom"
        ref={zoomRef}
        className="imgZoomResult"
        style={{ backgroundImage: `url(${imageSrc})` }}
      ></div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black product_img_modal_wrapper">
          <div className="relative product_img_modal_content">
            <button
              className="absolute top-0 right-0 p-2"
              onClick={closeModal}
            >
              <IoIosCloseCircle size={20} />
            </button>
            {/* <img loading='lazy' src={imageSrc} alt={alt} /> */}
            <div className="modal_btns_product_img mb-2">
              <button
                className=""
                onClick={zoomOut}
              >
                -
              </button>
              <button
                className=""
                onClick={zoomIn}
              >
                +
              </button>
              <button
                className="reset-button"
                onClick={resetZoom}
              >
                Reset
              </button>
            </div>
            <figure>
              <img loading='lazy'
                src={imageSrc}
                alt={alt}
                style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.3s ease' }}
              />
            </figure>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Magnify;
