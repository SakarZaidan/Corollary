# Corollary - Interactive Math Visualization Platform

Corollary is a GUI-first tool that allows users to explore math visually and then see the underlying Python code, creating a pathway to data science skills.

## Project Overview

This project is the frontend implementation for Corollary, featuring a modern, responsive design inspired by observablehq.com. The interface is built with React, TypeScript, and Tailwind CSS.

## Design System

### Colors

- Primary: Dark (#111827), Light (#FFFFFF)
- Secondary: Dark (#1F2937), Light (#F9FAFB)
- Accent: Purple (#8B5CF6), Teal (#14B8A6)
- Neutral: Default (#6B7280), Light (#D1D5DB)

### Typography

- Sans-serif: 'Inter'
- Monospace: 'JetBrains Mono'

## Project Structure

```
/
├── public/               # Static assets
├── src/
│   ├── components/       # React components
│   │   ├── layout/       # Layout components (Header, Footer)
│   │   └── sections/     # Page sections
│   ├── pages/            # Page components
│   ├── App.tsx           # Main App component
│   ├── index.css         # Global styles
│   └── main.tsx          # Entry point
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Setup Instructions

### Prerequisites

- Node.js and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Features

- Fully responsive design that works on all device sizes
- Modern UI with clean, accessible components
- Interactive sections showcasing the platform's capabilities
- Semantic HTML with proper accessibility attributes

## Components

- **Header**: Semi-transparent, blurring header with navigation
- **Footer**: Dark footer with multiple columns for links
- **HeroSection**: Main landing section with CTA buttons
- **FeatureSection**: Reusable two-column layout for features
- **FeatureGrid**: Grid of feature cards
- **CallToActionSection**: Bold accent section with CTA

## License

All rights reserved.
