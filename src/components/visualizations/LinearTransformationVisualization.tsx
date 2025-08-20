import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";

interface LinearTransformationVisualizationProps {
  transformationType?: "rotation" | "scaling" | "shear" | "reflection";
  matrixA?: number;
  matrixB?: number;
  matrixC?: number;
  matrixD?: number;
  showOriginal?: boolean;
  showGrid?: boolean;
  animationSpeed?: number;
}

export const LinearTransformationVisualization: React.FC<
  LinearTransformationVisualizationProps
> = ({
  transformationType = "rotation",
  matrixA = 0.8,
  matrixB = -0.6,
  matrixC = 0.6,
  matrixD = 0.8,
  showOriginal = true,
  showGrid = true,
  animationSpeed = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta * animationSpeed;
  });

  // Predefined transformation matrices
  const transformationMatrices = {
    rotation: {
      a: Math.cos(timeRef.current * 0.5),
      b: -Math.sin(timeRef.current * 0.5),
      c: Math.sin(timeRef.current * 0.5),
      d: Math.cos(timeRef.current * 0.5),
    },
    scaling: {
      a: 1 + 0.5 * Math.sin(timeRef.current),
      b: 0,
      c: 0,
      d: 1 + 0.3 * Math.cos(timeRef.current),
    },
    shear: {
      a: 1,
      b: 0.5 * Math.sin(timeRef.current),
      c: 0,
      d: 1,
    },
    reflection: {
      a: Math.cos(2 * timeRef.current * 0.3),
      b: Math.sin(2 * timeRef.current * 0.3),
      c: Math.sin(2 * timeRef.current * 0.3),
      d: -Math.cos(2 * timeRef.current * 0.3),
    },
  };

  // Use either predefined or custom matrix
  const matrix =
    transformationType in transformationMatrices
      ? transformationMatrices[transformationType]
      : { a: matrixA, b: matrixB, c: matrixC, d: matrixD };

  // Apply linear transformation
  const transform = (x: number, y: number) => {
    return {
      x: matrix.a * x + matrix.b * y,
      y: matrix.c * x + matrix.d * y,
    };
  };

  // Create unit square vertices
  const originalSquare = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: 0, y: 0 }, // Close the square
  ];

  // Transform the square
  const transformedSquare = originalSquare.map((point) =>
    transform(point.x, point.y)
  );

  // Create grid lines
  const gridLines = useMemo(() => {
    const lines = [];
    const gridSize = 5;
    const step = 0.5;

    // Vertical lines
    for (let x = -gridSize; x <= gridSize; x += step) {
      const originalLine = [];
      const transformedLine = [];
      for (let y = -gridSize; y <= gridSize; y += 0.1) {
        originalLine.push(new THREE.Vector3(x, y, 0));
        const transformed = transform(x, y);
        transformedLine.push(
          new THREE.Vector3(transformed.x, transformed.y, 0)
        );
      }
      lines.push({ original: originalLine, transformed: transformedLine });
    }

    // Horizontal lines
    for (let y = -gridSize; y <= gridSize; y += step) {
      const originalLine = [];
      const transformedLine = [];
      for (let x = -gridSize; x <= gridSize; x += 0.1) {
        originalLine.push(new THREE.Vector3(x, y, 0));
        const transformed = transform(x, y);
        transformedLine.push(
          new THREE.Vector3(transformed.x, transformed.y, 0)
        );
      }
      lines.push({ original: originalLine, transformed: transformedLine });
    }

    return lines;
  }, [matrix.a, matrix.b, matrix.c, matrix.d]);

  // Create basis vectors
  const basisVectors = {
    original: {
      i: [new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 0, 0)],
      j: [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0)],
    },
    transformed: {
      i: [new THREE.Vector3(0, 0, 0), new THREE.Vector3(matrix.a, matrix.c, 0)],
      j: [new THREE.Vector3(0, 0, 0), new THREE.Vector3(matrix.b, matrix.d, 0)],
    },
  };

  // Calculate determinant
  const determinant = matrix.a * matrix.d - matrix.b * matrix.c;

  return (
    <group ref={groupRef}>
      {/* Grid lines */}
      {showGrid &&
        gridLines.map((line, index) => (
          <group key={`grid-${index}`}>
            {showOriginal && (
              <Line
                points={line.original}
                color="#374151"
                lineWidth={1}
                transparent
                opacity={0.3}
              />
            )}
            <Line
              points={line.transformed}
              color="#1e40af"
              lineWidth={1}
              transparent
              opacity={0.6}
            />
          </group>
        ))}

      {/* Original unit square */}
      {showOriginal && (
        <Line
          points={originalSquare.map((p) => new THREE.Vector3(p.x, p.y, 0))}
          color="#ef4444"
          lineWidth={3}
          transparent
          opacity={0.7}
        />
      )}

      {/* Transformed square */}
      <Line
        points={transformedSquare.map((p) => new THREE.Vector3(p.x, p.y, 0))}
        color="#10b981"
        lineWidth={4}
      />

      {/* Fill transformed square */}
      <mesh>
        <shapeGeometry
          args={[
            new THREE.Shape([
              new THREE.Vector2(transformedSquare[0].x, transformedSquare[0].y),
              new THREE.Vector2(transformedSquare[1].x, transformedSquare[1].y),
              new THREE.Vector2(transformedSquare[2].x, transformedSquare[2].y),
              new THREE.Vector2(transformedSquare[3].x, transformedSquare[3].y),
            ]),
          ]}
        />
        <meshStandardMaterial
          color="#10b981"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Original basis vectors */}
      {showOriginal && (
        <>
          <Line
            points={basisVectors.original.i}
            color="#dc2626"
            lineWidth={4}
          />
          <Line
            points={basisVectors.original.j}
            color="#dc2626"
            lineWidth={4}
          />
          {/* Arrow heads for original vectors */}
          <mesh position={[1, 0, 0]}>
            <coneGeometry args={[0.05, 0.15]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
          <mesh position={[0, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
            <coneGeometry args={[0.05, 0.15]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
        </>
      )}

      {/* Transformed basis vectors */}
      <Line points={basisVectors.transformed.i} color="#2563eb" lineWidth={5} />
      <Line points={basisVectors.transformed.j} color="#7c3aed" lineWidth={5} />

      {/* Arrow heads for transformed vectors */}
      <mesh
        position={[matrix.a, matrix.c, 0]}
        rotation={[0, 0, Math.atan2(matrix.c, matrix.a)]}
      >
        <coneGeometry args={[0.06, 0.18]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>
      <mesh
        position={[matrix.b, matrix.d, 0]}
        rotation={[0, 0, Math.atan2(matrix.d, matrix.b)]}
      >
        <coneGeometry args={[0.06, 0.18]} />
        <meshStandardMaterial color="#7c3aed" />
      </mesh>

      {/* Coordinate axes */}
      <Line
        points={[new THREE.Vector3(-4, 0, 0), new THREE.Vector3(4, 0, 0)]}
        color="#6b7280"
        lineWidth={1}
      />
      <Line
        points={[new THREE.Vector3(0, -4, 0), new THREE.Vector3(0, 4, 0)]}
        color="#6b7280"
        lineWidth={1}
      />

      {/* Matrix display */}
      <Text
        position={[-3, 3, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
      >
        Transformation Matrix:
      </Text>

      <Text
        position={[-3, 2.3, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        font="monospace"
      >
        [{matrix.a.toFixed(2)} {matrix.b.toFixed(2)}]
      </Text>

      <Text
        position={[-3, 1.9, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        font="monospace"
      >
        [{matrix.c.toFixed(2)} {matrix.d.toFixed(2)}]
      </Text>

      {/* Determinant */}
      <Text
        position={[-3, 1.3, 0]}
        fontSize={0.25}
        color={determinant >= 0 ? "#10b981" : "#ef4444"}
        anchorX="left"
        anchorY="middle"
      >
        det(A) = {determinant.toFixed(3)}
      </Text>

      <Text
        position={[-3, 0.9, 0]}
        fontSize={0.2}
        color="#9ca3af"
        anchorX="left"
        anchorY="middle"
      >
        {determinant > 0
          ? "Preserves orientation"
          : determinant < 0
          ? "Reverses orientation"
          : "Collapses to line"}
      </Text>

      {/* Vector labels */}
      <Text
        position={[matrix.a + 0.2, matrix.c + 0.2, 0]}
        fontSize={0.25}
        color="#2563eb"
        anchorX="left"
        anchorY="middle"
      >
        î'
      </Text>

      <Text
        position={[matrix.b + 0.2, matrix.d + 0.2, 0]}
        fontSize={0.25}
        color="#7c3aed"
        anchorX="left"
        anchorY="middle"
      >
        ĵ'
      </Text>

      {/* Transformation type */}
      <Text
        position={[0, -3.5, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {transformationType.charAt(0).toUpperCase() +
          transformationType.slice(1)}{" "}
        Transformation
      </Text>
    </group>
  );
};
