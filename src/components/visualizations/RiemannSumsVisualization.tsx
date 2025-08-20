import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";

interface RiemannSumsVisualizationProps {
  functionType?: "quadratic" | "cubic" | "sine";
  numRectangles?: number;
  method?: "left" | "right" | "midpoint";
  intervalStart?: number;
  intervalEnd?: number;
  showArea?: boolean;
  animationSpeed?: number;
}

export const RiemannSumsVisualization: React.FC<
  RiemannSumsVisualizationProps
> = ({
  functionType = "quadratic",
  numRectangles = 8,
  method = "left",
  intervalStart = 0,
  intervalEnd = 4,
  showArea = true,
  animationSpeed = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta * animationSpeed;
  });

  // Define mathematical functions
  const functions = {
    quadratic: (x: number) => 0.25 * x * x + 0.5,
    cubic: (x: number) => 0.1 * x * x * x - 0.3 * x * x + x + 1,
    sine: (x: number) => Math.sin(x) + 2,
  };

  const func = functions[functionType];

  // Generate function curve points
  const curvePoints = useMemo(() => {
    const points = [];
    for (let x = intervalStart - 1; x <= intervalEnd + 1; x += 0.05) {
      const y = func(x);
      points.push(new THREE.Vector3(x, y, 0));
    }
    return points;
  }, [functionType, intervalStart, intervalEnd]);

  // Calculate rectangles
  const rectangles = useMemo(() => {
    const rects = [];
    const deltaX = (intervalEnd - intervalStart) / numRectangles;
    let totalArea = 0;

    for (let i = 0; i < numRectangles; i++) {
      const x1 = intervalStart + i * deltaX;
      const x2 = intervalStart + (i + 1) * deltaX;

      let sampleX;
      switch (method) {
        case "left":
          sampleX = x1;
          break;
        case "right":
          sampleX = x2;
          break;
        case "midpoint":
          sampleX = (x1 + x2) / 2;
          break;
        default:
          sampleX = x1;
      }

      const height = func(sampleX);
      const area = deltaX * height;
      totalArea += area;

      // Create rectangle geometry
      const rectGeometry = new THREE.PlaneGeometry(deltaX, height);
      const rectPosition = new THREE.Vector3(x1 + deltaX / 2, height / 2, 0);

      rects.push({
        geometry: rectGeometry,
        position: rectPosition,
        height,
        area,
        index: i,
      });
    }

    return { rectangles: rects, totalArea };
  }, [numRectangles, method, intervalStart, intervalEnd, functionType]);

  // Calculate exact area (for comparison)
  const exactArea = useMemo(() => {
    // Numerical integration using Simpson's rule for approximation
    const n = 1000;
    const h = (intervalEnd - intervalStart) / n;
    let sum = func(intervalStart) + func(intervalEnd);

    for (let i = 1; i < n; i++) {
      const x = intervalStart + i * h;
      sum += (i % 2 === 0 ? 2 : 4) * func(x);
    }

    return (h / 3) * sum;
  }, [functionType, intervalStart, intervalEnd]);

  return (
    <group ref={groupRef}>
      {/* Function curve */}
      <Line points={curvePoints} color="#3b82f6" lineWidth={4} />

      {/* Rectangles */}
      {rectangles.rectangles.map((rect, index) => {
        const hue = (index / numRectangles) * 0.6 + 0.1; // Blue to cyan gradient
        const color = new THREE.Color().setHSL(hue, 0.7, 0.6);

        return (
          <group key={index}>
            {/* Rectangle fill */}
            <mesh position={rect.position}>
              <planeGeometry
                args={[
                  rect.geometry.parameters.width,
                  rect.geometry.parameters.height,
                ]}
              />
              <meshStandardMaterial
                color={color}
                transparent
                opacity={0.6}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Rectangle outline */}
            <lineSegments position={rect.position}>
              <edgesGeometry args={[rect.geometry]} />
              <lineBasicMaterial color="#1e40af" linewidth={2} />
            </lineSegments>
          </group>
        );
      })}

      {/* Sample points */}
      {rectangles.rectangles.map((rect, index) => {
        const deltaX = (intervalEnd - intervalStart) / numRectangles;
        const x1 = intervalStart + index * deltaX;
        const x2 = intervalStart + (index + 1) * deltaX;

        let sampleX;
        switch (method) {
          case "left":
            sampleX = x1;
            break;
          case "right":
            sampleX = x2;
            break;
          case "midpoint":
            sampleX = (x1 + x2) / 2;
            break;
          default:
            sampleX = x1;
        }

        return (
          <mesh
            key={`point-${index}`}
            position={[sampleX, func(sampleX), 0.01]}
          >
            <sphereGeometry args={[0.05]} />
            <meshStandardMaterial color="#ef4444" />
          </mesh>
        );
      })}

      {/* Coordinate axes */}
      <Line
        points={[new THREE.Vector3(-1, 0, 0), new THREE.Vector3(6, 0, 0)]}
        color="#6b7280"
        lineWidth={1}
      />
      <Line
        points={[new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 6, 0)]}
        color="#6b7280"
        lineWidth={1}
      />

      {/* Interval markers */}
      <Line
        points={[
          new THREE.Vector3(intervalStart, -0.2, 0),
          new THREE.Vector3(intervalStart, 0.2, 0),
        ]}
        color="#10b981"
        lineWidth={3}
      />
      <Line
        points={[
          new THREE.Vector3(intervalEnd, -0.2, 0),
          new THREE.Vector3(intervalEnd, 0.2, 0),
        ]}
        color="#10b981"
        lineWidth={3}
      />

      {/* Labels */}
      <Text
        position={[intervalStart, -0.5, 0]}
        fontSize={0.3}
        color="#10b981"
        anchorX="center"
        anchorY="middle"
      >
        a = {intervalStart}
      </Text>

      <Text
        position={[intervalEnd, -0.5, 0]}
        fontSize={0.3}
        color="#10b981"
        anchorX="center"
        anchorY="middle"
      >
        b = {intervalEnd}
      </Text>

      {/* Area information */}
      <Text
        position={[intervalEnd + 1, 4, 0]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
      >
        Riemann Sum: {rectangles.totalArea.toFixed(3)}
      </Text>

      <Text
        position={[intervalEnd + 1, 3.5, 0]}
        fontSize={0.25}
        color="#10b981"
        anchorX="left"
        anchorY="middle"
      >
        Exact Area: {exactArea.toFixed(3)}
      </Text>

      <Text
        position={[intervalEnd + 1, 3, 0]}
        fontSize={0.2}
        color="#f59e0b"
        anchorX="left"
        anchorY="middle"
      >
        Error: {Math.abs(rectangles.totalArea - exactArea).toFixed(3)}
      </Text>

      {/* Method and function info */}
      <Text
        position={[0, 5.5, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {functionType === "quadratic" && "f(x) = 0.25x² + 0.5"}
        {functionType === "cubic" && "f(x) = 0.1x³ - 0.3x² + x + 1"}
        {functionType === "sine" && "f(x) = sin(x) + 2"}
      </Text>

      <Text
        position={[0, 5, 0]}
        fontSize={0.3}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
      >
        Method: {method.charAt(0).toUpperCase() + method.slice(1)} Riemann Sum
      </Text>

      <Text
        position={[0, 4.5, 0]}
        fontSize={0.25}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
      >
        n = {numRectangles} rectangles
      </Text>
    </group>
  );
};
