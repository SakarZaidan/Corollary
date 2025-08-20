import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { useUserStore } from "../store/userStore";
import { DashboardHeader } from "../components/layout/DashboardHeader";
import {
  FiSearch,
  FiFilter,
  FiGrid,
  FiClock,
  FiTrendingUp,
  FiStar,
  FiChevronRight,
  FiChevronLeft,
  FiTag,
  FiUsers,
  FiArrowRight,
  FiBookmark,
  FiCode,
  FiLayers,
} from "react-icons/fi";
import { SceneLibraryBrowser } from "../components/sections/SceneLibraryBrowser";
import { SceneDefinition } from "../data/sceneLibrary";

export function ExplorePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, isAuthenticated } = useUserStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFilter, setActiveFilter] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"explore" | "library">("explore");
  const [selectedScene, setSelectedScene] = useState<SceneDefinition | null>(
    null
  );

  // Extract search query from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get("q");
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [location.search]);

  // Sample data for the explore page
  const categories = [
    { id: "all", name: "All" },
    { id: "calculus", name: "Calculus" },
    { id: "linear-algebra", name: "Linear Algebra" },
    { id: "statistics", name: "Statistics" },
    { id: "physics", name: "Physics" },
    { id: "geometry", name: "Geometry" },
    { id: "differential-equations", name: "Differential Equations" },
  ];

  const filters = [
    {
      id: "popular",
      name: "Most Popular",
      icon: <FiStar className="w-4 h-4" />,
    },
    {
      id: "recent",
      name: "Recently Added",
      icon: <FiClock className="w-4 h-4" />,
    },
    {
      id: "trending",
      name: "Trending",
      icon: <FiTrendingUp className="w-4 h-4" />,
    },
  ];

  const featuredContent = [
    {
      id: 1,
      title: "Introduction to Vector Calculus",
      description:
        "Explore vector fields, line integrals, and surface integrals with interactive 3D visualizations",
      author: "Dr. Sarah Chen",
      authorAvatar: "/avatars/sarah.jpg",
      category: "calculus",
      level: "Intermediate",
      rating: 4.9,
      reviews: 128,
      students: 1240,
      thumbnail: "/thumbnails/vector-calculus.jpg",
      featured: true,
    },
    {
      id: 2,
      title: "Quantum Mechanics Fundamentals",
      description:
        "Visualize quantum phenomena including wave functions, probability distributions, and quantum tunneling",
      author: "Prof. Michael Rodriguez",
      authorAvatar: "/avatars/michael.jpg",
      category: "physics",
      level: "Advanced",
      rating: 4.8,
      reviews: 96,
      students: 850,
      thumbnail: "/thumbnails/quantum.jpg",
      featured: true,
    },
  ];

  const exploreContent = [
    {
      id: 3,
      title: "Linear Transformations in 3D Space",
      description:
        "Interactive visualization of matrix transformations in three-dimensional space",
      author: "Dr. Emily Nakamura",
      authorAvatar: "/avatars/emily.jpg",
      category: "linear-algebra",
      level: "Intermediate",
      rating: 4.7,
      reviews: 85,
      students: 920,
      thumbnail: "/thumbnails/linear-transformations.jpg",
    },
    {
      id: 4,
      title: "Differential Equations Solver",
      description:
        "Visual solutions to common differential equations with parameter exploration",
      author: "Prof. James Wilson",
      authorAvatar: "/avatars/james.jpg",
      category: "differential-equations",
      level: "Advanced",
      rating: 4.9,
      reviews: 112,
      students: 760,
      thumbnail: "/thumbnails/differential-equations.jpg",
    },
    {
      id: 5,
      title: "Statistical Distributions Visualized",
      description:
        "Interactive exploration of probability distributions and statistical concepts",
      author: "Dr. Lisa Johnson",
      authorAvatar: "/avatars/lisa.jpg",
      category: "statistics",
      level: "Beginner",
      rating: 4.6,
      reviews: 74,
      students: 1350,
      thumbnail: "/thumbnails/statistics.jpg",
    },
    {
      id: 6,
      title: "3D Geometry Explorer",
      description:
        "Interactive visualization of 3D geometric shapes, transformations, and properties",
      author: "Prof. David Kim",
      authorAvatar: "/avatars/david.jpg",
      category: "geometry",
      level: "Beginner",
      rating: 4.8,
      reviews: 92,
      students: 1120,
      thumbnail: "/thumbnails/geometry.jpg",
    },
    {
      id: 7,
      title: "Multivariable Calculus Concepts",
      description:
        "Visual exploration of partial derivatives, multiple integrals, and vector fields",
      author: "Dr. Sarah Chen",
      authorAvatar: "/avatars/sarah.jpg",
      category: "calculus",
      level: "Advanced",
      rating: 4.9,
      reviews: 105,
      students: 680,
      thumbnail: "/thumbnails/multivariable.jpg",
    },
    {
      id: 8,
      title: "Eigenvalues and Eigenvectors",
      description:
        "Interactive visualization of eigenvalues, eigenvectors, and their applications",
      author: "Prof. Michael Rodriguez",
      authorAvatar: "/avatars/michael.jpg",
      category: "linear-algebra",
      level: "Intermediate",
      rating: 4.7,
      reviews: 88,
      students: 790,
      thumbnail: "/thumbnails/eigenvalues.jpg",
    },
  ];

  // Filter content based on active category and search query
  const filteredContent = exploreContent.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort content based on active filter
  const sortedContent = [...filteredContent].sort((a, b) => {
    if (activeFilter === "popular") return b.students - a.students;
    if (activeFilter === "recent") return b.id - a.id; // Using ID as a proxy for recency in this example
    if (activeFilter === "trending")
      return b.rating * b.reviews - a.rating * a.reviews;
    return 0;
  });

  return (
    <div className="min-h-screen bg-primary-dark text-white">
      <DashboardHeader />
      <Container>
        <div className="py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Explore Visualizations
              </h1>
              <p className="text-neutral-light">
                Discover interactive mathematical concepts and visualizations
              </p>
            </div>

            {/* View Mode Toggle and Search Bar */}
            <div className="mb-8">
              {/* View Mode Toggle */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2 bg-primary-main p-1 rounded-lg border border-white/10">
                  <Button
                    variant={viewMode === "explore" ? "default" : "ghost"}
                    className={`flex items-center ${
                      viewMode === "explore" ? "bg-accent-purple" : ""
                    }`}
                    onClick={() => setViewMode("explore")}
                  >
                    <FiGrid className="mr-2" />
                    Explore
                  </Button>
                  <Button
                    variant={viewMode === "library" ? "default" : "ghost"}
                    className={`flex items-center ${
                      viewMode === "library" ? "bg-accent-purple" : ""
                    }`}
                    onClick={() => setViewMode("library")}
                  >
                    <FiCode className="mr-2" />
                    Scene Library
                  </Button>
                </div>
              </div>

              {/* Search and Filter Bar - Only show in explore mode */}
              {viewMode === "explore" && (
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="h-5 w-5 text-neutral-light" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2.5 border border-white/10 rounded-lg bg-primary-main focus:ring-accent-purple focus:border-accent-purple text-white placeholder-neutral-light"
                      placeholder="Search for visualizations, topics, or creators"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      className="flex items-center"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <FiFilter className="mr-2" />
                      Filters
                    </Button>
                    <div className="relative">
                      <Button
                        variant="outline"
                        className="flex items-center min-w-[140px] justify-between"
                        onClick={() =>
                          document
                            .getElementById("sort-dropdown")
                            ?.classList.toggle("hidden")
                        }
                      >
                        {filters.find((f) => f.id === activeFilter)?.icon}
                        <span className="mx-2">
                          {filters.find((f) => f.id === activeFilter)?.name}
                        </span>
                        <FiChevronRight className="transform rotate-90" />
                      </Button>
                      <div
                        id="sort-dropdown"
                        className="absolute right-0 mt-2 w-48 bg-primary-main border border-white/10 rounded-lg shadow-lg z-10 hidden"
                      >
                        <div className="py-1">
                          {filters.map((filter) => (
                            <button
                              key={filter.id}
                              className={`flex items-center w-full px-4 py-2 text-sm ${
                                activeFilter === filter.id
                                  ? "text-accent-purple bg-accent-purple/10"
                                  : "text-white hover:bg-primary-dark"
                              }`}
                              onClick={() => {
                                setActiveFilter(filter.id);
                                document
                                  .getElementById("sort-dropdown")
                                  ?.classList.add("hidden");
                              }}
                            >
                              {filter.icon}
                              <span className="ml-2">{filter.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Expanded Filters - Only show in explore mode */}
              {viewMode === "explore" && showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 p-4 bg-primary-main rounded-lg border border-white/10"
                >
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          className={`px-3 py-1.5 rounded-full text-sm ${
                            activeCategory === category.id
                              ? "bg-accent-purple text-white"
                              : "bg-primary-dark text-white hover:bg-white/10"
                          }`}
                          onClick={() => setActiveCategory(category.id)}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Difficulty Level
                      </h3>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-white/20 text-accent-purple focus:ring-accent-purple bg-primary-dark"
                          />
                          <span className="ml-2 text-sm">Beginner</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-white/20 text-accent-purple focus:ring-accent-purple bg-primary-dark"
                          />
                          <span className="ml-2 text-sm">Intermediate</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-white/20 text-accent-purple focus:ring-accent-purple bg-primary-dark"
                          />
                          <span className="ml-2 text-sm">Advanced</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Rating</h3>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-white/20 text-accent-purple focus:ring-accent-purple bg-primary-dark"
                          />
                          <span className="ml-2 text-sm">4.5 & Up</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-white/20 text-accent-purple focus:ring-accent-purple bg-primary-dark"
                          />
                          <span className="ml-2 text-sm">4.0 & Up</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-white/20 text-accent-purple focus:ring-accent-purple bg-primary-dark"
                          />
                          <span className="ml-2 text-sm">3.5 & Up</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Features</h3>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-white/20 text-accent-purple focus:ring-accent-purple bg-primary-dark"
                          />
                          <span className="ml-2 text-sm">Interactive</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-white/20 text-accent-purple focus:ring-accent-purple bg-primary-dark"
                          />
                          <span className="ml-2 text-sm">Code Examples</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-white/20 text-accent-purple focus:ring-accent-purple bg-primary-dark"
                          />
                          <span className="ml-2 text-sm">Downloadable</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowFilters(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="gradient"
                      onClick={() => setShowFilters(false)}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Scene Library Browser */}
            {viewMode === "library" ? (
              <div className="mt-4">
                <SceneLibraryBrowser
                  onSceneSelect={(scene) => {
                    setSelectedScene(scene);
                    // In a real implementation, this would navigate to the visualization workspace
                    console.log("Selected scene:", scene.id);
                  }}
                />
              </div>
            ) : (
              <>
                {/* Featured Content */}
                {featuredContent.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-xl font-semibold mb-6">
                      Featured Visualizations
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {featuredContent.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="bg-primary-main rounded-xl overflow-hidden border border-white/5 hover:shadow-lg transition-all cursor-pointer group"
                          onClick={() => navigate(`/explore/${item.id}`)}
                        >
                          <div className="relative h-48 bg-gradient-to-br from-accent-purple/30 to-accent-blue/30 flex items-center justify-center">
                            <span className="text-6xl">
                              {item.title.charAt(0)}
                            </span>
                            <div className="absolute top-3 right-3 bg-accent-purple/90 text-white px-2 py-1 rounded-lg text-xs font-medium">
                              Featured
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="px-2 py-0.5 text-xs rounded-full bg-accent-purple/20 text-accent-purple">
                                {
                                  categories.find((c) => c.id === item.category)
                                    ?.name
                                }
                              </span>
                              <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/20 text-blue-400">
                                {item.level}
                              </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                              {item.title}
                            </h3>
                            <p className="text-neutral-light text-sm mb-4">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-accent-purple/20 flex items-center justify-center mr-2">
                                  {item.author.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-sm font-medium">
                                    {item.author}
                                  </p>
                                  <div className="flex items-center">
                                    <span className="text-yellow-400 mr-1">
                                      ★
                                    </span>
                                    <span className="text-xs text-neutral-light">
                                      {item.rating} ({item.reviews} reviews)
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center text-sm text-neutral-light">
                                <FiUsers className="mr-1" />
                                <span>
                                  {item.students.toLocaleString()} students
                                </span>
                              </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                              <Button
                                variant="outline"
                                size="sm"
                                className="group-hover:bg-accent-purple/10 group-hover:border-accent-purple/30"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Add to bookmarks logic
                                }}
                              >
                                <FiBookmark className="mr-2" />
                                Save
                              </Button>
                              <span className="text-accent-purple text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center">
                                Explore <FiArrowRight className="ml-1" />
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Main Content Grid */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                      {activeCategory === "all"
                        ? "All Visualizations"
                        : `${
                            categories.find((c) => c.id === activeCategory)
                              ?.name
                          } Visualizations`}
                    </h2>
                    <span className="text-sm text-neutral-light">
                      {sortedContent.length} results
                    </span>
                  </div>

                  {sortedContent.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sortedContent.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="bg-primary-main rounded-xl overflow-hidden border border-white/5 hover:shadow-lg transition-all cursor-pointer group h-full flex flex-col"
                          onClick={() => navigate(`/explore/${item.id}`)}
                        >
                          <div className="h-40 bg-gradient-to-br from-accent-purple/30 to-accent-blue/30 flex items-center justify-center">
                            <span className="text-4xl">
                              {item.title.charAt(0)}
                            </span>
                          </div>
                          <div className="p-4 flex-1 flex flex-col">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="px-2 py-0.5 text-xs rounded-full bg-accent-purple/20 text-accent-purple">
                                {
                                  categories.find((c) => c.id === item.category)
                                    ?.name
                                }
                              </span>
                              <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/20 text-blue-400">
                                {item.level}
                              </span>
                            </div>
                            <h3 className="font-medium mb-1">{item.title}</h3>
                            <p className="text-sm text-neutral-light mb-3 line-clamp-2 flex-grow">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between mt-auto">
                              <div className="flex items-center">
                                <span className="text-yellow-400 mr-1">★</span>
                                <span className="text-xs text-neutral-light">
                                  {item.rating} ({item.reviews})
                                </span>
                              </div>
                              <div className="flex items-center text-xs text-neutral-light">
                                <FiUsers className="mr-1" />
                                <span>{item.students.toLocaleString()}</span>
                              </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center">
                              <span className="text-sm">{item.author}</span>
                              <span className="text-accent-purple text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center">
                                View <FiArrowRight className="ml-1" />
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-primary-main rounded-xl">
                      <div className="w-16 h-16 bg-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiGrid className="w-8 h-8 text-neutral-light" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">
                        No visualizations found
                      </h3>
                      <p className="text-neutral-light mb-6">
                        Try adjusting your filters or search query
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchQuery("");
                          setActiveCategory("all");
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}

                  {/* Pagination */}
                  {sortedContent.length > 0 && (
                    <div className="mt-12 flex justify-center">
                      <nav className="flex items-center space-x-2">
                        <button className="px-3 py-2 rounded-lg border border-white/10 text-neutral-light hover:bg-primary-main transition-colors">
                          Previous
                        </button>
                        <button className="px-3 py-2 rounded-lg bg-accent-purple text-white">
                          1
                        </button>
                        <button className="px-3 py-2 rounded-lg border border-white/10 text-neutral-light hover:bg-primary-main transition-colors">
                          2
                        </button>
                        <button className="px-3 py-2 rounded-lg border border-white/10 text-neutral-light hover:bg-primary-main transition-colors">
                          3
                        </button>
                        <span className="px-3 py-2 text-neutral-light">
                          ...
                        </span>
                        <button className="px-3 py-2 rounded-lg border border-white/10 text-neutral-light hover:bg-primary-main transition-colors">
                          10
                        </button>
                        <button className="px-3 py-2 rounded-lg border border-white/10 text-neutral-light hover:bg-primary-main transition-colors">
                          Next
                        </button>
                      </nav>
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
