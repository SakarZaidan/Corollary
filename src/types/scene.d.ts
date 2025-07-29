/**
 * @file Enhanced scene configuration types supporting advanced mathematical visualizations
 * This file extends the original SceneConfiguration to support dynamic parameters and categories.
 */

import { ReactNode, FC } from "react";

/**
 * Defines parameter configuration for scene controls
 */
export interface ParameterConfig {
  min: number;
  max: number;
  step: number;
  default: number;
  label?: string;
  description?: string;
}

/**
 * Enhanced scene configuration supporting dynamic parameters and categories
 */
export interface SceneConfiguration {
  id: string;
  name: string;
  category: string;
  description: string;
  component: FC<any>; // React component that renders the 3D scene
  parameters?: Record<string, ParameterConfig>; // Dynamic parameters for the scene
  tags?: string[]; // Optional tags for filtering/searching
  difficulty?: "beginner" | "intermediate" | "advanced"; // Learning difficulty level
  mathConcepts?: string[]; // Mathematical concepts demonstrated
}

/**
 * Props that all scene components should accept
 */
export interface BaseSceneProps {
  rotationSpeed: number;
  [key: string]: any; // Allow additional dynamic parameters
}

/**
 * Extended scene configuration for backward compatibility
 */
export interface LegacySceneConfiguration {
  id: string;
  name: string;
  component: ReactNode;
}

/**
 * Scene category definitions for organization
 */
export enum SceneCategory {
  BASIC_GEOMETRY = "Basic Geometry",
  TRIGONOMETRY = "Trigonometry",
  CALCULUS = "Calculus",
  LINEAR_ALGEBRA = "Linear Algebra",
  FRACTALS = "Fractals",
  ADVANCED_MATHEMATICS = "Advanced Mathematics",
  PHYSICS_SIMULATION = "Physics Simulation",
  STATISTICS = "Statistics",
}

/**
 * Mathematical concept tags for educational organization
 */
export enum MathConcept {
  ROTATION = "rotation",
  PARAMETRIC_EQUATIONS = "parametric-equations",
  SINE_WAVES = "sine-waves",
  FRACTALS = "fractals",
  SURFACES = "surfaces",
  VECTORS = "vectors",
  MATRICES = "matrices",
  DERIVATIVES = "derivatives",
  INTEGRALS = "integrals",
}
