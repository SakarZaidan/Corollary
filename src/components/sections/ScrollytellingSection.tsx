import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

interface Feature {
  title: string;
  description: string;
  visualState: string; // Identifier for the visual state that should be shown
}

interface ScrollytellingSectionProps {
  title: string;
  description: string;
  features: Feature[];
  ctaText?: string;
  ctaLink?: string;
  darkMode?: boolean;
}

// A component that renders the visualization based on the current state
const VisualizationContainer: React.FC<{
  currentState: string;
  progress: MotionValue<number>;
}> = ({ currentState, progress }) => {
  // Transform the progress value (0-1) into different animation values
  const scale = useTransform(progress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const rotate = useTransform(progress, [0, 1], [0, 10]);
  const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Define different visual states
  const renderVisualization = () => {
    switch (currentState) {
      case 'controls':
        return (
          <div className="relative">
            <motion.div 
              className="p-8 bg-white rounded-xl shadow-lg dark:bg-gray-800"
              style={{ scale, rotate, opacity }}
            >
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Interactive Controls</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Amplitude</label>
                    <motion.input 
                      type="range" 
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      animate={{ x: [0, 10, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Frequency</label>
                    <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phase</label>
                    <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                  </div>
                </div>
              </div>
              <div className="h-40 bg-gradient-to-r from-purple-500 to-teal-500 rounded-lg flex items-center justify-center">
                <motion.div 
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
                  animate={{ 
                    y: [0, -20, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>
        );
      
      case 'code':
        return (
          <div className="relative">
            <motion.div 
              className="p-8 bg-white rounded-xl shadow-lg dark:bg-gray-800"
              style={{ scale, rotate, opacity }}
            >
              <div className="flex">
                <div className="w-1/2 pr-4">
                  <div className="h-40 bg-gradient-to-r from-purple-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <motion.div 
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
                      animate={{ 
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                      <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
                <motion.div 
                  className="w-1/2 pl-4 font-mono text-sm bg-gray-100 p-3 rounded dark:bg-gray-900 dark:text-gray-300 overflow-hidden"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <pre>{`import { Corollary } from 'corollary';

const viz = new Corollary('#viz');

viz.createWave({
  amplitude: 0.5,
  frequency: 2,
  color: '#6d28d9'
});

viz.render();`}</pre>
                </motion.div>
              </div>
            </motion.div>
          </div>
        );
      
      case 'insight':
        return (
          <div className="relative">
            <motion.div 
              className="p-8 bg-white rounded-xl shadow-lg dark:bg-gray-800"
              style={{ scale, rotate, opacity }}
            >
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Data Analysis</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  </div>
                </div>
                <div className="h-40 bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
                  <div className="h-full relative">
                    <motion.div 
                      className="absolute bottom-0 left-0 w-8 bg-purple-500 rounded-t"
                      animate={{ height: ['20%', '70%', '40%'] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    ></motion.div>
                    <motion.div 
                      className="absolute bottom-0 left-12 w-8 bg-teal-500 rounded-t"
                      animate={{ height: ['50%', '30%', '80%'] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
                    ></motion.div>
                    <motion.div 
                      className="absolute bottom-0 left-24 w-8 bg-blue-500 rounded-t"
                      animate={{ height: ['30%', '60%', '50%'] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                    ></motion.div>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gray-300 dark:bg-gray-700"></div>
                    <div className="absolute top-1/4 left-0 right-0 h-px bg-gray-300 dark:bg-gray-700"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 dark:bg-gray-700"></div>
                    <div className="absolute top-3/4 left-0 right-0 h-px bg-gray-300 dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className="p-2 bg-gray-100 dark:bg-gray-900 rounded">
                  <div className="font-bold text-purple-500">42%</div>
                  <div>Accuracy</div>
                </div>
                <div className="p-2 bg-gray-100 dark:bg-gray-900 rounded">
                  <div className="font-bold text-teal-500">78%</div>
                  <div>Precision</div>
                </div>
                <div className="p-2 bg-gray-100 dark:bg-gray-900 rounded">
                  <div className="font-bold text-blue-500">91%</div>
                  <div>Recall</div>
                </div>
              </div>
            </motion.div>
          </div>
        );
      
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8">
              <div className="text-lg font-medium mb-2">Scroll to explore</div>
              <svg className="w-8 h-8 mx-auto animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      {renderVisualization()}
    </div>
  );
};

const ScrollytellingSection: React.FC<ScrollytellingSectionProps> = ({
  title,
  description,
  features,
  ctaText = 'Try it yourself',
  ctaLink = '#',
  darkMode = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // State to track which feature is currently in view
  const [activeFeatureIndex, setActiveFeatureIndex] = React.useState(0);
  
  // Refs for each feature section
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Set up intersection observers for each feature
  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    featureRefs.current.forEach((ref, index) => {
      if (!ref) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveFeatureIndex(index);
          }
        },
        { threshold: 0.7 } // Trigger when 70% of the element is visible
      );
      
      observer.observe(ref);
      observers.push(observer);
    });
    
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [features.length]);

  return (
    <section
      ref={containerRef}
      className={`py-16 md:py-24 ${darkMode ? 'bg-primary-dark text-white' : 'bg-white text-primary-dark'}`}
    >
      <Container>
        <div className="text-center mb-12">
          <motion.h2
            className={`text-3xl font-bold tracking-tight sm:text-4xl ${darkMode ? 'text-white' : 'text-primary-dark'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>
          
          <motion.p
            className={`mt-4 text-lg max-w-2xl mx-auto ${darkMode ? 'text-neutral-light' : 'text-neutral'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {description}
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Scrollable content column */}
          <div className="lg:w-1/2 space-y-24">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                ref={el => featureRefs.current[index] = el}
                className={`p-6 rounded-lg ${activeFeatureIndex === index ? 'bg-gray-100 dark:bg-gray-800/50' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5 }}
              >
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-primary-dark'}`}>
                  {feature.title}
                </h3>
                <p className={`${darkMode ? 'text-neutral-light' : 'text-neutral'}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="pt-8"
            >
              <Button
                variant={darkMode ? 'white-teal' : 'default'}
                className={darkMode ? 'text-accent-teal' : ''}
              >
                {ctaText}
              </Button>
            </motion.div>
          </div>
          
          {/* Sticky visualization column */}
          <div className="lg:w-1/2 relative">
            <div className="lg:sticky lg:top-24 h-[500px] overflow-hidden rounded-xl border shadow-lg
              ${darkMode ? 'border-neutral/20 bg-secondary-dark' : 'border-neutral-light/20 bg-secondary-light/50'}"
            >
              <VisualizationContainer 
                currentState={features[activeFeatureIndex]?.visualState || 'default'}
                progress={scrollYProgress}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ScrollytellingSection;