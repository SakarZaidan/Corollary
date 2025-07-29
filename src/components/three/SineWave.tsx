import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';

interface SineWaveProps {
  rotationSpeed?: number;
  amplitude?: number;
  frequency?: number;
  segments?: number;
  phaseShift?: number;
}

const SineWave: React.FC<SineWaveProps> = ({
  rotationSpeed = 1,
  amplitude = 1,
  frequency = 1,
  segments = 100,
  phaseShift = 0
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

      <group ref={meshRef}>
        {points.map((point, i) => (
          <mesh key={i} position={[point.x, point.y, point.z]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color={`hsl(${(i / segments) * 360}, 80%, 60%)`}
              emissive={`hsl(${(i / segments) * 360}, 40%, 20%)`}
            />
          </mesh>
        ))}

        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
              count={points.length}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#ffffff" />
        </line>
      </group>
    </>
  );
};

export default SineWave;