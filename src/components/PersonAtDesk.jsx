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

  useEffect(() => {
    const handleMouseMove = (e) => setMouseX(e.clientX)
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const handleMouseOut = (e) => setHandFrame(0)
    window.addEventListener('mouseout', handleMouseOut)
    return () => window.removeEventListener('mouseout', handleMouseOut)
  }, [mouseX])

  useEffect(() => {
    if (stop || !imagesLoaded) {
      return
    }

    const width = window.innerWidth;
    const center = width / 2
    const offset = mouseX - center

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
  }, [mouseX, stop, refresh, imagesLoaded])

  const imageSrc = useMemo(() => {
    return `../../imgs/frame_${handFrame}.png`
  }, [handFrame])

  return (
    <>
      {imagesLoaded ? (
        <img
          src={imageSrc}
          alt="Hand"
          style={{
            width: 'auto',
            height: 'auto'
          }}
          loading="lazy"
        />
      ) : (
        <div style={{ width: '100%', height: '100%', background: '#f0f0f0' }}>
          <SpinLoader color="#0c0058ff" />
        </div>
      )}
    </>
  )
}