import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface ParametricSurfaceProps {
  rotationSpeed?: number;
  amplitude?: number;
  frequency?: number;
  uSegments?: number;
  vSegments?: number;
}

const ParametricSurface: React.FC<ParametricSurfaceProps> = ({
  rotationSpeed = 1,
  amplitude = 2,
  frequency = 1,
  uSegments = 50,
  vSegments = 50
}) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * 0.01;
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    }
  });

  const geometry = useMemo(() => {
    const positions: number[] = [];
    const indices: number[] = [];

    for (let u = 0; u <= uSegments; u++) {
      for (let v = 0; v <= vSegments; v++) {
        const uParam = (u / uSegments) * Math.PI * 2;
        const vParam = (v / vSegments) * Math.PI;

        const x = amplitude * Math.cos(uParam) * Math.sin(vParam) * frequency;
        const y = amplitude * Math.cos(vParam);
        const z = amplitude * Math.sin(uParam) * Math.sin(vParam) * frequency;

        positions.push(x, y, z);
      }
    }

    for (let u = 0; u < uSegments; u++) {
      for (let v = 0; v < vSegments; v++) {
        const a = u * (vSegments + 1) + v;
        const b = u * (vSegments + 1) + v + 1;
        const c = (u + 1) * (vSegments + 1) + v;
        const d = (u + 1) * (vSegments + 1) + v + 1;

        indices.push(a, b, c, b, d, c);
      }
    }

    return { positions: new Float32Array(positions), indices };
  }, [amplitude, frequency, uSegments, vSegments]);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff6b6b" />

      <mesh ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={geometry.positions}
            count={geometry.positions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="index"
            array={new Uint16Array(geometry.indices)}
            count={geometry.indices.length}
            itemSize={1}
          />
        </bufferGeometry>
        <meshPhongMaterial color="#4ecdc4" wireframe transparent opacity={0.8} />
      </mesh>
    </>
  );
};

export default ParametricSurface;