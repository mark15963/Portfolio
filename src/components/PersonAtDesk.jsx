import { useState, useEffect } from "react";

export default function PersonAtDesk({ stop = false, refresh = 0 }) {
    const [mouseX, setMouseX] = useState(0)
    const [handFrame, setHandFrame] = useState(0)

    const rightFramesCount = 8
    const leftFramesCount = 5

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
        if (stop) {
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
    }, [mouseX, stop, refresh])

    return (
        <>
            <img
                src={
                    `../../imgs/frame_${handFrame}.png`
                }
                alt="Hand"
                style={{
                    width: 'auto',
                    height: 'auto'
                }}
            />
        </>
    )
}