import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";

interface FourierSeriesVisualizationProps {
  waveType?: "square" | "sawtooth" | "triangle" | "custom";
  numTerms?: number;
  frequency?: number;
  amplitude?: number;
  showPartialSums?: boolean;
  animationSpeed?: number;
}

export const FourierSeriesVisualization: React.FC<
  FourierSeriesVisualizationProps
> = ({
  waveType = "square",
  numTerms = 5,
  frequency = 1,
  amplitude = 1,
  showPartialSums = true,
  animationSpeed = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta * animationSpeed;
  });

  // Define Fourier coefficients for different wave types
  const getFourierCoefficients = (type: string, n: number) => {
    switch (type) {
      case "square":
        return n % 2 === 1 ? 4 / (Math.PI * n) : 0;
      case "sawtooth":
        return (2 / (Math.PI * n)) * Math.pow(-1, n + 1);
      case "triangle":
        return n % 2 === 1
          ? (8 / (Math.PI * Math.PI * n * n)) * Math.pow(-1, (n - 1) / 2)
          : 0;
      default:
        return 1 / n; // Simple harmonic series
    }
  };

  // Generate the original function points
  const originalFunction = useMemo(() => {
    const points = [];
    const resolution = 200;
    const range = 2 * Math.PI;

    for (let i = 0; i <= resolution; i++) {
      const x = -range + (i / resolution) * 2 * range;
      let y = 0;

      switch (waveType) {
        case "square":
          y = Math.sign(Math.sin(frequency * x)) * amplitude;
          break;
        case "sawtooth":
          y =
            amplitude *
            (2 *
              ((frequency * x) / (2 * Math.PI) -
                Math.floor((frequency * x) / (2 * Math.PI) + 0.5)));
          break;
        case "triangle":
          y = amplitude * (2 / Math.PI) * Math.asin(Math.sin(frequency * x));
          break;
        default:
          y = amplitude * Math.sin(frequency * x);
      }

      points.push(new THREE.Vector3(x, y, 0));
    }

    return points;
  }, [waveType, frequency, amplitude]);

  // Generate Fourier series approximation
  const fourierApproximation = useMemo(() => {
    const points = [];
    const resolution = 200;
    const range = 2 * Math.PI;

    for (let i = 0; i <= resolution; i++) {
      const x = -range + (i / resolution) * 2 * range;
      let y = 0;

      // Sum the Fourier series terms
      for (let n = 1; n <= numTerms; n++) {
        const coefficient = getFourierCoefficients(waveType, n);
        y += coefficient * amplitude * Math.sin(n * frequency * x);
      }

      points.push(new THREE.Vector3(x, y, 0));
    }

    return points;
  }, [waveType, numTerms, frequency, amplitude]);

  // Generate partial sums for animation
  const partialSums = useMemo(() => {
    if (!showPartialSums) return [];

    const sums = [];
    const resolution = 100;
    const range = 2 * Math.PI;

    for (let terms = 1; terms <= Math.min(numTerms, 8); terms++) {
      const points = [];

      for (let i = 0; i <= resolution; i++) {
        const x = -range + (i / resolution) * 2 * range;
        let y = 0;

        for (let n = 1; n <= terms; n++) {
          const coefficient = getFourierCoefficients(waveType, n);
          y += coefficient * amplitude * Math.sin(n * frequency * x);
        }

        points.push(new THREE.Vector3(x, y, 0));
      }

      sums.push({
        points,
        terms,
        color: new THREE.Color().setHSL((terms - 1) / 8, 0.8, 0.6),
      });
    }

    return sums;
  }, [waveType, numTerms, frequency, amplitude, showPartialSums]);

  // Generate rotating phasors
  const phasors = useMemo(() => {
    const phasorData = [];
    const time = timeRef.current;

    for (let n = 1; n <= Math.min(numTerms, 6); n++) {
      const coefficient = getFourierCoefficients(waveType, n);
      const radius = Math.abs(coefficient * amplitude);
      const angle = n * frequency * time;

      phasorData.push({
        radius,
        angle,
        frequency: n * frequency,
        coefficient,
        n,
      });
    }

    return phasorData;
  }, [waveType, numTerms, frequency, amplitude, timeRef.current]);

  return (
    <group ref={groupRef}>
      {/* Coordinate axes */}
      <Line
        points={[new THREE.Vector3(-8, 0, 0), new THREE.Vector3(8, 0, 0)]}
        color="#6b7280"
        lineWidth={1}
      />
      <Line
        points={[new THREE.Vector3(0, -3, 0), new THREE.Vector3(0, 3, 0)]}
        color="#6b7280"
        lineWidth={1}
      />

      {/* Original function */}
      <Line
        points={originalFunction}
        color="#ef4444"
        lineWidth={3}
        transparent
        opacity={0.7}
      />

      {/* Fourier approximation */}
      <Line points={fourierApproximation} color="#10b981" lineWidth={4} />

      {/* Partial sums */}
      {showPartialSums &&
        partialSums.map((sum, index) => (
          <Line
            key={`partial-${index}`}
            points={sum.points}
            color={sum.color}
            lineWidth={2}
            transparent
            opacity={0.4}
          />
        ))}

      {/* Phasor diagram */}
      <group position={[5, 0, 0]}>
        {/* Phasor circle */}
        <Line
          points={Array.from({ length: 65 }, (_, i) => {
            const angle = (i / 64) * 2 * Math.PI;
            return new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0);
          })}
          color="#374151"
          lineWidth={1}
          transparent
          opacity={0.3}
        />

        {/* Rotating phasors */}
        {phasors.map((phasor, index) => {
          const x = phasor.radius * Math.cos(phasor.angle);
          const y = phasor.radius * Math.sin(phasor.angle);

          return (
            <group key={`phasor-${index}`}>
              <Line
                points={[
                  new THREE.Vector3(0, 0, 0),
                  new THREE.Vector3(x, y, 0),
                ]}
                color={new THREE.Color().setHSL(index / 6, 0.8, 0.6)}
                lineWidth={3}
              />
              <mesh position={[x, y, 0]}>
                <sphereGeometry args={[0.05]} />
                <meshStandardMaterial
                  color={new THREE.Color().setHSL(index / 6, 0.8, 0.6)}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Labels and information */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Fourier Series: {waveType.charAt(0).toUpperCase() + waveType.slice(1)}{" "}
        Wave
      </Text>

      <Text
        position={[0, -2.5, 0]}
        fontSize={0.3}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
      >
        Terms: {numTerms} | Red: Original | Green: Approximation
      </Text>

      <Text
        position={[5, -2, 0]}
        fontSize={0.25}
        color="#f59e0b"
        anchorX="center"
        anchorY="middle"
      >
        Phasor Diagram
      </Text>

      {/* Axis labels */}
      <Text
        position={[7.5, -0.3, 0]}
        fontSize={0.3}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
      >
        x
      </Text>

      <Text
        position={[-0.3, 2.7, 0]}
        fontSize={0.3}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
      >
        f(x)
      </Text>
    </group>
  );
};
