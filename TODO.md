# Corollary Development Plan

This document outlines the step-by-step plan for developing Corollary, a GUI-first, code-optional interactive mathematical visualization platform. Each completed step will be marked as done.

## Page Architecture & User Flow

### Core Pages:

1. **Landing Page (HomePage.tsx)**

   - Purpose: Marketing and onboarding
   - Components:
     - Hero section with value proposition
     - Feature highlights
     - Examples gallery
     - Call-to-action for signup
   - UX Flow: Entry point → either demo or signup

2. **Visualization Workspace (New Page: WorkspacePage.tsx)**

   - Purpose: Main interactive environment
   - Layout:
     - Header with app controls
     - Left sidebar: Visualization type selector and parameters
     - Main canvas area: 3D visualization
     - Right panel: Generated code view (collapsible)
   - UX Flow:
     1. User selects visualization type
     2. Adjusts parameters via GUI controls
     3. Views real-time updates in 3D canvas
     4. Optionally explores generated code

3. **Example Gallery (New Page: ExamplesPage.tsx)**

   - Purpose: Showcase pre-built visualizations
   - Components:
     - Categorized examples (e.g., Calculus, Linear Algebra)
     - Search/filter functionality
     - One-click loading into workspace
   - UX Flow: Browse → Select → Open in workspace

4. **User Dashboard (New Page: DashboardPage.tsx - Future)**
   - Purpose: Saved work and progress tracking
   - Components:
     - List of saved visualizations
     - Tutorial progress tracker
     - Account settings
   - UX Flow: Access saved work → Continue editing

### Supporting Components:

- **Header/Navigation (components/layout/Header.tsx)**

  - App logo
  - Main navigation links
  - User auth state (logged in/out)

- **Parameter Controls (components/editor/ParameterPanel.tsx)**

  - Dynamic form generation based on visualization type
  - Sliders, number inputs, color pickers
  - Grouped by mathematical significance

- **Code Panel (components/editor/CodePanel.tsx)**
  - Syntax-highlighted code display
  - Language selector (Python/JavaScript)
  - Explanation toggle (shows/hides educational comments)

## Current Implementation Status (DONE)

This section details the progress made so far, including files created or modified and their purpose.

### Core Environment Setup & Basic Features

