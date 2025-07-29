import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

interface FeatureSectionProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  ctaText?: string;
  ctaLink?: string;
  features?: Array<{ title: string; description: string }>;
  darkMode?: boolean;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  description,
  image,
  imageAlt,
  reverse = false,
  ctaText = 'Learn more',
  ctaLink = '#',
  features = [],
  darkMode = false,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      className={`py-16 md:py-24 ${darkMode ? 'bg-primary-dark text-white' : 'bg-white text-primary-dark'}`}
    >
      <Container>
        <div
          className={`flex flex-col gap-12 lg:gap-16 ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
        >
          {/* Content */}
          <motion.div
            className="flex-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            <motion.h2
              className={`text-3xl font-bold tracking-tight sm:text-4xl ${darkMode ? 'text-white' : 'text-primary-dark'}`}
              variants={itemVariants}
            >
              {title}
            </motion.h2>
            
            <motion.p
              className={`mt-4 text-lg ${darkMode ? 'text-neutral-light' : 'text-neutral'}`}
              variants={itemVariants}
            >
              {description}
            </motion.p>

            {features.length > 0 && (
              <motion.div className="mt-8 space-y-6" variants={itemVariants}>
                {features.map((feature, index) => (
                  <div key={index} className="flex">
                    <div className={`flex-shrink-0 ${darkMode ? 'text-accent-teal' : 'text-accent-purple'}`}>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-primary-dark'}`}>
                        {feature.title}
                      </h3>
                      <p className={`mt-1 text-base ${darkMode ? 'text-neutral-light' : 'text-neutral'}`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            <motion.div className="mt-8" variants={itemVariants}>
              <Button
                variant={darkMode ? 'white-teal' : 'default'}
                className={darkMode ? 'text-accent-teal' : ''}
              >
                {ctaText}
              </Button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: reverse ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <div
              className={`overflow-hidden rounded-xl border ${darkMode ? 'border-neutral/20 bg-secondary-dark' : 'border-neutral-light/20 bg-secondary-light/50'} shadow-lg`}
            >
              <img
                src={image}
                alt={imageAlt}
                className="w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default FeatureSection;