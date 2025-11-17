import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useState, Suspense, useRef } from "react";

const Model = ({ rotationSpeed = 0.5 }) => {
  const modelRef = useRef()
  const model = useGLTF('./RosUniMed_logo.glb')

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * rotationSpeed
    }
  })

  return (
    <mesh ref={modelRef}>
      <hemisphereLight
        intensity={0.15}
        groundColor="black"
      />
      <pointLight intensity={1} />
      <primitive
        object={model.scene}
      />
    </mesh>
  )
}

const ModelCanvas = () => {

  return (
    <Canvas
      frameloop="always"
      shadows
      camera={{
        position: [20, 3, 5],
        fov: 25
      }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={null}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Model rotationSpeed={1} />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default ModelCanvas