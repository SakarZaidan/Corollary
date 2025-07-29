import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: 'Corollary has completely transformed how I teach complex mathematical concepts. My students can now visualize and interact with equations in ways that were impossible before.',
    author: 'Dr. Sarah Chen',
    role: 'Professor of Mathematics',
    company: 'Stanford University',
    avatar: undefined,
    rating: 5
  },
  {
    id: 'testimonial-2',
    quote: 'As a data scientist, I use Corollary daily to explore and communicate complex relationships in our data. The ability to quickly prototype visualizations has been invaluable.',
    author: 'Michael Rodriguez',
    role: 'Lead Data Scientist',
    company: 'Acme Analytics',
    avatar: undefined,
    rating: 5
  },
  {
    id: 'testimonial-3',
    quote: 'The interactive nature of Corollary makes it perfect for our online learning platform. Students engage more deeply with the material when they can manipulate the variables themselves.',
    author: 'Emma Johnson',
    role: 'Educational Technology Director',
    company: 'LearnSphere',
    avatar: undefined,
    rating: 4
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-primary-dark text-white">
      <Container>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="teal-light" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Trusted by educators and professionals
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-light">
            See what our users are saying about how Corollary has transformed their approach to mathematics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur-sm">
            <span className="mr-2 text-accent-teal">4.9</span>
            <div className="flex text-accent-teal">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="ml-2 text-white/80">from 200+ reviews</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <div className="h-full rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
        <div className="flex text-accent-teal mb-4">
          {[...Array(5)].map((_, i) => (
            <FiStar 
              key={i} 
              className={`h-5 w-5 ${i < testimonial.rating ? 'fill-current' : 'text-white/20'}`} 
            />
          ))}
        </div>
        
        <blockquote className="mb-6">
          <p className="text-white/90">"{testimonial.quote}"</p>
        </blockquote>
        
        <div className="flex items-center">
          <div className="mr-4 h-10 w-10 overflow-hidden rounded-full bg-accent-purple/30">
            {testimonial.avatar ? (
              <img 
                src={testimonial.avatar} 
                alt={testimonial.author} 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg font-medium text-white">
                {testimonial.author.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <div className="font-medium text-white">{testimonial.author}</div>
            <div className="text-sm text-white/70">
              {testimonial.role}, {testimonial.company}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialsSection;