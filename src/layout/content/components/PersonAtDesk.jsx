import { useState, useEffect, useMemo } from "react";
import { SpinLoader } from "./SpinLoader";

const preloadImages = () => {
  const imagePaths = [
    // Right frames
    '../../imgs/frame_right_0.png',
    '../../imgs/frame_right_1.png',
    '../../imgs/frame_right_2.png',
    '../../imgs/frame_right_3.png',
    '../../imgs/frame_right_4.png',
    '../../imgs/frame_right_5.png',
    '../../imgs/frame_right_6.png',
    '../../imgs/frame_right_7.png',
    // Left frames
    '../../imgs/frame_left_0.png',
    '../../imgs/frame_left_1.png',
    '../../imgs/frame_left_2.png',
    '../../imgs/frame_left_3.png',
    '../../imgs/frame_left_4.png',
    // Center frame
    '../../imgs/frame_0.png'
  ]

  imagePaths.forEach(path => {
    const img = new Image()
    img.src = path
  })
}

export default function PersonAtDesk({ stop = false, refresh = 0 }) {
  const [mouseX, setMouseX] = useState(0)
  const [touchX, setTouchX] = useState(null)
  const [handFrame, setHandFrame] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  const rightFramesCount = 8
  const leftFramesCount = 5

  // Preload images on component mount
  useEffect(() => {
    preloadImages();

    // Set a small timeout to allow preloading
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Mouse movement handler
  useEffect(() => {
    const handleMouseMove = (e) => setMouseX(e.clientX)
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Touch movement handler
  useEffect(() => {
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        setTouchX(e.touches[0].clientX);
      }
    }
    const handleTouchEnd = () => {
      // Reset to center after a short delay when touch ends
      setTimeout(() => setHandFrame(0), 300)
    }

    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('touchcancel', handleTouchEnd)

    return () => {
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [])

  useEffect(() => {
    const handleMouseOut = (e) => setHandFrame(0)
    window.addEventListener('mouseout', handleMouseOut)
    return () => window.removeEventListener('mouseout', handleMouseOut)
  }, [mouseX])

  // Calculate hand frame based on input
  useEffect(() => {
    if (stop || !imagesLoaded) {
      return
    }

    const width = window.innerWidth;
    const center = width / 2
    const inputX = touchX !== null ? touchX : mouseX
    const offset = inputX - center

    if (Math.abs(offset) < 10) {
      // ЦЕНТР
      setHandFrame(0)
    } else if (offset > 0) {
      // ВПРАВО
      const ratio = offset / (width / 2)
      const frame = Math.min(
        rightFramesCount,
        Math.floor(ratio * rightFramesCount)
      )
      setHandFrame(`right_${frame}`)
    } else if (offset < 0) {
      // ВЛЕВО
      const ratio = Math.abs(offset) / (width / 2)
      const frame = Math.min(
        leftFramesCount,
        Math.floor(ratio * leftFramesCount)
      )
      setHandFrame(`left_${frame}`)
    } else {
      setHandFrame(0)
    }
  }, [mouseX, touchX, stop, refresh, imagesLoaded])

  // Throttle the frame updates on mobile
  useEffect(() => {
    let animationFrameId;

    const updateFrame = () => {
      // Your frame calculation logic here
      animationFrameId = requestAnimationFrame(updateFrame);
    };

    if (touchX !== null) {
      animationFrameId = requestAnimationFrame(updateFrame);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [touchX]);

  const imageSrc = useMemo(() => {
    return `../../imgs/frame_${handFrame}.png`
  }, [handFrame])

  return (
    <>
      {imagesLoaded ? (
        <div style={{
          touchAction: 'manipulation',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <img
            src={imageSrc}
            alt="Hand"
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              userSelect: 'none',
              WebkitTouchCallout: 'none',
              WebkitTapHighlightColor: 'transparent'
            }}
            loading="lazy"
          />
        </div>
      ) : (
        <div style={{ width: '100%', height: '100%', background: '#f0f0f0' }}>
          <SpinLoader color="#0c0058ff" />
        </div>
      )}
    </>
  )
}