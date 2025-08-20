import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";

interface ComplexFunctionVisualizationProps {
  functionType?:
    | "identity"
    | "square"
    | "inverse"
    | "exponential"
    | "logarithm"
    | "mobius";
  gridDensity?: number;
  showDomain?: boolean;
  showRange?: boolean;
  animationSpeed?: number;
}

export const ComplexFunctionVisualization: React.FC<
  ComplexFunctionVisualizationProps
> = ({
  functionType = "square",
  gridDensity = 10,
  showDomain = true,
  showRange = true,
  animationSpeed = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta * animationSpeed;
  });

  // Complex number operations
  const complex = {
    add: (a: { re: number; im: number }, b: { re: number; im: number }) => ({
      re: a.re + b.re,
      im: a.im + b.im,
    }),
    multiply: (
      a: { re: number; im: number },
      b: { re: number; im: number }
    ) => ({
      re: a.re * b.re - a.im * b.im,
      im: a.re * b.im + a.im * b.re,
    }),
    divide: (a: { re: number; im: number }, b: { re: number; im: number }) => {
      const denom = b.re * b.re + b.im * b.im;
      return {
        re: (a.re * b.re + a.im * b.im) / denom,
        im: (a.im * b.re - a.re * b.im) / denom,
      };
    },
    exp: (z: { re: number; im: number }) => {
      const r = Math.exp(z.re);
      return {
        re: r * Math.cos(z.im),
        im: r * Math.sin(z.im),
      };
    },
    log: (z: { re: number; im: number }) => {
      const r = Math.sqrt(z.re * z.re + z.im * z.im);
      const theta = Math.atan2(z.im, z.re);
      return {
        re: Math.log(r),
        im: theta,
      };
    },
  };

  // Define complex functions
  const applyFunction = (z: { re: number; im: number }) => {
    switch (functionType) {
      case "identity":
        return z;
      case "square":
        return complex.multiply(z, z);
      case "inverse":
        return complex.divide({ re: 1, im: 0 }, z);
      case "exponential":
        return complex.exp(z);
      case "logarithm":
        if (z.re === 0 && z.im === 0) return { re: -Infinity, im: 0 };
        return complex.log(z);
      case "mobius":
        // (z + 1) / (z - 1)
        const numerator = complex.add(z, { re: 1, im: 0 });
        const denominator = complex.add(z, { re: -1, im: 0 });
        if (denominator.re === 0 && denominator.im === 0)
          return { re: Infinity, im: 0 };
        return complex.divide(numerator, denominator);
      default:
        return z;
    }
  };

  // Generate domain grid
  const domainGrid = useMemo(() => {
    const lines = [];
    const range = 3;
    const step = (range * 2) / gridDensity;

    // Vertical lines (constant real part)
    for (let re = -range; re <= range; re += step) {
      const points = [];
      for (let im = -range; im <= range; im += 0.1) {
        points.push(new THREE.Vector3(re, im, 0));
      }
      lines.push({ points, type: "vertical" });
    }

    // Horizontal lines (constant imaginary part)
    for (let im = -range; im <= range; im += step) {
      const points = [];
      for (let re = -range; re <= range; re += 0.1) {
        points.push(new THREE.Vector3(re, im, 0));
      }
      lines.push({ points, type: "horizontal" });
    }

    return lines;
  }, [gridDensity]);

  // Generate range grid (transformed)
  const rangeGrid = useMemo(() => {
    const lines = [];
    const range = 3;
    const step = (range * 2) / gridDensity;

    // Transform vertical lines
    for (let re = -range; re <= range; re += step) {
      const points = [];
      for (let im = -range; im <= range; im += 0.1) {
        const z = { re, im };
        const w = applyFunction(z);

        // Clamp to reasonable bounds for visualization
        if (
          Math.abs(w.re) < 10 &&
          Math.abs(w.im) < 10 &&
          !isNaN(w.re) &&
          !isNaN(w.im) &&
          isFinite(w.re) &&
          isFinite(w.im)
        ) {
          points.push(new THREE.Vector3(w.re, w.im, 0));
        }
      }
      if (points.length > 1) {
        lines.push({ points, type: "vertical" });
      }
    }

    // Transform horizontal lines
    for (let im = -range; im <= range; im += step) {
      const points = [];
      for (let re = -range; re <= range; re += 0.1) {
        const z = { re, im };
        const w = applyFunction(z);

        if (
          Math.abs(w.re) < 10 &&
          Math.abs(w.im) < 10 &&
          !isNaN(w.re) &&
          !isNaN(w.im) &&
          isFinite(w.re) &&
          isFinite(w.im)
        ) {
          points.push(new THREE.Vector3(w.re, w.im, 0));
        }
      }
      if (points.length > 1) {
        lines.push({ points, type: "horizontal" });
      }
    }

    return lines;
  }, [functionType, gridDensity]);

  // Special points and their transformations
  const specialPoints = useMemo(() => {
    const points = [
      { re: 1, im: 0, label: "1" },
      { re: 0, im: 1, label: "i" },
      { re: -1, im: 0, label: "-1" },
      { re: 0, im: -1, label: "-i" },
      { re: 1, im: 1, label: "1+i" },
      { re: -1, im: 1, label: "-1+i" },
    ];

    return points.map((point) => {
      const transformed = applyFunction(point);
      return {
        original: point,
        transformed,
        isValid:
          Math.abs(transformed.re) < 10 &&
          Math.abs(transformed.im) < 10 &&
          !isNaN(transformed.re) &&
          !isNaN(transformed.im) &&
          isFinite(transformed.re) &&
          isFinite(transformed.im),
      };
    });
  }, [functionType]);

  return (
    <group ref={groupRef}>
      {/* Domain plane (left side) */}
      {showDomain && (
        <group position={[-6, 0, 0]}>
          {/* Domain axes */}
          <Line
            points={[new THREE.Vector3(-4, 0, 0), new THREE.Vector3(4, 0, 0)]}
            color="#6b7280"
            lineWidth={2}
          />
          <Line
            points={[new THREE.Vector3(0, -4, 0), new THREE.Vector3(0, 4, 0)]}
            color="#6b7280"
            lineWidth={2}
          />

          {/* Domain grid */}
          {domainGrid.map((line, index) => (
            <Line
              key={`domain-${index}`}
              points={line.points}
              color={line.type === "vertical" ? "#3b82f6" : "#ef4444"}
              lineWidth={1}
              transparent
              opacity={0.6}
            />
          ))}

          {/* Domain special points */}
          {specialPoints.map((point, index) => (
            <group key={`domain-point-${index}`}>
              <mesh position={[point.original.re, point.original.im, 0]}>
                <sphereGeometry args={[0.08]} />
                <meshStandardMaterial color="#f59e0b" />
              </mesh>
              <Text
                position={[point.original.re + 0.2, point.original.im + 0.2, 0]}
                fontSize={0.2}
                color="#f59e0b"
                anchorX="left"
                anchorY="middle"
              >
                {point.original.label}
              </Text>
            </group>
          ))}

          <Text
            position={[0, -4.5, 0]}
            fontSize={0.4}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            Domain (z-plane)
          </Text>
        </group>
      )}

      {/* Range plane (right side) */}
      {showRange && (
        <group position={[6, 0, 0]}>
          {/* Range axes */}
          <Line
            points={[new THREE.Vector3(-4, 0, 0), new THREE.Vector3(4, 0, 0)]}
            color="#6b7280"
            lineWidth={2}
          />
          <Line
            points={[new THREE.Vector3(0, -4, 0), new THREE.Vector3(0, 4, 0)]}
            color="#6b7280"
            lineWidth={2}
          />

          {/* Range grid (transformed) */}
          {rangeGrid.map((line, index) => (
            <Line
              key={`range-${index}`}
              points={line.points}
              color={line.type === "vertical" ? "#3b82f6" : "#ef4444"}
              lineWidth={2}
              transparent
              opacity={0.8}
            />
          ))}

          {/* Range special points */}
          {specialPoints
            .filter((p) => p.isValid)
            .map((point, index) => (
              <group key={`range-point-${index}`}>
                <mesh
                  position={[point.transformed.re, point.transformed.im, 0]}
                >
                  <sphereGeometry args={[0.08]} />
                  <meshStandardMaterial color="#10b981" />
                </mesh>
                <Text
                  position={[
                    point.transformed.re + 0.2,
                    point.transformed.im + 0.2,
                    0,
                  ]}
                  fontSize={0.2}
                  color="#10b981"
                  anchorX="left"
                  anchorY="middle"
                >
                  f({point.original.label})
                </Text>
              </group>
            ))}

          <Text
            position={[0, -4.5, 0]}
            fontSize={0.4}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            Range (w-plane)
          </Text>
        </group>
      )}

      {/* Function information */}
      <Text
        position={[0, 4.5, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Complex Function: w = f(z)
      </Text>

      <Text
        position={[0, 4, 0]}
        fontSize={0.3}
        color="#f59e0b"
        anchorX="center"
        anchorY="middle"
      >
        {functionType === "identity" && "f(z) = z"}
        {functionType === "square" && "f(z) = z²"}
        {functionType === "inverse" && "f(z) = 1/z"}
        {functionType === "exponential" && "f(z) = eᶻ"}
        {functionType === "logarithm" && "f(z) = ln(z)"}
        {functionType === "mobius" && "f(z) = (z+1)/(z-1)"}
      </Text>

      {/* Legend */}
      <Text
        position={[0, -4.5, 0]}
        fontSize={0.25}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
      >
        Blue: Vertical lines | Red: Horizontal lines
      </Text>

      {/* Arrow indicating transformation */}
      <Line
        points={[new THREE.Vector3(-1, 0, 0), new THREE.Vector3(1, 0, 0)]}
        color="#ffffff"
        lineWidth={3}
      />
      <mesh position={[1, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.1, 0.3]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};
