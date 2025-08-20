import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";

interface OptimizationVisualizationProps {
  functionType?: "quadratic" | "rosenbrock" | "himmelblau" | "rastrigin";
  algorithm?: "gradient_descent" | "momentum" | "adam" | "newton";
  learningRate?: number;
  showContours?: boolean;
  showPath?: boolean;
  animationSpeed?: number;
}

export const OptimizationVisualization: React.FC<
  OptimizationVisualizationProps
> = ({
  functionType = "quadratic",
  algorithm = "gradient_descent",
  learningRate = 0.1,
  showContours = true,
  showPath = true,
  animationSpeed = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const [optimizationPath, setOptimizationPath] = useState<THREE.Vector3[]>([]);
  const [currentPosition, setCurrentPosition] = useState(
    new THREE.Vector2(2, 2)
  );
  const [velocity, setVelocity] = useState(new THREE.Vector2(0, 0));
  const [momentum, setMomentum] = useState(new THREE.Vector2(0, 0));
  const [adamM, setAdamM] = useState(new THREE.Vector2(0, 0));
  const [adamV, setAdamV] = useState(new THREE.Vector2(0, 0));
  const [iteration, setIteration] = useState(0);

  useFrame((state, delta) => {
    timeRef.current += delta * animationSpeed;
  });

  // Define objective functions
  const objectiveFunctions = {
    quadratic: (x: number, y: number) => {
      return 0.5 * (x * x + 4 * y * y);
    },
    rosenbrock: (x: number, y: number) => {
      const a = 1;
      const b = 100;
      return Math.pow(a - x, 2) + b * Math.pow(y - x * x, 2);
    },
    himmelblau: (x: number, y: number) => {
      return Math.pow(x * x + y - 11, 2) + Math.pow(x + y * y - 7, 2);
    },
    rastrigin: (x: number, y: number) => {
      const A = 10;
      return (
        A * 2 +
        (x * x - A * Math.cos(2 * Math.PI * x)) +
        (y * y - A * Math.cos(2 * Math.PI * y))
      );
    },
  };

  // Define gradients
  const gradients = {
    quadratic: (x: number, y: number) => {
      return { x: x, y: 8 * y };
    },
    rosenbrock: (x: number, y: number) => {
      const a = 1;
      const b = 100;
      const dx = -2 * (a - x) - 4 * b * x * (y - x * x);
      const dy = 2 * b * (y - x * x);
      return { x: dx, y: dy };
    },
    himmelblau: (x: number, y: number) => {
      const dx = 4 * x * (x * x + y - 11) + 2 * (x + y * y - 7);
      const dy = 2 * (x * x + y - 11) + 4 * y * (x + y * y - 7);
      return { x: dx, y: dy };
    },
    rastrigin: (x: number, y: number) => {
      const A = 10;
      const dx = 2 * x + A * 2 * Math.PI * Math.sin(2 * Math.PI * x);
      const dy = 2 * y + A * 2 * Math.PI * Math.sin(2 * Math.PI * y);
      return { x: dx, y: dy };
    },
  };

  const objectiveFunction = objectiveFunctions[functionType];
  const gradient = gradients[functionType];

  // Generate contour lines
  const contourLines = useMemo(() => {
    if (!showContours) return [];

    const lines = [];
    const range = 4;
    const resolution = 50;
    const levels =
      functionType === "rastrigin"
        ? [5, 10, 20, 40, 80]
        : [0.5, 1, 2, 5, 10, 20];

    levels.forEach((level, levelIndex) => {
      const points = [];

      // Simple contour tracing (marching squares approximation)
      for (let i = 0; i < resolution; i++) {
        for (let j = 0; j < resolution; j++) {
          const x1 = -range + (i / resolution) * 2 * range;
          const y1 = -range + (j / resolution) * 2 * range;
          const x2 = -range + ((i + 1) / resolution) * 2 * range;
          const y2 = -range + ((j + 1) / resolution) * 2 * range;

          const f1 = objectiveFunction(x1, y1);
          const f2 = objectiveFunction(x2, y1);
          const f3 = objectiveFunction(x2, y2);
          const f4 = objectiveFunction(x1, y2);

          // Check if contour passes through this cell
          const values = [f1, f2, f3, f4];
          const min = Math.min(...values);
          const max = Math.max(...values);

          if (min <= level && level <= max) {
            // Approximate contour point
            const centerX = (x1 + x2) / 2;
            const centerY = (y1 + y2) / 2;
            const centerZ = objectiveFunction(centerX, centerY);

            if (Math.abs(centerZ - level) < level * 0.3) {
              points.push(new THREE.Vector3(centerX, centerY, 0));
            }
          }
        }
      }

      if (points.length > 0) {
        lines.push({
          points,
          level,
          color: new THREE.Color().setHSL(
            (levelIndex / levels.length) * 0.8,
            0.7,
            0.5
          ),
        });
      }
    });

    return lines;
  }, [functionType, showContours]);

  // Optimization step
  useEffect(() => {
    const interval = setInterval(() => {
      if (optimizationPath.length > 200) return; // Stop after 200 iterations

      const grad = gradient(currentPosition.x, currentPosition.y);
      const gradMagnitude = Math.sqrt(grad.x * grad.x + grad.y * grad.y);

      if (gradMagnitude < 0.001) return; // Converged

      let newPosition = currentPosition.clone();
      let newVelocity = velocity.clone();
      let newMomentum = momentum.clone();
      let newAdamM = adamM.clone();
      let newAdamV = adamV.clone();

      switch (algorithm) {
        case "gradient_descent":
          newPosition.x -= learningRate * grad.x;
          newPosition.y -= learningRate * grad.y;
          break;

        case "momentum":
          const beta = 0.9;
          newMomentum.x = beta * momentum.x + (1 - beta) * grad.x;
          newMomentum.y = beta * momentum.y + (1 - beta) * grad.y;
          newPosition.x -= learningRate * newMomentum.x;
          newPosition.y -= learningRate * newMomentum.y;
          break;

        case "adam":
          const beta1 = 0.9;
          const beta2 = 0.999;
          const epsilon = 1e-8;
          const t = iteration + 1;

          newAdamM.x = beta1 * adamM.x + (1 - beta1) * grad.x;
          newAdamM.y = beta1 * adamM.y + (1 - beta1) * grad.y;
          newAdamV.x = beta2 * adamV.x + (1 - beta2) * grad.x * grad.x;
          newAdamV.y = beta2 * adamV.y + (1 - beta2) * grad.y * grad.y;

          const mHat = {
            x: newAdamM.x / (1 - Math.pow(beta1, t)),
            y: newAdamM.y / (1 - Math.pow(beta1, t)),
          };
          const vHat = {
            x: newAdamV.x / (1 - Math.pow(beta2, t)),
            y: newAdamV.y / (1 - Math.pow(beta2, t)),
          };

          newPosition.x -=
            (learningRate * mHat.x) / (Math.sqrt(vHat.x) + epsilon);
          newPosition.y -=
            (learningRate * mHat.y) / (Math.sqrt(vHat.y) + epsilon);
          break;

        case "newton":
          // Simplified Newton's method (approximate Hessian)
          const h = 0.001;
          const hxx =
            (gradient(currentPosition.x + h, currentPosition.y).x - grad.x) / h;
          const hyy =
            (gradient(currentPosition.x, currentPosition.y + h).y - grad.y) / h;
          const hxy =
            (gradient(currentPosition.x + h, currentPosition.y).y - grad.y) / h;

          const det = hxx * hyy - hxy * hxy;
          if (Math.abs(det) > 0.001) {
            const invHxx = hyy / det;
            const invHyy = hxx / det;
            const invHxy = -hxy / det;

            newPosition.x -= learningRate * (invHxx * grad.x + invHxy * grad.y);
            newPosition.y -= learningRate * (invHxy * grad.x + invHyy * grad.y);
          } else {
            // Fallback to gradient descent
            newPosition.x -= learningRate * grad.x;
            newPosition.y -= learningRate * grad.y;
          }
          break;
      }

      // Clamp to reasonable bounds
      newPosition.x = Math.max(-4, Math.min(4, newPosition.x));
      newPosition.y = Math.max(-4, Math.min(4, newPosition.y));

      setCurrentPosition(newPosition);
      setVelocity(newVelocity);
      setMomentum(newMomentum);
      setAdamM(newAdamM);
      setAdamV(newAdamV);
      setIteration((prev) => prev + 1);

      const z = objectiveFunction(newPosition.x, newPosition.y);
      setOptimizationPath((prev) => [
        ...prev,
        new THREE.Vector3(newPosition.x, newPosition.y, 0),
      ]);
    }, 100 / animationSpeed);

    return () => clearInterval(interval);
  }, [
    currentPosition,
    velocity,
    momentum,
    adamM,
    adamV,
    iteration,
    algorithm,
    learningRate,
    functionType,
    animationSpeed,
  ]);

  // Reset optimization when parameters change
  useEffect(() => {
    setOptimizationPath([]);
    setCurrentPosition(new THREE.Vector2(2, 2));
    setVelocity(new THREE.Vector2(0, 0));
    setMomentum(new THREE.Vector2(0, 0));
    setAdamM(new THREE.Vector2(0, 0));
    setAdamV(new THREE.Vector2(0, 0));
    setIteration(0);
  }, [functionType, algorithm, learningRate]);

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

      {/* Contour lines */}
      {contourLines.map((contour, index) => (
        <Line
          key={`contour-${index}`}
          points={contour.points}
          color={contour.color}
          lineWidth={2}
          transparent
          opacity={0.6}
        />
      ))}

      {/* Optimization path */}
      {showPath && optimizationPath.length > 1 && (
        <Line points={optimizationPath} color="#ef4444" lineWidth={4} />
      )}

      {/* Current position */}
      <mesh position={[currentPosition.x, currentPosition.y, 0]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>

      {/* Gradient vector */}
      {(() => {
        const grad = gradient(currentPosition.x, currentPosition.y);
        const scale = 0.5;
        const endX = currentPosition.x - scale * grad.x;
        const endY = currentPosition.y - scale * grad.y;

        return (
          <group>
            <Line
              points={[
                new THREE.Vector3(currentPosition.x, currentPosition.y, 0),
                new THREE.Vector3(endX, endY, 0),
              ]}
              color="#f59e0b"
              lineWidth={3}
            />
            <mesh
              position={[endX, endY, 0]}
              rotation={[0, 0, Math.atan2(grad.y, grad.x) + Math.PI]}
            >
              <coneGeometry args={[0.05, 0.15]} />
              <meshStandardMaterial color="#f59e0b" />
            </mesh>
          </group>
        );
      })()}

      {/* Function information */}
      <Text
        position={[0, 4.5, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Optimization: {algorithm.replace("_", " ").toUpperCase()}
      </Text>

      <Text
        position={[0, 4, 0]}
        fontSize={0.3}
        color="#f59e0b"
        anchorX="center"
        anchorY="middle"
      >
        {functionType.charAt(0).toUpperCase() + functionType.slice(1)} Function
      </Text>

      {/* Current values */}
      <Text
        position={[-4, 3.5, 0]}
        fontSize={0.25}
        color="#9ca3af"
        anchorX="left"
        anchorY="middle"
      >
        Position: ({currentPosition.x.toFixed(2)},{" "}
        {currentPosition.y.toFixed(2)})
      </Text>

      <Text
        position={[-4, 3.2, 0]}
        fontSize={0.25}
        color="#9ca3af"
        anchorX="left"
        anchorY="middle"
      >
        Value:{" "}
        {objectiveFunction(currentPosition.x, currentPosition.y).toFixed(3)}
      </Text>

      <Text
        position={[-4, 2.9, 0]}
        fontSize={0.25}
        color="#9ca3af"
        anchorX="left"
        anchorY="middle"
      >
        Iteration: {iteration}
      </Text>

      {/* Legend */}
      <Text
        position={[0, -4.5, 0]}
        fontSize={0.25}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
      >
        Green: Current Position | Red: Path | Yellow: Gradient
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
    </group>
  );
};
