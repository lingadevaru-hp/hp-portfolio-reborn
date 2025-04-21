
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls, Float, PerspectiveCamera, Center } from "@react-three/drei";
import { Mesh, DoubleSide, Vector3, Group } from "three";
import { motion } from "framer-motion";

// Create a component for each symbol using basic shapes instead of Text3D
const FloatingSymbol = ({ position, scale, color, rotationSpeed = 0.01, symbol }) => {
  const meshRef = useRef<Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed * 0.5;
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  // Function to create geometric shapes based on the symbol
  const getGeometry = () => {
    switch(symbol) {
      case "</>":
        return (
          <group scale={[0.7, 0.7, 0.7]}>
            <mesh position={[-0.5, 0, 0]}>
              <boxGeometry args={[0.1, 0.8, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0.5, 0, 0]}>
              <boxGeometry args={[0.1, 0.8, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.8, 0.1, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
          </group>
        );
      case "{}":
        return (
          <group scale={[0.7, 0.7, 0.7]}>
            <mesh position={[-0.4, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.1, 0.6, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[-0.4, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.1, 0.6, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.1, 0.6, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0.4, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.1, 0.6, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
          </group>
        );
      case "#":
        return (
          <group scale={[0.7, 0.7, 0.7]}>
            <mesh position={[-0.2, 0, 0]}>
              <boxGeometry args={[0.1, 0.8, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0.2, 0, 0]}>
              <boxGeometry args={[0.1, 0.8, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0, 0.2, 0]}>
              <boxGeometry args={[0.8, 0.1, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0, -0.2, 0]}>
              <boxGeometry args={[0.8, 0.1, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
          </group>
        );
      case "~":
        return (
          <group scale={[0.7, 0.7, 0.7]}>
            <mesh>
              <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
          </group>
        );
      case "∞":
        return (
          <group scale={[0.6, 0.6, 0.6]}>
            <mesh position={[-0.3, 0, 0]}>
              <torusGeometry args={[0.3, 0.1, 16, 32]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0.3, 0, 0]}>
              <torusGeometry args={[0.3, 0.1, 16, 32]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
          </group>
        );
      default:
        return (
          <mesh>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
          </mesh>
        );
    }
  };

  return (
    <Float
      speed={1.5} 
      rotationIntensity={1.0}
      floatIntensity={2.0}
    >
      <group
        ref={meshRef}
        position={position}
        scale={scale}
      >
        {getGeometry()}
      </group>
    </Float>
  );
};

const Scene = () => {
  const symbols = [
    { symbol: "</>" , position: [0, 0, 0], scale: 1, color: "#9b87f5", speed: 0.01 },
    { symbol: "{}" , position: [2, 1, -2], scale: 0.8, color: "#33C3F0", speed: 0.015 },
    { symbol: "#" , position: [-2, -1, -1], scale: 0.9, color: "#8B5CF6", speed: 0.02 },
    { symbol: "~" , position: [1, -2, -3], scale: 0.7, color: "#E5DEFF", speed: 0.025 },
    { symbol: "∞" , position: [-1, 2, -2], scale: 0.8, color: "#7E69AB", speed: 0.018 },
  ];

  return (
    <>
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.5}
      />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#9b87f5" />
      
      <Center>
        {symbols.map((item, index) => (
          <FloatingSymbol
            key={index}
            position={new Vector3(...item.position)}
            scale={item.scale}
            color={item.color}
            rotationSpeed={item.speed}
            symbol={item.symbol}
          />
        ))}
      </Center>
    </>
  );
};

const Scene3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      className="!absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
    >
      <Scene />
    </Canvas>
  );
};

export default Scene3D;
