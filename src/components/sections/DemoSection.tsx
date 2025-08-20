import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSliders } from "react-icons/fi";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import InteractiveGraph from "../ui/InteractiveGraph";
import { Button } from "../ui/Button";

const DemoSection: React.FC = () => {
  const [amplitude, setAmplitude] = useState(1);
  const [frequency, setFrequency] = useState(1);
  const [phase, setPhase] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-primary-light/30">
      <Container>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="teal" className="mb-4">
            Interactive Demo
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-primary-dark sm:text-4xl mb-4">
            Try it yourself
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral">
            Experience the power of Corollary with these interactive demos.
            Adjust parameters and see the results in real-time.
          </p>
        </motion.div>

        <Tabs defaultValue="sine-wave" className="mb-12">
          <TabsList className="mx-auto">
            <TabsTrigger value="sine-wave">Sine Wave</TabsTrigger>
            <TabsTrigger value="3d-surface">3D Surface</TabsTrigger>
            <TabsTrigger value="vector-field">Vector Field</TabsTrigger>
          </TabsList>

          <TabsContent value="sine-wave" className="mt-8">
            <InteractiveGraph
              title="Sine Wave Visualization"
              description="Adjust the parameters to see how they affect the sine wave."
              imageUrl="/placeholder-1.svg"
              codeSnippet={`import numpy as np\nimport matplotlib.pyplot as plt\n\n# Parameters\namplitude = ${amplitude}\nfrequency = ${frequency}\nphase = ${phase}\n\n# Generate data\nx = np.linspace(0, 2*np.pi, 1000)\ny = amplitude * np.sin(frequency * x + phase)\n\n# Create plot\nplt.figure(figsize=(10, 6))\nplt.plot(x, y)\nplt.title(f'Sine Wave: A={amplitude}, f={frequency}, φ={phase}')\nplt.xlabel('x')\nplt.ylabel('y')\nplt.grid(True)\nplt.show()`}
              controls={
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-neutral mb-1">
                      Amplitude: {amplitude}
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="2"
                      step="0.1"
                      value={amplitude}
                      onChange={(e) => setAmplitude(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral mb-1">
                      Frequency: {frequency}
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="5"
                      step="0.5"
                      value={frequency}
                      onChange={(e) => setFrequency(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral mb-1">
                      Phase: {phase}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="6.28"
                      step="0.1"
                      value={phase}
                      onChange={(e) => setPhase(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              }
            />
          </TabsContent>

          <TabsContent value="3d-surface" className="mt-8">
            <InteractiveGraph
              title="3D Surface Plot"
              description="Visualize complex functions in three dimensions."
              imageUrl="/placeholder-3d-surface.svg"
              codeSnippet={`import numpy as np\nfrom mpl_toolkits.mplot3d import Axes3D\nimport matplotlib.pyplot as plt\n\n# Create data\nx = np.linspace(-5, 5, 50)\ny = np.linspace(-5, 5, 50)\nX, Y = np.meshgrid(x, y)\nZ = np.sin(np.sqrt(X**2 + Y**2))\n\n# Create plot\nfig = plt.figure(figsize=(10, 8))\nax = fig.add_subplot(111, projection='3d')\nsurf = ax.plot_surface(X, Y, Z, cmap='viridis', edgecolor='none')\nax.set_xlabel('X')\nax.set_ylabel('Y')\nax.set_zlabel('Z')\nax.set_title('3D Surface Plot: z = sin(√(x² + y²))')\nfig.colorbar(surf, ax=ax, shrink=0.5, aspect=5)\nplt.show()`}
              controls={
                <div className="flex items-center justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <FiSliders className="mr-2 h-4 w-4" />
                    <span>Adjust Parameters</span>
                  </Button>
                </div>
              }
            />
          </TabsContent>

          <TabsContent value="vector-field" className="mt-8">
            <InteractiveGraph
              title="Vector Field Visualization"
              description="Explore directional forces with vector field plots."
              imageUrl="/placeholder-vector-field.svg"
              codeSnippet={`import numpy as np\nimport matplotlib.pyplot as plt\n\n# Create grid\nx = np.linspace(-2, 2, 20)\ny = np.linspace(-2, 2, 20)\nX, Y = np.meshgrid(x, y)\n\n# Define vector field components\nu = Y  # x-component\nv = -X  # y-component\n\n# Create plot\nplt.figure(figsize=(10, 8))\nplt.quiver(X, Y, u, v, scale=25)\nplt.title('Vector Field: F(x,y) = (y, -x)')\nplt.xlabel('x')\nplt.ylabel('y')\nplt.grid(True)\nplt.axis('equal')\nplt.show()`}
              controls={
                <div className="flex items-center justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <FiSliders className="mr-2 h-4 w-4" />
                    <span>Adjust Parameters</span>
                  </Button>
                </div>
              }
            />
          </TabsContent>
        </Tabs>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="mb-6 text-neutral">
            These are just a few examples of what you can create with Corollary.
            Sign up to access the full library of interactive visualizations.
          </p>
          <Button size="lg" component="a" href="/signup">
            Get Started for Free
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

export default DemoSection;
