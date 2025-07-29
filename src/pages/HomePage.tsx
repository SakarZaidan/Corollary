import React from "react";
import { motion } from "framer-motion";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/sections/HeroSection";
import FeatureSection from "../components/sections/FeatureSection";
import ScrollytellingSection from "../components/sections/ScrollytellingSection";
import FeatureGrid from "../components/sections/FeatureGrid";
import ExamplesSection from "../components/sections/ExamplesSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import PricingSection from "../components/sections/PricingSection";
import DemoSection from "../components/sections/DemoSection";
import CallToActionSection from "../components/sections/CallToActionSection";
import {
  AnimatedElement,
  StaggeredContainer,
} from "../utils/useScrollAnimation";
import { BrandedIcons } from "../components/ui/BrandedIcons";

const HomePage = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-accent-purple/5 blur-3xl" />
        <div className="absolute top-[60%] -left-[5%] h-[300px] w-[300px] rounded-full bg-accent-teal/5 blur-3xl" />
        <div className="absolute top-[30%] right-[5%] h-[400px] w-[400px] rounded-full bg-accent-purple/5 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">
          <HeroSection />

          <AnimatedElement variant="fadeIn">
            <ScrollytellingSection
              title="Go from Interface to Insight"
              description="Start with simple controls to plot complex functions in 3D. See how changing a parameter visually affects the entire structure, building a deep and lasting understanding."
              features={[
                {
                  title: "Intuitive Controls",
                  description:
                    "Adjust parameters with simple sliders and see how they affect your visualization in real-time. Perfect for building intuition about complex mathematical concepts.",
                  visualState: "controls",
                },
                {
                  title: "Simple Code, Powerful Results",
                  description:
                    "Every visualization is backed by clean, readable code that you can explore, modify, and learn from. No black boxes here.",
                  visualState: "code",
                },
                {
                  title: "From Data to Insight",
                  description:
                    "Transform raw data into meaningful visualizations that reveal patterns and relationships you might otherwise miss.",
                  visualState: "insight",
                },
              ]}
            />
          </AnimatedElement>

          <AnimatedElement variant="fadeIn" delay={0.2}>
            <FeatureSection
              title="Code if you want to. Learn because you can."
              description="Every visual has a story told in code. Click 'Show Code' to reveal the Python script behind your graph. This seamless transition is the perfect launchpad for learning skills for AI and data science."
              image="/placeholder-2.svg"
              imageAlt="Code visualization example"
              reverse={true}
              darkMode={true}
              features={[
                {
                  title: "Python code generation",
                  description:
                    "Automatically generate clean, well-documented Python code for any visualization you create.",
                },
                {
                  title: "Syntax highlighting",
                  description:
                    "Code is displayed with beautiful syntax highlighting to make it easy to read and understand.",
                },
                {
                  title: "Code explanations",
                  description:
                    "Hover over any section of code to see plain-English explanations of what it does.",
                },
                {
                  title: "Download scripts",
                  description:
                    "Download your code as Python scripts for offline use or integration with your own projects.",
                },
              ]}
            />
          </AnimatedElement>

          <StaggeredContainer staggerDelay={0.1}>
            <FeatureGrid />
          </StaggeredContainer>

          <AnimatedElement variant="fadeInUp">
            <ExamplesSection />
          </AnimatedElement>

          <AnimatedElement variant="fadeInUp" delay={0.2}>
            <DemoSection />
          </AnimatedElement>

          <AnimatedElement variant="fadeIn">
            <TestimonialsSection />
          </AnimatedElement>

          <AnimatedElement variant="fadeInUp">
            <PricingSection />
          </AnimatedElement>

          <AnimatedElement variant="fadeIn" delay={0.3}>
            <CallToActionSection
              title="Ready to transform your mathematical understanding?"
              description="Join thousands of educators, students, and professionals who are using Corollary to explore and visualize complex mathematical concepts."
            />
          </AnimatedElement>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
