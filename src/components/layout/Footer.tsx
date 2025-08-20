import React from "react";
import { motion } from "framer-motion";
import {
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiMail,
  FiArrowRight,
} from "react-icons/fi";
import { Container } from "../ui/Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white">
      <Container>
        <div className="py-16">
          {/* Newsletter Section */}
          <motion.div
            className="mb-16 rounded-2xl bg-gradient-to-r from-accent-purple/20 to-accent-teal/20 p-8 md:p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-xl font-bold md:text-2xl">
                  Stay updated with Corollary
                </h3>
                <p className="mt-2 text-neutral-light">
                  Get the latest news and updates delivered to your inbox
                </p>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-l-lg border-0 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent-purple"
                  />
                  <button className="flex items-center justify-center rounded-r-lg bg-accent-purple px-4 py-3 font-medium text-white transition-colors hover:bg-accent-purple/90">
                    <span className="hidden sm:inline mr-2">Subscribe</span>
                    <FiArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
            {/* Logo and Description */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center">
                <svg
                  className="h-8 w-8 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                    fill="#5EEAD4"
                  />
                </svg>
                <span className="text-2xl font-bold">Corollary</span>
              </div>
              <p className="mt-4 text-neutral-light">
                Transform abstract mathematical concepts into tangible,
                interactive visualizations. Explore, learn, and share your
                insights with our powerful platform.
              </p>
              <div className="mt-6 flex space-x-4">
                <a
                  href="#"
                  className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
                >
                  <span className="sr-only">GitHub</span>
                  <FiGithub className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <FiTwitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <FiLinkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
                >
                  <span className="sr-only">Email</span>
                  <FiMail className="h-5 w-5" />
                </a>
              </div>
            </motion.div>

            {/* Product Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-neutral-light hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-light hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-light hover:text-white transition-colors"
                  >
                    Examples
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-light hover:text-white transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-light hover:text-white transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Resources Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-neutral-light hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-light hover:text-white transition-colors"
                  >
                    Tutorials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-light hover:text-white transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-light hover:text-white transition-colors"
                  >
                    Support
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-light hover:text-white transition-colors"
                  >
                    Changelog
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-neutral-light hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-light hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-light hover:text-white transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-light hover:text-white transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-light hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom Row with Copyright and Legal Links */}
          <motion.div
            className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="text-sm text-neutral-light">
              &copy; {currentYear} Corollary. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-neutral-light">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </footer>
  );
};
