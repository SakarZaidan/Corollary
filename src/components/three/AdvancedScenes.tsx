/**
 * Advanced mathematical scene components for the enhanced VisualizationWorkspace
 * These components demonstrate complex mathematical concepts with interactive parameters
 */

import { FC, useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group, Vector3 } from "three";

// ==================== PARAMETRIC SURFACE COMPONENT ====================
interface ParametricSurfaceProps {
  rotationSpeed: number;
  amplitude?: number;
  frequency?: number;
  uSegments?: number;
  vSegments?: number;
}

export const ParametricSurface: FC<ParametricSurfaceProps> = ({
  rotationSpeed,
  amplitude = 2,
  frequency = 1,
  uSegments = 50,
  vSegments = 50,
}) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * 0.01;
      // Dynamic surface animation
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    }
  });

  // Generate parametric surface vertices
  const geometry = useMemo(() => {
    const positions: number[] = [];
    const indices: number[] = [];
    const normals: number[] = [];

    for (let u = 0; u <= uSegments; u++) {
      for (let v = 0; v <= vSegments; v++) {
        const uParam = (u / uSegments) * Math.PI * 2;
        const vParam = (v / vSegments) * Math.PI;

        // Parametric surface equations (torus-like surface)
        const x = amplitude * Math.cos(uParam) * Math.sin(vParam) * frequency;
        const y = amplitude * Math.cos(vParam);
        const z = amplitude * Math.sin(uParam) * Math.sin(vParam) * frequency;

        positions.push(x, y, z);

        // Calculate normals for proper lighting
        const normal = new Vector3(x, y, z).normalize();
        normals.push(normal.x, normal.y, normal.z);
      }
    }

    // Generate indices for triangles
    for (let u = 0; u < uSegments; u++) {
      for (let v = 0; v < vSegments; v++) {
        const a = u * (vSegments + 1) + v;
        const b = u * (vSegments + 1) + v + 1;
        const c = (u + 1) * (vSegments + 1) + v;
        const d = (u + 1) * (vSegments + 1) + v + 1;

        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }

    return {
      positions: new Float32Array(positions),
      indices,
      normals: new Float32Array(normals),
    };
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
            attach="attributes-normal"
            array={geometry.normals}
            count={geometry.normals.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="index"
            array={new Uint16Array(geometry.indices)}
            count={geometry.indices.length}
            itemSize={1}
          />
        </bufferGeometry>
        <meshPhongMaterial
          color="#4ecdc4"
          wireframe={true}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
    </>
  );
};

// ==================== FRACTAL CUBE COMPONENT ====================
interface FractalCubeProps {
  rotationSpeed: number;
  iterations?: number;
  scale?: number;
  spacing?: number;
}

export const FractalCube: FC<FractalCubeProps> = ({
  rotationSpeed,
  iterations = 3,
  scale = 0.8,
  spacing = 1,
}) => {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += rotationSpeed * 0.008;
      groupRef.current.rotation.y += rotationSpeed * 0.012;
    }
  });

  const generateFractal = (
    level: number,
    position: number[],
    size: number
  ): JSX.Element[] => {
    if (level <= 0) return [];

    const cubes: JSX.Element[] = [];
    const newSize = size * scale;
    const offset = ((size - newSize) / 2) * spacing;

    // Create 8 smaller cubes at corners
    const positions = [
      [-offset, -offset, -offset],
      [offset, -offset, -offset],
      [-offset, offset, -offset],
      [offset, offset, -offset],
      [-offset, -offset, offset],
      [offset, -offset, offset],
      [-offset, offset, offset],
      [offset, offset, offset],
    ];

    positions.forEach((pos, i) => {
      const newPos = [
        position[0] + pos[0],
        position[1] + pos[1],
        position[2] + pos[2],
      ];

      cubes.push(
        <mesh
          key={`${level}-${i}`}
          position={newPos as [number, number, number]}
        >
          <boxGeometry args={[newSize, newSize, newSize]} />
          <meshStandardMaterial
            color={`hsl(${(level * 60 + i * 30) % 360}, 70%, 60%)`}
            transparent={true}
            opacity={0.7}
            roughness={0.4}
            metalness={0.2}
          />
        </mesh>
      );

      if (level > 1) {
        cubes.push(...generateFractal(level - 1, newPos, newSize));
      }
    });

    return cubes;
  };

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#e74c3c" />

      <group ref={groupRef}>{generateFractal(iterations, [0, 0, 0], 2)}</group>
    </>
  );
};

