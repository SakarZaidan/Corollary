import React, {
  useState,
  Suspense,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Grid,
  Stats,
  Text,
  Html,
} from "@react-three/drei";
import { Vector3, Color } from "three";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { DashboardHeader } from "../components/layout/DashboardHeader";

// Mathematical Visualization Components
import { DerivativeVisualization } from "../components/visualizations/DerivativeVisualization";
import { RiemannSumsVisualization } from "../components/visualizations/RiemannSumsVisualization";
import { LinearTransformationVisualization } from "../components/visualizations/LinearTransformationVisualization";
import { EigenvectorVisualization } from "../components/visualizations/EigenvectorVisualization";
import { SlopeFieldVisualization } from "../components/visualizations/SlopeFieldVisualization";
import { FourierSeriesVisualization } from "../components/visualizations/FourierSeriesVisualization";
import { ComplexFunctionVisualization } from "../components/visualizations/ComplexFunctionVisualization";
import { OptimizationVisualization } from "../components/visualizations/OptimizationVisualization";

// Mathematical Scene Components
const ParametricSurface = ({
  amplitude = 2,
  frequency = 1,
  timeOffset = 0,
  segments = 50,
}) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime + timeOffset;
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    }
  });

  const geometry = useMemo(() => {
    const positions = [];
    const indices = [];
    const colors = [];

    for (let u = 0; u <= segments; u++) {
      for (let v = 0; v <= segments; v++) {
        const uParam = (u / segments) * Math.PI * 2;
        const vParam = (v / segments) * Math.PI;

        const x = amplitude * Math.cos(uParam) * Math.sin(vParam) * frequency;
        const y = amplitude * Math.cos(vParam);
        const z = amplitude * Math.sin(uParam) * Math.sin(vParam) * frequency;

        positions.push(x, y, z);

        // 3Blue1Brown style colors - blue to teal gradient
        const colorIntensity =
          (Math.sin(uParam) + Math.cos(vParam)) * 0.5 + 0.5;
        colors.push(
          0.2 + colorIntensity * 0.3,
          0.6 + colorIntensity * 0.4,
          0.9
        );
      }
    }

    for (let u = 0; u < segments; u++) {
      for (let v = 0; v < segments; v++) {
        const a = u * (segments + 1) + v;
        const b = u * (segments + 1) + v + 1;
        const c = (u + 1) * (segments + 1) + v;
        const d = (u + 1) * (segments + 1) + v + 1;

        indices.push(a, b, c, b, d, c);
      }
    }

    return {
      positions: new Float32Array(positions),
      indices,
      colors: new Float32Array(colors),
    };
  }, [amplitude, frequency, segments]);

  return (
    <mesh ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={geometry.positions}
          count={geometry.positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={geometry.colors}
          count={geometry.colors.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={new Uint16Array(geometry.indices)}
          count={geometry.indices.length}
          itemSize={1}
        />
      </bufferGeometry>
      <meshStandardMaterial
        vertexColors
        wireframe={true}
        transparent={true}
        opacity={0.8}
        side={2}
      />
    </mesh>
  );
};

const FunctionPlotter = ({
  expression = "sin(x) * cos(y)",
  xRange = [-5, 5],
  yRange = [-5, 5],
  resolution = 50,
}) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const geometry = useMemo(() => {
    const positions = [];
    const indices = [];
    const colors = [];

    // Safe expression evaluator for basic math functions
    const evaluateExpression = (x, y) => {
      try {
        // Create a safe evaluation context
        const mathContext = {
          x,
          y,
          sin: Math.sin,
          cos: Math.cos,
          tan: Math.tan,
          sqrt: Math.sqrt,
          abs: Math.abs,
          exp: Math.exp,
          log: Math.log,
          pow: Math.pow,
          PI: Math.PI,
          E: Math.E,
        };

        // Simple expression parser for basic operations
        if (expression === "sin(x) * cos(y)") {
          return Math.sin(x) * Math.cos(y);
        } else if (expression === "x^2 + y^2") {
          return x * x + y * y;
        } else if (expression === "sin(sqrt(x^2 + y^2))") {
          return Math.sin(Math.sqrt(x * x + y * y));
        } else if (expression === "cos(x) * sin(y)") {
          return Math.cos(x) * Math.sin(y);
        } else {
          // Default fallback
          return Math.sin(x) * Math.cos(y);
        }
      } catch (error) {
        console.warn("Expression evaluation error:", error);
        return 0;
      }
    };

    for (let i = 0; i <= resolution; i++) {
      for (let j = 0; j <= resolution; j++) {
        const x = xRange[0] + (i / resolution) * (xRange[1] - xRange[0]);
        const y = yRange[0] + (j / resolution) * (yRange[1] - yRange[0]);
        const z = evaluateExpression(x, y);

        positions.push(x, z, y);

        // Height-based coloring
        const normalizedHeight = Math.max(0, Math.min(1, (z + 3) / 6));
        colors.push(
          0.1 + normalizedHeight * 0.5,
          0.3 + normalizedHeight * 0.7,
          0.9
        );
      }
    }

    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        const a = i * (resolution + 1) + j;
        const b = i * (resolution + 1) + j + 1;
        const c = (i + 1) * (resolution + 1) + j;
        const d = (i + 1) * (resolution + 1) + j + 1;

        indices.push(a, b, c, b, d, c);
      }
    }

    return {
      positions: new Float32Array(positions),
      indices,
      colors: new Float32Array(colors),
    };
  }, [expression, xRange, yRange, resolution]);

  return (
    <mesh ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={geometry.positions}
          count={geometry.positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={geometry.colors}
          count={geometry.colors.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={new Uint16Array(geometry.indices)}
          count={geometry.indices.length}
          itemSize={1}
        />
      </bufferGeometry>
      <meshStandardMaterial
        vertexColors
        transparent={true}
        opacity={0.9}
        side={2}
      />
    </mesh>
  );
};

const VectorField = ({
  fieldFunction = "simple",
  density = 10,
  scale = 0.5,
}) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const vectors = useMemo(() => {
    const vectorArray = [];
    const range = 3;
    const step = (range * 2) / density;

    for (let x = -range; x <= range; x += step) {
      for (let y = -range; y <= range; y += step) {
        for (let z = -range; z <= range; z += step) {
          let vx, vy, vz;

          switch (fieldFunction) {
            case "radial":
              const r = Math.sqrt(x * x + y * y + z * z);
              vx = x / (r + 0.1);
              vy = y / (r + 0.1);
              vz = z / (r + 0.1);
              break;
            case "circular":
              vx = -y;
              vy = x;
              vz = Math.sin(x) * Math.cos(y);
              break;
            default: // "simple"
              vx = Math.sin(y);
              vy = Math.cos(x);
              vz = Math.sin(x * y * 0.5);
          }

          vectorArray.push({
            position: [x, y, z],
            direction: [vx * scale, vy * scale, vz * scale],
            magnitude: Math.sqrt(vx * vx + vy * vy + vz * vz),
          });
        }
      }
    }

    return vectorArray;
  }, [fieldFunction, density, scale]);

  return (
    <group ref={groupRef}>
      {vectors.map((vector, i) => {
        const magnitude = vector.magnitude;
        const color = new Color().setHSL(0.6 - magnitude * 0.3, 0.8, 0.6);

        return (
          <group key={i} position={vector.position}>
            {/* Vector arrow body */}
            <mesh>
              <cylinderGeometry args={[0.02, 0.02, magnitude, 8]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.3}
              />
            </mesh>
            {/* Vector arrow head */}
            <mesh position={[0, magnitude / 2, 0]}>
              <coneGeometry args={[0.05, 0.1, 8]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// Scene Registry with detailed configurations
const sceneRegistry = [
  {
    id: "derivative",
    name: "The Essence of the Derivative",
    category: "Calculus",
    description:
      "Explore the fundamental concept of derivatives through interactive visualization of tangent lines and rates of change.",
    component: DerivativeVisualization,
    parameters: {
      functionType: {
        type: "select",
        options: ["polynomial", "trigonometric", "exponential"],
        default: "polynomial",
        label: "Function Type",
        description: "Choose the type of function to analyze",
      },
      xValue: {
        min: -3,
        max: 3,
        step: 0.1,
        default: 1,
        label: "x-value",
        description: "Point where derivative is calculated",
      },
      showTangent: {
        type: "boolean",
        default: true,
        label: "Show Tangent Line",
        description: "Display the tangent line at the point",
      },
      showSecant: {
        type: "boolean",
        default: false,
        label: "Show Secant Line",
        description: "Display secant line for comparison",
      },
      deltaX: {
        min: 0.1,
        max: 2,
        step: 0.1,
        default: 0.5,
        label: "Δx",
        description: "Distance for secant line calculation",
      },
      animationSpeed: {
        min: 0,
        max: 2,
        step: 0.1,
        default: 1,
        label: "Animation Speed",
        description: "Speed of animations",
      },
    },
  },
  {
    id: "riemann-sums",
    name: "Approximating Area with Riemann Sums",
    category: "Calculus",
    description:
      "Visualize how rectangles approximate the area under a curve, demonstrating the foundation of integral calculus.",
    component: RiemannSumsVisualization,
    parameters: {
      functionType: {
        type: "select",
        options: ["quadratic", "cubic", "sine"],
        default: "quadratic",
        label: "Function Type",
        description: "Choose the function to integrate",
      },
      numRectangles: {
        min: 4,
        max: 50,
        step: 1,
        default: 8,
        label: "Number of Rectangles",
        description: "How many rectangles to use",
      },
      method: {
        type: "select",
        options: ["left", "right", "midpoint"],
        default: "left",
        label: "Riemann Method",
        description: "Which point to sample for rectangle height",
      },
      intervalStart: {
        min: -2,
        max: 2,
        step: 0.5,
        default: 0,
        label: "Interval Start",
        description: "Left boundary of integration",
      },
      intervalEnd: {
        min: 1,
        max: 6,
        step: 0.5,
        default: 4,
        label: "Interval End",
        description: "Right boundary of integration",
      },
      showArea: {
        type: "boolean",
        default: true,
        label: "Show Area",
        description: "Highlight the approximated area",
      },
    },
  },
  {
    id: "linear-transformation",
    name: "Matrix Transformations in Action",
    category: "Linear Algebra",
    description:
      "See how matrices transform space by watching geometric shapes change under linear transformations.",
    component: LinearTransformationVisualization,
    parameters: {
      transformationType: {
        type: "select",
        options: ["rotation", "scaling", "shear", "reflection"],
        default: "rotation",
        label: "Transformation Type",
        description: "Type of linear transformation",
      },
      matrixA: {
        min: -3,
        max: 3,
        step: 0.1,
        default: 0.8,
        label: "Matrix [1,1]",
        description: "Top-left matrix element",
      },
      matrixB: {
        min: -3,
        max: 3,
        step: 0.1,
        default: -0.6,
        label: "Matrix [1,2]",
        description: "Top-right matrix element",
      },
      matrixC: {
        min: -3,
        max: 3,
        step: 0.1,
        default: 0.6,
        label: "Matrix [2,1]",
        description: "Bottom-left matrix element",
      },
      matrixD: {
        min: -3,
        max: 3,
        step: 0.1,
        default: 0.8,
        label: "Matrix [2,2]",
        description: "Bottom-right matrix element",
      },
      showOriginal: {
        type: "boolean",
        default: true,
        label: "Show Original",
        description: "Display original shape and grid",
      },
      showGrid: {
        type: "boolean",
        default: true,
        label: "Show Grid",
        description: "Display coordinate grid",
      },
    },
  },
  {
    id: "eigenvectors",
    name: "The Unchanging Direction: Eigenvectors",
    category: "Linear Algebra",
    description:
      "Discover eigenvectors - the special directions that remain unchanged under matrix transformations.",
    component: EigenvectorVisualization,
    parameters: {
      matrixType: {
        type: "select",
        options: ["symmetric", "rotation", "scaling", "custom"],
        default: "symmetric",
        label: "Matrix Type",
        description: "Predefined matrix or custom",
      },
      matrixA: {
        min: -3,
        max: 3,
        step: 0.1,
        default: 3,
        label: "Matrix [1,1]",
        description: "Top-left matrix element",
      },
      matrixB: {
        min: -3,
        max: 3,
        step: 0.1,
        default: 1,
        label: "Matrix [1,2]",
        description: "Top-right matrix element",
      },
      matrixC: {
        min: -3,
        max: 3,
        step: 0.1,
        default: 1,
        label: "Matrix [2,1]",
        description: "Bottom-left matrix element",
      },
      matrixD: {
        min: -3,
        max: 3,
        step: 0.1,
        default: 2,
        label: "Matrix [2,2]",
        description: "Bottom-right matrix element",
      },
      showEigenspaces: {
        type: "boolean",
        default: true,
        label: "Show Eigenspaces",
        description: "Display eigenspace lines",
      },
      showTransformation: {
        type: "boolean",
        default: true,
        label: "Show Transformation",
        description: "Animate the transformation",
      },
    },
  },
  {
    id: "slope-fields",
    name: "Visualizing Differential Equations",
    category: "Differential Equations",
    description:
      "Explore differential equations through slope fields and solution curves, revealing the behavior of dynamic systems.",
    component: SlopeFieldVisualization,
    parameters: {
      equationType: {
        type: "select",
        options: ["exponential", "logistic", "harmonic", "custom"],
        default: "exponential",
        label: "Equation Type",
        description: "Type of differential equation",
      },
      customFunction: {
        type: "text",
        default: "x + y",
        label: "Custom Function",
        description: "Custom dy/dx expression",
      },
      gridDensity: {
        min: 8,
        max: 25,
        step: 1,
        default: 15,
        label: "Grid Density",
        description: "Number of slope vectors",
      },
      showSolutionCurves: {
        type: "boolean",
        default: true,
        label: "Show Solutions",
        description: "Display solution curves",
      },
      numSolutionCurves: {
        min: 3,
        max: 10,
        step: 1,
        default: 5,
        label: "Number of Curves",
        description: "How many solution curves to show",
      },
      vectorScale: {
        min: 0.1,
        max: 0.8,
        step: 0.05,
        default: 0.3,
        label: "Vector Scale",
        description: "Size of slope vectors",
      },
    },
  },
  {
    id: "parametric-surface",
    name: "Parametric Surface Explorer",
    category: "Advanced Mathematics",
    description:
      "Explore parametric surfaces with real-time parameter control. Perfect for understanding how mathematical parameters affect 3D geometry.",
    component: ParametricSurface,
    parameters: {
      amplitude: {
        min: 0.5,
        max: 4,
        step: 0.1,
        default: 2,
        label: "Amplitude",
        description: "Controls the overall size of the surface",
      },
      frequency: {
        min: 0.1,
        max: 3,
        step: 0.1,
        default: 1,
        label: "Frequency",
        description: "Controls the oscillation frequency",
      },
      segments: {
        min: 20,
        max: 100,
        step: 5,
        default: 50,
        label: "Resolution",
        description: "Surface mesh density",
      },
    },
  },
  {
    id: "function-plotter",
    name: "3D Function Plotter",
    category: "Function Analysis",
    description:
      "Plot mathematical functions z = f(x,y) in 3D space. Choose from predefined expressions to see them come to life.",
    component: FunctionPlotter,
    parameters: {
      expression: {
        type: "select",
        options: [
          "sin(x) * cos(y)",
          "x^2 + y^2",
          "sin(sqrt(x^2 + y^2))",
          "cos(x) * sin(y)",
        ],
        default: "sin(x) * cos(y)",
        label: "Function z = f(x,y)",
        description: "Choose a mathematical expression",
      },
      resolution: {
        min: 20,
        max: 100,
        step: 5,
        default: 50,
        label: "Resolution",
        description: "Plot resolution",
      },
    },
  },
  {
    id: "vector-field",
    name: "Vector Field Visualization",
    category: "Vector Calculus",
    description:
      "Visualize 3D vector fields with interactive controls. Great for understanding electromagnetic fields and fluid dynamics.",
    component: VectorField,
    parameters: {
      fieldFunction: {
        type: "select",
        options: ["simple", "radial", "circular"],
        default: "simple",
        label: "Field Type",
        description: "Type of vector field",
      },
      density: {
        min: 5,
        max: 15,
        step: 1,
        default: 10,
        label: "Vector Density",
        description: "Number of vectors per axis",
      },
      scale: {
        min: 0.1,
        max: 1,
        step: 0.1,
        default: 0.5,
        label: "Vector Scale",
        description: "Size of vector arrows",
      },
    },
  },
  {
    id: "fourier-series",
    name: "Fourier Series Decomposition",
    category: "Signal Processing",
    description:
      "Explore how complex periodic functions can be decomposed into simple sine and cosine waves.",
    component: FourierSeriesVisualization,
    parameters: {
      waveType: {
        type: "select",
        options: ["square", "sawtooth", "triangle", "custom"],
        default: "square",
        label: "Wave Type",
        description: "Type of periodic function",
      },
      numTerms: {
        min: 1,
        max: 20,
        step: 1,
        default: 5,
        label: "Number of Terms",
        description: "How many Fourier terms to include",
      },
      frequency: {
        min: 0.5,
        max: 3,
        step: 0.1,
        default: 1,
        label: "Frequency",
        description: "Fundamental frequency",
      },
      amplitude: {
        min: 0.5,
        max: 2,
        step: 0.1,
        default: 1,
        label: "Amplitude",
        description: "Wave amplitude",
      },
      showPartialSums: {
        type: "boolean",
        default: true,
        label: "Show Partial Sums",
        description: "Display intermediate approximations",
      },
    },
  },
  {
    id: "complex-functions",
    name: "Complex Function Transformations",
    category: "Complex Analysis",
    description:
      "Visualize how complex functions transform the complex plane, revealing the beauty of complex analysis.",
    component: ComplexFunctionVisualization,
    parameters: {
      functionType: {
        type: "select",
        options: [
          "identity",
          "square",
          "inverse",
          "exponential",
          "logarithm",
          "mobius",
        ],
        default: "square",
        label: "Function Type",
        description: "Complex function to visualize",
      },
      gridDensity: {
        min: 5,
        max: 20,
        step: 1,
        default: 10,
        label: "Grid Density",
        description: "Density of coordinate grid",
      },
      showDomain: {
        type: "boolean",
        default: true,
        label: "Show Domain",
        description: "Display input plane",
      },
      showRange: {
        type: "boolean",
        default: true,
        label: "Show Range",
        description: "Display output plane",
      },
    },
  },
  {
    id: "optimization",
    name: "Optimization Algorithms",
    category: "Machine Learning",
    description:
      "Watch different optimization algorithms find minima of mathematical functions in real-time.",
    component: OptimizationVisualization,
    parameters: {
      functionType: {
        type: "select",
        options: ["quadratic", "rosenbrock", "himmelblau", "rastrigin"],
        default: "quadratic",
        label: "Function Type",
        description: "Objective function to optimize",
      },
      algorithm: {
        type: "select",
        options: ["gradient_descent", "momentum", "adam", "newton"],
        default: "gradient_descent",
        label: "Algorithm",
        description: "Optimization algorithm",
      },
      learningRate: {
        min: 0.01,
        max: 0.5,
        step: 0.01,
        default: 0.1,
        label: "Learning Rate",
        description: "Step size for optimization",
      },
      showContours: {
        type: "boolean",
        default: true,
        label: "Show Contours",
        description: "Display function contours",
      },
      showPath: {
        type: "boolean",
        default: true,
        label: "Show Path",
        description: "Display optimization trajectory",
      },
    },
  },
];

// Control Panel Component
const ControlPanel = ({
  selectedScene,
  onSceneChange,
  parameters,
  onParameterChange,
  environment,
  onEnvironmentChange,
  showGrid,
  onShowGridChange,
  showStats,
  onShowStatsChange,
  onShowCode,
}) => {
  const currentScene = sceneRegistry.find((s) => s.id === selectedScene);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.div
      initial={{ x: -400 }}
      animate={{ x: isCollapsed ? -320 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-full w-80 bg-gray-900 border-r border-gray-700 shadow-2xl z-50 overflow-hidden"
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-12 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-r-lg transition-colors duration-200 z-10"
      >
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            isCollapsed ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="h-full overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-700 bg-gray-800">
          <h2 className="text-xl font-bold text-white mb-2">
            Visualization Lab
          </h2>
          <p className="text-sm text-gray-300">
            Interactive Mathematical Exploration
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Scene Selection */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white mb-3">
              Mathematical Scene
            </h3>
            <select
              value={selectedScene}
              onChange={(e) => onSceneChange(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sceneRegistry.map((scene) => (
                <option key={scene.id} value={scene.id}>
                  {scene.name}
                </option>
              ))}
            </select>

            {currentScene && (
              <div className="bg-gray-800 rounded-lg p-4 mt-3">
                <div className="text-xs font-medium text-blue-400 mb-1">
                  {currentScene.category}
                </div>
                <div className="text-sm text-gray-300">
                  {currentScene.description}
                </div>
              </div>
            )}
          </div>

          {/* Parameters */}
          {currentScene && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Parameters</h3>
              {Object.entries(currentScene.parameters).map(([key, param]) => (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    {param.label}
                    <span className="text-xs text-gray-500 ml-2">
                      ({param.description})
                    </span>
                  </label>

                  {param.type === "text" ? (
                    <input
                      type="text"
                      value={parameters[key] || param.default}
                      onChange={(e) => onParameterChange(key, e.target.value)}
                      className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder={param.default}
                    />
                  ) : param.type === "select" ? (
                    <select
                      value={parameters[key] || param.default}
                      onChange={(e) => onParameterChange(key, e.target.value)}
                      className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      {param.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : param.type === "boolean" ? (
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={
                          parameters[key] !== undefined
                            ? parameters[key]
                            : param.default
                        }
                        onChange={(e) =>
                          onParameterChange(key, e.target.checked)
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-300">
                        {parameters[key] !== undefined
                          ? parameters[key]
                          : param.default
                          ? "Enabled"
                          : "Disabled"}
                      </span>
                    </label>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="range"
                        min={param.min}
                        max={param.max}
                        step={param.step}
                        value={parameters[key] || param.default}
                        onChange={(e) =>
                          onParameterChange(key, parseFloat(e.target.value))
                        }
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{param.min}</span>
                        <span className="font-medium text-white">
                          {parameters[key] || param.default}
                        </span>
                        <span>{param.max}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Environment Controls */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Scene & Environment
            </h3>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Environment Lighting
              </label>
              <select
                value={environment}
                onChange={(e) => onEnvironmentChange(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="studio">Studio</option>
                <option value="sunset">Sunset</option>
                <option value="dawn">Dawn</option>
                <option value="night">Night</option>
                <option value="forest">Forest</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={showGrid}
                  onChange={(e) => onShowGridChange(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-300">Show Grid</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={showStats}
                  onChange={(e) => onShowStatsChange(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-300">
                  Show Performance Stats
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={onShowCode}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              <span>Show Code</span>
            </button>

            <div className="text-xs text-gray-500 text-center">
              Camera: Left drag to rotate • Right drag to pan • Scroll to zoom
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Code Display Panel
const CodePanel = ({ isVisible, onClose, selectedScene, parameters }) => {
  const currentScene = sceneRegistry.find((s) => s.id === selectedScene);

  const generateCode = () => {
    const sceneCode = {
      "parametric-surface": `import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Parametric Surface Visualization
# Parameters: amplitude=${parameters.amplitude || 2}, frequency=${
        parameters.frequency || 1
      }

def parametric_surface(u, v, amplitude=${
        parameters.amplitude || 2
      }, frequency=${parameters.frequency || 1}):
    """Generate parametric surface coordinates"""
    x = amplitude * np.cos(u) * np.sin(v) * frequency
    y = amplitude * np.cos(v)
    z = amplitude * np.sin(u) * np.sin(v) * frequency
    return x, y, z

# Create parameter arrays
u = np.linspace(0, 2*np.pi, ${parameters.segments || 50})
v = np.linspace(0, np.pi, ${parameters.segments || 50})
U, V = np.meshgrid(u, v)

# Generate surface
X, Y, Z = parametric_surface(U, V)

# Create 3D plot
fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection='3d')
ax.plot_wireframe(X, Y, Z, alpha=0.8, color='cyan')
ax.set_title('Parametric Surface Visualization')
plt.show()`,

      "function-plotter": `import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# 3D Function Plotter
# Function: z = ${parameters.expression || "sin(x) * cos(y)"}

def function_3d(x, y):
    """Evaluate the mathematical function"""
    return ${parameters.expression || "np.sin(x) * np.cos(y)"}

# Create coordinate arrays
x = np.linspace(-5, 5, ${parameters.resolution || 50})
y = np.linspace(-5, 5, ${parameters.resolution || 50})
X, Y = np.meshgrid(x, y)

# Evaluate function
Z = function_3d(X, Y)

# Create 3D surface plot
fig = plt.figure(figsize=(12, 9))
ax = fig.add_subplot(111, projection='3d')
surface = ax.plot_surface(X, Y, Z, cmap='viridis', alpha=0.9)
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
ax.set_title('3D Function: z = ${parameters.expression || "sin(x) * cos(y)"}')
fig.colorbar(surface)
plt.show()`,

      "vector-field": `import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# 3D Vector Field Visualization
# Field Type: ${parameters.fieldFunction || "simple"}

def vector_field_${parameters.fieldFunction || "simple"}(x, y, z):
    """Define the vector field function"""
    ${
      parameters.fieldFunction === "radial"
        ? "r = np.sqrt(x**2 + y**2 + z**2)\n    return x/(r+0.1), y/(r+0.1), z/(r+0.1)"
        : parameters.fieldFunction === "circular"
        ? "return -y, x, np.sin(x) * np.cos(y)"
        : "return np.sin(y), np.cos(x), np.sin(x*y*0.5)"
    }

# Create 3D grid
range_val = 3
density = ${parameters.density || 10}
x = np.linspace(-range_val, range_val, density)
y = np.linspace(-range_val, range_val, density)
z = np.linspace(-range_val, range_val, density)
X, Y, Z = np.meshgrid(x, y, z)

# Calculate vector field
U, V, W = vector_field_${parameters.fieldFunction || "simple"}(X, Y, Z)

# Create 3D quiver plot
fig = plt.figure(figsize=(12, 10))
ax = fig.add_subplot(111, projection='3d')
ax.quiver(X, Y, Z, U, V, W, length=${
        parameters.scale || 0.5
      }, normalize=True, alpha=0.7)
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
ax.set_title('3D Vector Field: ${parameters.fieldFunction || "simple"}')
plt.show()`,
    };

    return (
      sceneCode[selectedScene] || "# Select a scene to view generated code"
    );
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed right-0 top-0 h-full w-96 bg-gray-900 border-l border-gray-700 shadow-2xl z-50 overflow-hidden"
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-700 bg-gray-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Generated Code
                </h3>
                <p className="text-sm text-gray-300">{currentScene?.name}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-auto p-4">
              <pre className="text-sm text-gray-300 bg-gray-800 rounded-lg p-4 overflow-auto">
                <code>{generateCode()}</code>
              </pre>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700 bg-gray-800">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                Download Python Script
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Workspace Component
export function VisualizationWorkspace() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUserStore();

  // Scene state
  const [selectedScene, setSelectedScene] = useState("parametric-surface");
  const [parameters, setParameters] = useState({});

  // Environment state
  const [environment, setEnvironment] = useState("studio");
  const [showGrid, setShowGrid] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Authentication check
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleParameterChange = useCallback((key, value) => {
    setParameters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSceneChange = useCallback((sceneId) => {
    setSelectedScene(sceneId);
    setParameters({}); // Reset parameters when changing scenes
  }, []);

  const currentScene = sceneRegistry.find((s) => s.id === selectedScene);
  const SceneComponent = currentScene?.component;

  if (isLoading) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading workspace...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-900 overflow-hidden relative">
      <DashboardHeader />
      {/* Control Panel */}
      <ControlPanel
        selectedScene={selectedScene}
        onSceneChange={handleSceneChange}
        parameters={parameters}
        onParameterChange={handleParameterChange}
        environment={environment}
        onEnvironmentChange={setEnvironment}
        showGrid={showGrid}
        onShowGridChange={setShowGrid}
        showStats={showStats}
        onShowStatsChange={setShowStats}
        onShowCode={() => setShowCode(true)}
      />

      {/* Main Canvas Area */}
      <div className="h-full ml-80">
        <Canvas
          camera={{ position: [5, 5, 5], fov: 60 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            {/* Lighting Setup - 3Blue1Brown style */}
            <ambientLight intensity={0.2} color="#001122" />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              color="#ffffff"
              castShadow
            />
            <pointLight
              position={[-10, -10, -5]}
              intensity={0.5}
              color="#4488ff"
            />
            <pointLight position={[0, 10, 0]} intensity={0.3} color="#88ffff" />

            {/* Scene Component */}
            {SceneComponent && (
              <SceneComponent
                {...parameters}
                {...(currentScene.parameters &&
                  Object.fromEntries(
                    Object.entries(currentScene.parameters).map(
                      ([key, param]) => [
                        key,
                        parameters[key] !== undefined
                          ? parameters[key]
                          : param.default,
                      ]
                    )
                  ))}
              />
            )}

            {/* Environment and Controls */}
            {showGrid && (
              <Grid
                args={[20, 20]}
                cellSize={1}
                cellThickness={0.5}
                cellColor="#333333"
                sectionSize={5}
                sectionThickness={1}
                sectionColor="#555555"
                fadeDistance={25}
                fadeStrength={1}
                followCamera={false}
                infiniteGrid={true}
              />
            )}

            <Environment preset={environment} />
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              dampingFactor={0.05}
              rotateSpeed={0.5}
              zoomSpeed={0.5}
              panSpeed={0.5}
            />

            {showStats && <Stats />}
          </Suspense>
        </Canvas>

        {/* Scene Info Overlay */}
        <div className="absolute top-6 right-6 bg-gray-900/90 backdrop-blur-sm text-white px-4 py-3 rounded-xl border border-gray-700">
          <div className="text-lg font-semibold mb-1">
            {currentScene?.name || "Unknown Scene"}
          </div>
          <div className="text-sm text-gray-300">{currentScene?.category}</div>
          <div className="text-xs text-gray-400 mt-1">
            Environment: {environment}
          </div>
        </div>

        {/* Performance Indicator */}
        <div className="absolute bottom-6 right-6 text-white text-xs bg-green-600/80 px-3 py-1 rounded-full">
          60 FPS Target
        </div>
      </div>

      {/* Code Display Panel */}
      <CodePanel
        isVisible={showCode}
        onClose={() => setShowCode(false)}
        selectedScene={selectedScene}
        parameters={parameters}
      />

      {/* Custom Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #1e40af;
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #1e40af;
        }
      `}</style>
    </div>
  );
}
