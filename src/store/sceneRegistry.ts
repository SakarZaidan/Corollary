/**
 * @file Enhanced scene registry with advanced mathematical visualizations
 * This registry manages all available 3D scene configurations with dynamic parameters.
 */

import { SceneConfiguration, SceneCategory, MathConcept } from "../types/scene";
import SimpleScene from "../components/three/SimpleScene";
import {
  ParametricSurface,
  FractalCube,
  SineWave,
  VectorField,
} from "../components/three/AdvancedScenes";
import { FC } from "react";

/**
 * Enhanced scene registry with mathematical visualizations
 */
export const sceneRegistry: SceneConfiguration[] = [
  {
    id: "vector-field",
    name: "Vector Field",
    category: SceneCategory.ADVANCED_MATHEMATICS,
    description:
      "Interactive vector field visualization with adjustable parameters",
    component: VectorField as FC<any>,
    parameters: {
      density: {
        min: 5,
        max: 50,
        step: 1,
        default: 20,
        label: "Vector Density",
        description: "Number of vectors per unit area",
      },
      scale: {
        min: 0.1,
        max: 2,
        step: 0.1,
        default: 0.5,
        label: "Vector Scale",
        description: "Length of the vectors",
      },
    },
    difficulty: "advanced",
    mathConcepts: [MathConcept.VECTOR_FIELDS],
    tags: ["vector", "field", "advanced", "calculus"],
  },
  {
    id: "simple-scene",
    name: "Simple Rotating Cube",
    category: SceneCategory.BASIC_GEOMETRY,
    description:
      "A basic rotating cube demonstrating 3D transformations and animation basics",
    component: SimpleScene as FC<{ rotationSpeed: number }>,
    parameters: {
      scale: { min: 0.5, max: 3, step: 0.1, default: 1, label: "Cube Size" },
      color: { min: 0, max: 360, step: 1, default: 25, label: "Hue" },
    },
    difficulty: "beginner",
    mathConcepts: [MathConcept.ROTATION],
    tags: ["geometry", "basic", "rotation"],
  },
  {
    id: "parametric-surface",
    name: "Parametric Surface",
    category: SceneCategory.ADVANCED_MATHEMATICS,
    description:
      "Dynamic parametric surface visualization with customizable mathematical parameters",
    component: ParametricSurface as FC<any>,
    parameters: {
      amplitude: {
        min: 0.5,
        max: 4,
        step: 0.1,
        default: 2,
        label: "Amplitude",
        description: "Controls the height variation of the surface",
      },
      frequency: {
        min: 0.1,
        max: 3,
        step: 0.1,
        default: 1,
        label: "Frequency",
        description: "Controls how many oscillations occur",
      },
      uSegments: {
        min: 10,
        max: 100,
        step: 5,
        default: 50,
        label: "U Resolution",
        description: "Mesh density in U direction",
      },
      vSegments: {
        min: 10,
        max: 100,
        step: 5,
        default: 50,
        label: "V Resolution",
        description: "Mesh density in V direction",
      },
    },
    difficulty: "advanced",
    mathConcepts: [MathConcept.PARAMETRIC_EQUATIONS, MathConcept.SURFACES],
    tags: ["parametric", "surface", "advanced", "calculus"],
  },
  {
    id: "fractal-cube",
    name: "Fractal Cube",
    category: SceneCategory.FRACTALS,
    description:
      "Recursive cube structure demonstrating fractal geometry and self-similarity",
    component: FractalCube as FC<any>,
    parameters: {
      iterations: {
        min: 1,
        max: 4,
        step: 1,
        default: 3,
        label: "Recursion Depth",
        description: "Number of fractal iterations",
      },
      scale: {
        min: 0.3,
        max: 0.9,
        step: 0.05,
        default: 0.8,
        label: "Scale Factor",
        description: "Size reduction at each iteration",
      },
      spacing: {
        min: 0.5,
        max: 2,
        step: 0.1,
        default: 1,
        label: "Spacing",
        description: "Distance between fractal elements",
      },
    },
    difficulty: "intermediate",
    mathConcepts: [MathConcept.FRACTALS],
    tags: ["fractal", "recursive", "geometry", "self-similarity"],
  },
  {
    id: "sine-wave",
    name: "Animated Sine Wave",
    category: SceneCategory.TRIGONOMETRY,
    description:
      "Real-time animated sine wave with adjustable trigonometric parameters",
    component: SineWave as FC<any>,
    parameters: {
      amplitude: {
        min: 0.1,
        max: 3,
        step: 0.1,
        default: 1,
        label: "Amplitude",
        description: "Maximum height of the wave",
      },
      frequency: {
        min: 0.1,
        max: 5,
        step: 0.1,
        default: 1,
        label: "Frequency",
        description: "Number of oscillations per unit",
      },
      segments: {
        min: 20,
        max: 200,
        step: 10,
        default: 100,
        label: "Resolution",
        description: "Number of points in the wave",
      },
      phaseShift: {
        min: 0,
        max: 6.28,
        step: 0.1,
        default: 0,
        label: "Phase Shift",
        description: "Horizontal shift of the wave",
      },
    },
    difficulty: "beginner",
    mathConcepts: [MathConcept.SINE_WAVES],
    tags: ["trigonometry", "sine", "wave", "animation"],
  },
];

/**
 * Retrieves a scene configuration by its ID
 */
export function getSceneConfig(id: string): SceneConfiguration | undefined {
  return sceneRegistry.find((scene) => scene.id === id);
}

/**
 * Gets all scenes in a specific category
 */
export function getScenesByCategory(
  category: SceneCategory
): SceneConfiguration[] {
  return sceneRegistry.filter((scene) => scene.category === category);
}

/**
 * Gets scenes by difficulty level
 */
export function getScenesByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced"
): SceneConfiguration[] {
  return sceneRegistry.filter((scene) => scene.difficulty === difficulty);
}

/**
 * Searches scenes by math concept
 */
export function getScenesByMathConcept(
  concept: MathConcept
): SceneConfiguration[] {
  return sceneRegistry.filter(
    (scene) => scene.mathConcepts?.includes(concept) || false
  );
}

/**
 * Gets all available categories
 */
export function getAllCategories(): string[] {
  return [...new Set(sceneRegistry.map((scene) => scene.category))];
}

/**
 * Gets scene count by category
 */
export function getSceneCountByCategory(): Record<string, number> {
  return sceneRegistry.reduce((acc, scene) => {
    acc[scene.category] = (acc[scene.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}
