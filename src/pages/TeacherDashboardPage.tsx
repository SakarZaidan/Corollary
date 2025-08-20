import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { useUserStore } from "../store/userStore";
import { DashboardHeader } from "../components/layout/DashboardHeader";
import { FiPlus, FiUsers, FiGrid, FiClock, FiBookmark, FiTrendingUp, FiArrowRight, FiChevronRight, FiBox, FiBookOpen, FiCode, FiLayers, FiHelpCircle, FiSettings, FiFileText, FiBarChart2, FiCheckSquare } from "react-icons/fi";

export function TeacherDashboardPage() {
  const navigate = useNavigate();
  const { user, profile, isAuthenticated, isLoading, logout } = useUserStore();
  const [activeTab, setActiveTab] = useState("classes");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
    // Check if user is a teacher, if not redirect to student dashboard
    if (profile && profile.account_type !== "teacher") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isLoading, navigate, profile]);

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  const classes = [
    {
      id: 1,
      name: "Calculus 101",
      students: 28,
      assignments: 5,
      nextClass: "Today, 2:00 PM",
      progress: 65,
      thumbnail: "/thumbnails/calculus.jpg",
    },
    {
      id: 2,
      name: "Linear Algebra",
      students: 32,
      assignments: 3,
      nextClass: "Tomorrow, 10:00 AM",
      progress: 40,
      thumbnail: "/thumbnails/linear-algebra.jpg",
    },
    {
      id: 3,
      name: "Quantum Physics",
      students: 18,
      assignments: 7,
      nextClass: "Thursday, 1:30 PM",
      progress: 80,
      thumbnail: "/thumbnails/quantum.jpg",
    },
  ];

  const recentVisualizations = [
    {
      id: 1,
      title: "3D Vector Field Analysis",
      description: "Interactive exploration of electromagnetic field patterns",
      lastModified: "2 days ago",
      type: "3D Surface",
      status: "Published",
      thumbnail: "/thumbnails/vector-field.jpg",
      sharedWith: ["Calculus 101", "Linear Algebra"],
    },
    {
      id: 2,
      title: "Parametric Surface Explorer",
      description: "Mathematical surface visualization with real-time parameters",
      lastModified: "5 days ago",
      type: "Parametric",
      status: "Draft",
      thumbnail: "/thumbnails/parametric.jpg",
      sharedWith: [],
    },
  ];

  const assignments = [
    {
      id: 1,
      title: "Vector Calculus Homework",
      class: "Calculus 101",
      dueDate: "Tomorrow, 11:59 PM",
      submissions: 18,
      totalStudents: 28,
      status: "Active",
    },
    {
      id: 2,
      title: "Matrix Transformations Lab",
      class: "Linear Algebra",
      dueDate: "Friday, 11:59 PM",
      submissions: 5,
      totalStudents: 32,
      status: "Active",
    },
    {
      id: 3,
      title: "Wave Function Visualization",
      class: "Quantum Physics",
      dueDate: "Next Monday, 11:59 PM",
      submissions: 0,
      totalStudents: 18,
      status: "Scheduled",
    },
  ];

  const todoItems = [
    {
      id: 1,
      title: "Grade Vector Calculus Homework",
      description: "18 submissions waiting for review",
      action: "Grade Now",
      icon: <FiCheckSquare className="w-5 h-5" />,
      link: "/assignments/1/grade",
    },
    {
      id: 2,
      title: "Prepare next week's materials",
      description: "Create visualizations for the upcoming lessons",
      action: "Create Content",
      icon: <FiPlus className="w-5 h-5" />,
      link: "/workspace",
    },
    {
      id: 3,
      title: "Review student progress",
      description: "Check performance analytics for all classes",
      action: "View Analytics",
      icon: <FiBarChart2 className="w-5 h-5" />,
      link: "/analytics",
    },
  ];

  const analytics = {
    studentEngagement: 78,
    assignmentCompletion: 85,
    averageScore: 82,
    improvementRate: 12,
  };

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
                  Hello, {profile?.full_name || user?.email?.split('@')[0] || 'Teacher'} 👋
                </h1>
                <p className="text-neutral-light mt-1">Welcome to your teaching dashboard.</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => navigate("/class/create")}
                  className="flex items-center"
                >
                  <FiUsers className="mr-2" />
                  New Class
                </Button>
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
                {/* Dashboard Tabs */}
                <div>
                  <div className="flex overflow-x-auto space-x-4 pb-2">
                    <button
                      onClick={() => setActiveTab("classes")}
                      className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${activeTab === "classes" ? "bg-accent-purple/20 text-accent-purple" : "text-white hover:bg-white/10"}`}
                    >
                      <FiUsers className="inline mr-2" />
                      My Classes
                    </button>
                    <button
                      onClick={() => setActiveTab("assignments")}
                      className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${activeTab === "assignments" ? "bg-accent-purple/20 text-accent-purple" : "text-white hover:bg-white/10"}`}
                    >
                      <FiFileText className="inline mr-2" />
                      Assignments
                    </button>
                    <button
                      onClick={() => setActiveTab("content")}
                      className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${activeTab === "content" ? "bg-accent-purple/20 text-accent-purple" : "text-white hover:bg-white/10"}`}
                    >
                      <FiGrid className="inline mr-2" />
                      My Content
                    </button>
                    <button
                      onClick={() => setActiveTab("todo")}
                      className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${activeTab === "todo" ? "bg-accent-purple/20 text-accent-purple" : "text-white hover:bg-white/10"}`}
                    >
                      <FiBookmark className="inline mr-2" />
                      To-Do
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="bg-primary-main rounded-xl p-6">
                  {/* Classes Tab */}
                  {activeTab === "classes" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">My Classes</h2>
                        <button 
                          className="text-sm font-medium text-accent-purple hover:text-accent-purple/80 flex items-center"
                          onClick={() => navigate("/classes")}
                        >
                          View all <FiChevronRight className="ml-1" />
                        </button>
                      </div>

                      {classes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {classes.map((classItem) => (
                            <div 
                              key={classItem.id} 
                              className="bg-primary-dark rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border border-white/5"
                              onClick={() => navigate(`/class/${classItem.id}`)}
                            >
                              <div className="h-40 bg-gradient-to-br from-accent-purple/30 to-accent-blue/30 flex items-center justify-center relative">
                                <span className="text-4xl">{classItem.name.charAt(0)}</span>
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                                  <div 
                                    className="h-full bg-accent-purple" 
                                    style={{ width: `${classItem.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="font-medium mb-1 text-white">{classItem.name}</h3>
                                <div className="grid grid-cols-2 gap-2 mb-3">
                                  <div>
                                    <p className="text-xs text-neutral-light">Students</p>
                                    <p className="text-sm">{classItem.students}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-neutral-light">Assignments</p>
                                    <p className="text-sm">{classItem.assignments}</p>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-neutral-light">Next: {classItem.nextClass}</span>
                                  <span className="text-accent-purple text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center">
                                    Manage <FiArrowRight className="ml-1" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiUsers className="w-8 h-8 text-neutral-light" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">No classes yet</h3>
                          <p className="text-neutral-light mb-6">Create your first class to get started</p>
                          <Button variant="gradient" onClick={() => navigate("/class/create")}>
                            Create Class
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Assignments Tab */}
                  {activeTab === "assignments" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Assignments</h2>
                        <button 
                          className="text-sm font-medium text-accent-purple hover:text-accent-purple/80 flex items-center"
                          onClick={() => navigate("/assignments")}
                        >
                          View all <FiChevronRight className="ml-1" />
                        </button>
                      </div>

                      {assignments.length > 0 ? (
                        <div className="space-y-4">
                          {assignments.map((assignment) => (
                            <div 
                              key={assignment.id} 
                              className="bg-primary-dark rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer group border border-white/5"
                              onClick={() => navigate(`/assignments/${assignment.id}`)}
                            >
                              <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div className="mb-3 md:mb-0">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h3 className="font-medium text-white">{assignment.title}</h3>
                                    <span className={`px-2 py-0.5 text-xs rounded-full ${assignment.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                      {assignment.status}
                                    </span>
                                  </div>
                                  <p className="text-sm text-neutral-light">{assignment.class} • Due {assignment.dueDate}</p>
                                </div>
                                <div className="flex items-center space-x-6">
                                  <div>
                                    <p className="text-xs text-neutral-light mb-1">Submissions</p>
                                    <div className="flex items-center">
                                      <span className="text-sm font-medium">{assignment.submissions}/{assignment.totalStudents}</span>
                                      <div className="ml-2 w-20 bg-primary-main rounded-full h-1.5">
                                        <div 
                                          className="bg-accent-purple h-1.5 rounded-full" 
                                          style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                  <span className="text-accent-purple text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center">
                                    {assignment.submissions > 0 ? "Grade" : "View"} <FiArrowRight className="ml-1" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiFileText className="w-8 h-8 text-neutral-light" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">No assignments yet</h3>
                          <p className="text-neutral-light mb-6">Create your first assignment to get started</p>
                          <Button variant="gradient" onClick={() => navigate("/assignments/create")}>
                            Create Assignment
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Content Tab */}
                  {activeTab === "content" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">My Content</h2>
                        <button 
                          className="text-sm font-medium text-accent-purple hover:text-accent-purple/80 flex items-center"
                          onClick={() => navigate("/content")}
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
                              <div className="h-40 bg-gradient-to-br from-accent-purple/30 to-accent-blue/30 flex items-center justify-center">
                                <span className="text-4xl">{viz.title.charAt(0)}</span>
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
                                  <div>
                                    {viz.sharedWith.length > 0 ? (
                                      <span className="text-xs text-neutral-light">Shared with {viz.sharedWith.length} {viz.sharedWith.length === 1 ? 'class' : 'classes'}</span>
                                    ) : (
                                      <span className="text-xs text-neutral-light">Not shared</span>
                                    )}
                                  </div>
                                  <span className="text-accent-purple text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center">
                                    Edit <FiArrowRight className="ml-1" />
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
                          <h3 className="text-lg font-medium mb-2">No content yet</h3>
                          <p className="text-neutral-light mb-6">Create your first visualization to get started</p>
                          <Button variant="gradient" onClick={() => navigate("/workspace")}>
                            Create Visualization
                          </Button>
                        </div>
                      )}
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
                </div>
              </div>

              {/* Sidebar - Right Side */}
              <div className="lg:col-span-1 space-y-6">
                {/* Performance Analytics */}
                <div className="bg-primary-main rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Performance Analytics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-neutral-light">Student Engagement</span>
                        <span className="text-sm font-medium text-white">{analytics.studentEngagement}%</span>
                      </div>
                      <div className="w-full bg-primary-dark rounded-full h-2">
                        <div 
                          className="bg-accent-purple h-2 rounded-full" 
                          style={{ width: `${analytics.studentEngagement}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-neutral-light">Assignment Completion</span>
                        <span className="text-sm font-medium text-white">{analytics.assignmentCompletion}%</span>
                      </div>
                      <div className="w-full bg-primary-dark rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${analytics.assignmentCompletion}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-neutral-light">Average Score</span>
                        <span className="text-sm font-medium text-white">{analytics.averageScore}%</span>
                      </div>
                      <div className="w-full bg-primary-dark rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${analytics.averageScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Improvement Rate</span>
                      <span className="text-sm font-medium text-green-400">+{analytics.improvementRate}%</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full justify-center mt-4"
                    onClick={() => navigate("/analytics")}
                  >
                    View Detailed Analytics
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="bg-primary-main rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button 
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-primary-dark transition-colors text-left"
                      onClick={() => navigate("/assignments/create")}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-accent-purple/20 rounded-lg flex items-center justify-center mr-3">
                          <FiFileText className="text-accent-purple" />
                        </div>
                        <span>Create Assignment</span>
                      </div>
                      <FiChevronRight className="text-neutral-light" />
                    </button>
                    <button 
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-primary-dark transition-colors text-left"
                      onClick={() => navigate("/class/create")}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-accent-purple/20 rounded-lg flex items-center justify-center mr-3">
                          <FiUsers className="text-accent-purple" />
                        </div>
                        <span>Create Class</span>
                      </div>
                      <FiChevronRight className="text-neutral-light" />
                    </button>
                    <button 
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-primary-dark transition-colors text-left"
                      onClick={() => navigate("/workspace")}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-accent-purple/20 rounded-lg flex items-center justify-center mr-3">
                          <FiLayers className="text-accent-purple" />
                        </div>
                        <span>Create Visualization</span>
                      </div>
                      <FiChevronRight className="text-neutral-light" />
                    </button>
                  </div>
                </div>

                {/* Upcoming Schedule */}
                <div className="bg-gradient-to-br from-accent-purple/30 to-accent-blue/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Upcoming Schedule</h3>
                  <div className="space-y-3">
                    <div className="bg-primary-dark/30 rounded-lg p-3">
                      <p className="text-sm font-medium">Calculus 101</p>
                      <p className="text-xs text-neutral-light">Today, 2:00 PM - 3:30 PM</p>
                    </div>
                    <div className="bg-primary-dark/30 rounded-lg p-3">
                      <p className="text-sm font-medium">Linear Algebra</p>
                      <p className="text-xs text-neutral-light">Tomorrow, 10:00 AM - 11:30 AM</p>
                    </div>
                    <div className="bg-primary-dark/30 rounded-lg p-3">
                      <p className="text-sm font-medium">Office Hours</p>
                      <p className="text-xs text-neutral-light">Tomorrow, 1:00 PM - 3:00 PM</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full justify-center mt-4 bg-primary-dark/20 hover:bg-primary-dark/40"
                    onClick={() => navigate("/schedule")}
                  >
                    View Full Schedule
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