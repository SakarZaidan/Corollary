import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { useUserStore } from "../store/userStore";
import { DashboardHeader } from "../components/layout/DashboardHeader";
import { FiPlus, FiUsers, FiGrid, FiClock, FiBookmark, FiTrendingUp, FiArrowRight, FiChevronRight, FiBox, FiBookOpen, FiCode, FiLayers, FiHelpCircle, FiSettings, FiFileText, FiBarChart2, FiCheckSquare, FiAward } from "react-icons/fi";

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, profile, isAuthenticated, isLoading, logout } = useUserStore();
  const [activeTab, setActiveTab] = useState("recent");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  const recentVisualizations = [
    {
      id: 1,
      title: "3D Vector Field Analysis",
      description: "Interactive exploration of electromagnetic field patterns",
      lastModified: "2 days ago",
      type: "3D Surface",
      status: "Published",
      thumbnail: "/thumbnails/vector-field.jpg",
      progress: 100,
    },
    {
      id: 2,
      title: "Parametric Surface Explorer",
      description: "Mathematical surface visualization with real-time parameters",
      lastModified: "5 days ago",
      type: "Parametric",
      status: "Draft",
      thumbnail: "/thumbnails/parametric.jpg",
      progress: 75,
    },
    {
      id: 3,
      title: "Wave Function Animation",
      description: "Quantum mechanics wave function probability distributions",
      lastModified: "1 week ago",
      type: "Animation",
      status: "Published",
      thumbnail: "/thumbnails/wave.jpg",
      progress: 100,
    },
    {
      id: 4,
      title: "Differential Equations Solver",
      description: "Visual solutions to common differential equations",
      lastModified: "2 weeks ago",
      type: "Interactive",
      status: "Draft",
      thumbnail: "/thumbnails/differential.jpg",
      progress: 40,
    },
  ];

  const recommendedContent = [
    {
      id: 1,
      title: "Introduction to 3D Calculus",
      author: "Dr. Sarah Chen",
      level: "Intermediate",
      duration: "45 min",
      category: "Calculus",
      rating: 4.8,
      thumbnail: "/thumbnails/calculus-intro.jpg",
    },
    {
      id: 2,
      title: "Linear Algebra Fundamentals",
      author: "Prof. Michael Rodriguez",
      level: "Beginner",
      duration: "60 min",
      category: "Linear Algebra",
      rating: 4.9,
      thumbnail: "/thumbnails/linear-algebra.jpg",
    },
    {
      id: 3,
      title: "Quantum Physics Visualized",
      author: "Dr. Emily Nakamura",
      level: "Advanced",
      duration: "90 min",
      category: "Physics",
      rating: 4.7,
      thumbnail: "/thumbnails/quantum.jpg",
    },
  ];

  const todoItems = [
    {
      id: 1,
      title: "Create your first visualization",
      description: "Start with a simple template to get familiar with the editor",
      action: "Get Started",
      icon: <FiPlus className="w-5 h-5" />,
      link: "/workspace",
    },
    {
      id: 2,
      title: "Explore the Gallery",
      description: "Browse community visualizations for inspiration",
      action: "Browse Gallery",
      icon: <FiGrid className="w-5 h-5" />,
      link: "/explore",
    },
    {
      id: 3,
      title: "Complete your profile",
      description: "Add your education and interests to get personalized recommendations",
      action: "Update Profile",
      icon: <FiSettings className="w-5 h-5" />,
      link: "/profile",
    },
    {
      id: 4,
      title: "Take the interactive tutorial",
      description: "Learn the basics of creating visualizations in Corollary",
      action: "Start Tutorial",
      icon: <FiHelpCircle className="w-5 h-5" />,
      link: "/tutorial",
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "First Visualization",
      description: "Created your first visualization",
      icon: "🚀",
      completed: true,
    },
    {
      id: 2,
      title: "Code Master",
      description: "Wrote custom code for a visualization",
      icon: "💻",
      completed: false,
    },
    {
      id: 3,
      title: "Collaborator",
      description: "Shared a project with others",
      icon: "👥",
      completed: true,
    },
  ];

  const storagePercentage = profile ? (profile.storage_used / profile.storage_limit) * 100 : 0;
  const projectPercentage = profile ? (profile.project_count / profile.project_limit) * 100 : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-dark">
        <div className="w-12 h-12 border-4 border-accent-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">
                  Hello, {profile?.full_name || user?.email?.split('@')[0] || 'Student'} 👋
                </h1>
                <p className="text-neutral-light mt-1">Let's bring some equations to life today.</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <Button
                  variant="gradient"
                  onClick={() => navigate("/workspace")}
                  className="flex items-center"
                >
                  <FiPlus className="mr-2" />
                  New Visualization
                </Button>
              </div>
            </div>

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content Area - Left Side */}
              <div className="lg:col-span-3 space-y-8">
                {/* Premium Banner */}
                {(!profile?.account_tier || profile?.account_tier === "free") && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 border border-accent-purple/30 rounded-xl p-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            Upgrade to Premium
                          </h3>
                          <p className="text-neutral-light mb-4 md:mb-0">
                            Unlock 3D visualizations, the advanced code editor, and unlimited projects.
                          </p>
                        </div>
                        <Button 
                          variant="gradient" 
                          onClick={() => navigate("/pricing")}
                          className="whitespace-nowrap"
                        >
                          Upgrade Now
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Dashboard Tabs */}
                <div>
                  <div className="flex overflow-x-auto space-x-4 pb-2">
                    <button
                      onClick={() => setActiveTab("recent")}
                      className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${activeTab === "recent" ? "bg-accent-purple/20 text-accent-purple" : "text-white hover:bg-white/10"}`}
                    >
                      <FiClock className="inline mr-2" />
                      Recent Work
                    </button>
                    <button
                      onClick={() => setActiveTab("recommended")}
                      className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${activeTab === "recommended" ? "bg-accent-purple/20 text-accent-purple" : "text-white hover:bg-white/10"}`}
                    >
                      <FiTrendingUp className="inline mr-2" />
                      Recommended
                    </button>
                    <button
                      onClick={() => setActiveTab("todo")}
                      className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${activeTab === "todo" ? "bg-accent-purple/20 text-accent-purple" : "text-white hover:bg-white/10"}`}
                    >
                      <FiBookmark className="inline mr-2" />
                      To-Do
                    </button>
                    <button
                      onClick={() => setActiveTab("achievements")}
                      className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${activeTab === "achievements" ? "bg-accent-purple/20 text-accent-purple" : "text-white hover:bg-white/10"}`}
                    >
                      <FiAward className="inline mr-2" />
                      Achievements
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="bg-primary-main rounded-xl p-6">
                  {/* Recent Work Tab */}
                  {activeTab === "recent" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Recent Visualizations</h2>
                        <button 
                          className="text-sm font-medium text-accent-purple hover:text-accent-purple/80 flex items-center"
                          onClick={() => navigate("/projects")}
                        >
                          View all <FiChevronRight className="ml-1" />
                        </button>
                      </div>

                      {recentVisualizations.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {recentVisualizations.map((viz) => (
                            <div 
                              key={viz.id} 
                              className="bg-primary-dark rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border border-white/5"
                              onClick={() => navigate(`/workspace/${viz.id}`)}
                            >
                              <div className="h-40 bg-gradient-to-br from-accent-purple/30 to-accent-blue/30 flex items-center justify-center relative">
                                <span className="text-4xl">{viz.title.charAt(0)}</span>
                                {viz.progress < 100 && (
                                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                                    <div 
                                      className="h-full bg-accent-purple" 
                                      style={{ width: `${viz.progress}%` }}
                                    ></div>
                                  </div>
                                )}
                              </div>
                              <div className="p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className={`px-2 py-0.5 text-xs rounded-full ${viz.status === 'Published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                    {viz.status}
                                  </span>
                                  <span className="px-2 py-0.5 text-xs rounded-full bg-accent-purple/20 text-accent-purple">
                                    {viz.type}
                                  </span>
                                </div>
                                <h3 className="font-medium mb-1 text-white">{viz.title}</h3>
                                <p className="text-sm text-neutral-light mb-2 line-clamp-2">{viz.description}</p>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-neutral-light">{viz.lastModified}</span>
                                  <span className="text-accent-purple text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center">
                                    Open <FiArrowRight className="ml-1" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiGrid className="w-8 h-8 text-neutral-light" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">No visualizations yet</h3>
                          <p className="text-neutral-light mb-6">Create your first visualization to get started</p>
                          <Button variant="gradient" onClick={() => navigate("/workspace")}>
                            Create Visualization
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Recommended Tab */}
                  {activeTab === "recommended" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Recommended for You</h2>
                        <button 
                          className="text-sm font-medium text-accent-purple hover:text-accent-purple/80 flex items-center"
                          onClick={() => navigate("/explore")}
                        >
                          Explore more <FiChevronRight className="ml-1" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recommendedContent.map((content) => (
                          <div 
                            key={content.id} 
                            className="bg-primary-dark rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border border-white/5"
                            onClick={() => navigate(`/explore/${content.id}`)}
                          >
                            <div className="h-40 bg-gradient-to-br from-accent-purple/30 to-accent-blue/30 flex items-center justify-center">
                              <span className="text-4xl">{content.title.charAt(0)}</span>
                            </div>
                            <div className="p-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="px-2 py-0.5 text-xs rounded-full bg-accent-purple/20 text-accent-purple">
                                  {content.category}
                                </span>
                                <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/20 text-blue-400">
                                  {content.level}
                                </span>
                              </div>
                              <h3 className="font-medium mb-1 text-white">{content.title}</h3>
                              <p className="text-sm text-neutral-light mb-2">By {content.author}</p>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <span className="text-yellow-400 mr-1">★</span>
                                  <span className="text-xs text-neutral-light">{content.rating} • {content.duration}</span>
                                </div>
                                <span className="text-accent-purple text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center">
                                  View <FiArrowRight className="ml-1" />
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* To-Do Tab */}
                  {activeTab === "todo" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-xl font-semibold mb-6">Things to Do</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {todoItems.map((item) => (
                          <div 
                            key={item.id} 
                            className="bg-primary-dark rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer group border border-white/5"
                            onClick={() => navigate(item.link)}
                          >
                            <div className="flex items-start space-x-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-accent-purple/20 rounded-xl flex items-center justify-center text-accent-purple group-hover:bg-accent-purple/30 transition-colors duration-200">
                                  {item.icon}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium mb-1">{item.title}</h3>
                                <p className="text-sm text-neutral-light mb-3">{item.description}</p>
                                <span className="text-sm font-medium text-accent-purple group-hover:text-accent-purple/80 flex items-center">
                                  {item.action} <FiArrowRight className="ml-1" />
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Achievements Tab */}
                  {activeTab === "achievements" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-xl font-semibold mb-6">Your Achievements</h2>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {achievements.map((achievement) => (
                          <div 
                            key={achievement.id} 
                            className={`bg-primary-dark rounded-xl p-6 border ${achievement.completed ? 'border-accent-purple/30' : 'border-white/5'}`}
                          >
                            <div className="text-4xl mb-4">{achievement.icon}</div>
                            <h3 className="font-medium mb-1">{achievement.title}</h3>
                            <p className="text-sm text-neutral-light mb-3">{achievement.description}</p>
                            {achievement.completed ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                                Completed
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-light/20 text-neutral-light">
                                In Progress
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Sidebar - Right Side */}
              <div className="lg:col-span-1 space-y-6">
                {/* Account Overview */}
                <div className="bg-primary-main rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Account Overview</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-light">Email</span>
                      <span className="text-sm font-medium text-white truncate ml-2">
                        {user?.email || "Not logged in"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-light">Plan</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-white">
                          {profile?.account_tier || "Free"} Tier
                        </span>
                        <button 
                          className="text-xs text-accent-purple hover:text-accent-purple/80 font-medium"
                          onClick={() => navigate("/pricing")}
                        >
                          Upgrade
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-neutral-light">Projects</span>
                        <span className="text-sm font-medium text-white">
                          {profile ? `${profile.project_count} / ${profile.project_limit}` : "0 / 5"}
                        </span>
                      </div>
                      <div className="w-full bg-primary-dark rounded-full h-2">
                        <div 
                          className="bg-accent-purple h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${Math.min(projectPercentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-neutral-light">Storage</span>
                        <span className="text-sm font-medium text-white">
                          {profile ? `${(profile.storage_used / (1024 * 1024)).toFixed(1)} MB / ${(profile.storage_limit / (1024 * 1024 * 1024)).toFixed(0)} GB` : "0 MB / 1 GB"}
                        </span>
                      </div>
                      <div className="w-full bg-primary-dark rounded-full h-2">
                        <div 
                          className="bg-accent-purple h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${Math.min(storagePercentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-primary-main rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <div className="space-y-3">
                    <button 
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-primary-dark transition-colors text-left"
                      onClick={() => navigate("/tutorial")}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-accent-purple/20 rounded-lg flex items-center justify-center mr-3">
                          <FiHelpCircle className="text-accent-purple" />
                        </div>
                        <span>Interactive Tutorial</span>
                      </div>
                      <FiChevronRight className="text-neutral-light" />
                    </button>
                    <button 
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-primary-dark transition-colors text-left"
                      onClick={() => navigate("/docs")}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-accent-purple/20 rounded-lg flex items-center justify-center mr-3">
                          <FiBookOpen className="text-accent-purple" />
                        </div>
                        <span>Documentation</span>
                      </div>
                      <FiChevronRight className="text-neutral-light" />
                    </button>
                    <button 
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-primary-dark transition-colors text-left"
                      onClick={() => navigate("/templates")}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-accent-purple/20 rounded-lg flex items-center justify-center mr-3">
                          <FiBox className="text-accent-purple" />
                        </div>
                        <span>Templates</span>
                      </div>
                      <FiChevronRight className="text-neutral-light" />
                    </button>
                    <button 
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-primary-dark transition-colors text-left"
                      onClick={() => navigate("/code-examples")}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-accent-purple/20 rounded-lg flex items-center justify-center mr-3">
                          <FiCode className="text-accent-purple" />
                        </div>
                        <span>Code Examples</span>
                      </div>
                      <FiChevronRight className="text-neutral-light" />
                    </button>
                  </div>
                </div>

                {/* Learning Progress */}
                <div className="bg-gradient-to-br from-accent-purple/30 to-accent-blue/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Beginner Track</span>
                      <span className="text-sm font-medium">60%</span>
                    </div>
                    <div className="w-full bg-primary-dark/50 rounded-full h-2">
                      <div className="bg-accent-purple h-2 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full justify-center"
                    onClick={() => navigate("/learning")}
                  >
                    Continue Learning
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
