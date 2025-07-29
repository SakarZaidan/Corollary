import {
  useState,
  Suspense,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import React from "react";
import {
  OrbitControls,
  Environment,
  Grid,
  Stats,
  Text,
  Html,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

// Advanced Mathematical Scenes
const ParametricSurface = ({
  rotationSpeed,
  amplitude = 2,
  frequency = 1,
  uSegments = 50,
  vSegments = 50,
}) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * 0.01;
      // Dynamic surface animation
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    }
  });

  // Generate parametric surface vertices
  const geometry = useMemo(() => {
    const positions = [];
    const indices = [];

    for (let u = 0; u <= uSegments; u++) {
      for (let v = 0; v <= vSegments; v++) {
        const uParam = (u / uSegments) * Math.PI * 2;
        const vParam = (v / vSegments) * Math.PI;

        const x = amplitude * Math.cos(uParam) * Math.sin(vParam) * frequency;
        const y = amplitude * Math.cos(vParam);
        const z = amplitude * Math.sin(uParam) * Math.sin(vParam) * frequency;

        positions.push(x, y, z);
      }
    }

    // Generate indices for triangles
    for (let u = 0; u < uSegments; u++) {
      for (let v = 0; v < vSegments; v++) {
        const a = u * (vSegments + 1) + v;
        const b = u * (vSegments + 1) + v + 1;
        const c = (u + 1) * (vSegments + 1) + v;
        const d = (u + 1) * (vSegments + 1) + v + 1;

        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }

    return { positions: new Float32Array(positions), indices };
  }, [amplitude, frequency, uSegments, vSegments]);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff6b6b" />

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

const FractalCube = ({ rotationSpeed, iterations = 3, scale = 0.8 }) => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += rotationSpeed * 0.008;
      groupRef.current.rotation.y += rotationSpeed * 0.012;
    }
  });

  const generateFractal = (level, position, size) => {
    if (level <= 0) return null;

    const cubes = [];
    const newSize = size * scale;
    const offset = (size - newSize) / 2;

    // Create 8 smaller cubes at corners
    const positions = [
      [-offset, -offset, -offset],
      [offset, -offset, -offset],
      [-offset, offset, -offset],
      [offset, offset, -offset],
      [-offset, -offset, offset],
      [offset, -offset, offset],
      [-offset, offset, offset],
      [offset, offset, offset],
    ];

    positions.forEach((pos, i) => {
      const newPos = [
        position[0] + pos[0],
        position[1] + pos[1],
        position[2] + pos[2],
      ];

      cubes.push(
        <mesh key={`${level}-${i}`} position={newPos}>
          <boxGeometry args={[newSize, newSize, newSize]} />
          <meshStandardMaterial
            color={`hsl(${(level * 60 + i * 30) % 360}, 70%, 60%)`}
            transparent={true}
            opacity={0.7}
          />
        </mesh>
      );

      if (level > 1) {
        cubes.push(...(generateFractal(level - 1, newPos, newSize) || []));
      }
    });

    return cubes;
  };

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <group ref={groupRef}>{generateFractal(iterations, [0, 0, 0], 2)}</group>
    </>
  );
};

const SineWave = ({
  rotationSpeed,
  amplitude = 1,
  frequency = 1,
  segments = 100,
}) => {
  const meshRef = useRef();
  const [time, setTime] = useState(0);

  useFrame((state) => {
    setTime(state.clock.elapsedTime);
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * 0.01;
    }
  });

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * 10 - 5;
      const y = amplitude * Math.sin(frequency * x + time * 2);
      const z = 0;
      pts.push(new Vector3(x, y, z));
    }
    return pts;
  }, [amplitude, frequency, segments, time]);

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

        {/* Connect points with lines */}
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
              count={points.length}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#ffffff" linewidth={2} />
        </line>
      </group>
    </>
  );
};

// Enhanced Scene Registry
const sceneRegistry = [
  {
    id: "parametric-surface",
    name: "Parametric Surface",
    category: "Advanced Mathematics",
    description: "Dynamic parametric surface with customizable parameters",
    component: ParametricSurface,
    parameters: {
      amplitude: { min: 0.5, max: 4, step: 0.1, default: 2 },
      frequency: { min: 0.1, max: 3, step: 0.1, default: 1 },
      uSegments: { min: 10, max: 100, step: 5, default: 50 },
      vSegments: { min: 10, max: 100, step: 5, default: 50 },
    },
  },
  {
    id: "fractal-cube",
    name: "Fractal Cube",
    category: "Fractals",
    description: "Recursive cube structure demonstrating fractal geometry",
    component: FractalCube,
    parameters: {
      iterations: { min: 1, max: 4, step: 1, default: 3 },
      scale: { min: 0.3, max: 0.9, step: 0.05, default: 0.8 },
    },
  },
  {
    id: "sine-wave",
    name: "Animated Sine Wave",
    category: "Trigonometry",
    description: "Real-time animated sine wave with adjustable parameters",
    component: SineWave,
    parameters: {
      amplitude: { min: 0.1, max: 3, step: 0.1, default: 1 },
      frequency: { min: 0.1, max: 5, step: 0.1, default: 1 },
      segments: { min: 20, max: 200, step: 10, default: 100 },
    },
  },
];

// Premium Control Panel Component
const AdvancedControlPanel = ({
  selectedPreset,
  onPresetChange,
  rotationSpeed,
  onRotationSpeedChange,
  parameters,
  onParameterChange,
  showStats,
  onShowStatsChange,
  environment,
  onEnvironmentChange,
  showGrid,
  onShowGridChange,
}) => {
  const currentScene = sceneRegistry.find((s) => s.id === selectedPreset);

  return (
    <div className="w-96 h-full bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 flex flex-col shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Visualization Controls
        </h2>
        <p className="text-sm text-gray-600">
          Explore mathematics through interactive 3D
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Scene Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Mathematical Scene
          </label>
          <select
            value={selectedPreset}
            onChange={(e) => onPresetChange(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
          >
            {sceneRegistry.map((scene) => (
              <option key={scene.id} value={scene.id}>
                {scene.name}
              </option>
            ))}
          </select>

          {currentScene && (
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="text-xs font-medium text-blue-800 mb-1">
                {currentScene.category}
              </div>
              <div className="text-sm text-blue-700">
                {currentScene.description}
              </div>
            </div>
          )}
        </div>

        {/* Global Parameters */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-300 pb-2">
            Global Parameters
          </h3>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Rotation Speed: {rotationSpeed.toFixed(1)}
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={rotationSpeed}
              onChange={(e) =>
                onRotationSpeedChange(parseFloat(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Scene-Specific Parameters */}
        {currentScene?.parameters && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-300 pb-2">
              Scene Parameters
            </h3>

            {Object.entries(currentScene.parameters).map(([key, config]) => (
              <div key={key} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}:{" "}
                  {parameters[key]?.toFixed(config.step < 1 ? 1 : 0) ||
                    config.default}
                </label>
                <input
                  type="range"
                  min={config.min}
                  max={config.max}
                  step={config.step}
                  value={parameters[key] || config.default}
                  onChange={(e) =>
                    onParameterChange(key, parseFloat(e.target.value))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            ))}
          </div>
        )}

        {/* Environment & Display Options */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-300 pb-2">
            Environment
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                HDR Environment
              </label>
              <select
                value={environment}
                onChange={(e) => onEnvironmentChange(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="none">None</option>
                <option value="sunset">Sunset</option>
                <option value="dawn">Dawn</option>
                <option value="night">Night</option>
                <option value="warehouse">Warehouse</option>
                <option value="forest">Forest</option>
                <option value="apartment">Apartment</option>
                <option value="studio">Studio</option>
                <option value="city">City</option>
                <option value="park">Park</option>
                <option value="lobby">Lobby</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Reference Grid
              </label>
              <button
                onClick={() => onShowGridChange(!showGrid)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showGrid ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showGrid ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Performance Stats
              </label>
              <button
                onClick={() => onShowStatsChange(!showStats)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showStats ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showStats ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Premium Code Display
const PremiumCodeDisplay = ({
  selectedPreset,
  rotationSpeed,
  parameters,
  isVisible,
  onToggle,
}) => {
  const currentScene = sceneRegistry.find((s) => s.id === selectedPreset);

  const generateCode = () => {
    const paramStrings = Object.entries(parameters)
      .map(([key, value]) => `  ${key}: ${value}`)
      .join(",\n");

    return `// ${currentScene?.name || "Unknown Scene"}
// Category: ${currentScene?.category || "General"}

import { useFrame, Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';

const MathVisualization = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      // Rotation animation
      meshRef.current.rotation.x += ${rotationSpeed} * 0.01;
      meshRef.current.rotation.y += ${rotationSpeed} * 0.01;
      
      // Time-based animations
      const time = state.clock.elapsedTime;
      // Add your mathematical transformations here
    }
  });

  // Scene parameters
  const params = {
    rotationSpeed: ${rotationSpeed},
${paramStrings}
  };

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      
      {/* Your mathematical visualization */}
      <group ref={meshRef}>
        {/* Geometry and materials based on parameters */}
      </group>
      
      <OrbitControls />
    </Canvas>
  );
};

export default MathVisualization;`;
  };

  return (
    <div
      className={`${
        isVisible ? "w-1/3 min-w-96" : "w-12"
      } transition-all duration-300 bg-gray-900 border-l border-gray-700 flex flex-col shadow-lg`}
    >
      <button
        onClick={onToggle}
        className="p-4 bg-gray-800 text-white hover:bg-gray-700 transition-colors flex items-center justify-center text-lg font-medium"
        title={isVisible ? "Hide Code" : "Show Code"}
      >
        <span className="transform transition-transform">
          {isVisible ? "→" : "←"}
        </span>
        {isVisible && <span className="ml-2">Hide Code</span>}
      </button>

      {isVisible && (
        <div className="flex-1 flex flex-col">
          <div className="p-4 bg-gray-800 border-b border-gray-700">
            <h3 className="text-white text-lg font-semibold mb-1">
              Generated Code
            </h3>
            <p className="text-gray-400 text-sm">
              Real-time code reflecting your GUI changes
            </p>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <pre className="text-green-400 text-sm bg-gray-800 p-4 rounded-lg overflow-auto border border-gray-700 leading-relaxed">
              <code>{generateCode()}</code>
            </pre>
          </div>

          <div className="p-4 bg-gray-800 border-t border-gray-700">
            <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
              Copy Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Loading Component
const PremiumLoadingFallback = () => (
  <Html center>
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <div className="text-white text-lg font-medium">
        Loading Mathematical Scene...
      </div>
    </div>
  </Html>
);

// Main Workspace Component
const VisualizationWorkspace = () => {
  const [rotationSpeed, setRotationSpeed] = useState(1.0);
  const [selectedPreset, setSelectedPreset] = useState("parametric-surface");
  const [parameters, setParameters] = useState({});
  const [showStats, setShowStats] = useState(false);
  const [environment, setEnvironment] = useState("studio");
  const [showGrid, setShowGrid] = useState(true);
  const [codeVisible, setCodeVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handlePresetChange = useCallback(
    (value) => {
      if (value && value !== selectedPreset) {
        setIsLoading(true);
        setSelectedPreset(value);
        setParameters({}); // Reset parameters for new scene
        setTimeout(() => setIsLoading(false), 500);
      }
    },
    [selectedPreset]
  );

  const handleParameterChange = useCallback((key, value) => {
    setParameters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const CurrentScene = useMemo(() => {
    const sceneConfig = sceneRegistry.find((s) => s.id === selectedPreset);
    if (!sceneConfig) return null;

    const SceneComponent = sceneConfig.component;
    return (props) => (
      <SceneComponent
        {...props}
        rotationSpeed={rotationSpeed}
        {...parameters}
      />
    );
  }, [selectedPreset, rotationSpeed, parameters]);

  const currentScene = sceneRegistry.find((s) => s.id === selectedPreset);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Advanced Control Panel */}
      <AdvancedControlPanel
        selectedPreset={selectedPreset}
        onPresetChange={handlePresetChange}
        rotationSpeed={rotationSpeed}
        onRotationSpeedChange={setRotationSpeed}
        parameters={parameters}
        onParameterChange={handleParameterChange}
        showStats={showStats}
        onShowStatsChange={setShowStats}
        environment={environment}
        onEnvironmentChange={setEnvironment}
        showGrid={showGrid}
        onShowGridChange={setShowGrid}
      />

      {/* Premium 3D Viewport */}
      <div className="flex-1 relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <div className="text-white text-xl font-medium">
                Loading {currentScene?.name}...
              </div>
            </div>
          </div>
        )}

        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          className="w-full h-full"
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          dpr={[1, 2]}
          shadows
        >
          <Suspense fallback={<PremiumLoadingFallback />}>
            {CurrentScene && <CurrentScene />}

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={50}
              maxPolarAngle={Math.PI}
              minPolarAngle={0}
              enableDamping={true}
              dampingFactor={0.05}
            />

            {showGrid && (
              <Grid
                args={[20, 20]}
                cellSize={1}
                cellThickness={0.5}
                cellColor="#444444"
                sectionSize={5}
                sectionThickness={1}
                sectionColor="#666666"
                fadeDistance={30}
                fadeStrength={1}
                followCamera={false}
                infiniteGrid={true}
              />
            )}

            {environment !== "none" && <Environment preset={environment} />}
            {showStats && <Stats />}
          </Suspense>
        </Canvas>

        {/* Scene Info Overlay */}
        <div className="absolute top-6 left-6 bg-black bg-opacity-60 backdrop-blur-sm text-white px-4 py-3 rounded-xl border border-white border-opacity-20">
          <div className="text-lg font-semibold mb-1">
            {currentScene?.name || "Unknown Scene"}
          </div>
          <div className="text-sm opacity-90">
            {currentScene?.category} • Speed: {rotationSpeed.toFixed(1)}x
          </div>
          <div className="text-xs opacity-75 mt-1">
            Environment: {environment}
          </div>
        </div>

        {/* Premium Controls Hint */}
        <div className="absolute bottom-6 left-6 text-white text-sm bg-black bg-opacity-50 backdrop-blur-sm px-3 py-2 rounded-lg border border-white border-opacity-20">
          <div className="font-medium mb-1">3D Navigation:</div>
          <div className="text-xs opacity-90">
            Left drag: Rotate • Right drag: Pan • Scroll: Zoom
          </div>
        </div>

        {/* Performance Indicator */}
        <div className="absolute top-6 right-6 text-white text-xs bg-green-600 bg-opacity-80 px-2 py-1 rounded-full">
          60 FPS Target
        </div>
      </div>

      {/* Premium Code Display */}
      <PremiumCodeDisplay
        selectedPreset={selectedPreset}
        rotationSpeed={rotationSpeed}
        parameters={parameters}
        isVisible={codeVisible}
        onToggle={() => setCodeVisible(!codeVisible)}
      />
    </div>
  );
};

export default VisualizationWorkspace;