// ==================== SINE WAVE COMPONENT ====================
interface SineWaveProps {
  rotationSpeed: number;
  amplitude?: number;
  frequency?: number;
  segments?: number;
  phaseShift?: number;
}

export const SineWave: FC<SineWaveProps> = ({
  rotationSpeed,
  amplitude = 1,
  frequency = 1,
  segments = 100,
  phaseShift = 0,
}) => {
  const meshRef = useRef<Group>(null);
  const [time, setTime] = useState(0);

  useFrame((state) => {
    setTime(state.clock.elapsedTime);
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * 0.01;
    }
  });

  const points = useMemo(() => {
    const pts: Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * 10 - 5;
      const y = amplitude * Math.sin(frequency * x + phaseShift + time * 2);
      const z = 0;
      pts.push(new Vector3(x, y, z));
    }
    return pts;
  }, [amplitude, frequency, segments, phaseShift, time]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 5]} intensity={1} />
      <pointLight position={[5, 0, 5]} intensity={0.3} color="#f39c12" />

      <group ref={meshRef}>
        {/* Wave points */}
        {points.map((point, i) => (
          <mesh key={i} position={[point.x, point.y, point.z]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color={`hsl(${(i / segments) * 360}, 80%, 60%)`}
              emissive={`hsl(${(i / segments) * 360}, 40%, 20%)`}
              roughness={0.2}
              metalness={0.3}
            />
          </mesh>
        ))}

        {/* Wave line - using a different approach for better performance */}
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
              count={points.length}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#ffffff" linewidth={2} />
        </line>

        {/* Reference axes */}
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={new Float32Array([-6, 0, 0, 6, 0, 0])}
              count={2}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#666666" />
        </line>

        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={new Float32Array([0, -3, 0, 0, 3, 0])}
              count={2}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#666666" />
        </line>
      </group>
    </>
  );
};

// ==================== VECTOR FIELD COMPONENT ====================
interface VectorFieldProps {
  rotationSpeed: number;
  fieldStrength?: number;
  gridSize?: number;
  vectorScale?: number;
}

export const VectorField: FC<VectorFieldProps> = ({
  rotationSpeed,
  fieldStrength = 1,
  gridSize = 10,
  vectorScale = 0.5,
}) => {
  const groupRef = useRef<Group>(null);
  const [time, setTime] = useState(0);

  useFrame((state) => {
    setTime(state.clock.elapsedTime);
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed * 0.005;
    }
  });

  const vectors = useMemo(() => {
    const vecs: {
      position: [number, number, number];
      direction: [number, number, number];
      magnitude: number;
    }[] = [];

    for (let x = -gridSize; x <= gridSize; x += 2) {
      for (let y = -gridSize; y <= gridSize; y += 2) {
        for (let z = -gridSize; z <= gridSize; z += 2) {
          // Simple vector field: circular flow
          const vx = fieldStrength * (-y + Math.sin(time * 0.5) * 0.5);
          const vy = fieldStrength * (x + Math.cos(time * 0.5) * 0.5);
          const vz = fieldStrength * Math.sin(x * 0.3 + y * 0.3 + time) * 0.3;

          const magnitude = Math.sqrt(vx * vx + vy * vy + vz * vz);

          vecs.push({
            position: [x, y, z],
            direction: [vx, vy, vz],
            magnitude,
          });
        }
      }
    }

    return vecs;
  }, [fieldStrength, gridSize, time]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={0.8} />

      <group ref={groupRef}>
        {vectors.map((vec, i) => (
          <group key={i} position={vec.position}>
            {/* Vector arrow shaft */}
            <mesh
              position={[
                vec.direction[0] * vectorScale * 0.5,
                vec.direction[1] * vectorScale * 0.5,
                vec.direction[2] * vectorScale * 0.5,
              ]}
            >
              <cylinderGeometry
                args={[0.02, 0.02, vec.magnitude * vectorScale, 8]}
              />
              <meshStandardMaterial
                color={`hsl(${vec.magnitude * 100}, 70%, 60%)`}
                emissive={`hsl(${vec.magnitude * 100}, 30%, 20%)`}
              />
            </mesh>

            {/* Vector arrow head */}
            <mesh
              position={[
                vec.direction[0] * vectorScale,
                vec.direction[1] * vectorScale,
                vec.direction[2] * vectorScale,
              ]}
            >
              <coneGeometry args={[0.08, 0.2, 8]} />
              <meshStandardMaterial
                color={`hsl(${vec.magnitude * 100}, 80%, 50%)`}
              />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
};
