import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface FractalCubeProps {
  rotationSpeed?: number;
  iterations?: number;
  scale?: number;
  spacing?: number;
}

const FractalCube: React.FC<FractalCubeProps> = ({
  rotationSpeed = 1,
  iterations = 3,
  scale = 0.8,
  spacing = 1
}) => {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += rotationSpeed * 0.008;
      groupRef.current.rotation.y += rotationSpeed * 0.012;
    }
  });

  const generateFractal = (level: number, position: number[], size: number): JSX.Element[] => {
    if (level <= 0) return [];

    const cubes: JSX.Element[] = [];
    const newSize = size * scale;
    const offset = (size - newSize) / 2 * spacing;

    const positions = [
      [-offset, -offset, -offset], [offset, -offset, -offset],
      [-offset, offset, -offset], [offset, offset, -offset],
      [-offset, -offset, offset], [offset, -offset, offset],
      [-offset, offset, offset], [offset, offset, offset]
    ];

    positions.forEach((pos, i) => {
      const newPos = [
        position[0] + pos[0],
        position[1] + pos[1],
        position[2] + pos[2]
      ];

      cubes.push(
        <mesh key={`${level}-${i}`} position={newPos as [number, number, number]}>
          <boxGeometry args={[newSize, newSize, newSize]} />
          <meshStandardMaterial
            color={`hsl(${(level * 60 + i * 30) % 360}, 70%, 60%)`}
            transparent
            opacity={0.7}
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

      <group ref={groupRef}>
        {generateFractal(iterations, [0, 0, 0], 2)}
      </group>
    </>
  );
};

export default FractalCube;