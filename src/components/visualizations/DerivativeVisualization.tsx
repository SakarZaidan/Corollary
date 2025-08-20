import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";

interface DerivativeVisualizationProps {
  functionType?: "polynomial" | "trigonometric" | "exponential";
  xValue?: number;
  showTangent?: boolean;
  showSecant?: boolean;
  deltaX?: number;
  animationSpeed?: number;
}

export const DerivativeVisualization: React.FC<
  DerivativeVisualizationProps
> = ({
  functionType = "polynomial",
  xValue = 1,
  showTangent = true,
  showSecant = false,
  deltaX = 0.5,
  animationSpeed = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta * animationSpeed;
  });

  // Define mathematical functions
  const functions = {
    polynomial: (x: number) => 0.1 * x * x * x - 0.5 * x * x + x + 1,
    trigonometric: (x: number) => Math.sin(x) + 0.5 * Math.cos(2 * x),
    exponential: (x: number) => Math.exp(x * 0.3) - 1,
  };

  const derivatives = {
    polynomial: (x: number) => 0.3 * x * x - x + 1,
    trigonometric: (x: number) => Math.cos(x) - Math.sin(2 * x),
    exponential: (x: number) => 0.3 * Math.exp(x * 0.3),
  };

  const func = functions[functionType];
  const derivative = derivatives[functionType];

  // Generate function curve points
  const curvePoints = useMemo(() => {
    const points = [];
    for (let x = -4; x <= 4; x += 0.1) {
      const y = func(x);
      points.push(new THREE.Vector3(x, y, 0));
    }
    return points;
  }, [functionType]);

  // Calculate tangent line
  const tangentPoints = useMemo(() => {
    const y = func(xValue);
    const slope = derivative(xValue);
    const length = 2;
    return [
      new THREE.Vector3(xValue - length, y - slope * length, 0),
      new THREE.Vector3(xValue + length, y + slope * length, 0),
    ];
  }, [xValue, functionType]);

  // Calculate secant line
  const secantPoints = useMemo(() => {
    const x1 = xValue;
    const x2 = xValue + deltaX;
    const y1 = func(x1);
    const y2 = func(x2);
    const slope = (y2 - y1) / (x2 - x1);
    const length = 2;
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    return [
      new THREE.Vector3(midX - length, midY - slope * length, 0),
      new THREE.Vector3(midX + length, midY + slope * length, 0),
    ];
  }, [xValue, deltaX, functionType]);

  return (
    <group ref={groupRef}>
      {/* Function curve */}
      <Line points={curvePoints} color="#3b82f6" lineWidth={3} />

      {/* Point on curve */}
      <mesh position={[xValue, func(xValue), 0]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>

      {/* Tangent line */}
      {showTangent && (
        <Line points={tangentPoints} color="#10b981" lineWidth={2} />
      )}

      {/* Secant line */}
      {showSecant && (
        <>
          <Line points={secantPoints} color="#f59e0b" lineWidth={2} />
          {/* Second point for secant */}
          <mesh position={[xValue + deltaX, func(xValue + deltaX), 0]}>
            <sphereGeometry args={[0.06]} />
            <meshStandardMaterial color="#f59e0b" />
          </mesh>
        </>
      )}

      {/* Coordinate axes */}
      <Line
        points={[new THREE.Vector3(-5, 0, 0), new THREE.Vector3(5, 0, 0)]}
        color="#6b7280"
        lineWidth={1}
      />
      <Line
        points={[new THREE.Vector3(0, -3, 0), new THREE.Vector3(0, 5, 0)]}
        color="#6b7280"
        lineWidth={1}
      />

      {/* Labels */}
      <Text
        position={[xValue, func(xValue) + 0.5, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        f({xValue.toFixed(1)})
      </Text>

      {showTangent && (
        <Text
          position={[
            xValue + 1.5,
            func(xValue) + derivative(xValue) * 1.5 + 0.3,
            0,
          ]}
          fontSize={0.25}
          color="#10b981"
          anchorX="center"
          anchorY="middle"
        >
          f'({xValue.toFixed(1)}) = {derivative(xValue).toFixed(2)}
        </Text>
      )}

      {/* Function title */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {functionType === "polynomial" && "f(x) = 0.1x³ - 0.5x² + x + 1"}
        {functionType === "trigonometric" && "f(x) = sin(x) + 0.5cos(2x)"}
        {functionType === "exponential" && "f(x) = e^(0.3x) - 1"}
      </Text>
    </group>
  );
};
