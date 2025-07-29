import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiHelpCircle } from 'react-icons/fi';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/Tooltip';

interface PricingFeature {
  name: string;
  included: boolean;
  tooltip?: string;
}

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  buttonText: string;
  buttonVariant: 'default' | 'outline' | 'secondary';
  highlighted?: boolean;
  badge?: string;
  features: PricingFeature[];
}

const pricingTiers: PricingTier[] = [
  {
    id: 'tier-free',
    name: 'Free',
    description: 'Perfect for students and casual users exploring mathematical concepts.',
    price: '$0',
    period: 'forever',
    buttonText: 'Get Started',
    buttonVariant: 'outline',
    features: [
      { name: 'Basic visualizations', included: true },
      { name: 'Up to 5 saved projects', included: true },
      { name: 'Community support', included: true },
      { name: 'Standard export options', included: true },
      { name: 'Advanced 3D rendering', included: false },
      { name: 'Collaboration features', included: false },
      { name: 'API access', included: false },
      { name: 'Priority support', included: false },
    ],
  },
  {
    id: 'tier-pro',
    name: 'Pro',
    description: 'For educators and professionals who need more power and flexibility.',
    price: '$19',
    period: 'per month',
    buttonText: 'Start Free Trial',
    buttonVariant: 'default',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      { name: 'Basic visualizations', included: true },
      { name: 'Unlimited saved projects', included: true },
      { name: 'Community support', included: true },
      { name: 'Advanced export options', included: true },
      { name: 'Advanced 3D rendering', included: true },
      { name: 'Collaboration features', included: true, tooltip: 'Share and collaborate on projects with up to 5 team members' },
      { name: 'API access', included: false },
      { name: 'Priority support', included: false },
    ],
  },
  {
    id: 'tier-enterprise',
    name: 'Enterprise',
    description: 'For organizations that need advanced features and dedicated support.',
    price: 'Custom',
    period: 'contact for pricing',
    buttonText: 'Contact Sales',
    buttonVariant: 'secondary',
    features: [
      { name: 'Basic visualizations', included: true },
      { name: 'Unlimited saved projects', included: true },
      { name: 'Community support', included: true },
      { name: 'Advanced export options', included: true },
      { name: 'Advanced 3D rendering', included: true },
      { name: 'Collaboration features', included: true, tooltip: 'Unlimited team members with advanced permissions' },
      { name: 'API access', included: true, tooltip: 'Full API access with higher rate limits' },
      { name: 'Priority support', included: true, tooltip: 'Dedicated support with 24-hour response time' },
    ],
  },
];

const PricingSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="purple" className="mb-4">Pricing</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-primary-dark sm:text-4xl mb-4">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral">
            Choose the plan that's right for you, from free to enterprise-grade.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.id} tier={tier} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-16 rounded-2xl bg-primary-light/30 p-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-2">Need a custom solution?</h3>
          <p className="mb-6 text-neutral">Contact our sales team for a custom quote tailored to your organization's needs.</p>
          <Button variant="outline" size="lg">
            Contact Sales
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

interface PricingCardProps {
  tier: PricingTier;
  index: number;
}

const PricingCard: React.FC<PricingCardProps> = ({ tier, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <div 
        className={`h-full rounded-2xl p-8 ${tier.highlighted 
          ? 'bg-gradient-to-br from-accent-purple/20 via-white to-accent-teal/20 ring-1 ring-accent-purple/20 shadow-xl' 
          : 'bg-white ring-1 ring-neutral-200 shadow-md'}`}
      >
        {tier.badge && (
          <Badge variant="purple-solid" className="mb-4">
            {tier.badge}
          </Badge>
        )}
        
        <h3 className="text-2xl font-bold text-primary-dark">{tier.name}</h3>
        <p className="mt-2 text-neutral">{tier.description}</p>
        
        <div className="mt-6 flex items-baseline">
          <span className="text-4xl font-bold text-primary-dark">{tier.price}</span>
          <span className="ml-2 text-neutral">{tier.period}</span>
        </div>
        
        <Button 
          variant={tier.buttonVariant} 
          className={`mt-6 w-full ${tier.highlighted ? 'shadow-md' : ''}`}
          size="lg"
        >
          {tier.buttonText}
        </Button>
        
        <ul className="mt-8 space-y-4">
          <TooltipProvider>
            {tier.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start">
                <div className={`mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${feature.included ? 'bg-accent-teal/10' : 'bg-neutral-100'}`}>
                  <FiCheck className={`h-3.5 w-3.5 ${feature.included ? 'text-accent-teal' : 'text-neutral-300'}`} />
                </div>
                <span className={feature.included ? 'text-neutral-900' : 'text-neutral-400'}>
                  {feature.name}
                  {feature.tooltip && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="ml-1 inline-flex">
                          <FiHelpCircle className="h-4 w-4 text-neutral-400" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-sm">{feature.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </span>
              </li>
            ))}
          </TooltipProvider>
        </ul>
      </div>
    </motion.div>
  );
};

export default PricingSection;