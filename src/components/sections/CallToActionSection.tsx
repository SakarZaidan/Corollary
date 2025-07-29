import React from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

interface CallToActionSectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonLink?: string;
  gradient?: boolean;
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  title = "Ready to transform your mathematical understanding?",
  description = "Start creating interactive visualizations today and join thousands of mathematicians, educators, and students who are using Corollary to explore complex concepts.",
  primaryButtonText = "Get Started for Free",
  secondaryButtonText = "Schedule a Demo",
  primaryButtonLink = "#",
  secondaryButtonLink = "#",
  gradient = true,
}) => {
  return (
    <section
      className={`py-16 md:py-24 ${
        gradient
          ? "bg-gradient-to-br from-accent-purple/10 via-white to-accent-teal/10"
          : "bg-white"
      }`}
    >
      <Container size="md">
        <motion.div
          className="rounded-2xl bg-white p-8 shadow-xl md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <motion.h2
              className="text-3xl font-bold tracking-tight text-primary-dark sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {title}
            </motion.h2>
            <motion.p
              className="mx-auto mt-4 max-w-2xl text-lg text-neutral"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {description}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button size="lg" className="w-full sm:w-auto">
                {primaryButtonText}
              </Button>
              {secondaryButtonText && (
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {secondaryButtonText}
                </Button>
              )}
            </motion.div>
          </div>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center space-x-2 text-sm text-neutral">
              <svg
                className="h-5 w-5 text-accent-purple"
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
              <span>No credit card required</span>
            </div>

            <div className="flex items-center space-x-2 text-sm text-neutral">
              <svg
                className="h-5 w-5 text-accent-purple"
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
              <span>Free tier available</span>
            </div>

            <div className="flex items-center space-x-2 text-sm text-neutral">
              <svg
                className="h-5 w-5 text-accent-purple"
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
              <span>Cancel anytime</span>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default CallToActionSection;
