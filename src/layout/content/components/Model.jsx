import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from 'three'

const Model = ({ rotationSpeed = 0.5 }) => {
  const modelRef = useRef()
  const { scene } = useGLTF('./RosUniMed_logo.glb')

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const center = new THREE.Vector3()
    box.getCenter(center)

    // Move the model so its center is at origin
    scene.position.sub(center)
  }, [scene])

  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * rotationSpeed
    }
  })

  return (
    <group ref={modelRef}>
      <hemisphereLight
        intensity={0.15}
        groundColor="black"
      />
      <spotLight
        position={[20, 20, 20]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <primitive
        object={scene}
        scale={120}
        rotation={[Math.PI / 2, 0, 0]}
      // position={[x, y, z]}
      />
    </group>
  )
}

const ModelCanvas = () => {

  return (
    <Canvas
      frameloop="always"
      shadows
      camera={{
        position: [20, 3, 5],
        fov: 25,
        near: 0.1,
        far: 200
      }}
      gl={{
        preserveDrawingBuffer: true,
        antialias: true
      }}
    >
      <Suspense fallback={null}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
        />
        <Model rotationSpeed={1} />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}

export default ModelCanvas