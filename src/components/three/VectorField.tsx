import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

interface VectorFieldProps {
  rotationSpeed?: number;
  density?: number;
  scale?: number;
}

export const VectorField: React.FC<VectorFieldProps> = ({
  rotationSpeed = 1,
  density = 20,
  scale = 0.5
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed * 0.005;
    }
  });

  const vectors = useMemo(() => {
    const vecs: JSX.Element[] = [];
    const half = density / 2;

    for (let x = -half; x <= half; x++) {
      for (let y = -half; y <= half; y++) {
        for (let z = -half; z <= half; z++) {
          const position = [x, y, z];
          const direction = new Vector3(
            Math.sin(y),
            Math.cos(z),
            Math.sin(x)
          ).normalize();

          vecs.push(
            <arrowHelper
              key={`${x}-${y}-${z}`}
              args={[direction, position, scale, 0x00ff00]}
            />
          );
        }
      }
    }

    return vecs;
  }, [density, scale]);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      {vectors}
    </group>
  );
};