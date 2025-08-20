import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  MeshDistortMaterial,
  Float,
  Text,
  ContactShadows,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

// Floating geometric shapes with premium materials
const FloatingGeometry = ({
  position,
  scale = 1,
  color = "#6366f1",
  shape = "sphere",
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.3;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;

      // Scale on hover
      const targetScale = hovered ? scale * 1.2 : scale;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case "cube":
        return <boxGeometry args={[1, 1, 1]} />;
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      case "torus":
        return <torusGeometry args={[0.8, 0.3, 16, 100]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[1, 1]} />;
      default:
        return <sphereGeometry args={[1, 32, 32]} />;
    }
  }, [shape]);

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        {geometry}
        <MeshDistortMaterial
          color={color}
          attach="material"
          transparent
          opacity={0.85}
          roughness={0.0}
          metalness={0.8}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          distort={0.4}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
};

// Premium particle system with dynamic colors
const PremiumParticles = () => {
  const particlesRef = useRef<THREE.Points>(null!);
  const count = 1000;

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const colorPalette = [
      new THREE.Color("#6366f1"), // Indigo
      new THREE.Color("#8b5cf6"), // Violet
      new THREE.Color("#06b6d4"), // Cyan
      new THREE.Color("#10b981"), // Emerald
      new THREE.Color("#f59e0b"), // Amber
    ];

    for (let i = 0; i < count; i++) {
      // Create a galaxy-like distribution
      const radius = Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      // Random color from palette
      const color =
        colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Varying sizes
      sizes[i] = Math.random() * 0.1 + 0.05;
    }

    return [positions, colors, sizes];
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;

      // Dynamic particle movement
      const positions = particlesRef.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 1] +=
          Math.sin(state.clock.elapsedTime + i * 0.01) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        opacity={0.8}
        size={0.1}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Animated background grid with premium styling
const PremiumGrid = () => {
  const gridRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={gridRef} position={[0, -3, -5]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20, 20, 20]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>
    </group>
  );
};

// Central hero sphere with distortion effects
const HeroSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      sphereRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;

      // Breathing effect
      const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      sphereRef.current.scale.setScalar(breathe);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
      <mesh
        ref={sphereRef}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color={hovered ? "#8b5cf6" : "#6366f1"}
          transparent
          opacity={0.9}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          distort={0.6}
          speed={2}
          factor={0.8}
        />
      </mesh>
    </Float>
  );
};

// Dynamic lighting system
const DynamicLighting = () => {
  const lightRef = useRef<THREE.PointLight>(null!);
  const spotRef = useRef<THREE.SpotLight>(null!);

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 3;
      lightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 3;
      lightRef.current.intensity =
        1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
    }

    if (spotRef.current) {
      spotRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.3) * 5;
      spotRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.3) * 5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} color="#ffffff" />
      <pointLight
        ref={lightRef}
        position={[3, 3, 3]}
        intensity={1.2}
        color="#6366f1"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-3, 2, -3]} intensity={0.8} color="#8b5cf6" />
      <spotLight
        ref={spotRef}
        position={[5, 8, 5]}
        angle={0.3}
        penumbra={0.5}
        intensity={1}
        color="#06b6d4"
        castShadow
      />
      <directionalLight
        position={[0, 10, 0]}
        intensity={0.5}
        color="#10b981"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </>
  );
};

// Main scene composition
const Scene = () => {
  const { mouse, viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.1,
        0.02
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.y * 0.1,
        0.02
      );
    }
  });

  return (
    <group ref={groupRef}>
      <DynamicLighting />

      {/* Central hero element */}
      <HeroSphere />

      {/* Floating geometric shapes */}
      <FloatingGeometry
        position={[3, 2, -2]}
        scale={0.8}
        color="#8b5cf6"
        shape="octahedron"
      />
      <FloatingGeometry
        position={[-3, -1, 1]}
        scale={0.6}
        color="#06b6d4"
        shape="icosahedron"
      />
      <FloatingGeometry
        position={[2, -2, 3]}
        scale={0.7}
        color="#10b981"
        shape="torus"
      />
      <FloatingGeometry
        position={[-2, 3, -1]}
        scale={0.5}
        color="#f59e0b"
        shape="cube"
      />
      <FloatingGeometry
        position={[4, 0, 2]}
        scale={0.4}
        color="#ef4444"
        shape="sphere"
      />
      <FloatingGeometry
        position={[-4, 1, -3]}
        scale={0.6}
        color="#8b5cf6"
        shape="octahedron"
      />

      {/* Premium particle system */}
      <PremiumParticles />

      {/* Animated grid */}
      <PremiumGrid />

      {/* Contact shadows for premium feel */}
      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.4}
        scale={15}
        blur={2}
        far={4}
        color="#000000"
      />

      {/* Environment for reflections */}
      <Environment preset="city" background={false} />
    </group>
  );
};

// Main component with enhanced performance
const HeroCanvas: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="w-full h-full relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.9 }}
      transition={{
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2,
      }}
    >
      {/* Gradient background overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
          `,
        }}
      />

      <Canvas
        dpr={[1, 2]}
        style={{ background: "transparent" }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          logarithmicDepthBuffer: true,
        }}
        shadows="soft"
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        <Scene />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.4}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>

      {/* Premium loading indicator */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </motion.div>
  );
};

export { HeroCanvas };
