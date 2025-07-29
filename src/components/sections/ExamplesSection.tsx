import React from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCode,
  FiCopy,
  FiDownload,
  FiEye,
  FiExternalLink,
  FiPlay,
  FiRefreshCw,
  FiSettings,
} from "react-icons/fi";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import MathEquation from "../ui/MathEquation";

interface Example {
  id: string;
  title: string;
  description: string;
  equation: string;
  equationDescription: string;
  code: string;
  image: string;
  category: string;
}

const examples: Example[] = [
  {
    id: "example-1",
    title: "Sine Wave Visualization",
    description:
      "Interactive visualization of sine waves with adjustable parameters.",
    equation: "y = A * sin(ωx + φ)",
    equationDescription: "A: amplitude, ω: angular frequency, φ: phase shift",
    code: "import numpy as np\nimport matplotlib.pyplot as plt\n\nx = np.linspace(0, 2*np.pi, 100)\ny = np.sin(x)\nplt.plot(x, y)\nplt.show()",
    image: "/placeholder-1.svg",
    category: "Trigonometry",
  },
  {
    id: "example-2",
    title: "3D Surface Plots",
    description:
      "Explore complex functions in three dimensions with interactive controls.",
    equation: "z = sin(√(x² + y²))",
    equationDescription: "Creates a circular ripple pattern in 3D space",
    code: "import numpy as np\nfrom mpl_toolkits.mplot3d import Axes3D\nimport matplotlib.pyplot as plt\n\nx = np.linspace(-5, 5, 50)\ny = np.linspace(-5, 5, 50)\nX, Y = np.meshgrid(x, y)\nZ = np.sin(np.sqrt(X**2 + Y**2))\n\nfig = plt.figure()\nax = fig.add_subplot(111, projection='3d')\nsurf = ax.plot_surface(X, Y, Z)\nplt.show()",
    image: "/placeholder-2.svg",
    category: "3D Visualization",
  },
  {
    id: "example-3",
    title: "Vector Field Analysis",
    description: "Visualize vector fields and understand directional forces.",
    equation: "F(x,y) = (y, -x)",
    equationDescription: "A simple rotational vector field",
    code: "import numpy as np\nimport matplotlib.pyplot as plt\n\nx = np.linspace(-2, 2, 20)\ny = np.linspace(-2, 2, 20)\nX, Y = np.meshgrid(x, y)\nu = Y\nv = -X\n\nplt.quiver(X, Y, u, v)\nplt.axis('equal')\nplt.show()",
    image: "/placeholder-1.svg",
    category: "Vector Calculus",
  },
];

const ExamplesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-primary-light/30">
      <Container>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="purple-solid" className="mb-4">
            Examples
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-primary-dark sm:text-4xl mb-4">
            Everything you need to visualize complex math
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral">
            Explore our library of examples covering various mathematical
            domains, from calculus to linear algebra and beyond.
          </p>
        </motion.div>

        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="mx-auto">
            <TabsTrigger value="all">All Examples</TabsTrigger>
            <TabsTrigger value="trigonometry">Trigonometry</TabsTrigger>
            <TabsTrigger value="3d">3D Visualization</TabsTrigger>
            <TabsTrigger value="calculus">Vector Calculus</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {examples.map((example, index) => (
                <ExampleCard key={example.id} example={example} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trigonometry" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {examples
                .filter((example) => example.category === "Trigonometry")
                .map((example, index) => (
                  <ExampleCard
                    key={example.id}
                    example={example}
                    index={index}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="3d" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {examples
                .filter((example) => example.category === "3D Visualization")
                .map((example, index) => (
                  <ExampleCard
                    key={example.id}
                    example={example}
                    index={index}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="calculus" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {examples
                .filter((example) => example.category === "Vector Calculus")
                .map((example, index) => (
                  <ExampleCard
                    key={example.id}
                    example={example}
                    index={index}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button size="lg" className="group">
            Browse All Examples
            <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/Dialog";

interface ExampleCardProps {
  example: Example;
  index: number;
}

const ExampleCard: React.FC<ExampleCardProps> = ({ example, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCode, setShowCode] = useState(false);

  // Animation for the visualization in the card with improved transitions
  const getVisualizationAnimation = () => {
    switch (example.category) {
      case "Trigonometry":
        return {
          animate: isHovered
            ? {
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }
            : { backgroundPosition: "30% 50%" }, // Static position when not hovered
          transition: {
            duration: 3,
            ease: [0.43, 0.13, 0.23, 0.96], // Custom easing for smoother animation
            repeat: isHovered ? Infinity : 0,
          },
          style: {
            backgroundSize: "200% 100%",
            backgroundImage:
              "linear-gradient(90deg, #6d28d9, #14b8a6, #6d28d9)",
          },
        };
      case "3D Visualization":
        return {
          animate: isHovered
            ? {
                rotateY: [0, 72, 144, 216, 288, 360],
                transition: {
                  duration: 8,
                  ease: [0.43, 0.13, 0.23, 0.96],
                  repeat: Infinity,
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1], // Control timing of keyframes
                },
              }
            : { rotateY: isFlipped ? 72 : 0 }, // Maintain position when not hovered
          style: {
            backgroundImage: "radial-gradient(circle, #6d28d9, #14b8a6)",
            transformStyle: "preserve-3d",
            perspective: "1000px",
          },
        };
      case "Vector Calculus":
        return {
          animate: isHovered
            ? {
                scale: [1, 1.05, 1.1, 1.05, 1],
                rotate: [0, 2, 0, -2, 0],
                transition: {
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  times: [0, 0.25, 0.5, 0.75, 1], // Control timing of keyframes
                },
              }
            : { scale: 1, rotate: 0 }, // Reset when not hovered
          style: {
            backgroundImage: "linear-gradient(135deg, #6d28d9, #14b8a6)",
          },
        };
      default:
        return {
          animate: {},
          transition: {},
          style: {},
        };
    }
  };

  const visualizationAnimation = getVisualizationAnimation();

  // Handle card flip animation
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    // Short delay before showing code to make animation smoother
    setTimeout(() => {
      setShowCode(!showCode);
    }, 150);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="perspective-1000"
    >
      <motion.div
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1], // Spring-like easing for natural card flip
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        {/* Front of card */}
        <motion.div
          style={{
            backfaceVisibility: "hidden",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            position: isFlipped ? "absolute" : "relative",
            width: "100%",
            height: "100%",
            zIndex: isFlipped ? 0 : 1,
          }}
        >
          <Card
            className="h-full overflow-hidden transition-all"
            hover
            glowOnHover
            borderGradient
          >
            <CardHeader className="pb-0">
              <div className="flex justify-between items-start">
                <Badge
                  variant={index % 2 === 0 ? "purple" : "teal"}
                  className="mb-2"
                >
                  {example.category}
                </Badge>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleFlip}
                    aria-label="Toggle code view"
                  >
                    {isFlipped ? (
                      <FiEye className="h-4 w-4" />
                    ) : (
                      <FiCode className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <CardTitle className="text-xl">{example.title}</CardTitle>
              <CardDescription>{example.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="aspect-video relative mb-4 overflow-hidden rounded-md bg-neutral-100">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  {...visualizationAnimation}
                >
                  <div className="relative z-10 text-white font-bold text-xl">
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        Interactive Demo
                      </motion.div>
                    )}
                  </div>
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-teal-500/30 z-0 opacity-0"
                  animate={{ opacity: isHovered ? 0.6 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div className="absolute inset-0 z-10 overflow-hidden rounded-md">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-600/40 to-teal-600/40 mix-blend-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
                <motion.img
                  src={example.image}
                  alt={example.title}
                  className="h-full w-full object-cover relative z-0"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.02 }}
                  whileHover={{ scale: 1.08 }}
                  transition={{
                    scale: {
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                    hover: {
                      duration: 0.4,
                      ease: [0.25, 0.1, 0.25, 1.0],
                    },
                  }}
                  style={{
                    filter: isHovered
                      ? "brightness(0.9) contrast(1.1)"
                      : "brightness(0.95) contrast(1.05)",
                  }}
                />
              </div>
              <MathEquation
                equation={example.equation}
                description={example.equationDescription}
                className="bg-neutral-50 shadow-sm dark:bg-gray-800"
                animated={false}
                onHover={() => setIsHovered(true)}
              />
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full group"
                onClick={handleFlip}
              >
                <span>View Code Example</span>
                <FiCode className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Back of card (code view) */}
        <motion.div
          style={{
            backfaceVisibility: "hidden",
            transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)",
            position: isFlipped ? "relative" : "absolute",
            width: "100%",
            height: "100%",
            zIndex: isFlipped ? 1 : 0,
          }}
        >
          <Card
            className="h-full overflow-hidden transition-all"
            hover
            glowOnHover
            elevate
          >
            <CardHeader className="pb-0">
              <div className="flex justify-between items-start">
                <Badge
                  variant={index % 2 === 0 ? "purple" : "teal"}
                  className="mb-2"
                >
                  Code Example
                </Badge>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleFlip}
                    aria-label="Toggle visualization view"
                  >
                    <FiEye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-xl">{example.title}</CardTitle>
              <CardDescription>Python implementation</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="bg-neutral-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto h-[200px]">
                <pre className="text-sm font-mono">{example.code}</pre>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full group">
                    <span>Try it yourself</span>
                    <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{example.title}</DialogTitle>
                    <DialogDescription>{example.description}</DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                    <div>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">
                          Interactive Visualization
                        </h4>
                        <div className="aspect-video bg-neutral-100 dark:bg-gray-800 rounded-md overflow-hidden">
                          <motion.div
                            className="w-full h-full flex items-center justify-center"
                            {...visualizationAnimation}
                            animate={visualizationAnimation.animate} // Always animate in the dialog
                          >
                            <div className="text-white font-bold">
                              Interactive Demo
                            </div>
                          </motion.div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          Mathematical Expression
                        </h4>
                        <MathEquation
                          equation={example.equation}
                          description={example.equationDescription}
                          className="bg-neutral-50 dark:bg-gray-800"
                          displayMode={true}
                          animated={true}
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Code Example</h4>
                      <div className="bg-neutral-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
                        <pre className="text-sm font-mono">{example.code}</pre>
                      </div>

                      <div className="mt-6">
                        <h4 className="text-sm font-medium mb-2">Controls</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Parameter 1
                            </label>
                            <input type="range" className="w-full" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Parameter 2
                            </label>
                            <input type="range" className="w-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() =>
                        document
                          .querySelector('[data-state="open"]')
                          ?.dispatchEvent(new Event("close", { bubbles: true }))
                      }
                    >
                      Close
                    </Button>
                    <Button className="group">
                      <span>Download Code</span>
                      <FiDownload className="ml-2 transition-transform group-hover:translate-y-0.5" />
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ExamplesSection;
