import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";

interface EigenvectorVisualizationProps {
  matrixType?: "symmetric" | "rotation" | "scaling" | "custom";
  matrixA?: number;
  matrixB?: number;
  matrixC?: number;
  matrixD?: number;
  showEigenspaces?: boolean;
  showTransformation?: boolean;
  animationSpeed?: number;
}

export const EigenvectorVisualization: React.FC<
  EigenvectorVisualizationProps
> = ({
  matrixType = "symmetric",
  matrixA = 3,
  matrixB = 1,
  matrixC = 1,
  matrixD = 2,
  showEigenspaces = true,
  showTransformation = true,
  animationSpeed = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta * animationSpeed;
  });

  // Predefined matrices with known eigenvalues/eigenvectors
  const predefinedMatrices = {
    symmetric: { a: 3, b: 1, c: 1, d: 2 },
    rotation: {
      a: Math.cos(Math.PI / 4),
      b: -Math.sin(Math.PI / 4),
      c: Math.sin(Math.PI / 4),
      d: Math.cos(Math.PI / 4),
    },
    scaling: { a: 2, b: 0, c: 0, d: 0.5 },
    custom: { a: matrixA, b: matrixB, c: matrixC, d: matrixD },
  };

  const matrix = predefinedMatrices[matrixType];

  // Calculate eigenvalues and eigenvectors
  const eigenData = useMemo(() => {
    const { a, b, c, d } = matrix;

    // Characteristic polynomial: λ² - (a+d)λ + (ad-bc) = 0
    const trace = a + d;
    const det = a * d - b * c;
    const discriminant = trace * trace - 4 * det;

    if (discriminant < 0) {
      // Complex eigenvalues (rotation case)
      return {
        eigenvalues: [],
        eigenvectors: [],
        isComplex: true,
        realPart: trace / 2,
        imagPart: Math.sqrt(-discriminant) / 2,
      };
    }

    const lambda1 = (trace + Math.sqrt(discriminant)) / 2;
    const lambda2 = (trace - Math.sqrt(discriminant)) / 2;

    // Calculate eigenvectors
    const getEigenvector = (lambda: number) => {
      if (Math.abs(b) > 1e-10) {
        return { x: lambda - d, y: c };
      } else if (Math.abs(c) > 1e-10) {
        return { x: b, y: lambda - a };
      } else {
        // Diagonal matrix
        if (Math.abs(lambda - a) < 1e-10) {
          return { x: 1, y: 0 };
        } else {
          return { x: 0, y: 1 };
        }
      }
    };

    const v1 = getEigenvector(lambda1);
    const v2 = getEigenvector(lambda2);

    // Normalize eigenvectors
    const norm1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
    const norm2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

    return {
      eigenvalues: [lambda1, lambda2],
      eigenvectors: [
        { x: v1.x / norm1, y: v1.y / norm1 },
        { x: v2.x / norm2, y: v2.y / norm2 },
      ],
      isComplex: false,
    };
  }, [matrix]);

  // Apply transformation
  const transform = (x: number, y: number) => {
    return {
      x: matrix.a * x + matrix.b * y,
      y: matrix.c * x + matrix.d * y,
    };
  };

  // Create test vectors in a circle
  const testVectors = useMemo(() => {
    const vectors = [];
    const numVectors = 16;
    for (let i = 0; i < numVectors; i++) {
      const angle = (i / numVectors) * 2 * Math.PI;
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      const transformed = transform(x, y);
      vectors.push({
        original: { x, y },
        transformed,
      });
    }
    return vectors;
  }, [matrix]);

  // Animation factor for smooth transitions
  const animationFactor = (Math.sin(timeRef.current * 0.5) + 1) / 2;

  return (
    <group ref={groupRef}>
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

      {/* Unit circle */}
      <Line
        points={Array.from({ length: 65 }, (_, i) => {
          const angle = (i / 64) * 2 * Math.PI;
          return new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0);
        })}
        color="#374151"
        lineWidth={1}
        transparent
        opacity={0.5}
      />

      {/* Eigenspaces (if real eigenvalues) */}
      {showEigenspaces &&
        !eigenData.isComplex &&
        eigenData.eigenvectors.map((eigenvector, index) => {
          const scale = 3;
          const color = index === 0 ? "#ef4444" : "#3b82f6";
          return (
            <group key={`eigenspace-${index}`}>
              <Line
                points={[
                  new THREE.Vector3(
                    -scale * eigenvector.x,
                    -scale * eigenvector.y,
                    0
                  ),
                  new THREE.Vector3(
                    scale * eigenvector.x,
                    scale * eigenvector.y,
                    0
                  ),
                ]}
                color={color}
                lineWidth={2}
                transparent
                opacity={0.7}
              />
            </group>
          );
        })}

      {/* Test vectors */}
      {testVectors.map((vector, index) => {
        const interpolatedX =
          vector.original.x +
          animationFactor * (vector.transformed.x - vector.original.x);
        const interpolatedY =
          vector.original.y +
          animationFactor * (vector.transformed.y - vector.original.y);

        // Check if this vector is close to an eigenvector
        let isEigenvector = false;
        let eigenIndex = -1;
        if (!eigenData.isComplex) {
          eigenData.eigenvectors.forEach((eigenvector, i) => {
            const dot = Math.abs(
              vector.original.x * eigenvector.x +
                vector.original.y * eigenvector.y
            );
            if (dot > 0.95) {
              isEigenvector = true;
              eigenIndex = i;
            }
          });
        }

        const vectorColor = isEigenvector
          ? eigenIndex === 0
            ? "#ef4444"
            : "#3b82f6"
          : "#10b981";

        const vectorWidth = isEigenvector ? 4 : 2;

        return (
          <group key={`vector-${index}`}>
            {/* Vector line */}
            <Line
              points={[
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(interpolatedX, interpolatedY, 0),
              ]}
              color={vectorColor}
              lineWidth={vectorWidth}
            />

            {/* Arrow head */}
            <mesh
              position={[interpolatedX, interpolatedY, 0]}
              rotation={[0, 0, Math.atan2(interpolatedY, interpolatedX)]}
            >
              <coneGeometry args={[0.05, 0.15]} />
              <meshStandardMaterial color={vectorColor} />
            </mesh>

            {/* Original vector (faded) */}
            {showTransformation && (
              <Line
                points={[
                  new THREE.Vector3(0, 0, 0),
                  new THREE.Vector3(vector.original.x, vector.original.y, 0),
                ]}
                color="#9ca3af"
                lineWidth={1}
                transparent
                opacity={0.3}
              />
            )}
          </group>
        );
      })}

      {/* Eigenvector labels and values */}
      {!eigenData.isComplex &&
        eigenData.eigenvectors.map((eigenvector, index) => {
          const eigenvalue = eigenData.eigenvalues[index];
          const color = index === 0 ? "#ef4444" : "#3b82f6";
          const scale = 2.5;

          return (
            <group key={`eigen-label-${index}`}>
              {/* Eigenvector */}
              <Line
                points={[
                  new THREE.Vector3(0, 0, 0),
                  new THREE.Vector3(
                    scale * eigenvector.x,
                    scale * eigenvector.y,
                    0
                  ),
                ]}
                color={color}
                lineWidth={5}
              />

              {/* Arrow head */}
              <mesh
                position={[scale * eigenvector.x, scale * eigenvector.y, 0]}
                rotation={[0, 0, Math.atan2(eigenvector.y, eigenvector.x)]}
              >
                <coneGeometry args={[0.08, 0.2]} />
                <meshStandardMaterial color={color} />
              </mesh>

              {/* Label */}
              <Text
                position={[
                  scale * eigenvector.x + 0.3 * Math.sign(eigenvector.x),
                  scale * eigenvector.y + 0.3 * Math.sign(eigenvector.y),
                  0,
                ]}
                fontSize={0.25}
                color={color}
                anchorX="center"
                anchorY="middle"
              >
                v₁ = [{eigenvector.x.toFixed(2)}, {eigenvector.y.toFixed(2)}]
              </Text>

              <Text
                position={[
                  scale * eigenvector.x + 0.3 * Math.sign(eigenvector.x),
                  scale * eigenvector.y + 0.3 * Math.sign(eigenvector.y) - 0.3,
                  0,
                ]}
                fontSize={0.2}
                color={color}
                anchorX="center"
                anchorY="middle"
              >
                λ₁ = {eigenvalue.toFixed(2)}
              </Text>
            </group>
          );
        })}

      {/* Matrix information */}
      <Text
        position={[-3.5, 3.5, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
      >
        Matrix A:
      </Text>

      <Text
        position={[-3.5, 3, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        font="monospace"
      >
        [{matrix.a.toFixed(2)} {matrix.b.toFixed(2)}]
      </Text>

      <Text
        position={[-3.5, 2.6, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        font="monospace"
      >
        [{matrix.c.toFixed(2)} {matrix.d.toFixed(2)}]
      </Text>

      {/* Eigenvalue information */}
      {eigenData.isComplex ? (
        <>
          <Text
            position={[-3.5, 2, 0]}
            fontSize={0.25}
            color="#f59e0b"
            anchorX="left"
            anchorY="middle"
          >
            Complex eigenvalues:
          </Text>
          <Text
            position={[-3.5, 1.6, 0]}
            fontSize={0.2}
            color="#f59e0b"
            anchorX="left"
            anchorY="middle"
          >
            λ = {eigenData.realPart.toFixed(2)} ±{" "}
            {eigenData.imagPart.toFixed(2)}i
          </Text>
          <Text
            position={[-3.5, 1.2, 0]}
            fontSize={0.2}
            color="#9ca3af"
            anchorX="left"
            anchorY="middle"
          >
            (Rotation with scaling)
          </Text>
        </>
      ) : (
        <>
          <Text
            position={[-3.5, 2, 0]}
            fontSize={0.25}
            color="#10b981"
            anchorX="left"
            anchorY="middle"
          >
            Eigenvalues:
          </Text>
          <Text
            position={[-3.5, 1.6, 0]}
            fontSize={0.2}
            color="#ef4444"
            anchorX="left"
            anchorY="middle"
          >
            λ₁ = {eigenData.eigenvalues[0].toFixed(3)}
          </Text>
          <Text
            position={[-3.5, 1.3, 0]}
            fontSize={0.2}
            color="#3b82f6"
            anchorX="left"
            anchorY="middle"
          >
            λ₂ = {eigenData.eigenvalues[1].toFixed(3)}
          </Text>
        </>
      )}

      {/* Title */}
      <Text
        position={[0, -3.5, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Eigenvalues & Eigenvectors
      </Text>

      <Text
        position={[0, -4, 0]}
        fontSize={0.25}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
      >
        {eigenData.isComplex
          ? "No real eigenvectors (rotation)"
          : "Red and blue vectors are eigenvectors"}
      </Text>
    </group>
  );
};
