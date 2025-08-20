import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";

interface SlopeFieldVisualizationProps {
  equationType?: "exponential" | "logistic" | "harmonic" | "custom";
  customFunction?: string;
  gridDensity?: number;
  showSolutionCurves?: boolean;
  numSolutionCurves?: number;
  vectorScale?: number;
  animationSpeed?: number;
}

export const SlopeFieldVisualization: React.FC<
  SlopeFieldVisualizationProps
> = ({
  equationType = "exponential",
  customFunction = "x + y",
  gridDensity = 15,
  showSolutionCurves = true,
  numSolutionCurves = 5,
  vectorScale = 0.3,
  animationSpeed = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta * animationSpeed;
  });

  // Safe expression evaluator
  const evaluateExpression = (x: number, y: number, expr: string): number => {
    try {
      // Replace variables with values
      let expression = expr
        .toLowerCase()
        .replace(/\bx\b/g, x.toString())
        .replace(/\by\b/g, y.toString())
        .replace(/\^/g, "**")
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/tan/g, "Math.tan")
        .replace(/exp/g, "Math.exp")
        .replace(/log/g, "Math.log")
        .replace(/sqrt/g, "Math.sqrt")
        .replace(/abs/g, "Math.abs");

      // Basic safety check
      if (!/^[\d\s+\-*/().\w]*$/.test(expression.replace(/Math\./g, ""))) {
        return x + y;
      }

      return Function('"use strict"; return (' + expression + ")")();
    } catch {
      return x + y; // fallback
    }
  };

  // Define differential equations dy/dx = f(x, y)
  const differentialEquations = {
    exponential: (x: number, y: number) => y, // dy/dx = y
    logistic: (x: number, y: number) => y * (1 - y), // dy/dx = y(1-y)
    harmonic: (x: number, y: number) => -x, // dy/dx = -x (simple harmonic)
    custom: (x: number, y: number) => evaluateExpression(x, y, customFunction),
  };

  const dydx = differentialEquations[equationType];

  // Generate slope field
  const slopeField = useMemo(() => {
    const vectors = [];
    const range = 4;
    const step = (2 * range) / gridDensity;

    for (let x = -range; x <= range; x += step) {
      for (let y = -range; y <= range; y += step) {
        const slope = dydx(x, y);

        // Normalize the direction vector
        const dx = 1;
        const dy = slope;
        const magnitude = Math.sqrt(dx * dx + dy * dy);
        const normalizedDx = (dx / magnitude) * vectorScale;
        const normalizedDy = (dy / magnitude) * vectorScale;

        // Create vector from center point
        const startX = x - normalizedDx / 2;
        const startY = y - normalizedDy / 2;
        const endX = x + normalizedDx / 2;
        const endY = y + normalizedDy / 2;

        vectors.push({
          start: new THREE.Vector3(startX, startY, 0),
          end: new THREE.Vector3(endX, endY, 0),
          center: new THREE.Vector3(x, y, 0),
          slope,
          magnitude,
        });
      }
    }

    return vectors;
  }, [gridDensity, vectorScale, equationType, customFunction]);

  // Generate solution curves using Euler's method
  const solutionCurves = useMemo(() => {
    if (!showSolutionCurves) return [];

    const curves = [];
    const range = 3;
    const stepSize = 0.05;
    const maxSteps = 200;

    // Generate initial conditions
    for (let i = 0; i < numSolutionCurves; i++) {
      const initialX = -range + (i / (numSolutionCurves - 1)) * 2 * range;
      const initialY = -2 + (i / (numSolutionCurves - 1)) * 4;

      // Forward integration
      const forwardPoints = [];
      let x = initialX;
      let y = initialY;

      for (
        let step = 0;
        step < maxSteps && Math.abs(x) < range && Math.abs(y) < range;
        step++
      ) {
        forwardPoints.push(new THREE.Vector3(x, y, 0));
        const slope = dydx(x, y);
        x += stepSize;
        y += slope * stepSize;
      }

      // Backward integration
      const backwardPoints = [];
      x = initialX;
      y = initialY;

      for (
        let step = 0;
        step < maxSteps && Math.abs(x) < range && Math.abs(y) < range;
        step++
      ) {
        backwardPoints.unshift(new THREE.Vector3(x, y, 0));
        const slope = dydx(x, y);
        x -= stepSize;
        y -= slope * stepSize;
      }

      curves.push({
        points: [...backwardPoints, ...forwardPoints],
        initialPoint: new THREE.Vector3(initialX, initialY, 0),
        color: new THREE.Color().setHSL(
          (i / numSolutionCurves) * 0.8 + 0.1,
          0.8,
          0.6
        ),
      });
    }

    return curves;
  }, [showSolutionCurves, numSolutionCurves, equationType, customFunction]);

  // Get equation display text
  const getEquationText = () => {
    switch (equationType) {
      case "exponential":
        return "dy/dx = y";
      case "logistic":
        return "dy/dx = y(1-y)";
      case "harmonic":
        return "dy/dx = -x";
      case "custom":
        return `dy/dx = ${customFunction}`;
      default:
        return "dy/dx = f(x,y)";
    }
  };

  return (
    <group ref={groupRef}>
      {/* Coordinate axes */}
      <Line
        points={[new THREE.Vector3(-5, 0, 0), new THREE.Vector3(5, 0, 0)]}
        color="#6b7280"
        lineWidth={1}
      />
      <Line
        points={[new THREE.Vector3(0, -5, 0), new THREE.Vector3(0, 5, 0)]}
        color="#6b7280"
        lineWidth={1}
      />

      {/* Grid lines */}
      {Array.from({ length: 11 }, (_, i) => {
        const pos = -5 + i;
        return (
          <group key={`grid-${i}`}>
            <Line
              points={[
                new THREE.Vector3(pos, -5, 0),
                new THREE.Vector3(pos, 5, 0),
              ]}
              color="#374151"
              lineWidth={0.5}
              transparent
              opacity={0.3}
            />
            <Line
              points={[
                new THREE.Vector3(-5, pos, 0),
                new THREE.Vector3(5, pos, 0),
              ]}
              color="#374151"
              lineWidth={0.5}
              transparent
              opacity={0.3}
            />
          </group>
        );
      })}

      {/* Slope field vectors */}
      {slopeField.map((vector, index) => {
        // Color based on slope magnitude
        const normalizedMagnitude = Math.min(vector.magnitude / 3, 1);
        const color = new THREE.Color().setHSL(
          0.6 - normalizedMagnitude * 0.4, // Blue to red
          0.8,
          0.5 + normalizedMagnitude * 0.3
        );

        return (
          <group key={`vector-${index}`}>
            <Line
              points={[vector.start, vector.end]}
              color={color}
              lineWidth={2}
            />

            {/* Arrow head */}
            <mesh
              position={vector.end}
              rotation={[
                0,
                0,
                Math.atan2(
                  vector.end.y - vector.start.y,
                  vector.end.x - vector.start.x
                ),
              ]}
            >
              <coneGeometry args={[0.02, 0.06]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </group>
        );
      })}

      {/* Solution curves */}
      {solutionCurves.map((curve, index) => (
        <group key={`curve-${index}`}>
          <Line points={curve.points} color={curve.color} lineWidth={3} />

          {/* Initial condition point */}
          <mesh position={curve.initialPoint}>
            <sphereGeometry args={[0.05]} />
            <meshStandardMaterial color={curve.color} />
          </mesh>
        </group>
      ))}

      {/* Equilibrium points (for specific equations) */}
      {equationType === "logistic" && (
        <>
          {/* y = 0 equilibrium */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.08]} />
            <meshStandardMaterial color="#ef4444" />
          </mesh>
          <Text
            position={[0.3, 0, 0]}
            fontSize={0.2}
            color="#ef4444"
            anchorX="left"
            anchorY="middle"
          >
            Unstable
          </Text>

          {/* y = 1 equilibrium */}
          <mesh position={[0, 1, 0]}>
            <sphereGeometry args={[0.08]} />
            <meshStandardMaterial color="#10b981" />
          </mesh>
          <Text
            position={[0.3, 1, 0]}
            fontSize={0.2}
            color="#10b981"
            anchorX="left"
            anchorY="middle"
          >
            Stable
          </Text>
        </>
      )}

      {/* Equation display */}
      <Text
        position={[0, 4.5, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {getEquationText()}
      </Text>

      {/* Legend */}
      <Text
        position={[-4, -4, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
      >
        Slope Field Visualization
      </Text>

      <Text
        position={[-4, -4.4, 0]}
        fontSize={0.2}
        color="#9ca3af"
        anchorX="left"
        anchorY="middle"
      >
        Vectors show dy/dx direction
      </Text>

      {showSolutionCurves && (
        <Text
          position={[-4, -4.8, 0]}
          fontSize={0.2}
          color="#9ca3af"
          anchorX="left"
          anchorY="middle"
        >
          Colored curves are solutions
        </Text>
      )}

      {/* Color scale legend */}
      <Text
        position={[3, -4, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
      >
        Slope Magnitude:
      </Text>

      <Text
        position={[3, -4.3, 0]}
        fontSize={0.15}
        color="#3b82f6"
        anchorX="left"
        anchorY="middle"
      >
        Low (Blue)
      </Text>

      <Text
        position={[3, -4.6, 0]}
        fontSize={0.15}
        color="#ef4444"
        anchorX="left"
        anchorY="middle"
      >
        High (Red)
      </Text>

      {/* Axis labels */}
      <Text
        position={[4.5, -0.3, 0]}
        fontSize={0.3}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
      >
        x
      </Text>

      <Text
        position={[-0.3, 4.5, 0]}
        fontSize={0.3}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
      >
        y
      </Text>

      {/* Equation type info */}
      <Text
        position={[0, -4.5, 0]}
        fontSize={0.25}
        color="#f59e0b"
        anchorX="center"
        anchorY="middle"
      >
        {equationType === "exponential" && "Exponential Growth/Decay"}
        {equationType === "logistic" && "Logistic Growth Model"}
        {equationType === "harmonic" && "Simple Harmonic Motion"}
        {equationType === "custom" && "Custom Differential Equation"}
      </Text>
    </group>
  );
};
