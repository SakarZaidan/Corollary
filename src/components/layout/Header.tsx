import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-md bg-gradient-to-br from-accent-purple to-accent-teal">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                  C
                </div>
              </div>
              <span className="text-xl font-bold text-primary-dark">
                Corollary
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-primary-dark hover:text-accent-purple">
                  <span>Platform</span>
                  <FiChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <a href="#" className="flex w-full">
                    Interactive Notebooks
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#" className="flex w-full">
                    Data Visualization
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#" className="flex w-full">
                    Collaboration Tools
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <a
              href="#"
              className="px-3 py-2 text-sm font-medium text-primary-dark hover:text-accent-purple"
            >
              Examples
            </a>
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium text-primary-dark hover:text-accent-purple"
            >
              Pricing
            </a>
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium text-primary-dark hover:text-accent-purple"
            >
              Documentation
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#"
              className="text-sm font-medium text-primary-dark hover:text-accent-purple"
            >
              Sign In
            </a>
            <Button variant="default" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-md p-2 text-primary-dark hover:bg-secondary-light"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-neutral-light/10"
          >
            <Container>
              <div className="py-4 space-y-4">
                <div className="space-y-1">
                  <div className="px-3 py-2 text-sm font-medium text-primary-dark">
                    Platform
                  </div>
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-neutral hover:bg-secondary-light rounded-md ml-2"
                  >
                    Interactive Notebooks
                  </a>
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-neutral hover:bg-secondary-light rounded-md ml-2"
                  >
                    Data Visualization
                  </a>
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-neutral hover:bg-secondary-light rounded-md ml-2"
                  >
                    Collaboration Tools
                  </a>
                </div>
                <a
                  href="#"
                  className="block px-3 py-2 text-sm font-medium text-primary-dark hover:bg-secondary-light rounded-md"
                >
                  Examples
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 text-sm font-medium text-primary-dark hover:bg-secondary-light rounded-md"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 text-sm font-medium text-primary-dark hover:bg-secondary-light rounded-md"
                >
                  Documentation
                </a>
                <div className="pt-4 border-t border-neutral-light/10">
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm font-medium text-primary-dark hover:bg-secondary-light rounded-md"
                  >
                    Sign In
                  </a>
                  <div className="mt-2 px-3">
                    <Button variant="default" className="w-full">
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
