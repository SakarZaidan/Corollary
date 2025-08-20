# Corollary - Interactive Mathematical Visualization Platform

[![License](https://img.shields.io/badge/license-Proprietary-red)](./LICENSE)
[![Tech Stack](https://img.shields.io/badge/tech-React%20%7C%20Supabase%20%7C%20Three.js-blueviolet)](https://react.dev/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/your-username/corollary/pulls)

**Corollary** is an interactive, web-based platform designed to make abstract mathematical concepts tangible and intuitive. It operates on a **GUI-first, code-optional** principle, allowing users to visually explore complex topics and then seamlessly inspect the underlying Python code that generates the visualization. Our mission is to bridge the gap between abstract theory and practical application, creating a clear and engaging pathway for students and professionals into the worlds of data science, engineering, and computer science.

<br>

> *A stunning screenshot or GIF of the Corollary editor in action would go here.*

<br>

## Table of Contents

- [Core Features](#core-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Backend Setup (Supabase)](#backend-setup-supabase)
- [Frontend Setup](#frontend-setup)
- [Roadmap](#roadmap)
- [License](#license)

## Core Features

-   **Interactive 2D & 3D Visualizations:** Render beautiful, high-performance visualizations of mathematical objects, from calculus surfaces and vector fields to linear algebra transformations.
-   **Seamless GUI-to-Code Pipeline:** Users start with intuitive sliders and inputs. At any time, they can reveal the clean, commented Python code that powers the visualization, demystifying the programming behind the graphics.
-   **Rich Content Library:** Explore a curated gallery of pre-built, interactive scenes for core university-level topics, inspired by the pedagogical style of 3Blue1Brown.
-   **Educator-Focused Tools:** A dedicated dashboard for educators to create virtual classrooms, manage students, and assign visual, interactive homework.
-   **Pro-Level Customization:** Pro users can unlock a full in-browser Python code editor to create entirely new visualizations from scratch using Corollary's powerful rendering and animation API.

## Technology Stack

Our stack is carefully chosen to deliver a high-performance, desktop-grade experience in the browser.

| Tier      | Technology                                    | Purpose                                                |
| :-------- | :-------------------------------------------- | :----------------------------------------------------- |
| **Frontend**  | React, TypeScript, Vite, Tailwind CSS         | A modern, type-safe, and fast frontend development experience. |
| **3D Engine** | React Three Fiber, Drei                       | A powerful, declarative React renderer for Three.js.   |
| **State**     | Zustand                                       | Lightweight, scalable global state management.       |
| **Backend**   | Supabase (PostgreSQL, Auth, Storage)          | A comprehensive and secure backend-as-a-service.     |
| **Code Exec** | Pyodide (planned)                             | To run a real Python environment in the browser.       |

## Project Structure

The project is a monorepo containing the frontend application.

```
/src
├── components/       # Reusable UI components (Button, Card, etc.)
├── features/         # Feature-based modules (e.g., editor, dashboard)
├── lib/              # Core libraries and helpers
├── pages/            # Top-level page components
├── store/            # Zustand state management stores
├── types/            # TypeScript type definitions
├── utils/            # Utility functions (e.g., Supabase client)
├── App.tsx           # Main App component with routing
└── main.tsx          # Application entry point
```

## Backend Setup (Supabase)

The backend is managed entirely by Supabase. To get your local environment running, you need to set up your own Supabase project.

1.  **Create a Supabase Project:** Go to [supabase.com](https://supabase.com) and create a new project.
2.  **Run the Database Schema Script:**
    -   Navigate to the **SQL Editor** in your Supabase project dashboard.
    -   Open the `supabase_setup.sql` script from this repository.
    -   Copy its entire contents, paste it into the SQL Editor, and click **RUN**. This will create all the necessary tables, relationships, and security policies.
3.  **Configure Environment Variables:**
    -   In your Supabase project, go to `Settings` -> `API`.
    -   Find your **Project URL** and your `anon` **public key**.
    -   In the frontend project's root directory, create a file named `.env.local`.
    -   Add your keys to this file:
        ```
        VITE_SUPABASE_URL=YOUR_PROJECT_URL
        VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
        ```

## Frontend Setup

### Prerequisites

-   Node.js (v18 or later) and npm
-   A configured Supabase project (see above)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [your-repo-url]
    cd corollary
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    The app will be available at `http://localhost:5173`.
    ```bash
    npm run dev
    ```

## Roadmap

Our development is planned in several phases, moving from a powerful visual tool to a full-fledged educational ecosystem.

-   **[✔️] Phase 1 (Foundation):**
    -   Core UI and Design System implementation.
    -   Supabase backend schema and authentication.
    -   Polished Student Dashboard UI.

-   **[In Progress] Phase 2 (Core MVP Logic):**
    -   A functional 3D visualization editor with GUI controls.
    -   Real-time connection between UI controls and the 3D scene.
    -   Saving and fetching projects from Supabase.

-   **[Upcoming] Phase 3 (Ecosystem Expansion):**
    -   Integration of Pyodide for a fully editable code editor (Pro feature).
    -   The Educator Dashboard for classroom and assignment management.
    -   A public "Explore" gallery for sharing and forking visualizations.

## License

Copyright (c) 2024, Corollary. All Rights Reserved.

This project is proprietary and closed-source. Unauthorized copying, distribution, or use of this code is strictly prohibited.