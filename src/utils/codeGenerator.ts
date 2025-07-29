/**
 * @file Enhanced code generator for dynamic mathematical visualizations
 * Generates TypeScript/React code based on scene configuration and parameters
 */

import { getSceneConfig } from "../store/sceneRegistry";

/**
 * Generates comprehensive code snippets based on scene configuration and parameters
 */
export const generateSceneCode = (
  sceneId: string,
  rotationSpeed: number,
  parameters: Record<string, any> = {}
): string => {
  const scene = getSceneConfig(sceneId);

  if (!scene) {
    return `// Scene not found: ${sceneId}`;
  }

  // Generate parameter destructuring and defaults
  const parameterEntries = Object.entries(parameters);
  const parameterDefaults = scene.parameters
    ? Object.entries(scene.parameters)
        .map(([key, config]) => `${key} = ${parameters[key] ?? config.default}`)
        .join(", ")
    : "";

  const allParams = parameterDefaults
    ? `rotationSpeed = ${rotationSpeed}, ${parameterDefaults}`
    : `rotationSpeed = ${rotationSpeed}`;

  // Generate scene-specific code based on scene ID
  switch (sceneId) {
    case "simple-scene":
      return generateSimpleSceneCode(scene, rotationSpeed, parameters);

    case "parametric-surface":
      return generateParametricSurfaceCode(scene, rotationSpeed, parameters);

    case "fractal-cube":
      return generateFractalCubeCode(scene, rotationSpeed, parameters);

    case "sine-wave":
      return generateSineWaveCode(scene, rotationSpeed, parameters);

    default:
      return generateGenericSceneCode(scene, rotationSpeed, parameters);
  }
};

/**
 * Generates code for the simple rotating cube scene
 */
const generateSimpleSceneCode = (
  scene: any,
  rotationSpeed: number,
  parameters: Record<string, any>
): string => {
  const scale = parameters.scale || 1;
  const hue = parameters.color || 25;

  return `// ${scene.name}
// Category: ${scene.category}
// ${scene.description}

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface SimpleSceneProps {
  rotationSpeed?: number;
  scale?: number;
  color?: number;
}

const SimpleScene: React.FC<SimpleSceneProps> = ({ 
  rotationSpeed = ${rotationSpeed},
  scale = ${scale},
  color = ${hue}
}) => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      // Apply rotation animation
      meshRef.current.rotation.x += 0.01 * rotationSpeed;
      meshRef.current.rotation.y += 0.01 * rotationSpeed;
    }
  });

  return (
    <>
      {/* Basic lighting setup */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Animated cube mesh */}
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={\`hsl(\${color}, 70%, 60%)\`} />
      </mesh>
    </>
  );
};

export default SimpleScene;`;
};

/**
 * Generates code for parametric surface visualization
 */
const generateParametricSurfaceCode = (
  scene: any,
  rotationSpeed: number,
  parameters: Record<string, any>
): string => {
  const {
    amplitude = 2,
    frequency = 1,
    uSegments = 50,
    vSegments = 50,
  } = parameters;

  return `// ${scene.name}
// Category: ${scene.category}
// ${scene.description}

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';

interface ParametricSurfaceProps {
  rotationSpeed?: number;
  amplitude?: number;
  frequency?: number;
  uSegments?: number;
  vSegments?: number;
}

const ParametricSurface: React.FC<ParametricSurfaceProps> = ({
  rotationSpeed = ${rotationSpeed},
  amplitude = ${amplitude},
  frequency = ${frequency},
  uSegments = ${uSegments},
  vSegments = ${vSegments}
}) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * 0.01;
      // Add time-based animation
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    }
  });

  // Generate parametric surface geometry
  const geometry = useMemo(() => {
    const positions: number[] = [];
    const indices: number[] = [];
    
    // Generate vertices using parametric equations
    for (let u = 0; u <= uSegments; u++) {
      for (let v = 0; v <= vSegments; v++) {
        const uParam = (u / uSegments) * Math.PI * 2;
        const vParam = (v / vSegments) * Math.PI;
        
        // Parametric surface equations
        const x = amplitude * Math.cos(uParam) * Math.sin(vParam) * frequency;
        const y = amplitude * Math.cos(vParam);
        const z = amplitude * Math.sin(uParam) * Math.sin(vParam) * frequency;
        
        positions.push(x, y, z);
      }
    }
    
    // Generate triangle indices
    for (let u = 0; u < uSegments; u++) {
      for (let v = 0; v < vSegments; v++) {
        const a = u * (vSegments + 1) + v;
        const b = u * (vSegments + 1) + v + 1;
        const c = (u + 1) * (vSegments + 1) + v;
        const d = (u + 1) * (vSegments + 1) + v + 1;
        
        indices.push(a, b, c, b, d, c);
      }
    }
    
    return { positions: new Float32Array(positions), indices };
  }, [amplitude, frequency, uSegments, vSegments]);

  return (
    <>
      {/* Advanced lighting setup */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff6b6b" />
      
      {/* Parametric surface mesh */}
      <mesh ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={geometry.positions}
            count={geometry.positions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="index"
            array={new Uint16Array(geometry.indices)}
            count={geometry.indices.length}
            itemSize={1}
          />
        </bufferGeometry>
        <meshPhongMaterial 
          color="#4ecdc4" 
          wireframe={true}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
    </>
  );
};

export default ParametricSurface;`;
};

/**
 * Generates code for fractal cube visualization
 */
