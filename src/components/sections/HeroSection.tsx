import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

// Dynamically import the HeroCanvas component
const HeroCanvas = lazy(() => import("../three/HeroCanvas"));

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-secondary-light pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent-purple/5"></div>
        <div className="absolute top-60 -left-20 h-60 w-60 rounded-full bg-accent-teal/5"></div>
        <div className="absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-accent-purple/5"></div>
        <svg
          className="absolute right-0 top-1/4 h-auto w-96 text-accent-purple/10"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M42.8,-73.1C56.9,-66.2,70.7,-57.7,79.3,-45.1C87.9,-32.4,91.3,-16.2,89.8,-0.9C88.2,14.5,81.7,28.9,72.6,41.1C63.5,53.3,51.8,63.3,38.7,70.1C25.5,76.9,10.8,80.5,-3.1,85.3C-17,90.1,-34,96.1,-47.8,92.2C-61.6,88.3,-72.3,74.5,-79.2,59.5C-86.1,44.5,-89.3,28.3,-89.3,12.8C-89.3,-2.7,-86.1,-17.5,-79.4,-29.9C-72.7,-42.3,-62.4,-52.3,-50,-60.4C-37.6,-68.5,-23.1,-74.7,-7.7,-73.1C7.7,-71.5,28.7,-80,42.8,-73.1Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <Container>
        <div className="relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-6 inline-flex"
            >
              <Badge variant="purple" className="px-3 py-1 text-xs">
                Now in public beta
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-primary-dark sm:text-5xl md:text-6xl"
            >
              Interactive Math Visualization for the Modern Web
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-neutral md:text-xl"
            >
              Create, explore, and share interactive mathematical
              visualizations. Corollary makes complex concepts intuitive through
              code and visual representation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
            >
              <Link to="/workspace">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started for Free
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Request a Demo
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative mx-auto mt-16 max-w-5xl overflow-hidden rounded-xl border border-neutral-light/20 bg-white shadow-xl h-[24rem]"
          >
            {/* Replace static image with interactive WebGL canvas */}
            <div className="absolute inset-0 w-full h-full">
              <Suspense
                fallback={
                  <div className="flex h-full w-full items-center justify-center">
                    Loading visualization...
                  </div>
                }
              >
                <HeroCanvas />
              </Suspense>
            </div>
          </motion.div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 grayscale opacity-70">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
              alt="Python"
              className="h-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg"
              alt="TensorFlow"
              className="h-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/31/NumPy_logo_2020.svg"
              alt="NumPy"
              className="h-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg"
              alt="scikit-learn"
              className="h-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg"
              alt="Matplotlib"
              className="h-8"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroSection;
