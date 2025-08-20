import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { useUserStore } from "../store/userStore";
import { DashboardHeader } from "../components/layout/DashboardHeader";
import { FiEdit2, FiUser, FiMail, FiCalendar, FiBookmark, FiGrid, FiClock, FiAward } from "react-icons/fi";

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, profile, isAuthenticated, isLoading, updateProfile } = useUserStore();
  const [activeTab, setActiveTab] = useState("projects");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    location: "",
    website: "",
    education: "",
    occupation: "",
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Initialize form data from user profile
  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.full_name || "",
        bio: profile.bio || "",
        location: profile.location || "",
        website: profile.website || "",
        education: profile.education || "",
        occupation: profile.occupation || "",
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveProfile = async () => {
    try {
      // Update profile in Supabase
      await updateProfile({
        full_name: formData.fullName,
        bio: formData.bio,
        location: formData.location,
        website: formData.website,
        education: formData.education,
        occupation: formData.occupation,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  // Mock data for projects and activities
  const mockProjects = [
    { id: 1, title: "3D Calculus Visualization", date: "2023-05-15", type: "Math", thumbnail: "/thumbnails/calculus.jpg" },
    { id: 2, title: "Linear Algebra Concepts", date: "2023-04-22", type: "Math", thumbnail: "/thumbnails/linear-algebra.jpg" },
    { id: 3, title: "Quantum Physics Simulation", date: "2023-03-10", type: "Physics", thumbnail: "/thumbnails/quantum.jpg" },
  ];

  const mockActivities = [
    { id: 1, action: "Created a new project", project: "3D Calculus Visualization", date: "2023-05-15" },
    { id: 2, action: "Updated", project: "Linear Algebra Concepts", date: "2023-05-10" },
    { id: 3, action: "Shared", project: "Quantum Physics Simulation", date: "2023-05-05" },
    { id: 4, action: "Commented on", project: "Statistical Analysis", date: "2023-05-01" },
  ];

  const mockAchievements = [
    { id: 1, title: "Early Adopter", description: "Joined during the beta phase", icon: "🚀", date: "2023-01-15" },
    { id: 2, title: "Project Master", description: "Created 5+ projects", icon: "🏆", date: "2023-03-22" },
    { id: 3, title: "Collaborator", description: "Shared projects with 10+ users", icon: "👥", date: "2023-04-10" },
  ];

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
        <div className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Profile Header */}
            <div className="bg-primary-main rounded-xl p-6 mb-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Profile Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-accent-purple to-accent-blue rounded-full flex items-center justify-center text-4xl">
                    {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
                  </div>
                  {!isEditing && (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="absolute bottom-0 right-0 bg-accent-purple w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <FiEdit2 size={16} />
                    </button>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-grow">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="fullName">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-primary-dark border border-neutral-light/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple"
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="bio">
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-2 bg-primary-dark border border-neutral-light/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple"
                          placeholder="Tell us about yourself"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="location">
                            Location
                          </label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-primary-dark border border-neutral-light/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple"
                            placeholder="Your location"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="website">
                            Website
                          </label>
                          <input
                            type="text"
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-primary-dark border border-neutral-light/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple"
                            placeholder="Your website URL"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="education">
                            Education
                          </label>
                          <input
                            type="text"
                            id="education"
                            name="education"
                            value={formData.education}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-primary-dark border border-neutral-light/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple"
                            placeholder="Your education"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="occupation">
                            Occupation
                          </label>
                          <input
                            type="text"
                            id="occupation"
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-primary-dark border border-neutral-light/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple"
                            placeholder="Your occupation"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Button onClick={handleSaveProfile}>Save Profile</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start">
                        <div>
                          <h1 className="text-2xl md:text-3xl font-bold">{profile?.full_name || "User"}</h1>
                          <p className="text-neutral-light">{user?.email}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => navigate("/settings")}>
                          Settings
                        </Button>
                      </div>
                      
                      {profile?.bio && (
                        <p className="mt-4 text-sm md:text-base">{profile.bio}</p>
                      )}

                      <div className="mt-4 flex flex-wrap gap-4">
                        {profile?.location && (
                          <div className="flex items-center text-sm text-neutral-light">
                            <FiUser className="mr-2" />
                            <span>{profile.occupation}</span>
                          </div>
                        )}
                        {profile?.location && (
                          <div className="flex items-center text-sm text-neutral-light">
                            <FiMail className="mr-2" />
                            <span>{profile.location}</span>
                          </div>
                        )}
                        {profile?.education && (
                          <div className="flex items-center text-sm text-neutral-light">
                            <FiCalendar className="mr-2" />
                            <span>{profile.education}</span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Tabs */}
            <div className="mb-6">
              <div className="flex overflow-x-auto space-x-4 pb-2">
                <button
                  onClick={() => setActiveTab("projects")}
                  className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${activeTab === "projects" ? "bg-accent-purple/20 text-accent-purple" : "text-white hover:bg-white/10"}`}
                >
                  <FiGrid className="inline mr-2" />
                  Projects
                </button>
                <button
                  onClick={() => setActiveTab("activity")}
                  className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${activeTab === "activity" ? "bg-accent-purple/20 text-accent-purple" : "text-white hover:bg-white/10"}`}
                >
                  <FiClock className="inline mr-2" />
                  Activity
                </button>
                <button
                  onClick={() => setActiveTab("saved")}
                  className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${activeTab === "saved" ? "bg-accent-purple/20 text-accent-purple" : "text-white hover:bg-white/10"}`}
                >
                  <FiBookmark className="inline mr-2" />
                  Saved
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
              {/* Projects Tab */}
              {activeTab === "projects" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Your Projects</h2>
                    <Button variant="gradient" size="sm" onClick={() => navigate("/create-project")}>
                      New Project
                    </Button>
                  </div>

                  {mockProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mockProjects.map((project) => (
                        <div 
                          key={project.id} 
                          className="bg-primary-dark rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                          onClick={() => navigate(`/project/${project.id}`)}
                        >
                          <div className="h-40 bg-gradient-to-br from-accent-purple/30 to-accent-blue/30 flex items-center justify-center">
                            <span className="text-4xl">{project.title.charAt(0)}</span>
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium mb-1">{project.title}</h3>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-neutral-light">{new Date(project.date).toLocaleDateString()}</span>
                              <span className="text-xs px-2 py-1 bg-accent-purple/20 text-accent-purple rounded-full">{project.type}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-neutral-light mb-4">You haven't created any projects yet</p>
                      <Button variant="gradient" onClick={() => navigate("/create-project")}>
                        Create Your First Project
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Activity Tab */}
              {activeTab === "activity" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>

                  {mockActivities.length > 0 ? (
                    <div className="space-y-4">
                      {mockActivities.map((activity) => (
                        <div key={activity.id} className="bg-primary-dark p-4 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-accent-purple/20 rounded-full flex items-center justify-center mr-4">
                              <FiClock className="text-accent-purple" />
                            </div>
                            <div>
                              <p>
                                <span className="font-medium">You</span> {activity.action}{" "}
                                <span className="text-accent-purple">{activity.project}</span>
                              </p>
                              <p className="text-xs text-neutral-light">{new Date(activity.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-neutral-light">No recent activity</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Saved Tab */}
              {activeTab === "saved" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold mb-6">Saved Items</h2>

                  <div className="text-center py-12">
                    <p className="text-neutral-light mb-4">You haven't saved any items yet</p>
                    <Button variant="outline" onClick={() => navigate("/explore")}>
                      Explore Content
                    </Button>
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

                  {mockAchievements.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mockAchievements.map((achievement) => (
                        <div key={achievement.id} className="bg-primary-dark p-6 rounded-lg border border-neutral-light/10">
                          <div className="text-4xl mb-4">{achievement.icon}</div>
                          <h3 className="font-medium text-lg mb-1">{achievement.title}</h3>
                          <p className="text-sm text-neutral-light mb-2">{achievement.description}</p>
                          <p className="text-xs text-neutral-light">
                            Earned on {new Date(achievement.date).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-neutral-light">No achievements yet</p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};