// Scene Library Data for Corollary Mathematical Visualizations
// This file contains the complete definitions for our initial set of mathematical scenes

export interface SceneDefinition {
  id: string;
  title: string;
  category: string;
  type: "Narrated Animation" | "Exploratory Environment" | "Utility Plotter";
  visualizationDescription: string;
  editableMathVars: string[];
  editableSceneVars: string[];
  exampleCode: string;
}

export const sceneLibrary: SceneDefinition[] = [
  {
    id: "derivative-essence",
    title: "The Essence of the Derivative",
    category: "Calculus",
    type: "Narrated Animation",
    visualizationDescription:
      "On a 2D plane, a glowing white curve f(x) animates drawing itself. Two points, x and x+h, are connected by a green secant line. As the animation plays, h smoothly slides towards x, causing the secant line to pivot until it becomes the tangent line, which flashes bright purple. A second plot below graphs the tangent's slope in real-time, drawing the derivative f'(x).",
    editableMathVars: ["f(x) equation string"],
    editableSceneVars: ["Animation Speed", "Curve Color"],
    exampleCode: `# Define a function and its derivative
def f(x):
    return x**2

def df(x):
    return 2*x

# The engine uses these functions to render the curves.
# The secant line is calculated between x and x+h.
h = scene.get_slider("h")
slope = (f(x + h) - f(x)) / h`,
  },
  {
    id: "riemann-sums",
    title: "Approximating Area",
    category: "Calculus",
    type: "Exploratory Environment",
    visualizationDescription:
      "The area under a curve is filled with n semi-transparent, glowing blue rectangles. As the n slider increases, the rectangles smoothly multiply and shrink, perfectly converging to the exact area.",
    editableMathVars: ["f(x) equation", "x range [a, b]"],
    editableSceneVars: ["n (number of rectangles) slider", "Rectangle Color"],
    exampleCode: `# Create an array of x-values using NumPy for performance
x = np.linspace(a, b, n)
# Calculate the width of each rectangle
dx = (b - a) / n
# The height of each rectangle is the function value
heights = f(x)
# Total area is the sum of all rectangle areas
area = np.sum(heights * dx)`,
  },
  {
    id: "linear-transformations",
    title: "Matrix Transformations",
    category: "Linear Algebra",
    type: "Exploratory Environment",
    visualizationDescription:
      "A 2D grid of thin, white lines fills the space, with î (red) and ĵ (green) basis vectors shown. When a matrix value is changed, the entire grid fluidly animates—shearing, rotating, and scaling over 1.5 seconds to its new state.",
    editableMathVars: ["2x2 Matrix [[a, b], [c, d]]"],
    editableSceneVars: ["Grid Color", "Animation Speed"],
    exampleCode: `# A 2D transformation matrix
# The columns represent where the basis vectors i and j land
M = np.array([[ 1, -1],
              [ 0,  2]])
# Apply the transformation to a set of vectors (v)
# The @ operator is NumPy's matrix multiplication
transformed_v = M @ v`,
  },
  {
    id: "eigenvectors",
    title: "The Unchanging Direction",
    category: "Linear Algebra",
    type: "Exploratory Environment",
    visualizationDescription:
      "A field of vector arrows fills the screen. When a matrix is applied, all vectors animate. Most rotate, but the eigenvectors, highlighted in glowing teal, only scale along their original line, never changing direction. Labels display their eigenvalue (scaling factor).",
    editableMathVars: ["2x2 Matrix"],
    editableSceneVars: ["Vector Density", "Eigenvector Highlight Color"],
    exampleCode: `# For a matrix M, find its eigenvalues and eigenvectors
# This is a fundamental operation in data science (e.g., PCA)
eigenvalues, eigenvectors = np.linalg.eig(M)
# The eigenvectors are the columns of the eigenvectors matrix
# They represent the principal axes of the data's variance`,
  },
  {
    id: "slope-fields",
    title: "Visualizing Differential Equations",
    category: "Differential Equations",
    type: "Exploratory Environment",
    visualizationDescription:
      "The 2D plane is filled with thousands of tiny, glowing line segments, each representing the slope defined by dy/dx = f(x, y). Clicking anywhere drops a particle that animates, tracing a path through the field, revealing a particular solution to the equation.",
    editableMathVars: ["f(x, y) equation for dy/dx"],
    editableSceneVars: ["Field Density", "Particle Color", "Particle Speed"],
    exampleCode: `# Define the differential equation dy/dx = f(x, y)
def slope_field(x, y):
    return x + y  # Example: dy/dx = x + y

# Create a grid of points for the slope field
x_grid, y_grid = np.meshgrid(np.linspace(-5, 5, 20), np.linspace(-5, 5, 20))
# Calculate slopes at each point
slopes = slope_field(x_grid, y_grid)
# Normalize for visualization
slope_magnitude = np.sqrt(1 + slopes**2)`,
  },
];

// Helper functions for scene management
export const getSceneById = (id: string): SceneDefinition | undefined => {
  return sceneLibrary.find((scene) => scene.id === id);
};

export const getScenesByCategory = (category: string): SceneDefinition[] => {
  return sceneLibrary.filter((scene) => scene.category === category);
};

export const getAllCategories = (): string[] => {
  return [...new Set(sceneLibrary.map((scene) => scene.category))];
};

export const getScenesByType = (
  type: SceneDefinition["type"]
): SceneDefinition[] => {
  return sceneLibrary.filter((scene) => scene.type === type);
};