const generateFractalCubeCode = (
  scene: any,
  rotationSpeed: number,
  parameters: Record<string, any>
): string => {
  const { iterations = 3, scale = 0.8, spacing = 1 } = parameters;

  return `// ${scene.name}
// Category: ${scene.category}
// ${scene.description}

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface FractalCubeProps {
  rotationSpeed?: number;
  iterations?: number;
  scale?: number;
  spacing?: number;
}

const FractalCube: React.FC<FractalCubeProps> = ({
  rotationSpeed = ${rotationSpeed},
  iterations = ${iterations},
  scale = ${scale},
  spacing = ${spacing}
}) => {
  const groupRef = useRef<Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += rotationSpeed * 0.008;
      groupRef.current.rotation.y += rotationSpeed * 0.012;
    }
  });

  // Recursive fractal generation
  const generateFractal = (level: number, position: number[], size: number): JSX.Element[] => {
    if (level <= 0) return [];
    
    const cubes: JSX.Element[] = [];
    const newSize = size * scale;
    const offset = (size - newSize) / 2 * spacing;
    
    // Generate 8 corner positions for recursive cubes
    const positions = [
      [-offset, -offset, -offset], [offset, -offset, -offset],
      [-offset, offset, -offset], [offset, offset, -offset],
      [-offset, -offset, offset], [offset, -offset, offset],
      [-offset, offset, offset], [offset, offset, offset]
    ];
    
    positions.forEach((pos, i) => {
      const newPos = [
        position[0] + pos[0],
        position[1] + pos[1],
        position[2] + pos[2]
      ];
      
      // Create cube at this position
      cubes.push(
        <mesh key={\`\${level}-\${i}\`} position={newPos as [number, number, number]}>
          <boxGeometry args={[newSize, newSize, newSize]} />
          <meshStandardMaterial 
            color={\`hsl(\${(level * 60 + i * 30) % 360}, 70%, 60%)\`}
            transparent={true}
            opacity={0.7}
          />
        </mesh>
      );
      
      // Recursive call for deeper levels
      if (level > 1) {
        cubes.push(...generateFractal(level - 1, newPos, newSize));
      }
    });
    
    return cubes;
  };

  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      
      {/* Fractal cube group */}
      <group ref={groupRef}>
        {generateFractal(iterations, [0, 0, 0], 2)}
      </group>
    </>
  );
};

export default FractalCube;`;
};

/**
 * Generates code for sine wave visualization
 */
const generateSineWaveCode = (
  scene: any,
  rotationSpeed: number,
  parameters: Record<string, any>
): string => {
  const {
    amplitude = 1,
    frequency = 1,
    segments = 100,
    phaseShift = 0,
  } = parameters;

  return `// ${scene.name}
// Category: ${scene.category}
// ${scene.description}

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
  rotationSpeed = ${rotationSpeed},
  amplitude = ${amplitude},
  frequency = ${frequency},
  segments = ${segments},
  phaseShift = ${phaseShift}
}) => {
  const meshRef = useRef<Group>(null);
  const [time, setTime] = useState(0);
  
  useFrame((state) => {
    setTime(state.clock.elapsedTime);
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * 0.01;
    }
  });

  // Generate sine wave points
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
      {/* Lighting setup */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 5]} intensity={1} />
      
      {/* Sine wave visualization */}
      <group ref={meshRef}>
        {/* Wave points */}
        {points.map((point, i) => (
          <mesh key={i} position={[point.x, point.y, point.z]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial 
              color={\`hsl(\${(i / segments) * 360}, 80%, 60%)\`}
              emissive={\`hsl(\${(i / segments) * 360}, 40%, 20%)\`}
            />
          </mesh>
        ))}
        
        {/* Wave line */}
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

export default SineWave;`;
};

/**
 * Generates generic scene code template
 */
const generateGenericSceneCode = (
  scene: any,
  rotationSpeed: number,
  parameters: Record<string, any>
): string => {
  const parameterDefaults = scene.parameters
    ? Object.entries(scene.parameters)
        .map(([key, config]) => `${key} = ${parameters[key] ?? config.default}`)
        .join(",\n  ")
    : "";

  const parameterProps = scene.parameters
    ? Object.keys(scene.parameters)
        .map((key) => `${key}?: number;`)
        .join("\n  ")
    : "";

  return `// ${scene.name}
// Category: ${scene.category}
// ${scene.description}

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

interface SceneProps {
  rotationSpeed?: number;${parameterProps ? "\n  " + parameterProps : ""}
}

const ${scene.name.replace(/\s+/g, "")}Scene: React.FC<SceneProps> = ({
  rotationSpeed = ${rotationSpeed}${
    parameterDefaults ? ",\n  " + parameterDefaults : ""
  }
}) => {
  const meshRef = useRef(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed * 0.01;
      meshRef.current.rotation.y += rotationSpeed * 0.01;
    }
  });

  return (
    <>
      {/* Add your lighting setup */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      
      {/* Add your 3D scene content here */}
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </>
  );
};

export default ${scene.name.replace(/\s+/g, "")}Scene;`;
};

/**
 * Generates import statements for the scene
 */
export const generateImportCode = (sceneId: string): string => {
  const scene = getSceneConfig(sceneId);
  if (!scene) return "";

  return `// Import statement for ${scene.name}
import ${scene.name.replace(
    /\s+/g,
    ""
  )}Scene from './components/three/${scene.name.replace(/\s+/g, "")}Scene';`;
};

/**
 * Generates usage example for the scene
 */
export const generateUsageCode = (
  sceneId: string,
  rotationSpeed: number,
  parameters: Record<string, any>
): string => {
  const scene = getSceneConfig(sceneId);
  if (!scene) return "";

  const paramProps = Object.entries(parameters)
    .map(([key, value]) => `${key}={${value}}`)
    .join(" ");

  return `// Usage example for ${scene.name}
<Canvas>
  <${scene.name.replace(/\s+/g, "")}Scene 
    rotationSpeed={${rotationSpeed}}${paramProps ? " " + paramProps : ""}
  />
  <OrbitControls />
</Canvas>`;
};
