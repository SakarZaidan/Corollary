import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiEye, FiShare2, FiLayers, FiCpu, FiDatabase } from 'react-icons/fi';
import { Container } from '../ui/Container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Card hover interactive className="h-full">
      <CardHeader>
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent-purple/10 text-accent-purple">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

interface FeatureGridProps {
  title?: string;
  description?: string;
  features?: FeatureCardProps[];
}

const defaultFeatures: FeatureCardProps[] = [
  {
    icon: <FiEye className="h-6 w-6" />,
    title: 'Interactive Visuals',
    description: 'Create dynamic, interactive visualizations that respond to user input and data changes in real-time.',
  },
  {
    icon: <FiCode className="h-6 w-6" />,
    title: 'Code When You Need It',
    description: 'Seamlessly transition between visual exploration and code editing with our intuitive interface.',
  },
  {
    icon: <FiShare2 className="h-6 w-6" />,
    title: 'Collaborative Workspaces',
    description: 'Share your visualizations and collaborate with others in real-time, perfect for teams and classrooms.',
  },
  {
    icon: <FiLayers className="h-6 w-6" />,
    title: 'Multi-dimensional Data',
    description: 'Visualize complex, multi-dimensional data sets with ease using our advanced rendering engine.',
  },
  {
    icon: <FiCpu className="h-6 w-6" />,
    title: 'Computation Engine',
    description: 'Powerful computation capabilities allow for complex mathematical operations and data transformations.',
  },
  {
    icon: <FiDatabase className="h-6 w-6" />,
    title: 'Data Integration',
    description: 'Import data from various sources and formats, including CSV, JSON, and direct API connections.',
  },
];

const FeatureGrid: React.FC<FeatureGridProps> = ({
  title = 'Everything you need to visualize complex math',
  description = 'Corollary provides a comprehensive set of tools for creating, exploring, and sharing mathematical visualizations.',
  features = defaultFeatures,
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
    <section className="py-16 md:py-24 bg-secondary-light/30">
      <Container>
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl font-bold tracking-tight text-primary-dark sm:text-4xl mb-4"
            variants={itemVariants}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="mx-auto max-w-2xl text-lg text-neutral"
            variants={itemVariants}
          >
            {description}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default FeatureGrid;