- **Project Initialization:**
  - Initialized React project with Vite and TypeScript.
  - **Files:** `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `main.tsx` (standard Vite setup).
  - **Purpose:** Provides the foundational development environment.
- **UI Framework Integration:**
  - Integrated Mantine UI for core UI components.
  - **Files:** `main.tsx` (MantineProvider setup).
  - **Purpose:** Enables rapid UI development with pre-built, accessible components.
- **3D Rendering Setup:**
  - Set up `react-three-fiber`, `drei`, and `three` for 3D rendering.
  - **Files:** `package.json` (dependencies), `src/App.tsx` (initial Canvas setup), `src/components/three/SimpleScene.tsx` (created).
  - **Purpose:** Provides a declarative way to build 3D scenes within React.
- **Basic 3D Scene Creation:**
  - Created and integrated a basic 3D scene with a rotating cube.
  - **Files:** `src/components/three/SimpleScene.tsx` (defines the cube and its animation).
  - **Purpose:** Verifies the 3D rendering pipeline is functional.
- **Error Resolution:**
  - Resolved `ERR_ABORTED` error by removing non-existent `App.css` import.
  - **Files:** `src/App.tsx` (removed import statement).
  - **Purpose:** Fixed a critical build error preventing the application from loading.
- **Landing Page Restoration:**
  - Restored the landing page (`HomePage.tsx`) as the primary view.
  - **Files:** `src/App.tsx` (changed root component rendering from `SimpleScene` to `HomePage`).
  - **Purpose:** Ensures the main entry point of the application displays the intended landing experience.

## Future Development Plan

This plan outlines the step-by-step approach to building the Corollary web application, focusing on a GUI-first, code-optional interactive mathematical visualization platform.

### Phase 1: Interactive 3D Visualizations & Core Logic

- [ ] **Dynamic Scene Loading:** Implement a mechanism to dynamically load and display different 3D scenes based on user interaction (e.g., selecting from a gallery).
  - **Pages/Components:** `VisualizationWorkspace.tsx` (main visualization area), `SceneSelector` (component for choosing scenes).
  - **Workflow:** User selects a visualization type -> `VisualizationWorkspace` renders the corresponding 3D scene.
- [ ] **GUI-based 3D Object Manipulation:** Develop a system for users to manipulate 3D objects (e.g., move, rotate, scale, change parameters) directly through GUI controls.
  - **Components:** `ParameterControls` (Mantine UI components for sliders, inputs, toggles).
  - **Workflow:** User adjusts a slider in `ParameterControls` -> 3D object in `VisualizationWorkspace` updates in real-time.
- [ ] **Basic Mathematical Visualization:** Integrate initial mathematical visualization capabilities (e.g., plotting 2D/3D functions, basic vector fields).
  - **Components:** New `three` components for specific visualizations (e.g., `FunctionPlotter.tsx`, `VectorFieldVisualizer.tsx`).
  - **Workflow:** User selects a mathematical concept -> corresponding visualization is displayed and can be manipulated.
- [ ] **State Management for 3D Scenes:** Implement robust state management for 3D scene data and user interactions using React Hooks (`useState`, `useContext`, `useReducer`).
  - **Files:** `src/store/VisualizationContext.tsx` (new context for global visualization state).
  - **Purpose:** Centralizes and manages the complex state of interactive 3D scenes.

### Phase 2: GUI-to-Code Pathway & Editor Integration

- [ ] **Code Editor Integration:** Integrate a code editor component (e.g., using `react-syntax-highlighter` for display, potentially a more interactive editor for future).
  - **Components:** `CodePanel.tsx` (displays code snippets).
  - **Workflow:** User interacts with GUI -> `CodePanel` updates to show the corresponding code.
- [ ] **View-Only Code Generation:** Develop a system to generate view-only code snippets corresponding to the current 3D visualization and its parameters.
  - **Purpose:** Bridges the gap between visual intuition and programmatic understanding.
- [ ] **Basic Code Execution (Pyodide):** Implement basic code execution using Pyodide in a Web Worker for Python.
  - **Files:** `src/utils/pyodideWorker.ts` (new web worker for Pyodide).
  - **Purpose:** Allows users to run Python code directly in the browser for advanced visualizations or data processing.
- [ ] **UI Flow for GUI-to-Code Transition:** Create a clear UI flow for users to seamlessly transition from GUI manipulation to viewing and understanding the underlying code.
  - **UX:** Toggleable `CodePanel`, clear "Show Code" buttons.

### Phase 3: Advanced Features & Polish

- [ ] **Advanced 3D Rendering:** Implement advanced 3D rendering techniques (e.g., custom shaders, post-processing effects, advanced lighting).
  - **Purpose:** Enhances visual quality and realism of visualizations.
- [ ] **Data Import/Export:** Develop a robust data import/export system for mathematical models and visualization configurations.
  - **Purpose:** Allows users to save their work and share visualizations.
- [ ] **Enhanced User Interaction:** Enhance user interaction with advanced controls, keyboard shortcuts, and accessibility features.
  - **Purpose:** Improves usability for a wider range of users.
- [ ] **Performance Optimization:** Optimize performance for complex scenes and large datasets.
  - **Purpose:** Ensures a smooth and responsive experience even with demanding visualizations.

### Phase 4: User Management & Monetization

- [ ] **User Authentication:** Implement user authentication and profile management.
  - **Pages/Components:** `LoginPage.tsx`, `RegisterPage.tsx`, `DashboardPage.tsx`.
  - **Purpose:** Enables personalized experiences and access to premium features.
- [ ] **Subscription Model:** Implement a subscription model for premium features (e.g., advanced visualizations, increased storage, Pyodide compute time).
  - **Purpose:** Defines the monetization strategy for Corollary.
- [ ] **Marketing & Onboarding:** Develop marketing and onboarding materials within the application.
  - **Purpose:** Guides new users and promotes the value proposition.

### Phase 5: Deployment & Iteration

- [ ] **Production Deployment:** Prepare the application for production deployment.
- [ ] **User Feedback Loop:** Establish a system for gathering user feedback and continuously iterating on the product.
